'use client';

import { useState, useEffect, useCallback } from 'react';
import { Play, Pause, RotateCcw, Zap, TrendingUp } from 'lucide-react';

interface TrainingStage {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  reward: number;
}

const stages: TrainingStage[] = [
  {
    id: 'random',
    name: 'Random Init',
    description: 'Complete gibberish output',
    icon: '🎲',
    color: 'gray',
    reward: 0,
  },
  {
    id: 'pretrained',
    name: 'Pre-trained',
    description: 'Knows language patterns',
    icon: '📚',
    color: 'blue',
    reward: 25,
  },
  {
    id: 'sft',
    name: 'SFT',
    description: 'Follows instructions',
    icon: '🎓',
    color: 'cyan',
    reward: 50,
  },
  {
    id: 'rlhf',
    name: 'RLHF',
    description: 'Helpful & harmless',
    icon: '✅',
    color: 'green',
    reward: 75,
  },
  {
    id: 'rlvr',
    name: 'RLVR',
    description: 'Can reason step-by-step',
    icon: '🧠',
    color: 'orange',
    reward: 100,
  },
];

const colorMap: Record<string, { bg: string; border: string; text: string; gradient: string }> = {
  gray: { bg: 'bg-gray-500/20', border: 'border-gray-500', text: 'text-gray-400', gradient: 'from-gray-600 to-gray-400' },
  blue: { bg: 'bg-blue-500/20', border: 'border-blue-500', text: 'text-blue-400', gradient: 'from-blue-600 to-purple-600' },
  cyan: { bg: 'bg-cyan-500/20', border: 'border-cyan-500', text: 'text-cyan-400', gradient: 'from-cyan-500 to-blue-500' },
  green: { bg: 'bg-green-500/20', border: 'border-green-500', text: 'text-green-400', gradient: 'from-green-500 to-emerald-500' },
  orange: { bg: 'bg-orange-500/20', border: 'border-orange-500', text: 'text-orange-400', gradient: 'from-orange-500 to-yellow-500' },
};

