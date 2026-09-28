import React from 'react';
import { DisclaimerBanner } from '../common/DisclaimerBanner';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-12 border-t border-slate-200/80 bg-slate-100/50 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-4">
        <DisclaimerBanner />
        <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-200/60">
          <p>© 2026 PackWise AI — Smart India Hackathon (SIH) Prototype | MoFPI Domain</p>
          <div className="flex space-x-4 mt-2 sm:mt-0">
            <span>Local Rule Engine Active</span>
            <span>•</span>
            <span>Laboratory Testing Required</span>
            <span>•</span>
            <span>v2.4.0</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
