import { Flame } from 'lucide-react';
import { useEffect, useState } from 'react';

let streakState = 0;

export function incrementStreak() {
  streakState += 1;
  localStorage.setItem('streak', streakState.toString());
}

export default function StreakCounter() {
  const [streak, setStreak] = useState(() => {
    const saved = localStorage.getItem('streak');
    return saved ? parseInt(saved, 10) : 0;
  });

  useEffect(() => {
    localStorage.setItem('streak', streak.toString());
  }, [streak]);

  return (
    <div className="flex items-center gap-1 text-orange-500">
      <Flame size={16} />
      <span className="text-sm font-medium">{streak} day streak</span>
    </div>
  );
} 