export function TrainingProgress() {
  const [currentStage, setCurrentStage] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [particles, setParticles] = useState<{ id: number; x: number; y: number }[]>([]);

  const spawnParticles = useCallback(() => {
    const newParticles = Array.from({ length: 5 }, (_, i) => ({
      id: Date.now() + i,
      x: Math.random() * 100,
      y: Math.random() * 100,
    }));
    setParticles((prev) => [...prev, ...newParticles].slice(-20));
  }, []);

  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          if (currentStage < stages.length - 1) {
            setCurrentStage((s) => s + 1);
            spawnParticles();
            return 0;
          } else {
            setIsPlaying(false);
            return 100;
          }
        }
        return prev + 2;
      });
    }, 50);

    return () => clearInterval(interval);
  }, [isPlaying, currentStage, spawnParticles]);

  const reset = () => {
    setCurrentStage(0);
    setProgress(0);
    setIsPlaying(false);
    setParticles([]);
  };

  const currentColors = colorMap[stages[currentStage].color];

  return (
    <div className="relative p-8 rounded-2xl bg-neutral-900/50 border border-neutral-800 overflow-hidden">
      {/* Particle effects */}
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute w-2 h-2 rounded-full bg-yellow-400 animate-ping opacity-50"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
          }}
        />
      ))}

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <TrendingUp className="w-6 h-6 text-purple-400" />
          <h3 className="text-xl font-bold">Model Training Journey</h3>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="p-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 transition-colors"
          >
            {isPlaying ? (
              <Pause className="w-5 h-5 text-neutral-400" />
            ) : (
              <Play className="w-5 h-5 text-neutral-400" />
            )}
          </button>
          <button
            onClick={reset}
            className="p-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 transition-colors"
          >
            <RotateCcw className="w-5 h-5 text-neutral-400" />
          </button>
        </div>
      </div>

      {/* Current stage display */}
      <div className={`
        relative p-6 rounded-xl border-2 transition-all duration-500 mb-6
        ${currentColors.bg} ${currentColors.border}
      `}>
        {/* Glow effect */}
        <div className={`absolute inset-0 rounded-xl ${currentColors.bg} blur-xl opacity-50`} />

        <div className="relative flex items-center gap-4">
          <div className={`
            w-16 h-16 rounded-full flex items-center justify-center text-3xl
            bg-gradient-to-br ${currentColors.gradient}
          `}>
            {stages[currentStage].icon}
          </div>

          <div className="flex-1">
            <h4 className={`text-xl font-bold ${currentColors.text}`}>
              {stages[currentStage].name}
            </h4>
            <p className="text-neutral-400">{stages[currentStage].description}</p>
          </div>

          <div className="text-right">
            <div className={`text-3xl font-bold ${currentColors.text}`}>
              {stages[currentStage].reward}%
            </div>
            <div className="text-sm text-neutral-500">Capability</div>
          </div>
        </div>

        {/* Progress bar within stage */}
        {isPlaying && currentStage < stages.length - 1 && (
          <div className="mt-4 h-2 bg-neutral-700 rounded-full overflow-hidden">
            <div
              className={`h-full bg-gradient-to-r ${currentColors.gradient} transition-all duration-100`}
              style={{ width: `${progress}%` }}
            />
          </div>
        )}
      </div>

      {/* Timeline */}
      <div className="relative">
        {/* Connection line */}
        <div className="absolute top-6 left-0 right-0 h-1 bg-neutral-700 rounded-full">
          <div
            className="h-full bg-gradient-to-r from-gray-500 via-cyan-500 to-orange-500 rounded-full transition-all duration-500"
            style={{ width: `${(currentStage / (stages.length - 1)) * 100}%` }}
          />
        </div>

        {/* Stage markers */}
        <div className="relative flex justify-between">
          {stages.map((stage, index) => {
            const colors = colorMap[stage.color];
            const isActive = index <= currentStage;
            const isCurrent = index === currentStage;

            return (
              <button
                key={stage.id}
                onClick={() => {
                  setCurrentStage(index);
                  setProgress(0);
                  setIsPlaying(false);
                }}
                className="flex flex-col items-center group"
              >
                <div className={`
                  w-12 h-12 rounded-full flex items-center justify-center text-xl
                  transition-all duration-300 border-2
                  ${isActive ? `bg-gradient-to-br ${colors.gradient} border-transparent` : 'bg-neutral-800 border-neutral-600'}
                  ${isCurrent ? 'scale-125 shadow-lg' : 'group-hover:scale-110'}
                `}>
                  {stage.icon}
                </div>

                <span className={`
                  mt-3 text-xs font-medium transition-colors
                  ${isCurrent ? colors.text : isActive ? 'text-neutral-300' : 'text-neutral-500'}
                `}>
                  {stage.name}
                </span>

                {/* Pulse effect for current */}
                {isCurrent && (
                  <div className={`absolute w-12 h-12 rounded-full ${colors.bg} animate-ping opacity-30`} />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Training stats */}
      <div className="mt-8 grid grid-cols-3 gap-4">
        <div className="p-4 rounded-lg bg-neutral-800/50 text-center">
          <Zap className="w-5 h-5 mx-auto mb-2 text-yellow-400" />
          <div className="text-2xl font-bold">{currentStage + 1}/{stages.length}</div>
          <div className="text-xs text-neutral-500">Stages</div>
        </div>
        <div className="p-4 rounded-lg bg-neutral-800/50 text-center">
          <TrendingUp className="w-5 h-5 mx-auto mb-2 text-green-400" />
          <div className="text-2xl font-bold">{stages[currentStage].reward}%</div>
          <div className="text-xs text-neutral-500">Capability</div>
        </div>
        <div className="p-4 rounded-lg bg-neutral-800/50 text-center">
          <div className="w-5 h-5 mx-auto mb-2 text-xl">{stages[currentStage].icon}</div>
          <div className="text-sm font-bold truncate">{stages[currentStage].name}</div>
          <div className="text-xs text-neutral-500">Current</div>
        </div>
      </div>
    </div>
  );
}
