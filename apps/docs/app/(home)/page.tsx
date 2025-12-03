import Link from 'next/link';
import { Brain, BookOpen, Code, Zap, Target, Award } from 'lucide-react';
import { HeroParticles, FloatingIcons } from '@/components/rl';

export default function Page() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-neutral-950 to-neutral-900 text-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0">
          <HeroParticles />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-cyan-500/10 to-green-500/10" />

        {/* Floating icons */}
        <FloatingIcons />

        <div className="relative max-w-6xl mx-auto px-6 py-24 md:py-32">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/20 border border-purple-500/30 mb-8 animate-pulse-glow">
              <Brain className="w-4 h-4 text-purple-400" />
              <span className="text-sm text-purple-300">Deep Dive into AI Training</span>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-purple-200 to-cyan-200 bg-clip-text text-transparent animate-gradient-shift">
              Reinforcement Learning
              <br />
              <span className="text-3xl md:text-5xl">for Large Language Models</span>
            </h1>

            <p className="text-lg md:text-xl text-neutral-400 max-w-2xl mx-auto mb-10">
              Master the techniques behind ChatGPT, Claude, and DeepSeek.
              From RLHF basics to advanced GRPO implementations with hands-on examples.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/docs/reinforcement-ai"
                className="group inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-purple-600 to-cyan-600 text-white font-semibold hover:from-purple-500 hover:to-cyan-500 transition-all shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 hover:scale-105"
              >
                <BookOpen className="w-5 h-5 group-hover:animate-pulse" />
                Start Learning
              </Link>
              <Link
                href="/docs/reinforcement-ai/examples/example-1"
                className="group inline-flex items-center gap-2 px-8 py-4 rounded-full border border-neutral-700 text-neutral-300 font-semibold hover:bg-neutral-800 hover:border-neutral-600 transition-all hover:scale-105"
              >
                <Code className="w-5 h-5 group-hover:text-cyan-400 transition-colors" />
                View Examples
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="max-w-6xl mx-auto px-6 py-20">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-4">What You'll Learn</h2>
        <p className="text-neutral-400 text-center mb-12 max-w-2xl mx-auto">
          A comprehensive guide covering everything from fundamentals to production deployment
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <FeatureCard
            icon={<Target className="w-6 h-6" />}
            title="RL Fundamentals"
            description="Understand the agent-environment loop, rewards, and how AI learns from feedback"
            href="/docs/reinforcement-ai/fundamentals/rl-concepts"
            color="purple"
          />
          <FeatureCard
            icon={<Zap className="w-6 h-6" />}
            title="PPO vs GRPO"
            description="Compare the two main algorithms powering modern LLM training"
            href="/docs/reinforcement-ai/fundamentals/ppo-grpo"
            color="cyan"
          />
          <FeatureCard
            icon={<Award className="w-6 h-6" />}
            title="Reward Functions"
            description="Design effective reward functions for sentiment, accuracy, and more"
            href="/docs/reinforcement-ai/fundamentals/reward-functions"
            color="green"
          />
          <FeatureCard
            icon={<Code className="w-6 h-6" />}
            title="9 Code Examples"
            description="Hands-on implementations from beginner to advanced levels"
            href="/docs/reinforcement-ai/examples/example-1"
            color="orange"
          />
          <FeatureCard
            icon={<BookOpen className="w-6 h-6" />}
            title="Training Guide"
            description="Optimize memory, debug issues, and configure hyperparameters"
            href="/docs/reinforcement-ai/training/optimization"
            color="pink"
          />
          <FeatureCard
            icon={<Brain className="w-6 h-6" />}
            title="Production Ready"
            description="Deploy with A/B testing, monitoring, and automated rollback"
            href="/docs/reinforcement-ai/advanced/production"
            color="blue"
          />
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-6xl mx-auto px-6 py-20">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-purple-900/50 to-cyan-900/50 border border-purple-500/20 p-12 text-center">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(139,92,246,0.1),transparent_70%)]" />
          <div className="relative">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Train Your First Model?</h2>
            <p className="text-neutral-400 mb-8 max-w-xl mx-auto">
              Start with our quickstart guide and have your first RL training running in minutes.
            </p>
            <Link
              href="/docs/reinforcement-ai"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white text-neutral-900 font-semibold hover:bg-neutral-100 transition-all"
            >
              Get Started
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-neutral-800 py-8">
        <div className="max-w-6xl mx-auto px-6 text-center text-neutral-500 text-sm">
          <p>Reinforcement Learning Documentation</p>
        </div>
      </footer>
    </main>
  );
}

function FeatureCard({
  icon,
  title,
  description,
  href,
  color,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  href: string;
  color: 'purple' | 'cyan' | 'green' | 'orange' | 'pink' | 'blue';
}) {
  const colorClasses = {
    purple: {
      icon: 'bg-purple-500/10 text-purple-400 group-hover:bg-purple-500/30',
      border: 'group-hover:border-purple-500/50',
      shadow: 'group-hover:shadow-purple-500/10',
    },
    cyan: {
      icon: 'bg-cyan-500/10 text-cyan-400 group-hover:bg-cyan-500/30',
      border: 'group-hover:border-cyan-500/50',
      shadow: 'group-hover:shadow-cyan-500/10',
    },
    green: {
      icon: 'bg-green-500/10 text-green-400 group-hover:bg-green-500/30',
      border: 'group-hover:border-green-500/50',
      shadow: 'group-hover:shadow-green-500/10',
    },
    orange: {
      icon: 'bg-orange-500/10 text-orange-400 group-hover:bg-orange-500/30',
      border: 'group-hover:border-orange-500/50',
      shadow: 'group-hover:shadow-orange-500/10',
    },
    pink: {
      icon: 'bg-pink-500/10 text-pink-400 group-hover:bg-pink-500/30',
      border: 'group-hover:border-pink-500/50',
      shadow: 'group-hover:shadow-pink-500/10',
    },
    blue: {
      icon: 'bg-blue-500/10 text-blue-400 group-hover:bg-blue-500/30',
      border: 'group-hover:border-blue-500/50',
      shadow: 'group-hover:shadow-blue-500/10',
    },
  };

  const classes = colorClasses[color];

  return (
    <Link
      href={href}
      className={`group block p-6 rounded-2xl bg-neutral-900/50 border border-neutral-800 transition-all duration-300 hover:shadow-xl hover:scale-[1.02] hover:-translate-y-1 ${classes.border} ${classes.shadow}`}
    >
      <div className={`inline-flex p-3 rounded-xl mb-4 transition-all duration-300 ${classes.icon} group-hover:scale-110`}>
        {icon}
      </div>
      <h3 className="text-lg font-semibold mb-2 group-hover:text-white transition-colors">{title}</h3>
      <p className="text-neutral-400 text-sm group-hover:text-neutral-300 transition-colors">{description}</p>
    </Link>
  );
}
