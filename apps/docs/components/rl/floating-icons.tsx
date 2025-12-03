'use client';

import { Brain, Zap, Target, Gift, Sparkles, Code } from 'lucide-react';

interface FloatingIconProps {
  delay?: number;
  duration?: number;
  className?: string;
}

const icons = [
  { Icon: Brain, color: 'text-purple-400', bg: 'bg-purple-500/20' },
  { Icon: Zap, color: 'text-cyan-400', bg: 'bg-cyan-500/20' },
  { Icon: Target, color: 'text-green-400', bg: 'bg-green-500/20' },
  { Icon: Gift, color: 'text-orange-400', bg: 'bg-orange-500/20' },
  { Icon: Sparkles, color: 'text-pink-400', bg: 'bg-pink-500/20' },
  { Icon: Code, color: 'text-blue-400', bg: 'bg-blue-500/20' },
];

function FloatingIcon({ Icon, color, bg, delay, duration, x, y }: {
  Icon: typeof Brain;
  color: string;
  bg: string;
  delay: number;
  duration: number;
  x: string;
  y: string;
}) {
  return (
    <div
      className={`absolute ${x} ${y} animate-float opacity-60`}
      style={{
        animationDelay: `${delay}s`,
        animationDuration: `${duration}s`,
      }}
    >
      <div className={`p-3 rounded-xl ${bg} backdrop-blur-sm border border-white/5`}>
        <Icon className={`w-6 h-6 ${color}`} />
      </div>
    </div>
  );
}

export function FloatingIcons() {
  const positions = [
    { x: 'left-[10%]', y: 'top-[20%]' },
    { x: 'right-[15%]', y: 'top-[15%]' },
    { x: 'left-[5%]', y: 'bottom-[30%]' },
    { x: 'right-[8%]', y: 'bottom-[25%]' },
    { x: 'left-[20%]', y: 'top-[60%]' },
    { x: 'right-[25%]', y: 'top-[50%]' },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {icons.map((icon, index) => (
        <FloatingIcon
          key={index}
          Icon={icon.Icon}
          color={icon.color}
          bg={icon.bg}
          delay={index * 0.5}
          duration={3 + Math.random() * 2}
          x={positions[index].x}
          y={positions[index].y}
        />
      ))}
    </div>
  );
}
