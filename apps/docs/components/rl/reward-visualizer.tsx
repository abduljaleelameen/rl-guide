'use client';

import { useState, useEffect } from 'react';
import { ThumbsUp, ThumbsDown, Sparkles, Calculator } from 'lucide-react';

interface RewardExample {
  response: string;
  score: number;
  feedback: string;
  type: 'correct' | 'partial' | 'wrong' | 'bonus';
}

const examples: RewardExample[] = [
  { response: '4', score: 1.0, feedback: 'Perfect! Correct answer', type: 'correct' },
  { response: '4.0', score: 0.8, feedback: 'Correct but verbose format', type: 'partial' },
  { response: '5', score: -1.0, feedback: 'Incorrect answer', type: 'wrong' },
  { response: 'Let me think... 4', score: 1.2, feedback: 'Correct + shows reasoning!', type: 'bonus' },
];

const typeColors = {
  correct: { bg: 'bg-green-500/20', border: 'border-green-500', text: 'text-green-400', bar: 'bg-green-500' },
  partial: { bg: 'bg-orange-500/20', border: 'border-orange-500', text: 'text-orange-400', bar: 'bg-orange-500' },
  wrong: { bg: 'bg-red-500/20', border: 'border-red-500', text: 'text-red-400', bar: 'bg-red-500' },
  bonus: { bg: 'bg-blue-500/20', border: 'border-blue-500', text: 'text-blue-400', bar: 'bg-blue-500' },
};

export function RewardVisualizer() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [animatedScore, setAnimatedScore] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [userScore, setUserScore] = useState<number | null>(null);

  useEffect(() => {
    if (selectedIndex === null) {
      setAnimatedScore(0);
      return;
    }

    const targetScore = examples[selectedIndex].score;
    const duration = 500;
    const steps = 20;
    const stepDuration = duration / steps;
    let currentStep = 0;

    const interval = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;
      const easeOut = 1 - Math.pow(1 - progress, 3);
      setAnimatedScore(targetScore * easeOut);

      if (currentStep >= steps) {
        clearInterval(interval);
        setAnimatedScore(targetScore);
      }
    }, stepDuration);

    return () => clearInterval(interval);
  }, [selectedIndex]);

  const calculateUserScore = () => {
    const input = userInput.trim().toLowerCase();
    if (input === '4') {
      setUserScore(1.0);
    } else if (input === '4.0' || input === 'four') {
      setUserScore(0.8);
    } else if (input.includes('think') && input.includes('4')) {
      setUserScore(1.2);
    } else if (input === '') {
      setUserScore(null);
    } else {
      setUserScore(-1.0);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 1.0) return 'text-green-400';
    if (score >= 0.5) return 'text-orange-400';
    if (score > 0) return 'text-yellow-400';
    return 'text-red-400';
  };

  return (
    <div className="space-y-8">
      {/* Question prompt */}
      <div className="p-6 rounded-xl bg-gradient-to-r from-purple-900/30 to-cyan-900/30 border border-purple-500/30">
        <div className="flex items-center gap-3 mb-4">
          <Calculator className="w-6 h-6 text-purple-400" />
          <span className="text-lg font-bold text-purple-300">Prompt: What is 2 + 2?</span>
        </div>
        <p className="text-neutral-400">Click on different responses to see how the reward function scores them:</p>
      </div>

      {/* Example responses */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {examples.map((example, index) => {
          const colors = typeColors[example.type];
          const isSelected = selectedIndex === index;

          return (
            <button
              key={index}
              onClick={() => setSelectedIndex(isSelected ? null : index)}
              className={`
                relative p-5 rounded-xl border-2 transition-all duration-300 text-left
                ${isSelected ? `${colors.bg} ${colors.border} scale-[1.02]` : 'bg-neutral-800/50 border-neutral-700 hover:border-neutral-600'}
                ${isSelected ? 'shadow-lg' : 'hover:shadow-md'}
              `}
            >
              {/* Selection indicator */}
              {isSelected && (
                <div className="absolute -top-1 -right-1">
                  <Sparkles className={`w-5 h-5 ${colors.text} animate-pulse`} />
                </div>
              )}

              {/* Response text */}
              <div className="flex items-start justify-between gap-4 mb-3">
                <div>
                  <span className="text-xs text-neutral-500 uppercase tracking-wide">Response</span>
                  <p className="font-mono text-lg text-white">"{example.response}"</p>
                </div>
                <div className={`
                  px-3 py-1 rounded-full font-bold text-sm
                  ${colors.bg} ${colors.text} border ${colors.border}
                `}>
                  {example.score > 0 ? '+' : ''}{example.score.toFixed(1)}
                </div>
              </div>

              {/* Feedback */}
              <p className={`text-sm ${isSelected ? colors.text : 'text-neutral-400'}`}>
                {example.feedback}
              </p>

              {/* Score bar animation */}
              {isSelected && (
                <div className="mt-4 h-2 bg-neutral-700 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${colors.bar} transition-all duration-500 ease-out`}
                    style={{ width: `${Math.abs(animatedScore) * 50}%` }}
                  />
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Interactive input */}
      <div className="p-6 rounded-xl bg-neutral-800/50 border border-neutral-700">
        <h4 className="text-lg font-bold mb-4 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-yellow-400" />
          Try it yourself!
        </h4>

        <div className="flex flex-col sm:flex-row gap-4">
          <input
            type="text"
            value={userInput}
            onChange={(e) => {
              setUserInput(e.target.value);
              setUserScore(null);
            }}
            onKeyDown={(e) => e.key === 'Enter' && calculateUserScore()}
            placeholder="Type your answer to '2 + 2 = ?'"
            className="flex-1 px-4 py-3 rounded-lg bg-neutral-900 border border-neutral-700 text-white placeholder-neutral-500 focus:border-purple-500 focus:outline-none transition-colors"
          />
          <button
            onClick={calculateUserScore}
            className="px-6 py-3 rounded-lg bg-gradient-to-r from-purple-600 to-cyan-600 text-white font-semibold hover:from-purple-500 hover:to-cyan-500 transition-all"
          >
            Score It!
          </button>
        </div>

        {/* User score display */}
        {userScore !== null && (
          <div className="mt-4 flex items-center gap-4 animate-fade-in">
            {userScore > 0 ? (
              <ThumbsUp className="w-8 h-8 text-green-400" />
            ) : (
              <ThumbsDown className="w-8 h-8 text-red-400" />
            )}
            <div>
              <span className={`text-2xl font-bold ${getScoreColor(userScore)}`}>
                {userScore > 0 ? '+' : ''}{userScore.toFixed(1)}
              </span>
              <p className="text-sm text-neutral-400">
                {userScore >= 1.0 && 'Great answer!'}
                {userScore > 0 && userScore < 1.0 && 'Acceptable, but could be cleaner'}
                {userScore <= 0 && 'Not quite right, try again!'}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
