import { Flame } from 'lucide-react';
import { useEffect, useState } from 'react';

export function incrementStreak() {
  // Read current streak, increment, and save
  const currentStreak = parseInt(localStorage.getItem('streak') || '0', 10);
  const newStreak = currentStreak + 1;
  localStorage.setItem('streak', newStreak.toString());
  
  // Dispatch a storage event to notify other parts of the app (including the component)
  window.dispatchEvent(new StorageEvent('storage', {
    key: 'streak',
    newValue: newStreak.toString(),
    oldValue: currentStreak.toString(),
  }));
}

export default function StreakCounter() {
  const [streak, setStreak] = useState(() => {
    const saved = localStorage.getItem('streak');
    return saved ? parseInt(saved, 10) : 0;
  });

  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === 'streak' && event.newValue !== null) {
        setStreak(parseInt(event.newValue, 10));
      }
    };

    // Listen for storage changes
    window.addEventListener('storage', handleStorageChange);

    // Clean up the event listener
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []); // Empty dependency array means this effect runs once on mount and cleans up on unmount

  return (
    <div className="flex items-center gap-1 text-orange-500">
      <Flame size={16} />
      <span className="text-sm font-medium">{streak} day streak</span>
    </div>
  );
} 