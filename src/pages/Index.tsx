import { useNavigate } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { GameCard } from '@/components/GameCard';
import { LevelDisplay } from '@/components/LevelDisplay';
import { useGameProgress } from '@/hooks/useGameProgress';
import { Target, Repeat, Gavel, BookOpen, Sparkles } from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();
  const { progress, getCurrentLevel, getNextLevelProgress, isLoaded } = useGameProgress();

  if (!isLoaded) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="p-4 md:p-8 max-w-4xl mx-auto">
        {/* Hero Section */}
        <section className="mb-8 animate-slide-up">
          <div className="relative overflow-hidden rounded-3xl gradient-primary p-8 md:p-12 text-primary-foreground">
            {/* Background decorations */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />
            
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="w-5 h-5" />
                <span className="text-sm font-medium opacity-90">Learn by Playing</span>
              </div>
              
              <h1 className="font-display text-3xl md:text-5xl font-bold mb-4">
                Samvidhan Quest
              </h1>
              
              <p className="text-lg md:text-xl opacity-90 max-w-xl mb-6">
                Master the Indian Constitution through interactive games and real-life scenarios. 
                No boring textbooks – just engaging challenges!
              </p>
              
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => navigate('/scenario')}
                  className="bg-white/20 hover:bg-white/30 backdrop-blur-sm px-6 py-3 rounded-xl font-semibold transition-all active:scale-95"
                >
                  Start Playing
                </button>
                <button
                  onClick={() => navigate('/about')}
                  className="bg-white/10 hover:bg-white/20 px-6 py-3 rounded-xl font-semibold transition-all active:scale-95"
                >
                  Learn More
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Level Progress */}
        <section className="mb-8 animate-slide-up" style={{ animationDelay: '100ms' }}>
          <LevelDisplay
            level={getCurrentLevel()}
            progress={getNextLevelProgress()}
            totalPoints={progress.totalPoints}
          />
        </section>

        {/* Game Modes */}
        <section className="mb-8">
          <h2 className="font-display font-bold text-xl text-foreground mb-4">
            Choose Your Challenge
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 stagger-children">
            <GameCard
              title="Scenario Challenge"
              description="Solve real-life situations using constitutional rights"
              icon={Target}
              color="amber"
              onClick={() => navigate('/scenario')}
              badge={progress.scenariosCompleted > 0 ? `${progress.scenariosCompleted} done` : undefined}
            />
            
            <GameCard
              title="Swipe Challenge"
              description="Quick-fire decisions: Constitutional or not?"
              icon={Repeat}
              color="emerald"
              onClick={() => navigate('/swipe')}
              badge={progress.swipesCompleted > 0 ? `${progress.swipesCompleted} done` : undefined}
            />
            
            <GameCard
              title="Judge the Case"
              description="Step into the judge's seat and deliver verdicts"
              icon={Gavel}
              color="navy"
              onClick={() => navigate('/judge')}
              badge="Most Popular"
            />
            
            <GameCard
              title="Explore Topics"
              description="Deep dive into rights, duties, and articles"
              icon={BookOpen}
              color="purple"
              onClick={() => navigate('/explore')}
              badge={progress.topicsExplored.length > 0 ? `${progress.topicsExplored.length} explored` : undefined}
            />
          </div>
        </section>

        {/* Quick Stats */}
        <section className="animate-slide-up" style={{ animationDelay: '400ms' }}>
          <div className="game-card p-6">
            <h3 className="font-display font-semibold text-foreground mb-4">Your Journey</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-3 rounded-xl bg-muted/50">
                <p className="text-2xl font-bold text-primary">{progress.correctAnswers}</p>
                <p className="text-xs text-muted-foreground">Correct Answers</p>
              </div>
              <div className="text-center p-3 rounded-xl bg-muted/50">
                <p className="text-2xl font-bold text-game-emerald">{progress.maxStreak}</p>
                <p className="text-xs text-muted-foreground">Best Streak</p>
              </div>
              <div className="text-center p-3 rounded-xl bg-muted/50">
                <p className="text-2xl font-bold text-game-navy">{progress.casesCompleted}</p>
                <p className="text-xs text-muted-foreground">Cases Judged</p>
              </div>
              <div className="text-center p-3 rounded-xl bg-muted/50">
                <p className="text-2xl font-bold text-game-purple">{progress.earnedBadges.length}</p>
                <p className="text-xs text-muted-foreground">Badges Earned</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Index;
