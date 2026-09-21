'use client';

import * as React from 'react';

export function useCountDown(targetDateOrMinutes: number | Date) {
  const [timeLeft, setTimeLeft] = React.useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
    formatted: '00:00:00',
    isEnded: false,
  });

  React.useEffect(() => {
    const updateTime = () => {
      const target =
        typeof targetDateOrMinutes === 'number'
          ? targetDateOrMinutes
          : targetDateOrMinutes.getTime();

      const diff = Math.max(0, target - Date.now());
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeLeft({
        hours,
        minutes,
        seconds,
        formatted: `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`,
        isEnded: diff <= 0,
      });
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, [targetDateOrMinutes]);

  return timeLeft;
}
