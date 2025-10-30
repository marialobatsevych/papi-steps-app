import React from 'react';

interface KawaiiIconProps {
  size?: number;
  className?: string;
}

export function PawIcon({ size = 24, className = '' }: KawaiiIconProps) {
  return (
    <div className={`inline-flex ${className}`} style={{ width: size, height: size }}>
      <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor">
        <path d="M12 2C11.4 2 11 2.4 11 3V4.5C10.5 4.2 10 4 9.5 4C8.7 4 8 4.7 8 5.5S8.7 7 9.5 7C10 7 10.5 6.8 11 6.5V8C11 8.6 11.4 9 12 9S13 8.6 13 8V6.5C13.5 6.8 14 7 14.5 7C15.3 7 16 6.3 16 5.5S15.3 4 14.5 4C14 4 13.5 4.2 13 4.5V3C13 2.4 12.6 2 12 2Z"/>
        <path d="M6 9C5.4 9 5 9.4 5 10V11.5C4.5 11.2 4 11 3.5 11C2.7 11 2 11.7 2 12.5S2.7 14 3.5 14C4 14 4.5 13.8 5 13.5V15C5 15.6 5.4 16 6 16S7 15.6 7 15V13.5C7.5 13.8 8 14 8.5 14C9.3 14 10 13.3 10 12.5S9.3 11 8.5 11C8 11 7.5 11.2 7 11.5V10C7 9.4 6.6 9 6 9Z"/>
        <path d="M18 9C17.4 9 17 9.4 17 10V11.5C16.5 11.2 16 11 15.5 11C14.7 11 14 11.7 14 12.5S14.7 14 15.5 14C16 14 16.5 13.8 17 13.5V15C17 15.6 17.4 16 18 16S19 15.6 19 15V13.5C19.5 13.8 20 14 20.5 14C21.3 14 22 13.3 22 12.5S21.3 11 20.5 11C20 11 19.5 11.2 19 11.5V10C19 9.4 18.6 9 18 9Z"/>
        <ellipse cx="12" cy="17" rx="6" ry="4" />
      </svg>
    </div>
  );
}

export function HeartIcon({ size = 24, className = '' }: KawaiiIconProps) {
  return (
    <div className={`inline-flex ${className}`} style={{ width: size, height: size }}>
      <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor">
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
      </svg>
    </div>
  );
}

export function StarIcon({ size = 24, className = '' }: KawaiiIconProps) {
  return (
    <div className={`inline-flex ${className}`} style={{ width: size, height: size }}>
      <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
      </svg>
    </div>
  );
}

export function ShopIcon({ size = 24, className = '' }: KawaiiIconProps) {
  return (
    <div className={`inline-flex ${className}`} style={{ width: size, height: size }}>
      <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor">
        <path d="M7 4V2C7 1.45 7.45 1 8 1H16C16.55 1 17 1.45 17 2V4H20C20.55 4 21 4.45 21 5S20.55 6 20 6H19V19C19 20.1 18.1 21 17 21H7C5.9 21 5 20.1 5 19V6H4C3.45 6 3 5.55 3 5S3.45 4 4 4H7ZM9 3V4H15V3H9ZM7 6V19H17V6H7Z"/>
        <circle cx="10" cy="12" r="2"/>
        <circle cx="14" cy="12" r="2"/>
      </svg>
    </div>
  );
}

export function FriendsIcon({ size = 24, className = '' }: KawaiiIconProps) {
  return (
    <div className={`inline-flex text-black ${className}`} style={{ width: size, height: size }}>
      <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor">
        <path d="M16 4c1.11 0 2 .89 2 2 0 1.11-.89 2-2 2s-2-.89-2-2c0-1.11.89-2 2-2zm4 18v-6c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v6h8zM12.5 11.5c.83 0 1.5-.67 1.5-1.5s-.67-1.5-1.5-1.5S11 9.17 11 10s.67 1.5 1.5 1.5zm3 6.5v-4.5c0-.83-.67-1.5-1.5-1.5h-3c-.83 0-1.5.67-1.5 1.5V18h6zM8 4c1.11 0 2 .89 2 2 0 1.11-.89 2-2 2s-2-.89-2-2c0-1.11.89-2 2-2zm2 14v-6c0-1.11-.89-2-2-2H4c-1.11 0-2 .89-2 2v6h8z"/>
      </svg>
    </div>
  );
}

export function MessageIcon({ size = 24, className = '' }: KawaiiIconProps) {
  return (
    <div className={`inline-flex ${className}`} style={{ width: size, height: size }}>
      <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor">
        <path d="M20 2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h4l4 4 4-4h4c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"/>
      </svg>
    </div>
  );
}

export function MenuIcon({ size = 24, className = '' }: KawaiiIconProps) {
  return (
    <div className={`inline-flex ${className}`} style={{ width: size, height: size }}>
      <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor">
        <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/>
      </svg>
    </div>
  );
}

export function BackIcon({ size = 24, className = '' }: KawaiiIconProps) {
  return (
    <div className={`inline-flex ${className}`} style={{ width: size, height: size }}>
      <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor">
        <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
      </svg>
    </div>
  );
}

export function GiftIcon({ size = 24, className = '' }: KawaiiIconProps) {
  return (
    <div className={`inline-flex ${className}`} style={{ width: size, height: size }}>
      <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor">
        <path d="M20 6h-2.18c.11-.31.18-.65.18-1a2.996 2.996 0 0 0-5.5-1.65l-.5.67-.5-.68C10.96 2.54 10.05 2 9 2 7.34 2 6 3.34 6 5c0 .35.07.69.18 1H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-5-2c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zM9 4c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1z"/>
      </svg>
    </div>
  );
}

