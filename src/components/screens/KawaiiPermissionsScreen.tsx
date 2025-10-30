import React, { useState, useEffect } from 'react';
import { ArrowLeft as BackIcon, Heart as HealthIcon, MapPin as LocationIcon, Bell as NotificationIcon, Check as CheckIcon, X as XIcon } from 'lucide-react';
import { KawaiiButton } from '../KawaiiButton';
import { toast } from 'sonner@2.0.3';
import { healthKitService } from '../../utils/healthKit';
import { geolocationService } from '../../utils/geolocation';

interface KawaiiPermissionsScreenProps {
  onBack: () => void;
}

interface Permission {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  gradient: string;
  required: boolean;
  purpose: string;
  status: 'granted' | 'denied' | 'not-requested';
}

export function KawaiiPermissionsScreen({ onBack }: KawaiiPermissionsScreenProps) {
  const [healthStatus, setHealthStatus] = useState<'granted' | 'denied' | 'not-requested'>('not-requested');
  const [locationStatus, setLocationStatus] = useState<'granted' | 'denied' | 'not-requested'>('not-requested');

  useEffect(() => {
    checkPermissions();
  }, []);

  const checkPermissions = async () => {
    // Check Health permission
    const hasHealthPermission = await healthKitService.checkPermission();
    setHealthStatus(hasHealthPermission ? 'granted' : 'not-requested');

    // Check Location permission
    const hasLocationPermission = await geolocationService.checkPermission();
    setLocationStatus(hasLocationPermission ? 'granted' : 'not-requested');
  };

  const permissions: Permission[] = [
    {
      id: 'health',
      name: 'Apple Health',
      description: 'Access your step count and activity data',
      icon: <HealthIcon size={24} />,
      gradient: 'from-[#FFB3C6] to-[#FF9FB7]',
      required: true,
      purpose: 'Essential for tracking your daily steps and syncing with Papi\'s evolution system. Without this, Papi can\'t grow with you!',
      status: healthStatus
    },
    {
      id: 'location',
      name: 'Location Services',
      description: 'Find friends walking nearby',
      icon: <LocationIcon size={24} />,
      gradient: 'from-[#B8E3FF] to-[#A8D3FF]',
      required: false,
      purpose: 'Used only to show nearby Papi Steps users in the "Nearest People" feature. You can make friends and walk together!',
      status: locationStatus
    },
    {
      id: 'notifications',
      name: 'Push Notifications',
      description: 'Get reminders and updates',
      icon: <NotificationIcon size={24} />,
      gradient: 'from-[#C8B8FF] to-[#B8A8FF]',
      required: false,
      purpose: 'Stay connected with Papi! Get alerts when Papi needs care, when friends achieve goals, and receive messages.',
      status: 'not-requested'
    }
  ];

  const handleRequestPermission = async (permissionId: string) => {
    const permission = permissions.find(p => p.id === permissionId);
    
    if (!permission) return;

    try {
      if (permissionId === 'health') {
        const result = await healthKitService.requestPermission();
        
        if (result.granted) {
          setHealthStatus('granted');
          toast.success('Apple Health Access Granted', {
            description: 'Your steps will now sync automatically!',
            duration: 3000
          });
        } else {
          setHealthStatus('denied');
          // Only show error if there's a meaningful message
          if (result.message && !result.message.includes('development')) {
            toast.error('Apple Health Access Denied', {
              description: result.message,
              duration: 5000
            });
          }
        }
      } else if (permissionId === 'location') {
        const result = await geolocationService.requestPermission();
        
        if (result.granted) {
          setLocationStatus('granted');
          // Get initial location
          await geolocationService.getCurrentLocation();
          toast.success('Location Access Granted', {
            description: 'You can now find nearby friends!',
            duration: 3000
          });
        } else {
          setLocationStatus('denied');
          // Only show error if there's a meaningful message
          if (result.message) {
            toast.error('Location Access Denied', {
              description: result.message,
              duration: 5000
            });
          }
        }
      } else if (permissionId === 'notifications') {
        // Placeholder for notifications
        toast.success('Notifications', {
          description: 'Push notifications will be requested on first launch',
          duration: 3000
        });
      }
    } catch (error) {
      console.error('Error requesting permission:', error);
      toast.error('Permission Error', {
        description: 'Failed to request permission. Please try again.',
        duration: 3000
      });
    }
  };

  const getStatusBadge = (status: string, required: boolean) => {
    switch (status) {
      case 'granted':
        return (
          <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-gradient-to-r from-[#98FB98] to-[#90EE90]">
            <CheckIcon size={14} className="text-white" />
            <span className="font-['Nunito'] text-xs text-white">Enabled</span>
          </div>
        );
      case 'denied':
        return (
          <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-gradient-to-r from-[#FFB3C6] to-[#FF9FB7]">
            <XIcon size={14} className="text-white" />
            <span className="font-['Nunito'] text-xs text-white">Denied</span>
          </div>
        );
      default:
        return (
          <div className="px-3 py-1 rounded-full bg-gray-200">
            <span className="font-['Nunito'] text-xs text-[#8E8E93]">
              {required ? 'Required' : 'Optional'}
            </span>
          </div>
        );
    }
  };

  return (
    <div className="w-full h-screen bg-gradient-to-br from-[#FFF6E8] via-[#D7C4F3] to-[#C3F0D9] overflow-hidden flex flex-col">
      {/* Decorative elements */}
      <div className="absolute top-20 right-16 w-4 h-4 text-[#FFB3C6] opacity-60 animate-pulse">
        🔐
      </div>
      <div className="absolute top-32 left-20 w-3 h-3 text-[#FFD166] opacity-70">
        ⚙️
      </div>
      <div className="absolute bottom-32 right-20 w-3 h-3 text-[#C8B8FF] opacity-50">
        ✨
      </div>

      {/* Header */}
      <div className="flex-shrink-0 pt-12 pb-6 px-6 bg-white/40 backdrop-blur-md border-b border-white/60">
        <div className="flex items-center justify-between mb-2">
          <KawaiiButton
            icon={<BackIcon size={18} />}
            onClick={onBack}
            className="w-12 h-12 !p-0"
          />
          <h1 className="flex-1 text-center font-['Nunito'] text-2xl text-[#2C2C2E]">
            Permissions
          </h1>
          <div className="w-12" /> {/* Spacer */}
        </div>
        <p className="font-['Nunito'] text-sm text-center text-[#8E8E93] mt-2">
          Manage app permissions to unlock all features
        </p>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-6 py-6">
        {/* Info Banner */}
        <div className="kawaii-card p-4 mb-6 bg-gradient-to-r from-[#FFD166]/20 to-[#FFB347]/20 border-2 border-[#FFD166]/40">
          <div className="flex items-start gap-3">
            <span className="text-2xl">🔒</span>
            <div className="flex-1">
              <h3 className="font-['Nunito'] text-[#2C2C2E] mb-1">
                Your Privacy Matters
              </h3>
              <p className="font-['Nunito'] text-sm text-[#8E8E93]">
                We only request permissions needed for Papi Steps to work. Your data stays private and secure on your device.
              </p>
            </div>
          </div>
        </div>

        {/* Permissions List */}
        <div className="space-y-4 mb-6">
          {permissions.map((permission) => (
            <div
              key={permission.id}
              className="kawaii-card overflow-hidden"
            >
              {/* Permission Header */}
              <div className={`p-4 bg-gradient-to-r ${permission.gradient} text-white`}>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-white/30 rounded-2xl flex items-center justify-center">
                      {permission.icon}
                    </div>
                    <div>
                      <h3 className="font-['Nunito'] text-lg">
                        {permission.name}
                      </h3>
                      <p className="font-['Nunito'] text-sm opacity-90">
                        {permission.description}
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  {getStatusBadge(permission.status, permission.required)}
                  
                  {permission.status !== 'granted' && (
                    <button
                      onClick={() => handleRequestPermission(permission.id)}
                      className="px-4 py-2 bg-white/30 hover:bg-white/40 rounded-xl font-['Nunito'] text-sm backdrop-blur-sm transition-all"
                    >
                      {permission.status === 'denied' ? 'Open Settings' : 'Enable'}
                    </button>
                  )}
                </div>
              </div>

              {/* Permission Details */}
              <div className="p-4 bg-white/40">
                <p className="font-['Nunito'] text-sm text-[#8E8E93] leading-relaxed">
                  <span className="font-semibold text-[#2C2C2E]">Why we need this: </span>
                  {permission.purpose}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Info */}
        <div className="kawaii-card p-5 mb-6">
          <h3 className="font-['Nunito'] text-lg text-[#2C2C2E] mb-3">
            💡 Permission Tips
          </h3>
          <ul className="space-y-2">
            <li className="flex items-start gap-2">
              <span className="text-lg mt-0.5">📱</span>
              <p className="font-['Nunito'] text-sm text-[#8E8E93] flex-1">
                You can change permissions anytime in iPhone Settings → Papi Steps
              </p>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-lg mt-0.5">🔄</span>
              <p className="font-['Nunito'] text-sm text-[#8E8E93] flex-1">
                If you denied a permission, you'll need to enable it manually in Settings
              </p>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-lg mt-0.5">❤️</span>
              <p className="font-['Nunito'] text-sm text-[#8E8E93] flex-1">
                Apple Health is required for Papi Steps to track your progress
              </p>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-lg mt-0.5">🔐</span>
              <p className="font-['Nunito'] text-sm text-[#8E8E93] flex-1">
                We never share your personal data with third parties
              </p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
