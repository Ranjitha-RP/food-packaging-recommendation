import React from 'react';
import { AlertTriangle, Info } from 'lucide-react';

interface DisclaimerBannerProps {
  compact?: boolean;
  className?: string;
}

export const DisclaimerBanner: React.FC<DisclaimerBannerProps> = ({ compact = false, className = '' }) => {
  if (compact) {
    return (
      <div className={`bg-amber-50 border border-amber-200 text-amber-900 rounded-lg p-3 text-xs flex items-start space-x-2 ${className}`}>
        <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
        <div>
          <span className="font-semibold">Decision-Support Prototype:</span> All numerical estimates and gas compositions are illustrative targets requiring laboratory validation.
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-amber-50/90 backdrop-blur border border-amber-200/80 rounded-xl p-4 text-xs text-amber-900 flex items-start space-x-3 shadow-xs ${className}`}>
      <div className="p-1.5 bg-amber-100 rounded-lg text-amber-700 flex-shrink-0">
        <Info className="w-4 h-4" />
      </div>
      <div className="leading-relaxed">
        <span className="font-bold text-amber-950 block mb-0.5">IMPORTANT SCIENTIFIC & REGULATORY DISCLAIMER</span>
        This system is a decision-support prototype. Packaging recommendations, shelf-life estimates, barrier target specifications, and gas-composition suggestions are illustrative and require laboratory testing, regulatory compliance checks, and experimental validation for commercial use.
      </div>
    </div>
  );
};
