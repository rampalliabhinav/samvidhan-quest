import { Layout } from '@/components/Layout';
import { Link } from 'react-router-dom';
import { ArrowLeft, Scale, Bird, ShieldCheck, Heart, BookOpen, Gavel, FileText, ChevronRight } from 'lucide-react';
import topicsData from '@/data/topics.json';
import { cn } from '@/lib/utils';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Scale, Bird, ShieldCheck, Heart, BookOpen, Gavel,
};

const colorVariants: Record<string, string> = {
  amber: 'from-game-amber to-game-orange',
  blue: 'from-game-blue to-game-cyan',
  red: 'from-game-red to-game-orange',
  purple: 'from-game-purple to-game-blue',
  green: 'from-game-emerald to-accent',
  orange: 'from-game-orange to-game-amber',
};

export default function ExplorePage() {
  return (
    <Layout>
      <div className="p-4 md:p-8 max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Link
            to="/"
            className="p-2 rounded-xl bg-muted hover:bg-muted/80 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="font-display font-bold text-xl text-foreground">Explore Topics</h1>
            <p className="text-sm text-muted-foreground">Deep dive into constitutional concepts</p>
          </div>
        </div>

        {/* Fundamental Rights */}
        <section className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Scale className="w-5 h-5 text-primary" />
            <h2 className="font-display font-bold text-lg text-foreground">Fundamental Rights</h2>
          </div>
          
          <div className="grid gap-4 stagger-children">
            {topicsData.fundamentalRights.map((right) => {
              const Icon = iconMap[right.icon] || Scale;
              return (
                <Link
                  key={right.id}
                  to={`/topic/${right.id}`}
                  className="game-card p-4 flex items-center gap-4 group"
                >
                  <div className={cn(
                    'w-12 h-12 rounded-xl bg-gradient-to-br flex items-center justify-center flex-shrink-0',
                    colorVariants[right.color] || colorVariants.amber
                  )}>
                    <Icon className="w-6 h-6 text-primary-foreground" />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h3 className="font-display font-semibold text-foreground">{right.title}</h3>
                    <p className="text-sm text-muted-foreground truncate">{right.articles}</p>
                  </div>
                  
                  <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                </Link>
              );
            })}
          </div>
        </section>

        {/* Fundamental Duties */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <FileText className="w-5 h-5 text-game-navy" />
            <h2 className="font-display font-bold text-lg text-foreground">Fundamental Duties</h2>
          </div>
          
          <div className="game-card p-4">
            <p className="text-sm text-muted-foreground mb-4">
              Added by the 42nd Amendment in 1976 under Article 51A. These are moral obligations for all citizens.
            </p>
            
            <div className="grid gap-3">
              {topicsData.fundamentalDuties.map((duty, index) => (
                <div
                  key={duty.id}
                  className="flex items-start gap-3 p-3 rounded-xl bg-muted/50"
                >
                  <span className="w-6 h-6 rounded-full gradient-secondary text-secondary-foreground text-xs font-bold flex items-center justify-center flex-shrink-0">
                    {index + 1}
                  </span>
                  <div>
                    <h4 className="font-semibold text-sm text-foreground">{duty.title}</h4>
                    <p className="text-xs text-muted-foreground mt-1">{duty.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}
