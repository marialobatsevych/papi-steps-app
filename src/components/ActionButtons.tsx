import React from 'react';
import { KawaiiButton } from './KawaiiButton';

interface ActionButtonsProps {
  onFeed: () => void;
  onPlay: () => void;
  onSleep: () => void;
  isDisabled?: boolean;
}

export function ActionButtons({ onFeed, onPlay, onSleep, isDisabled = false }: ActionButtonsProps) {
  return (
    <div className="flex items-center justify-center gap-4 px-6">
      {/* Feed Button */}
      <KawaiiButton
        variant="primary"
        size="lg"
        icon={<span>🍖</span>}
        onClick={onFeed}
        disabled={isDisabled}
        className="flex-1 max-w-[100px] shadow-lg"
      >
        Feed
      </KawaiiButton>
      
      {/* Play Button */}
      <KawaiiButton
        variant="secondary"
        size="lg"
        icon={<span>🎾</span>}
        onClick={onPlay}
        disabled={isDisabled}
        className="flex-1 max-w-[100px] shadow-lg"
      >
        Play
      </KawaiiButton>
      
      {/* Sleep Button */}
      <KawaiiButton
        variant="lavender"
        size="lg"
        icon={<span>🌙</span>}
        onClick={onSleep}
        disabled={isDisabled}
        className="flex-1 max-w-[100px] shadow-lg"
      >
        Sleep
      </KawaiiButton>
    </div>
  );
}