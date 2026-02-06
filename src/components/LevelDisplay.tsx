import { cn } from '@/lib/utils';
import { User, Eye, Shield, Crown } from 'lucide-react';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  User, Eye, Shield, Crown,
};

interface LevelDisplayProps {
  level: {
    id: number;
    name: string;
    icon: string;
  };
  progress: {
    current: number;
    target: number;
    percentage: number;
  };
  totalPoints: number;
  className?: string;
}

export function LevelDisplay({ level, progress, totalPoints, className }: LevelDisplayProps) {
  const IconComponent = iconMap[level.icon] || User;
  
  return (
    <div className={cn(
      'game-card p-6 relative overflow-hidden',
      className
    )}>
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-32 h-32 gradient-primary opacity-10 rounded-full -translate-y-1/2 translate-x-1/2" />
      
      <div className="flex items-center gap-4 mb-4">
        <div className="w-16 h-16 rounded-2xl gradient-primary flex items-center justify-center shadow-glow animate-pulse-glow">
          <IconComponent className="w-8 h-8 text-primary-foreground" />
        </div>
        <div>
          <p className="text-sm text-muted-foreground font-medium">Current Level</p>
          <h2 className="font-display font-bold text-xl text-foreground">{level.name}</h2>
          <p className="text-sm text-primary font-semibold">{totalPoints} points</p>
        </div>
      </div>
      
      {level.id < 4 && (
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Next level progress</span>
            <span className="font-semibold text-foreground">{Math.round(progress.percentage)}%</span>
          </div>
          <div className="h-3 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full gradient-primary rounded-full transition-all duration-500"
              style={{ width: `${progress.percentage}%` }}
            />
          </div>
          <p className="text-xs text-muted-foreground">
            {progress.current} / {progress.target} points to next level
          </p>
        </div>
      )}
      
      {level.id === 4 && (
        <div className="text-center py-2">
          <p className="text-sm text-success font-semibold">🎉 Maximum level reached!</p>
        </div>
      )}
    </div>
  );
}
