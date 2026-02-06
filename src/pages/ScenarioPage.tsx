import { useState, useMemo } from 'react';
import { Layout } from '@/components/Layout';
import { FeedbackCard } from '@/components/FeedbackCard';
import { ProgressBar } from '@/components/ProgressBar';
import { useGameProgress } from '@/hooks/useGameProgress';
import scenariosData from '@/data/scenarios.json';
import { ArrowLeft, Target, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

export default function ScenarioPage() {
  const { completeScenario, progress } = useGameProgress();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);

  const shuffledScenarios = useMemo(() => {
    return [...scenariosData].sort(() => Math.random() - 0.5);
  }, []);

  const currentScenario = shuffledScenarios[currentIndex % shuffledScenarios.length];
  const isCorrect = selectedAnswer === currentScenario.correct;

  const handleAnswer = (answer: string) => {
    if (showFeedback) return;
    setSelectedAnswer(answer);
    setShowFeedback(true);
    completeScenario(answer === currentScenario.correct);
  };

  const handleContinue = () => {
    setSelectedAnswer(null);
    setShowFeedback(false);
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
            <h1 className="font-display font-bold text-xl text-foreground">Scenario Challenge</h1>
            <p className="text-sm text-muted-foreground">Apply constitutional rights to real situations</p>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10">
            <Zap className="w-4 h-4 text-primary" />
            <span className="text-sm font-semibold text-primary">{progress.totalPoints}</span>
          </div>
        </div>

        {/* Progress */}
        <div className="mb-6">
          <ProgressBar
            value={currentIndex % 10}
            max={10}
            showLabel
            color="amber"
          />
        </div>

        {/* Scenario Card */}
        <div className="game-card p-6 mb-6 animate-scale-in">
          <div className="flex items-center gap-2 text-primary mb-4">
            <Target className="w-5 h-5" />
            <span className="text-sm font-semibold">Scenario #{currentIndex + 1}</span>
          </div>

          <div className="bg-muted/50 rounded-xl p-4 mb-6">
            <p className="text-foreground leading-relaxed">
              {currentScenario.situation}
            </p>
          </div>

          <h3 className="font-display font-semibold text-foreground mb-4">
            {currentScenario.question}
          </h3>

          {!showFeedback && (
            <div className="space-y-3">
              {currentScenario.options.map((option, idx) => (
                <button
                  key={idx}
                  onClick={() => handleAnswer(option)}
                  className={cn(
                    'w-full text-left px-4 py-3 rounded-xl border-2 transition-all',
                    'hover:border-primary hover:bg-primary/5',
                    'border-border bg-card'
                  )}
                >
                  <span className="font-medium text-foreground">{option}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Feedback */}
        {showFeedback && (
          <FeedbackCard
            isCorrect={isCorrect}
            article={currentScenario.article}
            explanation={currentScenario.explanation}
            onContinue={handleContinue}
          />
        )}
      </div>
    </Layout>
  );
}
