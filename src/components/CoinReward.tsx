import { Coins } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CoinRewardProps {
  points: number;
  show: boolean;
}

export function CoinReward({ points, show }: CoinRewardProps) {
  if (!show) return null;

  return (
    <div className="fixed inset-0 pointer-events-none flex items-center justify-center z-50">
      <div className={cn(
        "flex items-center gap-2 px-6 py-3 rounded-full",
        "bg-primary text-primary-foreground font-bold text-xl shadow-lg",
        "animate-bounce-in"
      )}>
        <Coins className="w-6 h-6" />
        <span>+{points}</span>
      </div>
    </div>
  );
}
