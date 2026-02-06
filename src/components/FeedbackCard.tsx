import { cn } from '@/lib/utils';
import { CheckCircle2, XCircle, BookOpen } from 'lucide-react';

interface FeedbackCardProps {
  isCorrect: boolean;
  article: string;
  explanation: string;
  onContinue: () => void;
}

export function FeedbackCard({ isCorrect, article, explanation, onContinue }: FeedbackCardProps) {
  return (
    <div className={cn(
      'rounded-2xl p-6 animate-scale-in',
      isCorrect ? 'bg-success/10 border-2 border-success' : 'bg-destructive/10 border-2 border-destructive'
    )}>
      <div className="flex items-start gap-4 mb-4">
        {isCorrect ? (
          <CheckCircle2 className="w-8 h-8 text-success flex-shrink-0" />
        ) : (
          <XCircle className="w-8 h-8 text-destructive flex-shrink-0" />
        )}
        <div>
          <h3 className={cn(
            'font-display font-bold text-lg mb-1',
            isCorrect ? 'text-success' : 'text-destructive'
          )}>
            {isCorrect ? 'Correct!' : 'Not quite right'}
          </h3>
          <p className="text-sm font-semibold text-foreground">{article}</p>
        </div>
      </div>
      
      <div className="bg-card rounded-xl p-4 mb-4">
        <div className="flex items-center gap-2 text-muted-foreground mb-2">
          <BookOpen className="w-4 h-4" />
          <span className="text-xs font-medium uppercase tracking-wide">Explanation</span>
        </div>
        <p className="text-sm text-foreground">{explanation}</p>
      </div>
      
      <button
        onClick={onContinue}
        className={cn(
          'w-full py-3 rounded-xl font-semibold transition-all active:scale-95',
          isCorrect
            ? 'gradient-success text-success-foreground'
            : 'gradient-primary text-primary-foreground'
        )}
      >
        Continue
      </button>
    </div>
  );
}
