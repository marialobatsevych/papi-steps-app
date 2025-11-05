package com.marialobatsevych.papi;

import android.os.Bundle;
import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        // Register the native Fitness plugin so it can be called from JavaScript
        registerPlugin(FitnessPlugin.class);
    }
}
