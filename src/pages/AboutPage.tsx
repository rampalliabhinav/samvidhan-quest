import { Layout } from '@/components/Layout';
import { Link } from 'react-router-dom';
import { ArrowLeft, Heart, Lightbulb, Target, Users, Award, ArrowRight } from 'lucide-react';

export default function AboutPage() {
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
          <div>
            <h1 className="font-display font-bold text-xl text-foreground">About</h1>
            <p className="text-sm text-muted-foreground">Our mission & impact</p>
          </div>
        </div>

        {/* Mission Banner */}
        <div className="game-card overflow-hidden mb-8">
          <div className="gradient-hero p-8 text-primary-foreground text-center">
            <h2 className="font-display font-bold text-2xl md:text-3xl mb-2">
              Samvidhan Quest
            </h2>
            <p className="text-lg opacity-90 max-w-md mx-auto">
              Making Constitutional Literacy Fun & Accessible
            </p>
          </div>
        </div>

        {/* Problem Statement */}
        <section className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Lightbulb className="w-5 h-5 text-game-amber" />
            <h3 className="font-display font-semibold text-foreground">The Problem</h3>
          </div>
          <div className="game-card p-5">
            <p className="text-muted-foreground leading-relaxed">
              Many Indian citizens, especially students and young adults, struggle to understand the 
              Indian Constitution. Complex legal language and boring, text-heavy formats result in 
              low awareness of <strong className="text-foreground">Fundamental Rights</strong>, 
              <strong className="text-foreground"> Duties</strong>, and 
              <strong className="text-foreground"> civic responsibilities</strong>.
            </p>
          </div>
        </section>

        {/* Solution */}
        <section className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Target className="w-5 h-5 text-game-emerald" />
            <h3 className="font-display font-semibold text-foreground">Our Solution</h3>
          </div>
          <div className="game-card p-5">
            <p className="text-muted-foreground leading-relaxed mb-4">
              An engaging, game-based learning platform that teaches the Constitution through:
            </p>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full gradient-primary text-primary-foreground text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">1</span>
                <span className="text-foreground"><strong>Real-life Scenarios</strong> – Apply constitutional rights to everyday situations</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full gradient-primary text-primary-foreground text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">2</span>
                <span className="text-foreground"><strong>Quick Challenges</strong> – Fast-paced swipe games to test knowledge</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full gradient-primary text-primary-foreground text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">3</span>
                <span className="text-foreground"><strong>Role-playing</strong> – Be the judge and deliver verdicts on real cases</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full gradient-primary text-primary-foreground text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">4</span>
                <span className="text-foreground"><strong>Simple Language</strong> – No legal jargon, just clear explanations</span>
              </li>
            </ul>
          </div>
        </section>

        {/* Impact */}
        <section className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Heart className="w-5 h-5 text-game-red" />
            <h3 className="font-display font-semibold text-foreground">Social Impact</h3>
          </div>
          <div className="grid gap-4">
            <div className="game-card p-5 flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-game-amber/10 flex items-center justify-center flex-shrink-0">
                <Users className="w-5 h-5 text-game-amber" />
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-1">Empowered Citizens</h4>
                <p className="text-sm text-muted-foreground">
                  Citizens who know their rights can better protect themselves and hold authorities accountable.
                </p>
              </div>
            </div>
            
            <div className="game-card p-5 flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-game-emerald/10 flex items-center justify-center flex-shrink-0">
                <Award className="w-5 h-5 text-game-emerald" />
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-1">Stronger Democracy</h4>
                <p className="text-sm text-muted-foreground">
                  An informed citizenry is the foundation of a healthy democracy and civil society.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Quote */}
        <div className="game-card p-6 text-center bg-secondary/5 border-secondary/20 mb-8">
          <blockquote className="text-lg italic text-foreground mb-3">
            "Constitutional morality is not a natural sentiment. It has to be cultivated."
          </blockquote>
          <cite className="text-sm text-muted-foreground">
            — Dr. B.R. Ambedkar, Father of the Indian Constitution
          </cite>
        </div>

        {/* CTA */}
        <div className="text-center">
          <h4 className="font-display font-semibold text-foreground mb-4">
            Ready to begin your journey?
          </h4>
          <Link
            to="/"
            className="inline-flex items-center gap-2 gradient-primary text-primary-foreground px-8 py-4 rounded-2xl font-semibold transition-all active:scale-95"
          >
            Start Learning
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </Layout>
  );
}
