import { useState, useMemo, useEffect } from 'react';
import { Layout } from '@/components/Layout';
import { useGameProgress } from '@/hooks/useGameProgress';
import swipeData from '@/data/swipeStatements.json';
import { ArrowLeft, Flame, Timer, CheckCircle, XCircle, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

export default function SwipePage() {
  const { completeSwipe, progress, checkAndAwardBadges } = useGameProgress();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [lastAnswer, setLastAnswer] = useState<boolean | null>(null);
  const [streak, setStreak] = useState(0);
  const [timeLeft, setTimeLeft] = useState(15);
  const [isTimerActive, setIsTimerActive] = useState(true);

  const shuffledStatements = useMemo(() => {
    return [...swipeData].sort(() => Math.random() - 0.5);
  }, []);

  const currentStatement = shuffledStatements[currentIndex % shuffledStatements.length];
  const isCorrect = lastAnswer === currentStatement.isConstitutional;

  useEffect(() => {
    if (!isTimerActive || showResult) return;
    
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          handleAnswer(null);
          return 15;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isTimerActive, showResult, currentIndex]);

  const handleAnswer = (answer: boolean | null) => {
    if (showResult) return;
    
    setLastAnswer(answer);
    setShowResult(true);
    setIsTimerActive(false);

    const correct = answer === currentStatement.isConstitutional;
    completeSwipe(correct);
    checkAndAwardBadges();
    
    if (correct) {
      setStreak((prev) => prev + 1);
    } else {
      setStreak(0);
    }
  };

  const handleContinue = () => {
    setShowResult(false);
    setLastAnswer(null);
    setTimeLeft(15);
    setIsTimerActive(true);
    setCurrentIndex((prev) => prev + 1);
  };

  return (
    <Layout>
      <div className="p-4 md:p-8 max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Link
            to="/"
            className="p-2 rounded-xl bg-muted hover:bg-muted/80 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div className="flex-1">
            <h1 className="font-display font-bold text-xl text-foreground">Swipe Challenge</h1>
            <p className="text-sm text-muted-foreground">Is it Constitutional or not?</p>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="flex items-center justify-between mb-6 p-4 game-card">
          <div className="flex items-center gap-2">
            <Flame className={cn(
              'w-5 h-5',
              streak > 0 ? 'text-game-orange' : 'text-muted-foreground'
            )} />
            <span className="font-bold text-foreground">{streak}</span>
            <span className="text-sm text-muted-foreground">streak</span>
          </div>
          
          <div className={cn(
            'flex items-center gap-2 px-3 py-1.5 rounded-full',
            timeLeft <= 5 ? 'bg-destructive/10' : 'bg-muted'
          )}>
            <Timer className={cn(
              'w-4 h-4',
              timeLeft <= 5 ? 'text-destructive' : 'text-muted-foreground'
            )} />
            <span className={cn(
              'font-mono font-bold',
              timeLeft <= 5 ? 'text-destructive' : 'text-foreground'
            )}>
              {timeLeft}s
            </span>
          </div>
          
          <div className="text-sm text-muted-foreground">
            #{currentIndex + 1}
          </div>
        </div>

        {/* Statement Card */}
        <div className={cn(
          'game-card p-6 mb-6 text-center transition-all',
          showResult && (isCorrect ? 'ring-2 ring-success' : 'ring-2 ring-destructive')
        )}>
          <p className="text-lg md:text-xl font-medium text-foreground leading-relaxed mb-6">
            "{currentStatement.statement}"
          </p>

          {!showResult && (
            <div className="flex gap-4 justify-center">
              <button
                onClick={() => handleAnswer(false)}
                className="flex-1 max-w-40 py-4 px-6 rounded-2xl bg-destructive/10 hover:bg-destructive/20 border-2 border-destructive/20 hover:border-destructive transition-all active:scale-95"
              >
                <XCircle className="w-8 h-8 text-destructive mx-auto mb-2" />
                <span className="font-semibold text-destructive">Unconstitutional</span>
              </button>
              
              <button
                onClick={() => handleAnswer(true)}
                className="flex-1 max-w-40 py-4 px-6 rounded-2xl bg-success/10 hover:bg-success/20 border-2 border-success/20 hover:border-success transition-all active:scale-95"
              >
                <CheckCircle className="w-8 h-8 text-success mx-auto mb-2" />
                <span className="font-semibold text-success">Constitutional</span>
              </button>
            </div>
          )}
        </div>

        {/* Result */}
        {showResult && (
          <div className={cn(
            'rounded-2xl p-6 animate-scale-in',
            isCorrect ? 'bg-success/10 border-2 border-success' : 'bg-destructive/10 border-2 border-destructive'
          )}>
            <div className="flex items-center gap-3 mb-4">
              {isCorrect ? (
                <CheckCircle className="w-8 h-8 text-success" />
              ) : (
                <XCircle className="w-8 h-8 text-destructive" />
              )}
              <div>
                <h3 className={cn(
                  'font-display font-bold text-lg',
                  isCorrect ? 'text-success' : 'text-destructive'
                )}>
                  {isCorrect ? 'Correct!' : 'Wrong!'}
                </h3>
                <p className="text-sm font-semibold text-foreground">
                  This is {currentStatement.isConstitutional ? 'Constitutional' : 'Unconstitutional'}
                </p>
              </div>
            </div>

            <div className="bg-card rounded-xl p-4 mb-4">
              <div className="flex items-center gap-2 text-muted-foreground mb-2">
                <BookOpen className="w-4 h-4" />
                <span className="text-xs font-medium">{currentStatement.article}</span>
              </div>
              <p className="text-sm text-foreground">{currentStatement.explanation}</p>
            </div>

            <button
              onClick={handleContinue}
              className={cn(
                'w-full py-3 rounded-xl font-semibold transition-all active:scale-95',
                isCorrect
                  ? 'gradient-success text-success-foreground'
                  : 'gradient-primary text-primary-foreground'
              )}
            >
              Next Statement
            </button>
          </div>
        )}
      </div>
    </Layout>
  );
}
