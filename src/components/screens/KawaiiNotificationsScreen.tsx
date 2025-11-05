import React, { useState, useEffect } from 'react';
import { Bell as BellIcon, ArrowLeft as BackIcon, Check as CheckIcon, Trash2 as TrashIcon, CheckCheck as CheckAllIcon } from 'lucide-react';
import { KawaiiButton } from '../KawaiiButton';
import { 
  Notification, 
  getNotifications, 
  markAsRead, 
  markAllAsRead, 
  deleteNotification,
  clearAllNotifications,
  getUnreadCount
} from '../../utils/notificationSystem';

interface KawaiiNotificationsScreenProps {
  onBack: () => void;
  onNavigate?: (screen: string) => void;
}

export function KawaiiNotificationsScreen({ onBack, onNavigate }: KawaiiNotificationsScreenProps) {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [filter, setFilter] = useState<'all' | 'unread'>('all');
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    loadNotifications();
  }, [refreshKey, filter]);

  const loadNotifications = () => {
    const allNotifs = getNotifications();
    const filtered = filter === 'unread' 
      ? allNotifs.filter(n => !n.read)
      : allNotifs;
    setNotifications(filtered);
  };

  const handleMarkAsRead = (id: string) => {
    markAsRead(id);
    setRefreshKey(prev => prev + 1);
  };

  const handleMarkAllAsRead = () => {
    markAllAsRead();
    setRefreshKey(prev => prev + 1);
  };

  const handleDelete = (id: string) => {
    deleteNotification(id);
    setRefreshKey(prev => prev + 1);
  };

  const handleClearAll = () => {
    if (window.confirm('Are you sure you want to delete all notifications?')) {
      clearAllNotifications();
      setRefreshKey(prev => prev + 1);
    }
  };

  const handleNotificationAction = (notification: Notification) => {
    // Mark as read when clicked
    if (!notification.read) {
      handleMarkAsRead(notification.id);
    }

    // Navigate based on notification type
    if (onNavigate) {
      switch (notification.type) {
        case 'hunger_alert':
        case 'energy_alert':
        case 'fun_alert':
          onNavigate('home');
          break;
        case 'friend_request':
        case 'friend_activity':
          onNavigate('friends');
          break;
        case 'message':
          onNavigate('messages');
          break;
        case 'shop_update':
          onNavigate('shop');
          break;
        case 'daily_reward':
          onNavigate('dailyReward');
          break;
        default:
          break;
      }
    }
  };

  const formatTimestamp = (timestamp: number) => {
    const now = Date.now();
    const diff = now - timestamp;
    
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;
    return new Date(timestamp).toLocaleDateString();
  };

  const getNotificationColor = (type: string): string => {
    switch (type) {
      case 'hunger_alert':
        return 'from-[#FFB3C6] to-[#FF9FB7]';
      case 'energy_alert':
        return 'from-[#FFD166] to-[#FFB347]';
      case 'fun_alert':
        return 'from-[#C8B8FF] to-[#B8A8FF]';
      case 'daily_goal':
      case 'level_up':
        return 'from-[#B8E3FF] to-[#A8D3FF]';
      case 'friend_request':
      case 'friend_activity':
        return 'from-[#FFB3C6] to-[#FF9FB7]';
      case 'message':
        return 'from-[#C8B8FF] to-[#B8A8FF]';
      case 'evolution':
        return 'from-[#FFD166] to-[#FFB347]';
      case 'shop_update':
        return 'from-[#B8E3FF] to-[#A8D3FF]';
      case 'daily_reward':
        return 'from-[#FFD166] to-[#FFB347]';
      default:
        return 'from-[#F8F9FA] to-[#F1F3F4]';
    }
  };

  const unreadCount = getUnreadCount();

  return (
    <div className="w-full h-screen bg-gradient-to-br from-[#FFF6E8] via-[#D7C4F3] to-[#C3F0D9] overflow-hidden flex flex-col">
      {/* Decorative elements */}
      <div className="absolute top-20 right-16 w-4 h-4 text-[#FFB3C6] opacity-60">
        <BellIcon size={16} />
      </div>
      <div className="absolute top-32 left-20 w-3 h-3 text-[#FFD166] opacity-70 animate-pulse">
        ✨
      </div>
      <div className="absolute bottom-32 right-20 w-3 h-3 text-[#C8B8FF] opacity-50">
        🔔
      </div>

      {/* Header */}
      <div className="flex-shrink-0 pt-12 pb-6 px-6 bg-white/40 backdrop-blur-md border-b border-white/60">
        <div className="flex items-center justify-between mb-6">
          <KawaiiButton
            icon={<BackIcon size={18} />}
            onClick={onBack}
            className="w-12 h-12 !p-0"
          />
          <div className="flex-1 text-center">
            <h1 className="font-['Nunito'] text-2xl text-[#2C2C2E]">
              Notifications
            </h1>
            {unreadCount > 0 && (
              <p className="font-['Nunito'] text-sm text-[#8E8E93] mt-1">
                {unreadCount} unread
              </p>
            )}
          </div>
          <div className="w-12" /> {/* Spacer for centering */}
        </div>

        {/* Filter tabs */}
        <div className="flex gap-2">
          <button
            onClick={() => setFilter('all')}
            className={`flex-1 py-2 px-4 rounded-2xl font-['Nunito'] transition-all ${
              filter === 'all'
                ? 'bg-gradient-to-r from-[#FFB3C6] to-[#FF9FB7] text-white shadow-lg'
                : 'bg-white/60 text-[#8E8E93]'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilter('unread')}
            className={`flex-1 py-2 px-4 rounded-2xl font-['Nunito'] transition-all ${
              filter === 'unread'
                ? 'bg-gradient-to-r from-[#FFB3C6] to-[#FF9FB7] text-white shadow-lg'
                : 'bg-white/60 text-[#8E8E93]'
            }`}
          >
            Unread {unreadCount > 0 && `(${unreadCount})`}
          </button>
        </div>

        {/* Action buttons */}
        {notifications.length > 0 && (
          <div className="flex gap-2 mt-4">
            <button
              onClick={handleMarkAllAsRead}
              className="flex-1 py-2 px-3 rounded-xl bg-white/60 text-[#8E8E93] font-['Nunito'] text-sm hover:bg-white/80 transition-all flex items-center justify-center gap-2"
            >
              <CheckAllIcon size={16} />
              Mark all read
            </button>
            <button
              onClick={handleClearAll}
              className="flex-1 py-2 px-3 rounded-xl bg-white/60 text-[#FF6B6B] font-['Nunito'] text-sm hover:bg-white/80 transition-all flex items-center justify-center gap-2"
            >
              <TrashIcon size={16} />
              Clear all
            </button>
          </div>
        )}
      </div>

      {/* Notifications List */}
      <div className="flex-1 overflow-y-auto px-6 py-4">
        {notifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full">
            <div className="w-24 h-24 bg-gradient-to-br from-[#FFB3C6] to-[#FF9FB7] rounded-full flex items-center justify-center mb-4">
              <span className="text-5xl">🔔</span>
            </div>
            <h3 className="font-['Nunito'] text-xl text-[#2C2C2E] mb-2">
              No Notifications
            </h3>
            <p className="font-['Nunito'] text-sm text-[#8E8E93] text-center max-w-[250px]">
              {filter === 'unread' 
                ? "You're all caught up! No unread notifications."
                : "You don't have any notifications yet. They'll appear here when you do!"}
            </p>
          </div>
        ) : (
          <div className="space-y-3 pb-6">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                onClick={() => handleNotificationAction(notification)}
                className={`kawaii-card p-4 cursor-pointer hover:scale-[1.02] active:scale-[0.98] transition-all ${
                  !notification.read ? 'border-2 border-[#FFB3C6]' : ''
                }`}
              >
                <div className="flex items-start gap-3">
                  {/* Icon */}
                  <div className={`w-12 h-12 bg-gradient-to-br ${getNotificationColor(notification.type)} rounded-2xl flex items-center justify-center flex-shrink-0`}>
                    <span className="text-2xl">{notification.icon}</span>
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <h3 className="font-['Nunito'] text-[#2C2C2E] flex-1">
                        {notification.title}
                      </h3>
                      {!notification.read && (
                        <div className="w-2 h-2 bg-[#FFB3C6] rounded-full flex-shrink-0 mt-1" />
                      )}
                    </div>
                    <p className="font-['Nunito'] text-sm text-[#8E8E93] mb-2 line-clamp-2">
                      {notification.message}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="font-['Nunito'] text-xs text-[#8E8E93]">
                        {formatTimestamp(notification.timestamp)}
                      </span>
                      {notification.actionText && (
                        <span className="font-['Nunito'] text-xs text-[#FFB3C6]">
                          {notification.actionText} →
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col gap-2">
                    {!notification.read && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleMarkAsRead(notification.id);
                        }}
                        className="w-8 h-8 bg-gradient-to-br from-[#B8E3FF] to-[#A8D3FF] rounded-full flex items-center justify-center hover:scale-110 active:scale-95 transition-transform"
                        title="Mark as read"
                      >
                        <CheckIcon size={16} className="text-white" />
                      </button>
                    )}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(notification.id);
                      }}
                      className="w-8 h-8 bg-gradient-to-br from-[#FFB3C6] to-[#FF9FB7] rounded-full flex items-center justify-center hover:scale-110 active:scale-95 transition-transform"
                      title="Delete"
                    >
                      <TrashIcon size={14} className="text-white" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