export function SendIcon({ size = 24, className = '' }: KawaiiIconProps) {
  return (
    <div className={`inline-flex ${className}`} style={{ width: size, height: size }}>
      <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor">
        <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
      </svg>
    </div>
  );
}

export function SearchIcon({ size = 24, className = '' }: KawaiiIconProps) {
  return (
    <div className={`inline-flex ${className}`} style={{ width: size, height: size }}>
      <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor">
        <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
      </svg>
    </div>
  );
}

export function AddIcon({ size = 24, className = '' }: KawaiiIconProps) {
  return (
    <div className={`inline-flex ${className}`} style={{ width: size, height: size }}>
      <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor">
        <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
      </svg>
    </div>
  );
}

export function HomeIcon({ size = 24, className = '' }: KawaiiIconProps) {
  return (
    <div className={`inline-flex ${className}`} style={{ width: size, height: size }}>
      <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor">
        <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
      </svg>
    </div>
  );
}

export function NotificationIcon({ size = 24, className = '' }: KawaiiIconProps) {
  return (
    <div className={`inline-flex ${className}`} style={{ width: size, height: size }}>
      <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor">
        <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.89 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z"/>
      </svg>
    </div>
  );
}

export function ProfileIcon({ size = 24, className = '' }: KawaiiIconProps) {
  return (
    <div className={`inline-flex ${className}`} style={{ width: size, height: size }}>
      <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor">
        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
      </svg>
    </div>
  );
}

export function SettingsIcon({ size = 24, className = '' }: KawaiiIconProps) {
  return (
    <div className={`inline-flex ${className}`} style={{ width: size, height: size }}>
      <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor">
        <path d="M19.14,12.94c0.04-0.3,0.06-0.61,0.06-0.94c0-0.32-0.02-0.64-0.07-0.94l2.03-1.58c0.18-0.14,0.23-0.41,0.12-0.61 l-1.92-3.32c-0.12-0.22-0.37-0.29-0.59-0.22l-2.39,0.96c-0.5-0.38-1.03-0.7-1.62-0.94L14.4,2.81c-0.04-0.24-0.24-0.41-0.48-0.41 h-3.84c-0.24,0-0.43,0.17-0.47,0.41L9.25,5.35C8.66,5.59,8.12,5.92,7.63,6.29L5.24,5.33c-0.22-0.08-0.47,0-0.59,0.22L2.74,8.87 C2.62,9.08,2.66,9.34,2.86,9.48l2.03,1.58C4.84,11.36,4.82,11.69,4.82,12s0.02,0.64,0.07,0.94l-2.03,1.58 c-0.18,0.14-0.23,0.41-0.12,0.61l1.92,3.32c0.12,0.22,0.37,0.29,0.59,0.22l2.39-0.96c0.5,0.38,1.03,0.7,1.62,0.94l0.36,2.54 c0.05,0.24,0.24,0.41,0.48,0.41h3.84c0.24,0,0.44-0.17,0.47-0.41l0.36-2.54c0.59-0.24,1.13-0.56,1.62-0.94l2.39,0.96 c0.22,0.08,0.47,0,0.59-0.22l1.92-3.32c0.12-0.22,0.07-0.47-0.12-0.61L19.14,12.94z M12,15.6c-1.98,0-3.6-1.62-3.6-3.6 s1.62-3.6,3.6-3.6s3.6,1.62,3.6,3.6S13.98,15.6,12,15.6z"/>
      </svg>
    </div>
  );
}

export function HelpIcon({ size = 24, className = '' }: KawaiiIconProps) {
  return (
    <div className={`inline-flex ${className}`} style={{ width: size, height: size }}>
      <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z"/>
      </svg>
    </div>
  );
}

export function LogoutIcon({ size = 24, className = '' }: KawaiiIconProps) {
  return (
    <div className={`inline-flex ${className}`} style={{ width: size, height: size }}>
      <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor">
        <path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z"/>
      </svg>
    </div>
  );
}

export function EmailIcon({ size = 24, className = '' }: KawaiiIconProps) {
  return (
    <div className={`inline-flex ${className}`} style={{ width: size, height: size }}>
      <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor">
        <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
      </svg>
    </div>
  );
}

export function FacebookIcon({ size = 24, className = '' }: KawaiiIconProps) {
  return (
    <div className={`inline-flex ${className}`} style={{ width: size, height: size }}>
      <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
      </svg>
    </div>
  );
}

export function CheckIcon({ size = 24, className = '' }: KawaiiIconProps) {
  return (
    <div className={`inline-flex ${className}`} style={{ width: size, height: size }}>
      <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="20 6 9 17 4 12"/>
      </svg>
    </div>
  );
}

export function WaveIcon({ size = 24, className = '' }: KawaiiIconProps) {
  return (
    <div className={`inline-flex items-center justify-center ${className}`} style={{ width: size, height: size, fontSize: size }}>
      👋
    </div>
  );
}

export function ChevronDownIcon({ size = 24, className = '' }: KawaiiIconProps) {
  return (
    <div className={`inline-flex ${className}`} style={{ width: size, height: size }}>
      <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor">
        <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"/>
      </svg>
    </div>
  );
}

export function ChevronUpIcon({ size = 24, className = '' }: KawaiiIconProps) {
  return (
    <div className={`inline-flex ${className}`} style={{ width: size, height: size }}>
      <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor">
        <path d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z"/>
      </svg>
    </div>
  );
}