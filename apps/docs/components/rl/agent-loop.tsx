'use client';

import { useState, useEffect } from 'react';
import { Brain, Gamepad2, Gift, ArrowRight, RotateCcw } from 'lucide-react';

interface LoopStep {
  id: string;
  label: string;
  description: string;
  icon: React.ReactNode;
  color: string;
}

const steps: LoopStep[] = [
  {
    id: 'state',
    label: 'State',
    description: 'Agent observes the current environment',
    icon: <Gamepad2 className="w-6 h-6" />,
    color: 'cyan',
  },
  {
    id: 'action',
    label: 'Action',
    description: 'Agent decides and takes an action',
    icon: <Brain className="w-6 h-6" />,
    color: 'purple',
  },
  {
    id: 'reward',
    label: 'Reward',
    description: 'Environment provides feedback',
    icon: <Gift className="w-6 h-6" />,
    color: 'green',
  },
];

export function AgentLoopAnimation() {
  const [activeStep, setActiveStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [isPlaying]);

  const colorClasses: Record<string, { bg: string; border: string; text: string; glow: string }> = {
    cyan: {
      bg: 'bg-cyan-500/20',
      border: 'border-cyan-500',
      text: 'text-cyan-400',
      glow: 'shadow-cyan-500/50',
    },
    purple: {
      bg: 'bg-purple-500/20',
      border: 'border-purple-500',
      text: 'text-purple-400',
      glow: 'shadow-purple-500/50',
    },
    green: {
      bg: 'bg-green-500/20',
      border: 'border-green-500',
      text: 'text-green-400',
      glow: 'shadow-green-500/50',
    },
  };

  return (
    <div className="relative p-8 rounded-2xl bg-neutral-900/50 border border-neutral-800 overflow-hidden">
      {/* Background animation */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-radial from-purple-500/20 to-transparent animate-pulse" />
      </div>

      {/* Control button */}
      <button
        onClick={() => setIsPlaying(!isPlaying)}
        className="absolute top-4 right-4 p-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 transition-colors z-10"
        aria-label={isPlaying ? 'Pause animation' : 'Play animation'}
      >
        {isPlaying ? (
          <span className="text-sm text-neutral-400">Pause</span>
        ) : (
          <RotateCcw className="w-4 h-4 text-neutral-400" />
        )}
      </button>

      {/* Loop visualization */}
      <div className="relative flex items-center justify-center gap-4 md:gap-8">
        {steps.map((step, index) => {
          const isActive = activeStep === index;
          const colors = colorClasses[step.color];

          return (
            <div key={step.id} className="flex items-center">
              {/* Step card */}
              <button
                onClick={() => {
                  setActiveStep(index);
                  setIsPlaying(false);
                }}
                className={`
                  relative flex flex-col items-center p-4 md:p-6 rounded-xl border-2 transition-all duration-500 cursor-pointer
                  ${isActive ? `${colors.bg} ${colors.border} shadow-lg ${colors.glow}` : 'bg-neutral-800/50 border-neutral-700'}
                  hover:scale-105
                `}
              >
                {/* Pulse effect */}
                {isActive && (
                  <div className={`absolute inset-0 rounded-xl ${colors.bg} animate-ping opacity-30`} />
                )}

                <div className={`relative z-10 p-3 rounded-lg ${colors.bg} ${colors.text} mb-3`}>
                  {step.icon}
                </div>

                <span className={`relative z-10 font-bold ${isActive ? colors.text : 'text-neutral-400'}`}>
                  {step.label}
                </span>

                {/* Step number */}
                <span className={`
                  absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold
                  ${isActive ? `${colors.bg} ${colors.text} ${colors.border} border` : 'bg-neutral-700 text-neutral-400'}
                `}>
                  {index + 1}
                </span>
              </button>

              {/* Arrow between steps */}
              {index < steps.length - 1 && (
                <div className="mx-2 md:mx-4">
                  <ArrowRight className={`
                    w-6 h-6 transition-all duration-500
                    ${activeStep === index ? 'text-white scale-125 animate-pulse' : 'text-neutral-600'}
                  `} />
                </div>
              )}
            </div>
          );
        })}

        {/* Return arrow */}
        <div className="hidden md:block absolute -bottom-4 left-1/2 -translate-x-1/2">
          <div className={`
            flex items-center gap-2 px-4 py-2 rounded-full bg-neutral-800/80 border border-neutral-700
            ${activeStep === steps.length - 1 ? 'border-green-500/50' : ''}
          `}>
            <RotateCcw className={`w-4 h-4 ${activeStep === steps.length - 1 ? 'text-green-400 animate-spin' : 'text-neutral-500'}`} />
            <span className="text-xs text-neutral-400">Repeat</span>
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="mt-8 text-center">
        <p className={`text-lg transition-all duration-500 ${colorClasses[steps[activeStep].color].text}`}>
          {steps[activeStep].description}
        </p>

        {/* Progress dots */}
        <div className="flex justify-center gap-2 mt-4">
          {steps.map((step, index) => (
            <button
              key={step.id}
              onClick={() => {
                setActiveStep(index);
                setIsPlaying(false);
              }}
              className={`
                w-2 h-2 rounded-full transition-all duration-300
                ${activeStep === index ? `${colorClasses[step.color].bg} ${colorClasses[step.color].border} border w-6` : 'bg-neutral-700'}
              `}
              aria-label={`Go to step ${index + 1}: ${step.label}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
