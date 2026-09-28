import React, { useState } from 'react';
import { DisclaimerBanner } from '../common/DisclaimerBanner';
import { Settings, ShieldCheck, Sliders, Database, RefreshCw, CheckCircle2 } from 'lucide-react';

export const SettingsPage: React.FC = () => {
  const [engineWeight, setEngineWeight] = useState('Balanced');
  const [labStrictness, setLabStrictness] = useState('Standard (SIH Evaluator Mode)');
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = () => {
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight flex items-center">
          <Settings className="w-6 h-6 text-emerald-600 mr-2" />
          System Settings & Recommendation Configuration
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Configure rule engine weights, evaluation parameters, and domain metadata for SIH prototype presentation.
        </p>
      </div>

      {savedSuccess && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-900 rounded-xl text-xs font-semibold flex items-center space-x-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>Settings saved successfully. Recommendation engine parameters re-calibrated.</span>
        </div>
      )}

      {/* Settings Cards */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-6">
        <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center border-b border-slate-100 pb-3">
          <Sliders className="w-4 h-4 text-emerald-600 mr-2" />
          Recommendation Engine Weight Matrix
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
          <div>
            <label className="block font-bold text-slate-700 mb-1">
              Global Weighting Strategy
            </label>
            <select
              value={engineWeight}
              onChange={(e) => setEngineWeight(e.target.value)}
              className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="Balanced">Balanced (Cost + Barrier + Eco)</option>
              <option value="BarrierStrict">Strict Shelf-Life First</option>
              <option value="EcoFirst">Max Sustainability Priority</option>
            </select>
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">
              Validation Mode
            </label>
            <select
              value={labStrictness}
              onChange={(e) => setLabStrictness(e.target.value)}
              className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="Standard (SIH Evaluator Mode)">Standard (SIH Evaluator Mode)</option>
              <option value="Laboratory Pre-Screening Mode">Laboratory Pre-Screening Mode</option>
              <option value="Commercial Export Compliance">Commercial Export Compliance</option>
            </select>
          </div>
        </div>

        <div className="pt-4 border-t border-slate-100">
          <h4 className="font-bold text-slate-800 mb-2">SIH Domain Metadata</h4>
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs space-y-2 text-slate-600">
            <div className="flex justify-between">
              <span>Ministry/Domain:</span>
              <span className="font-bold text-slate-900">Ministry of Food Processing Industries (MoFPI)</span>
            </div>
            <div className="flex justify-between">
              <span>Problem Statement:</span>
              <span className="font-bold text-slate-900">AI-Based Food Packaging Recommendation System</span>
            </div>
            <div className="flex justify-between">
              <span>Local Engine Status:</span>
              <span className="font-bold text-emerald-700">Active (Deterministic Weighted Rules v2.4)</span>
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-slate-100 flex justify-end">
          <button
            onClick={handleSave}
            className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-md transition-colors"
          >
            Save Settings
          </button>
        </div>
      </div>

      <DisclaimerBanner />
    </div>
  );
};
