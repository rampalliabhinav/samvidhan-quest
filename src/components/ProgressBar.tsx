import { cn } from '@/lib/utils';

interface ProgressBarProps {
  value: number;
  max: number;
  className?: string;
  showLabel?: boolean;
  color?: 'primary' | 'success' | 'amber';
}

const colorVariants = {
  primary: 'bg-gradient-to-r from-primary to-game-orange',
  success: 'bg-gradient-to-r from-success to-game-emerald',
  amber: 'bg-gradient-to-r from-game-amber to-game-orange',
};

export function ProgressBar({ value, max, className, showLabel = false, color = 'primary' }: ProgressBarProps) {
  const percentage = Math.min((value / max) * 100, 100);
  
  return (
    <div className={cn('space-y-1', className)}>
      {showLabel && (
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">{value} / {max}</span>
          <span className="font-semibold text-foreground">{Math.round(percentage)}%</span>
        </div>
      )}
      <div className="h-3 bg-muted rounded-full overflow-hidden">
        <div
          className={cn(
            'h-full rounded-full transition-all duration-500 ease-out',
            colorVariants[color]
          )}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
