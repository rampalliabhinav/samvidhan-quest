import { cn } from '@/lib/utils';
import { Award, Shield, Scale, Bird, Gavel, BookOpen, Flame, Crown, Zap, Lock } from 'lucide-react';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Shield, Scale, Bird, Gavel, BookOpen, Flame, Crown, Zap, Award,
};

interface BadgeDisplayProps {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  earned: boolean;
  className?: string;
}

const colorVariants: Record<string, string> = {
  amber: 'from-game-amber to-game-orange',
  blue: 'from-game-blue to-game-cyan',
  green: 'from-game-emerald to-accent',
  purple: 'from-game-purple to-game-blue',
  orange: 'from-game-orange to-game-amber',
  red: 'from-game-red to-game-orange',
  yellow: 'from-game-yellow to-game-amber',
  cyan: 'from-game-cyan to-game-blue',
};

export function BadgeDisplay({ name, description, icon, color, earned, className }: BadgeDisplayProps) {
  const IconComponent = iconMap[icon] || Award;
  
  return (
    <div className={cn(
      'relative p-4 rounded-2xl transition-all',
      earned ? 'bg-card shadow-card' : 'bg-muted/50',
      className
    )}>
      {/* Lock badge indicator in corner */}
      {!earned && (
        <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-muted-foreground/20 flex items-center justify-center">
          <Lock className="w-3 h-3 text-muted-foreground" />
        </div>
      )}
      
      <div className={cn(
        'w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-3',
        earned 
          ? `bg-gradient-to-br ${colorVariants[color] || colorVariants.amber}` 
          : 'bg-muted'
      )}>
        <IconComponent className={cn(
          'w-7 h-7',
          earned ? 'text-primary-foreground' : 'text-muted-foreground'
        )} />
      </div>
      
      <h4 className={cn(
        'font-display font-semibold text-sm text-center mb-1',
        earned ? 'text-foreground' : 'text-muted-foreground'
      )}>
        {name}
      </h4>
      
      <p className="text-xs text-muted-foreground text-center">
        {description}
      </p>
    </div>
  );
}
