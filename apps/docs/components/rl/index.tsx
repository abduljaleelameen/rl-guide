'use client';

import { useEffect, useRef, useState } from 'react';
import { Brain, Zap, Target, Award, Sparkles, Cpu } from 'lucide-react';

// Particle system for hero background
export function HeroParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];

    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      color: string;
      alpha: number;
    }

    const colors = [
      'rgba(139, 92, 246, alpha)', // purple
      'rgba(6, 182, 212, alpha)',  // cyan
      'rgba(34, 197, 94, alpha)',  // green
    ];

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    const createParticles = () => {
      particles = [];
      const numParticles = Math.floor((canvas.width * canvas.height) / 15000);

      for (let i = 0; i < numParticles; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          radius: Math.random() * 2 + 1,
          color: colors[Math.floor(Math.random() * colors.length)],
          alpha: Math.random() * 0.5 + 0.2,
        });
      }
    };

    const drawParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw particles
      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color.replace('alpha', String(p.alpha));
        ctx.fill();
      });

      // Draw connections
      particles.forEach((p1, i) => {
        particles.slice(i + 1).forEach((p2) => {
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(139, 92, 246, ${0.15 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      });
    };

    const updateParticles = () => {
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        // Bounce off edges
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        // Keep in bounds
        p.x = Math.max(0, Math.min(canvas.width, p.x));
        p.y = Math.max(0, Math.min(canvas.height, p.y));
      });
    };

    const animate = () => {
      updateParticles();
      drawParticles();
      animationFrameId = requestAnimationFrame(animate);
    };

    resize();
    createParticles();
    animate();

    window.addEventListener('resize', () => {
      resize();
      createParticles();
    });

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full opacity-60"
      style={{ pointerEvents: 'none' }}
    />
  );
}

// Floating icons decoration
export function FloatingIcons() {
  const icons = [
    { Icon: Brain, color: 'text-purple-400', delay: '0s', x: '10%', y: '20%' },
    { Icon: Zap, color: 'text-cyan-400', delay: '0.5s', x: '85%', y: '15%' },
    { Icon: Target, color: 'text-green-400', delay: '1s', x: '15%', y: '70%' },
    { Icon: Award, color: 'text-orange-400', delay: '1.5s', x: '80%', y: '65%' },
    { Icon: Sparkles, color: 'text-pink-400', delay: '2s', x: '50%', y: '85%' },
    { Icon: Cpu, color: 'text-blue-400', delay: '2.5s', x: '90%', y: '40%' },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {icons.map(({ Icon, color, delay, x, y }, i) => (
        <div
          key={i}
          className={`absolute ${color} opacity-20 animate-float`}
          style={{
            left: x,
            top: y,
            animationDelay: delay,
            animationDuration: `${4 + i * 0.5}s`,
          }}
        >
          <Icon className="w-8 h-8 md:w-12 md:h-12" />
        </div>
      ))}
    </div>
  );
}

// Animated counter that counts up when visible
export function AnimatedCounter({
  end,
  duration = 2000,
  suffix = '',
}: {
  end: number;
  duration?: number;
  suffix?: string;
}) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible) return;

    let startTime: number;
    let animationFrameId: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);

      // Easing function for smooth animation
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * end));

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animate);
      }
    };

    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isVisible, end, duration]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

// Typewriter effect for text
export function TypeWriter({
  text,
  speed = 50,
  className = '',
}: {
  text: string;
  speed?: number;
  className?: string;
}) {
  const [displayText, setDisplayText] = useState('');
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index < text.length) {
        setDisplayText(text.slice(0, index + 1));
        index++;
      } else {
        clearInterval(timer);
      }
    }, speed);

    return () => clearInterval(timer);
  }, [text, speed]);

  useEffect(() => {
    const cursorTimer = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 530);

    return () => clearInterval(cursorTimer);
  }, []);

  return (
    <span className={className}>
      {displayText}
      <span className={`${showCursor ? 'opacity-100' : 'opacity-0'} transition-opacity`}>
        |
      </span>
    </span>
  );
}

// Gradient text with animation
export function GradientText({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`bg-gradient-to-r from-purple-400 via-cyan-400 to-green-400 bg-clip-text text-transparent animate-gradient-shift ${className}`}
    >
      {children}
    </span>
  );
}

// Glow card with hover effect
export function GlowCard({
  children,
  className = '',
  glowColor = 'purple',
}: {
  children: React.ReactNode;
  className?: string;
  glowColor?: 'purple' | 'cyan' | 'green' | 'orange';
}) {
  const glowClasses = {
    purple: 'hover:shadow-purple-500/20',
    cyan: 'hover:shadow-cyan-500/20',
    green: 'hover:shadow-green-500/20',
    orange: 'hover:shadow-orange-500/20',
  };

  return (
    <div
      className={`group relative rounded-2xl bg-neutral-900/50 border border-neutral-800 p-6 transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1 hover:shadow-xl ${glowClasses[glowColor]} ${className}`}
    >
      {children}
    </div>
  );
}
