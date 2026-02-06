import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface GameCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  color: 'amber' | 'navy' | 'emerald' | 'purple' | 'blue' | 'orange';
  onClick?: () => void;
  className?: string;
  badge?: string;
}

const colorVariants = {
  amber: 'from-game-amber to-game-orange',
  navy: 'from-game-navy to-game-blue',
  emerald: 'from-game-emerald to-accent',
  purple: 'from-game-purple to-game-blue',
  blue: 'from-game-blue to-game-cyan',
  orange: 'from-game-orange to-game-amber',
};

const bgColorVariants = {
  amber: 'bg-game-amber/10',
  navy: 'bg-game-navy/10',
  emerald: 'bg-game-emerald/10',
  purple: 'bg-game-purple/10',
  blue: 'bg-game-blue/10',
  orange: 'bg-game-orange/10',
};

export function GameCard({ title, description, icon: Icon, color, onClick, className, badge }: GameCardProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'game-card text-left p-6 w-full group relative overflow-hidden',
        className
      )}
    >
      {/* Background gradient overlay */}
      <div className={cn(
        'absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300',
        bgColorVariants[color]
      )} />
      
      {/* Badge */}
      {badge && (
        <span className={cn(
          'absolute top-4 right-4 px-2 py-1 text-xs font-semibold rounded-full bg-gradient-to-r text-primary-foreground',
          colorVariants[color]
        )}>
          {badge}
        </span>
      )}
      
      {/* Icon */}
      <div className={cn(
        'w-12 h-12 rounded-xl bg-gradient-to-br flex items-center justify-center mb-4',
        colorVariants[color]
      )}>
        <Icon className="w-6 h-6 text-primary-foreground" />
      </div>
      
      {/* Content */}
      <h3 className="font-display font-bold text-lg text-foreground mb-2 relative z-10">
        {title}
      </h3>
      <p className="text-sm text-muted-foreground relative z-10">
        {description}
      </p>
      
      {/* Hover arrow */}
      <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all">
        <svg className="w-5 h-5 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </button>
  );
}
