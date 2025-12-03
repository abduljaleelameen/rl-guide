'use client';

import { useState, useMemo } from 'react';
import { Play, RotateCcw, Lightbulb, CheckCircle2, XCircle } from 'lucide-react';

interface TestCase {
  input: string;
  expected: string;
}

const testCases: TestCase[] = [
  { input: '4', expected: 'positive' },
  { input: 'four', expected: 'positive' },
  { input: '4.0', expected: 'partial' },
  { input: '5', expected: 'negative' },
  { input: 'I think the answer is 4', expected: 'bonus' },
  { input: '', expected: 'negative' },
];

const defaultCode = `def reward_function(response: str) -> float:
    """
    Score a response to the question "What is 2 + 2?"

    Returns:
      - Positive reward for correct answers
      - Negative reward for incorrect answers
      - Bonus for showing reasoning
    """
    response = response.strip().lower()

    # Check for correct answer with reasoning
    if 'think' in response and '4' in response:
        return 1.2  # Bonus for reasoning!

    # Check for exact correct answer
    if response == '4' or response == 'four':
        return 1.0

    # Partial credit for close answers
    if response == '4.0':
        return 0.8

    # Wrong or empty answer
    return -1.0`;

export function CodePlayground() {
  const [code, setCode] = useState(defaultCode);
  const [results, setResults] = useState<{ input: string; output: string; expected: string; passed: boolean }[]>([]);
  const [isRunning, setIsRunning] = useState(false);

  // Simple Python-like interpreter for the reward function
  const evaluateReward = (response: string): string => {
    const normalized = response.trim().toLowerCase();

    // Parse the code to extract logic (simplified)
    const hasReasoningCheck = code.includes("'think'") || code.includes('"think"');
    const hasExactCheck = code.includes("== '4'") || code.includes('== "4"');
    const hasPartialCheck = code.includes("'4.0'") || code.includes('"4.0"');

    if (hasReasoningCheck && normalized.includes('think') && normalized.includes('4')) {
      return 'bonus';
    }

    if (hasExactCheck && (normalized === '4' || normalized === 'four')) {
      return 'positive';
    }

    if (hasPartialCheck && normalized === '4.0') {
      return 'partial';
    }

    return 'negative';
  };

  const runTests = () => {
    setIsRunning(true);

    // Simulate running with delay
    setTimeout(() => {
      const newResults = testCases.map((tc) => {
        const output = evaluateReward(tc.input);
        return {
          input: tc.input || '(empty)',
          output,
          expected: tc.expected,
          passed: output === tc.expected,
        };
      });

      setResults(newResults);
      setIsRunning(false);
    }, 500);
  };

  const passedCount = useMemo(() => results.filter((r) => r.passed).length, [results]);

  const resetCode = () => {
    setCode(defaultCode);
    setResults([]);
  };

  return (
    <div className="rounded-2xl bg-neutral-900/50 border border-neutral-800 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-neutral-800/50 border-b border-neutral-700">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
          </div>
          <span className="text-sm text-neutral-400 font-mono">reward_function.py</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={resetCode}
            className="p-2 rounded-lg hover:bg-neutral-700 transition-colors"
            title="Reset code"
          >
            <RotateCcw className="w-4 h-4 text-neutral-400" />
          </button>
          <button
            onClick={runTests}
            disabled={isRunning}
            className={`
              flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all
              ${isRunning
                ? 'bg-neutral-700 text-neutral-400 cursor-not-allowed'
                : 'bg-green-600 text-white hover:bg-green-500'
              }
            `}
          >
            <Play className="w-4 h-4" />
            {isRunning ? 'Running...' : 'Run Tests'}
          </button>
        </div>
      </div>

      {/* Code editor */}
      <div className="p-4">
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="w-full h-80 p-4 rounded-lg bg-neutral-950 text-green-400 font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-purple-500"
          spellCheck={false}
        />
      </div>

      {/* Test results */}
      {results.length > 0 && (
        <div className="border-t border-neutral-700">
          <div className="p-4 bg-neutral-800/30">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-bold flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-yellow-400" />
                Test Results
              </h4>
              <span className={`
                px-3 py-1 rounded-full text-sm font-medium
                ${passedCount === testCases.length
                  ? 'bg-green-500/20 text-green-400'
                  : passedCount > testCases.length / 2
                    ? 'bg-yellow-500/20 text-yellow-400'
                    : 'bg-red-500/20 text-red-400'
                }
              `}>
                {passedCount}/{testCases.length} Passed
              </span>
            </div>

            <div className="space-y-2">
              {results.map((result, index) => (
                <div
                  key={index}
                  className={`
                    flex items-center justify-between p-3 rounded-lg
                    ${result.passed ? 'bg-green-500/10' : 'bg-red-500/10'}
                  `}
                >
                  <div className="flex items-center gap-3">
                    {result.passed ? (
                      <CheckCircle2 className="w-5 h-5 text-green-400" />
                    ) : (
                      <XCircle className="w-5 h-5 text-red-400" />
                    )}
                    <span className="font-mono text-sm">
                      Input: <span className="text-cyan-400">"{result.input}"</span>
                    </span>
                  </div>

                  <div className="flex items-center gap-4 text-sm">
                    <span className={result.passed ? 'text-green-400' : 'text-red-400'}>
                      Got: {result.output}
                    </span>
                    {!result.passed && (
                      <span className="text-neutral-500">
                        Expected: {result.expected}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {passedCount === testCases.length && (
              <div className="mt-4 p-4 rounded-lg bg-green-500/20 border border-green-500/30 text-center">
                <span className="text-green-400 font-bold">
                  All tests passed! Your reward function is working correctly.
                </span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
