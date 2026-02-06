import { useState, useMemo } from 'react';
import { Layout } from '@/components/Layout';
import { useGameProgress } from '@/hooks/useGameProgress';
import casesData from '@/data/cases.json';
import { ArrowLeft, Gavel, Scale, Star, BookOpen, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

export default function JudgePage() {
  const { completeCase, progress, checkAndAwardBadges } = useGameProgress();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showVerdict, setShowVerdict] = useState(false);
  const [userVerdict, setUserVerdict] = useState<string | null>(null);

  const shuffledCases = useMemo(() => {
    return [...casesData].sort(() => Math.random() - 0.5);
  }, []);

  const currentCase = shuffledCases[currentIndex % shuffledCases.length];
  const isCorrect = userVerdict === currentCase.verdict;

  const handleVerdict = (verdict: string) => {
    if (showVerdict) return;
    setUserVerdict(verdict);
    setShowVerdict(true);
    completeCase(verdict === currentCase.verdict, currentCase.points);
    checkAndAwardBadges();
  };

  const handleNextCase = () => {
    setShowVerdict(false);
    setUserVerdict(null);
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
            <h1 className="font-display font-bold text-xl text-foreground">Judge the Case</h1>
            <p className="text-sm text-muted-foreground">Deliver your verdict as a judge</p>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-game-navy/10">
            <Gavel className="w-4 h-4 text-game-navy" />
            <span className="text-sm font-semibold text-game-navy">{progress.judgePoints} pts</span>
          </div>
        </div>

        {/* Case Card */}
        <div className="game-card overflow-hidden mb-6 animate-scale-in">
          {/* Case Header */}
          <div className="gradient-secondary p-4 text-secondary-foreground">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Scale className="w-5 h-5" />
                <span className="font-semibold">Case #{currentIndex + 1}</span>
              </div>
              <div className="flex items-center gap-1 bg-white/20 px-2 py-1 rounded-full">
                <Star className="w-4 h-4" />
                <span className="text-sm font-semibold">{currentCase.points} pts</span>
              </div>
            </div>
            <h2 className="font-display font-bold text-lg mt-2">{currentCase.title}</h2>
          </div>

          {/* Case Description */}
          <div className="p-6">
            <div className="bg-muted/50 rounded-xl p-4 mb-6">
              <p className="text-foreground leading-relaxed">
                {currentCase.description}
              </p>
            </div>

            {/* Verdict Buttons */}
            {!showVerdict && (
              <div className="space-y-4">
                <h3 className="font-display font-semibold text-center text-foreground">
                  What's your verdict?
                </h3>
                <div className="flex gap-4">
                  <button
                    onClick={() => handleVerdict('unconstitutional')}
                    className="flex-1 py-4 px-4 rounded-2xl bg-destructive/10 hover:bg-destructive/20 border-2 border-destructive/30 hover:border-destructive transition-all active:scale-95"
                  >
                    <Gavel className="w-6 h-6 text-destructive mx-auto mb-2" />
                    <span className="font-semibold text-destructive text-sm">Unconstitutional</span>
                  </button>
                  
                  <button
                    onClick={() => handleVerdict('constitutional')}
                    className="flex-1 py-4 px-4 rounded-2xl bg-success/10 hover:bg-success/20 border-2 border-success/30 hover:border-success transition-all active:scale-95"
                  >
                    <Scale className="w-6 h-6 text-success mx-auto mb-2" />
                    <span className="font-semibold text-success text-sm">Constitutional</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Verdict Result */}
        {showVerdict && (
          <div className="space-y-4 animate-scale-in">
            {/* Result Banner */}
            <div className={cn(
              'rounded-2xl p-6 text-center',
              isCorrect ? 'bg-success/10 border-2 border-success' : 'bg-destructive/10 border-2 border-destructive'
            )}>
              <div className={cn(
                'w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center',
                isCorrect ? 'bg-success' : 'bg-destructive'
              )}>
                {isCorrect ? (
                  <Scale className="w-8 h-8 text-success-foreground" />
                ) : (
                  <Gavel className="w-8 h-8 text-destructive-foreground" />
                )}
              </div>
              <h3 className={cn(
                'font-display font-bold text-2xl mb-2',
                isCorrect ? 'text-success' : 'text-destructive'
              )}>
                {isCorrect ? 'Justice Served!' : 'Appeal Granted'}
              </h3>
              <p className="text-foreground">
                The case is <strong>{currentCase.verdict}</strong>
              </p>
              {isCorrect && (
                <p className="text-success font-semibold mt-2">+{currentCase.points} points</p>
              )}
            </div>

            {/* Article Reference */}
            <div className="game-card p-4">
              <div className="flex items-center gap-2 text-muted-foreground mb-2">
                <BookOpen className="w-4 h-4" />
                <span className="text-xs font-semibold uppercase tracking-wide">Legal Basis</span>
              </div>
              <p className="font-semibold text-primary mb-2">{currentCase.article}</p>
              <p className="text-sm text-foreground">{currentCase.explanation}</p>
            </div>

            {/* Why It Matters */}
            <div className="game-card p-4 bg-primary/5 border-primary/20">
              <div className="flex items-center gap-2 text-primary mb-2">
                <AlertCircle className="w-4 h-4" />
                <span className="text-xs font-semibold uppercase tracking-wide">Why This Matters</span>
              </div>
              <p className="text-sm text-foreground">{currentCase.whyItMatters}</p>
            </div>

            {/* Next Button */}
            <button
              onClick={handleNextCase}
              className="w-full py-4 rounded-2xl gradient-secondary text-secondary-foreground font-semibold transition-all active:scale-95"
            >
              Next Case
            </button>
          </div>
        )}
      </div>
    </Layout>
  );
}
