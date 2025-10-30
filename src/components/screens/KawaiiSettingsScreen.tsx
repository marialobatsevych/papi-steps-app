import React, { useState, useEffect } from 'react';
import { KawaiiButton } from '../KawaiiButton';
import { BackIcon, SettingsIcon, ChevronDownIcon, ChevronUpIcon } from '../KawaiiIcons';
import { Slider } from '../ui/slider';
import { Switch } from '../ui/switch';

interface KawaiiSettingsScreenProps {
  onBack: () => void;
  dailyGoal: number;
  onDailyGoalChange: (newGoal: number) => void;
}

interface NotificationSettings {
  all: boolean;
  friendMessages: boolean;
  papiStatus: boolean;
  dailyReminders: boolean;
}

export function KawaiiSettingsScreen({ onBack, dailyGoal, onDailyGoalChange }: KawaiiSettingsScreenProps) {
  const [tempGoal, setTempGoal] = useState(dailyGoal);
  const [showSlider, setShowSlider] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  
  // Load notification settings from localStorage
  const [notifications, setNotifications] = useState<NotificationSettings>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('notificationSettings');
      if (saved) {
        return JSON.parse(saved);
      }
    }
    return {
      all: true,
      friendMessages: true,
      papiStatus: true,
      dailyReminders: true,
    };
  });

  // Save notification settings to localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('notificationSettings', JSON.stringify(notifications));
    }
  }, [notifications]);

  const handleSaveGoal = () => {
    onDailyGoalChange(tempGoal);
    setShowSlider(false);
  };

  const handleCancelGoal = () => {
    setTempGoal(dailyGoal);
    setShowSlider(false);
  };

  const handleToggleAll = (checked: boolean) => {
    setNotifications({
      all: checked,
      friendMessages: checked,
      papiStatus: checked,
      dailyReminders: checked,
    });
  };

  const handleToggleIndividual = (key: keyof Omit<NotificationSettings, 'all'>, checked: boolean) => {
    // Simply toggle the individual setting without affecting others
    setNotifications({
      ...notifications,
      [key]: checked,
    });
  };

  return (
    <div className="w-full h-screen relative overflow-hidden bg-gradient-to-br from-[#FFF6E8] via-[#FFE8F0] to-[#F0E8FF]">
      {/* Header with Back Button */}
      <div className="absolute top-0 left-0 right-0 z-10 pt-6 px-5">
        <div className="flex items-center justify-between gap-3">
          {/* Back Button */}
          <button
            onClick={onBack}
            className="flex-shrink-0 w-12 h-12 bg-white/90 backdrop-blur-lg rounded-[20px] flex items-center justify-center hover:scale-105 active:scale-95 transition-all duration-200 shadow-[0_4px_16px_rgba(0,0,0,0.08)]"
          >
            <BackIcon size={20} className="text-[#333]" />
          </button>

          {/* Title */}
          <div className="flex-1 text-center">
            <h1 className="font-['Nunito'] text-[#333] font-bold text-xl">
              Settings
            </h1>
          </div>

          {/* Spacer for alignment */}
          <div className="w-12" />
        </div>
      </div>

      {/* Content Area */}
      <div className="absolute top-24 left-0 right-0 bottom-0 overflow-y-auto px-5 pb-6">
        <div className="max-w-[500px] mx-auto space-y-4">
          
          {/* Daily Goal Section */}
          <div className="bg-white/90 backdrop-blur-xl rounded-[20px] p-5 shadow-[0_4px_20px_rgba(0,0,0,0.08)] border border-white/40">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-gradient-to-br from-[#FFB7C5] to-[#FFD66C] rounded-full flex items-center justify-center">
                <span className="text-white">🎯</span>
              </div>
              <div className="flex-1">
                <h3 className="font-['Nunito'] font-semibold text-[#333]">
                  Daily Goal
                </h3>
                <p className="font-['Nunito'] text-xs text-[#666] opacity-80">
                  Set your daily step target
                </p>
              </div>
              <div className="font-['Nunito'] font-bold text-[#FFB7C5]">
                {dailyGoal.toLocaleString()}
              </div>
            </div>
            
            {/* Info message */}
            <div className="bg-[#FFB7C5]/10 rounded-[12px] p-2 mb-3">
              <p className="font-['Nunito'] text-[10px] text-[#666] leading-relaxed">
                ✨ When you reach Adult stage (30,000 steps), Papi will start showing your daily progress! Reach your goal to see Evolved Papi! 🌟
              </p>
            </div>

            {!showSlider ? (
              <KawaiiButton
                variant="primary"
                onClick={() => setShowSlider(true)}
                className="w-full"
              >
                Change Daily Goal
              </KawaiiButton>
            ) : (
              <div className="space-y-4 pt-2">
                {/* Slider */}
                <div className="space-y-3">
                  <div className="text-center">
                    <div className="font-['Nunito'] font-bold text-2xl text-[#333] mb-1">
                      {tempGoal.toLocaleString()}
                    </div>
                    <div className="font-['Nunito'] text-xs text-[#666]">
                      steps per day
                    </div>
                  </div>
                  
                  <div className="px-2">
                    <Slider
                      value={[tempGoal]}
                      onValueChange={(values) => setTempGoal(values[0])}
                      min={3000}
                      max={30000}
                      step={1000}
                      className="w-full [&_[data-slot=slider-track]]:h-3 [&_[data-slot=slider-track]]:bg-white/60 [&_[data-slot=slider-range]]:bg-gradient-to-r [&_[data-slot=slider-range]]:from-[#FFB7C5] [&_[data-slot=slider-range]]:to-[#FFD66C] [&_[data-slot=slider-thumb]]:w-6 [&_[data-slot=slider-thumb]]:h-6 [&_[data-slot=slider-thumb]]:border-2 [&_[data-slot=slider-thumb]]:border-white [&_[data-slot=slider-thumb]]:bg-gradient-to-br [&_[data-slot=slider-thumb]]:from-[#FFB7C5] [&_[data-slot=slider-thumb]]:to-[#FFD66C] [&_[data-slot=slider-thumb]]:shadow-lg"
                    />
                  </div>
                  
                  <div className="flex justify-between font-['Nunito'] text-xs text-[#666]">
                    <span>3,000</span>
                    <span>30,000</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-2 gap-3">
                  <KawaiiButton
                    variant="secondary"
                    onClick={handleCancelGoal}
                  >
                    Cancel
                  </KawaiiButton>
                  <KawaiiButton
                    variant="primary"
                    onClick={handleSaveGoal}
                  >
                    Save
                  </KawaiiButton>
                </div>
              </div>
            )}
          </div>

          {/* Notifications Section */}
          <div className="bg-white/90 backdrop-blur-xl rounded-[20px] p-5 shadow-[0_4px_20px_rgba(0,0,0,0.08)] border border-white/40">
            {/* Header */}
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="w-full flex items-center gap-3 mb-2"
            >
              <div className="w-10 h-10 bg-gradient-to-br from-[#C8B8FF] to-[#B8E3FF] rounded-full flex items-center justify-center">
                <span className="text-white">🔔</span>
              </div>
              <div className="flex-1 text-left">
                <h3 className="font-['Nunito'] font-semibold text-[#333]">
                  Notifications
                </h3>
                <p className="font-['Nunito'] text-xs text-[#666] opacity-80">
                  Manage notification preferences
                </p>
              </div>
              <div className="text-[#C8B8FF]">
                {showNotifications ? <ChevronUpIcon size={20} /> : <ChevronDownIcon size={20} />}
              </div>
            </button>

            {/* Notification Settings */}
            {showNotifications && (
              <div className="space-y-4 mt-4 pt-4 border-t border-[#C8B8FF]/20">
                {/* All Notifications */}
                <div className="flex items-center justify-between gap-4">
                  <div className="flex-1">
                    <h4 className="font-['Nunito'] font-semibold text-[#333]">
                      All Notifications
                    </h4>
                    <p className="font-['Nunito'] text-xs text-[#666] opacity-80">
                      Enable or disable all notifications
                    </p>
                  </div>
                  <Switch
                    checked={notifications.all}
                    onCheckedChange={handleToggleAll}
                    className="data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-[#C8B8FF] data-[state=checked]:to-[#B8E3FF] data-[state=unchecked]:bg-gray-300"
                  />
                </div>

                <div className="h-px bg-[#C8B8FF]/10" />

                {/* Friend Messages */}
                <div className="flex items-center justify-between gap-4">
                  <div className="flex-1">
                    <h4 className="font-['Nunito'] font-semibold text-[#333]">
                      Friend Messages
                    </h4>
                    <p className="font-['Nunito'] text-xs text-[#666] opacity-80">
                      Get notified about friend messages
                    </p>
                  </div>
                  <Switch
                    checked={notifications.friendMessages}
                    onCheckedChange={(checked) => handleToggleIndividual('friendMessages', checked)}
                    className="data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-[#FFB7C5] data-[state=checked]:to-[#F9B4C9] data-[state=unchecked]:bg-gray-300"
                  />
                </div>

                {/* Papi Status */}
                <div className="flex items-center justify-between gap-4">
                  <div className="flex-1">
                    <h4 className="font-['Nunito'] font-semibold text-[#333]">
                      Papi Status
                    </h4>
                    <p className="font-['Nunito'] text-xs text-[#666] opacity-80">
                      Get notified about Papi's needs
                    </p>
                  </div>
                  <Switch
                    checked={notifications.papiStatus}
                    onCheckedChange={(checked) => handleToggleIndividual('papiStatus', checked)}
                    className="data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-[#C8B8FF] data-[state=checked]:to-[#BDB2FF] data-[state=unchecked]:bg-gray-300"
                  />
                </div>

                {/* Daily Reminders */}
                <div className="flex items-center justify-between gap-4">
                  <div className="flex-1">
                    <h4 className="font-['Nunito'] font-semibold text-[#333]">
                      Daily Reminders
                    </h4>
                    <p className="font-['Nunito'] text-xs text-[#666] opacity-80">
                      Remind me to open the app daily
                    </p>
                  </div>
                  <Switch
                    checked={notifications.dailyReminders}
                    onCheckedChange={(checked) => handleToggleIndividual('dailyReminders', checked)}
                    className="data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-[#FFD66C] data-[state=checked]:to-[#FFF2B2] data-[state=unchecked]:bg-gray-300"
                  />
                </div>

                {/* Info message */}
                <div className="bg-[#C8B8FF]/10 rounded-[12px] p-3 mt-4">
                  <p className="font-['Nunito'] text-xs text-[#666] leading-relaxed">
                    💡 <span className="font-semibold">Note:</span> Notification permissions are managed through your device settings. Make sure to enable notifications for Papi Steps in your iOS Settings.
                  </p>
                </div>
              </div>
            )}
          </div>


        </div>
      </div>
    </div>
  );
}
