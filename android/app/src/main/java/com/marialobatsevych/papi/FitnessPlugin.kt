package com.marialobatsevych.papi

import android.Manifest
import android.app.Activity
import android.content.Intent
import android.content.pm.PackageManager
import androidx.core.app.ActivityCompat
import androidx.core.content.ContextCompat

import com.getcapacitor.JSObject
import com.getcapacitor.Plugin
import com.getcapacitor.PluginCall
import com.getcapacitor.PluginMethod

import com.google.android.gms.auth.api.signin.GoogleSignIn
import com.google.android.gms.auth.api.signin.GoogleSignInAccount
import com.google.android.gms.fitness.Fitness
import com.google.android.gms.fitness.FitnessOptions
import com.google.android.gms.fitness.data.DataPoint
import com.google.android.gms.fitness.data.DataReadRequest
import com.google.android.gms.fitness.data.DataReadResponse
import com.google.android.gms.fitness.data.DataSet
import com.google.android.gms.fitness.data.DataType
import com.google.android.gms.fitness.data.Field
import com.google.android.gms.fitness.result.Bucket
import com.google.android.gms.tasks.OnFailureListener
import com.google.android.gms.tasks.OnSuccessListener

import java.util.concurrent.TimeUnit

class FitnessPlugin : Plugin() {
    companion object {
        private const val REQUEST_OAUTH_REQUEST_CODE = 4001
        private const val REQUEST_ACTIVITY_RECOGNITION = 4002
    }

    private var savedCall: PluginCall? = null

    @PluginMethod
    fun requestAuthorization(call: PluginCall) {
        val activity: Activity = activity
        savedCall = call

        val fitnessOptions = FitnessOptions.builder()
            .addDataType(DataType.TYPE_STEP_COUNT_DELTA, FitnessOptions.ACCESS_READ)
            .addDataType(DataType.AGGREGATE_STEP_COUNT_DELTA, FitnessOptions.ACCESS_READ)
            .build()

        val account: GoogleSignInAccount = GoogleSignIn.getAccountForExtension(activity, fitnessOptions)
        if (!GoogleSignIn.hasPermissions(account, fitnessOptions)) {
            GoogleSignIn.requestPermissions(activity, REQUEST_OAUTH_REQUEST_CODE, account, fitnessOptions)
        } else {
            // Check runtime permission for activity recognition
            if (ContextCompat.checkSelfPermission(activity, Manifest.permission.ACTIVITY_RECOGNITION) != PackageManager.PERMISSION_GRANTED) {
                ActivityCompat.requestPermissions(activity, arrayOf(Manifest.permission.ACTIVITY_RECOGNITION), REQUEST_ACTIVITY_RECOGNITION)
            } else {
                val ret = JSObject()
                ret.put("granted", true)
                call.resolve(ret)
                savedCall = null
            }
        }
    }

    override fun handleOnActivityResult(requestCode: Int, resultCode: Int, data: Intent?) {
        super.handleOnActivityResult(requestCode, resultCode, data)
        if (requestCode == REQUEST_OAUTH_REQUEST_CODE) {
            if (resultCode == Activity.RESULT_OK) {
                val activity: Activity = activity
                if (ContextCompat.checkSelfPermission(activity, Manifest.permission.ACTIVITY_RECOGNITION) != PackageManager.PERMISSION_GRANTED) {
                    ActivityCompat.requestPermissions(activity, arrayOf(Manifest.permission.ACTIVITY_RECOGNITION), REQUEST_ACTIVITY_RECOGNITION)
                } else {
                    savedCall?.let {
                        val ret = JSObject()
                        ret.put("granted", true)
                        it.resolve(ret)
                        savedCall = null
                    }
                }
            } else {
                savedCall?.reject("authorization_denied")
                savedCall = null
            }
        }
    }

    override fun handleOnRequestPermissionsResult(requestCode: Int, permissions: Array<String>, grantResults: IntArray) {
        super.handleOnRequestPermissionsResult(requestCode, permissions, grantResults)
        if (requestCode == REQUEST_ACTIVITY_RECOGNITION) {
            if (grantResults.isNotEmpty() && grantResults[0] == PackageManager.PERMISSION_GRANTED) {
                savedCall?.let {
                    val ret = JSObject()
                    ret.put("granted", true)
                    it.resolve(ret)
                    savedCall = null
                }
            } else {
                savedCall?.reject("permission_denied")
                savedCall = null
            }
        }
    }

    @PluginMethod
    fun readSteps(call: PluginCall) {
        val start = call.getLong("start") ?: 0L
        val end = call.getLong("end") ?: System.currentTimeMillis()
        val activity: Activity = activity

        val fitnessOptions = FitnessOptions.builder()
            .addDataType(DataType.TYPE_STEP_COUNT_DELTA, FitnessOptions.ACCESS_READ)
            .build()

        val account: GoogleSignInAccount = GoogleSignIn.getAccountForExtension(activity, fitnessOptions)
        if (!GoogleSignIn.hasPermissions(account, fitnessOptions)) {
            call.reject("not_authorized")
            return
        }

        val readRequest = DataReadRequest.Builder()
            .aggregate(DataType.TYPE_STEP_COUNT_DELTA, DataType.AGGREGATE_STEP_COUNT_DELTA)
            .setTimeRange(start, end, TimeUnit.MILLISECONDS)
            .bucketByTime(1, TimeUnit.DAYS)
            .build()

        Fitness.getHistoryClient(activity, account).readData(readRequest)
            .addOnSuccessListener(OnSuccessListener<DataReadResponse> { response ->
                var total = 0L
                val buckets: List<Bucket> = response.buckets
                for (bucket in buckets) {
                    val dataSets: List<DataSet> = bucket.dataSets
                    for (ds in dataSets) {
                        for (dp in ds.dataPoints) {
                            for (f in dp.dataType.fields) {
                                total += dp.getValue(f).asInt().toLong()
                            }
                        }
                    }
                }
                val ret = JSObject()
                ret.put("steps", total)
                call.resolve(ret)
            })
            .addOnFailureListener(OnFailureListener { e ->
                call.reject("read_failed", e)
            })
    }
}
