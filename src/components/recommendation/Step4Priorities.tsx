import React from 'react';
import { PackagingRequirements, PackagingPriority, PackagingType, SustainabilityPreference } from '../../types/packaging';
import { Tooltip } from '../common/Tooltip';
import { ChevronLeft, Sparkles, Shield, DollarSign, Leaf, Sliders, CheckCircle2 } from 'lucide-react';

interface Step4Props {
  requirements: PackagingRequirements;
  setRequirements: (reqs: PackagingRequirements) => void;
  onGenerate: () => void;
  onBack: () => void;
}

export const Step4Priorities: React.FC<Step4Props> = ({ requirements, setRequirements, onGenerate, onBack }) => {
  const handleChange = (field: keyof PackagingRequirements, value: any) => {
    setRequirements({ ...requirements, [field]: value });
  };

  const priorities: { id: PackagingPriority; label: string; desc: string; icon: any }[] = [
    { id: 'Shelf Life', label: 'Maximize Shelf Life', desc: 'Prioritize gas & moisture barrier efficiency', icon: Shield },
    { id: 'Sustainability', label: 'Eco & Sustainability', desc: 'Prioritize compostability & recyclable polymers', icon: Leaf },
    { id: 'Cost', label: 'Cost Optimization', desc: 'Prioritize low-cost commercial materials', icon: DollarSign },
    { id: 'Balanced', label: 'Balanced Strategy', desc: 'Optimal trade-off between cost, eco & barrier', icon: Sliders }
  ];

  const packagingTypes: PackagingType[] = ['Flexible', 'Rigid', 'Tray', 'Pouch', 'Film', 'Bag', 'Container'];
  const sustainabilityOpts: SustainabilityPreference[] = ['No preference', 'Recyclable', 'Biodegradable', 'Compostable', 'Maximum sustainability'];

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs">
        <div className="flex items-center space-x-3 mb-4 pb-4 border-b border-slate-100">
          <div className="p-2.5 bg-purple-50 rounded-xl text-purple-600">
            <Sliders className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-900">Step 4: Packaging Goals & Sustainability Preferences</h2>
            <p className="text-xs text-slate-500">Configure weighting priorities for the AI decision-support matrix.</p>
          </div>
        </div>

        <div className="space-y-6">
          {/* Primary Recommendation Focus / Priority */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-2">
              Primary Optimization Goal
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {priorities.map((item) => {
                const IconComponent = item.icon;
                const isSelected = requirements.priority === item.id;
                return (
                  <div
                    key={item.id}
                    onClick={() => handleChange('priority', item.id)}
                    className={`p-4 rounded-xl border cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-purple-50/90 border-purple-500 ring-2 ring-purple-500/20 shadow-xs'
                        : 'bg-white border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className={`p-2 rounded-lg ${isSelected ? 'bg-purple-600 text-white' : 'bg-slate-100 text-slate-600'}`}>
                        <IconComponent className="w-4 h-4" />
                      </div>
                      {isSelected && <CheckCircle2 className="w-4 h-4 text-purple-600" />}
                    </div>
                    <h3 className="text-xs font-bold text-slate-900">{item.label}</h3>
                    <p className="text-[10px] text-slate-500 mt-0.5">{item.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-100">
            {/* Preferred Packaging Type */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center">
                Preferred Packaging Format
                <Tooltip content="Physical format constraint for primary unit packaging." />
              </label>
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                {packagingTypes.map((t) => (
                  <button
                    type="button"
                    key={t}
                    onClick={() => handleChange('preferredType', t)}
                    className={`py-2 px-2.5 rounded-xl text-xs font-bold transition-all text-center ${
                      requirements.preferredType === t
                        ? 'bg-slate-900 text-white shadow-xs'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {/* Sustainability Preference */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center">
                Sustainability & End-of-Life Target
                <Tooltip content="Environmental end-of-life requirement for compliance and brand eco targets." />
              </label>
              <select
                value={requirements.sustainabilityPref}
                onChange={(e) => handleChange('sustainabilityPref', e.target.value as SustainabilityPreference)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 font-semibold focus:bg-white focus:ring-2 focus:ring-purple-500 focus:outline-none"
              >
                {sustainabilityOpts.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Final Action Bar */}
      <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
        <button
          type="button"
          onClick={onBack}
          className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-all flex items-center space-x-2"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Back to Storage Conditions</span>
        </button>

        <button
          type="button"
          onClick={onGenerate}
          className="px-8 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white text-sm font-bold rounded-xl shadow-lg shadow-emerald-900/20 transition-all flex items-center space-x-2.5 transform hover:scale-[1.01]"
        >
          <Sparkles className="w-4 h-4 text-emerald-200 animate-pulse" />
          <span>Generate Packaging Recommendation</span>
        </button>
      </div>
    </div>
  );
};
