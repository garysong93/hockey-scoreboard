import { useEffect, useRef, useCallback } from 'react';
import { useGameStore } from '../stores/gameStore';

export function useTimer() {
  const intervalRef = useRef<number | null>(null);
  const { isRunning, timeRemaining, setTime, stopTimer, tickPenalties } = useGameStore();

  const tick = useCallback(() => {
    const currentTime = useGameStore.getState().timeRemaining;

    if (currentTime <= 0) {
      stopTimer();
      return;
    }

    setTime(currentTime - 1);
    tickPenalties();
  }, [setTime, stopTimer, tickPenalties]);

  useEffect(() => {
    if (isRunning && timeRemaining > 0) {
      intervalRef.current = window.setInterval(tick, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, timeRemaining, tick]);

  return { isRunning, timeRemaining };
}

export function formatTime(seconds: number, showTenths = false): string {
  if (seconds < 0) seconds = 0;

  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;

  if (showTenths && seconds < 60) {
    // For under 1 minute, show SS.T format
    return `${secs.toString().padStart(2, '0')}.0`;
  }

  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

export function formatPenaltyTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}
