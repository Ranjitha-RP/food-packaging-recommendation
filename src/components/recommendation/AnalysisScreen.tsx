import React, { useEffect, useState } from 'react';
import { Sparkles, CheckCircle2, Cpu, ShieldCheck } from 'lucide-react';

interface AnalysisScreenProps {
  onComplete: () => void;
}

export const AnalysisScreen: React.FC<AnalysisScreenProps> = ({ onComplete }) => {
  const steps = [
    'Analyzing food properties & respiration rates...',
    'Analyzing storage & transport cold-chain conditions...',
    'Checking polymer & biopolymer compatibility...',
    'Evaluating O₂ & WVTR barrier requirements...',
    'Comparing candidate packaging materials database...',
    'Optimizing explainable AI recommendation score...'
  ];

  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStepIndex((prev) => {
        if (prev < steps.length - 1) {
          return prev + 1;
        } else {
          clearInterval(interval);
          setTimeout(onComplete, 500);
          return prev;
        }
      });
    }, 450);

    return () => clearInterval(interval);
  }, [onComplete, steps.length]);

  const progressPct = Math.round(((currentStepIndex + 1) / steps.length) * 100);

  return (
    <div className="min-h-[500px] flex items-center justify-center bg-slate-900 rounded-2xl p-8 text-white relative overflow-hidden shadow-2xl border border-slate-800">
      {/* Background glow effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-md w-full text-center space-y-8 z-10">
        {/* Animated AI Icon */}
        <div className="relative inline-flex items-center justify-center">
          <div className="w-24 h-24 rounded-3xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center shadow-xl shadow-emerald-900/40 animate-pulse">
            <Cpu className="w-12 h-12 text-white" />
          </div>
          <div className="absolute -top-2 -right-2 p-2 bg-emerald-400 text-slate-950 rounded-full shadow-md animate-bounce">
            <Sparkles className="w-4 h-4" />
          </div>
        </div>

        <div>
          <h2 className="text-xl font-bold tracking-tight text-white">PackWise AI Recommendation Engine</h2>
          <p className="text-xs text-slate-400 mt-1">SIH Deterministic Multivariable Scoring Matrix v2.4</p>
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs font-semibold text-slate-300">
            <span>Evaluating Matrix</span>
            <span className="font-mono text-emerald-400">{progressPct}%</span>
          </div>
          <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden p-0.5 border border-slate-700">
            <div
              className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progressPct}%` }}
            ></div>
          </div>
        </div>

        {/* Step-by-Step Status List */}
        <div className="space-y-2 text-left bg-slate-950/80 rounded-xl p-4 border border-slate-800">
          {steps.map((stepText, idx) => {
            const isDone = idx < currentStepIndex;
            const isCurrent = idx === currentStepIndex;
            return (
              <div
                key={idx}
                className={`flex items-center space-x-3 text-xs transition-opacity duration-200 ${
                  isDone
                    ? 'text-emerald-400 font-medium'
                    : isCurrent
                    ? 'text-white font-bold animate-pulse'
                    : 'text-slate-600'
                }`}
              >
                {isDone ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                ) : isCurrent ? (
                  <div className="w-4 h-4 rounded-full border-2 border-emerald-400 border-t-transparent animate-spin flex-shrink-0" />
                ) : (
                  <div className="w-4 h-4 rounded-full border border-slate-700 flex-shrink-0" />
                )}
                <span className="truncate">{stepText}</span>
              </div>
            );
          })}
        </div>

        <div className="flex items-center justify-center space-x-2 text-[11px] text-slate-500 font-mono">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
          <span>MoFPI Food Safety & Packaging Guidelines Compliant</span>
        </div>
      </div>
    </div>
  );
};
