import { useParams, Link } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { useGameProgress } from '@/hooks/useGameProgress';
import topicsData from '@/data/topics.json';
import { ArrowLeft, BookOpen, ExternalLink, FileText, Scale, Bird, ShieldCheck, Heart, Gavel } from 'lucide-react';
import { useEffect } from 'react';
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

export default function TopicPage() {
  const { id } = useParams<{ id: string }>();
  const { exploreTopic } = useGameProgress();
  
  const topic = topicsData.fundamentalRights.find((r) => r.id === id);

  useEffect(() => {
    if (id) {
      exploreTopic(id);
    }
  }, [id, exploreTopic]);

  if (!topic) {
    return (
      <Layout>
        <div className="p-8 text-center">
          <h1 className="font-display font-bold text-xl text-foreground mb-4">Topic not found</h1>
          <Link to="/explore" className="text-primary hover:underline">
            Back to Explore
          </Link>
        </div>
      </Layout>
    );
  }

  const Icon = iconMap[topic.icon] || Scale;

  return (
    <Layout>
      <div className="p-4 md:p-8 max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Link
            to="/explore"
            className="p-2 rounded-xl bg-muted hover:bg-muted/80 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div className="flex-1">
            <h1 className="font-display font-bold text-xl text-foreground">{topic.title}</h1>
            <p className="text-sm text-muted-foreground">{topic.articles}</p>
          </div>
        </div>

        {/* Hero Card */}
        <div className={cn(
          'rounded-2xl p-6 mb-6 text-primary-foreground bg-gradient-to-br',
          colorVariants[topic.color] || colorVariants.amber
        )}>
          <div className="flex items-center gap-4 mb-4">
            <div className="w-14 h-14 rounded-xl bg-white/20 flex items-center justify-center">
              <Icon className="w-7 h-7" />
            </div>
            <div>
              <h2 className="font-display font-bold text-2xl">{topic.title}</h2>
              <p className="opacity-90">{topic.articles}</p>
            </div>
          </div>
          <p className="opacity-90 leading-relaxed">{topic.summary}</p>
        </div>

        {/* Articles Detail */}
        <div className="space-y-4 mb-8">
          <h3 className="font-display font-semibold text-foreground flex items-center gap-2">
            <FileText className="w-5 h-5 text-primary" />
            Article Breakdown
          </h3>
          
          {topic.details.map((detail, index) => (
            <div key={index} className="game-card p-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-semibold">
                  {detail.article}
                </span>
              </div>
              <h4 className="font-semibold text-foreground mb-2">{detail.title}</h4>
              <p className="text-sm text-muted-foreground">{detail.explanation}</p>
            </div>
          ))}
        </div>

        {/* Learning Resources */}
        <div className="space-y-4">
          <h3 className="font-display font-semibold text-foreground flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-game-emerald" />
            Learning Resources
          </h3>
          
          <div className="game-card divide-y divide-border">
            {topic.resources.map((resource, index) => (
              <a
                key={index}
                href={resource.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-4 hover:bg-muted/50 transition-colors"
              >
                <div>
                  <span className={cn(
                    'text-xs font-semibold uppercase tracking-wide',
                    resource.type === 'Official' ? 'text-game-navy' : 'text-game-emerald'
                  )}>
                    {resource.type}
                  </span>
                  <p className="font-medium text-foreground">{resource.title}</p>
                </div>
                <ExternalLink className="w-4 h-4 text-muted-foreground" />
              </a>
            ))}
          </div>
        </div>

        {/* Related Scenarios CTA */}
        <div className="mt-8 game-card p-6 text-center bg-primary/5 border-primary/20">
          <h4 className="font-display font-semibold text-foreground mb-2">
            Test Your Understanding
          </h4>
          <p className="text-sm text-muted-foreground mb-4">
            Apply what you learned in real-life scenarios
          </p>
          <Link
            to="/scenario"
            className="inline-block gradient-primary text-primary-foreground px-6 py-3 rounded-xl font-semibold transition-all active:scale-95"
          >
            Play Scenario Challenge
          </Link>
        </div>
      </div>
    </Layout>
  );
}
