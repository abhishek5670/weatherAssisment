import React, { useState, useEffect, useCallback } from 'react';
import { RefreshCw } from 'lucide-react';

const PullToRefresh = ({ onRefresh, children }) => {
  const [startY, setStartY] = useState(0);
  const [pulling, setPulling] = useState(false);
  const [pullDistance, setPullDistance] = useState(0);
  const threshold = 150; // The distance required to trigger a refresh

  const handleTouchStart = useCallback((e) => {
    const touch = e.touches[0];
    setStartY(touch.clientY);
    setPulling(true);
  }, []);

  const handleTouchMove = useCallback((e) => {
    if (!pulling) return;
    const touch = e.touches[0];
    const pullLength = touch.clientY - startY;
    if (pullLength > 0 && window.scrollY === 0) {
      setPullDistance(Math.min(pullLength, threshold));
      e.preventDefault();
    }
  }, [pulling, startY]);

  const handleTouchEnd = useCallback(() => {
    if (pullDistance >= threshold) {
      onRefresh();
    }
    setPulling(false);
    setPullDistance(0);
  }, [pullDistance, onRefresh]);

  useEffect(() => {
    document.addEventListener('touchstart', handleTouchStart);
    document.addEventListener('touchmove', handleTouchMove, { passive: false });
    document.addEventListener('touchend', handleTouchEnd);

    return () => {
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [handleTouchStart, handleTouchMove, handleTouchEnd]);

  return (
    <div className="relative">
      <div
        className="fixed left-0 right-0 top-0 flex items-center justify-center transition-transform duration-300 ease-out z-50"
        style={{
          transform: `translateY(${pullDistance}px)`,
          opacity: pullDistance / threshold,
        }}
      >
        <RefreshCw
          className={`w-8 h-8 text-blue-500 ${pullDistance >= threshold ? 'animate-spin' : ''}`}
        />
      </div>
      {children}
    </div>
  );
};

export default PullToRefresh;