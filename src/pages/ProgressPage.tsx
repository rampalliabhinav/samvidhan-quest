import { Layout } from '@/components/Layout';
import { LevelDisplay } from '@/components/LevelDisplay';
import { BadgeDisplay } from '@/components/BadgeDisplay';
import { useGameProgress } from '@/hooks/useGameProgress';
import badgesData from '@/data/badges.json';
import { ArrowLeft, Trophy, RotateCcw, Target, Repeat, Gavel, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ProgressPage() {
  const { progress, getCurrentLevel, getNextLevelProgress, resetProgress, isLoaded } = useGameProgress();

  if (!isLoaded) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      </Layout>
    );
  }

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset all progress? This cannot be undone.')) {
      resetProgress();
    }
  };

  return (
    <Layout>
      <div className="p-4 md:p-8 max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Link
              to="/"
              className="p-2 rounded-xl bg-muted hover:bg-muted/80 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <h1 className="font-display font-bold text-xl text-foreground">Your Progress</h1>
              <p className="text-sm text-muted-foreground">Track your learning journey</p>
            </div>
          </div>
          
          <button
            onClick={handleReset}
            className="p-2 rounded-xl text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
            title="Reset Progress"
          >
            <RotateCcw className="w-5 h-5" />
          </button>
        </div>

        {/* Level Card */}
        <div className="mb-8">
          <LevelDisplay
            level={getCurrentLevel()}
            progress={getNextLevelProgress()}
            totalPoints={progress.totalPoints}
          />
        </div>

        {/* Stats Grid */}
        <div className="mb-8">
          <h2 className="font-display font-semibold text-foreground mb-4 flex items-center gap-2">
            <Trophy className="w-5 h-5 text-primary" />
            Statistics
          </h2>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="game-card p-4">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center">
                  <Target className="w-5 h-5 text-primary-foreground" />
                </div>
                <span className="text-2xl font-bold text-foreground">{progress.scenariosCompleted}</span>
              </div>
              <p className="text-sm text-muted-foreground">Scenarios Completed</p>
            </div>
            
            <div className="game-card p-4">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-game-emerald to-accent flex items-center justify-center">
                  <Repeat className="w-5 h-5 text-primary-foreground" />
                </div>
                <span className="text-2xl font-bold text-foreground">{progress.swipesCompleted}</span>
              </div>
              <p className="text-sm text-muted-foreground">Swipes Completed</p>
            </div>
            
            <div className="game-card p-4">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-xl gradient-secondary flex items-center justify-center">
                  <Gavel className="w-5 h-5 text-secondary-foreground" />
                </div>
                <span className="text-2xl font-bold text-foreground">{progress.casesCompleted}</span>
              </div>
              <p className="text-sm text-muted-foreground">Cases Judged</p>
            </div>
            
            <div className="game-card p-4">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-game-purple to-game-blue flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-primary-foreground" />
                </div>
                <span className="text-2xl font-bold text-foreground">{progress.topicsExplored.length}</span>
              </div>
              <p className="text-sm text-muted-foreground">Topics Explored</p>
            </div>
          </div>
        </div>

        {/* More Stats */}
        <div className="game-card p-4 mb-8">
          <div className="grid grid-cols-3 divide-x divide-border text-center">
            <div className="px-2">
              <p className="text-2xl font-bold text-primary">{progress.correctAnswers}</p>
              <p className="text-xs text-muted-foreground">Correct</p>
            </div>
            <div className="px-2">
              <p className="text-2xl font-bold text-game-orange">{progress.maxStreak}</p>
              <p className="text-xs text-muted-foreground">Best Streak</p>
            </div>
            <div className="px-2">
              <p className="text-2xl font-bold text-game-navy">{progress.judgePoints}</p>
              <p className="text-xs text-muted-foreground">Judge Points</p>
            </div>
          </div>
        </div>

        {/* Badges */}
        <div>
          <h2 className="font-display font-semibold text-foreground mb-4">
            Badges ({progress.earnedBadges.length}/{badgesData.badges.length})
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {badgesData.badges.map((badge) => (
              <BadgeDisplay
                key={badge.id}
                id={badge.id}
                name={badge.name}
                description={badge.description}
                icon={badge.icon}
                color={badge.color}
                earned={progress.earnedBadges.includes(badge.id)}
              />
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
