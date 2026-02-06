import { Trophy, Target, RotateCcw, Home, Flame } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface ScenarioResultsProps {
  correctAnswers: number;
  totalQuestions: number;
  pointsEarned: number;
  bestStreak: number;
  onReplay: () => void;
}

export function ScenarioResults({
  correctAnswers,
  totalQuestions,
  pointsEarned,
  bestStreak,
  onReplay,
}: ScenarioResultsProps) {
  const percentage = Math.round((correctAnswers / totalQuestions) * 100);
  
  const getGrade = () => {
    if (percentage >= 90) return { label: 'Excellent!', color: 'text-game-emerald', emoji: '🏆' };
    if (percentage >= 70) return { label: 'Great Job!', color: 'text-primary', emoji: '⭐' };
    if (percentage >= 50) return { label: 'Good Effort!', color: 'text-game-orange', emoji: '👍' };
    return { label: 'Keep Learning!', color: 'text-muted-foreground', emoji: '📚' };
  };

  const grade = getGrade();

  return (
    <div className="animate-scale-in">
      {/* Trophy Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full gradient-primary mb-4 animate-float">
          <Trophy className="w-10 h-10 text-primary-foreground" />
        </div>
        <h2 className="font-display text-3xl font-bold text-foreground mb-2">
          Challenge Complete!
        </h2>
        <p className={cn('text-xl font-semibold', grade.color)}>
          {grade.emoji} {grade.label}
        </p>
      </div>

      {/* Score Circle */}
      <div className="game-card p-6 mb-6">
        <div className="flex justify-center mb-6">
          <div className="relative w-32 h-32">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="40"
                stroke="currentColor"
                strokeWidth="8"
                fill="none"
                className="text-muted"
              />
              <circle
                cx="50"
                cy="50"
                r="40"
                stroke="currentColor"
                strokeWidth="8"
                fill="none"
                strokeDasharray={`${percentage * 2.51} 251`}
                strokeLinecap="round"
                className="text-primary transition-all duration-1000"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-3xl font-bold text-foreground">{percentage}%</span>
              <span className="text-xs text-muted-foreground">Score</span>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="p-3 rounded-xl bg-muted/50">
            <div className="flex items-center justify-center gap-1 mb-1">
              <Target className="w-4 h-4 text-primary" />
              <span className="text-xl font-bold text-foreground">{correctAnswers}/{totalQuestions}</span>
            </div>
            <p className="text-xs text-muted-foreground">Correct</p>
          </div>
          
          <div className="p-3 rounded-xl bg-muted/50">
            <div className="flex items-center justify-center gap-1 mb-1">
              <Trophy className="w-4 h-4 text-game-orange" />
              <span className="text-xl font-bold text-foreground">+{pointsEarned}</span>
            </div>
            <p className="text-xs text-muted-foreground">Points</p>
          </div>
          
          <div className="p-3 rounded-xl bg-muted/50">
            <div className="flex items-center justify-center gap-1 mb-1">
              <Flame className="w-4 h-4 text-destructive" />
              <span className="text-xl font-bold text-foreground">{bestStreak}</span>
            </div>
            <p className="text-xs text-muted-foreground">Best Streak</p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-3">
        <button
          onClick={onReplay}
          className="w-full py-4 rounded-2xl gradient-primary text-primary-foreground font-semibold text-lg flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
        >
          <RotateCcw className="w-5 h-5" />
          Play Again
        </button>
        
        <Link
          to="/"
          className="w-full py-4 rounded-2xl bg-muted text-foreground font-semibold text-lg flex items-center justify-center gap-2 hover:bg-muted/80 transition-colors"
        >
          <Home className="w-5 h-5" />
          Back to Home
        </Link>
      </div>
    </div>
  );
}
