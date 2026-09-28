import React from 'react';
import { FoodProperties, RespirationRate, FoodCategory } from '../../types/packaging';
import { Tooltip } from '../common/Tooltip';
import { ChevronRight, ChevronLeft, Info, Thermometer, Droplets, Activity } from 'lucide-react';

interface Step2Props {
  foodProps: FoodProperties;
  setFoodProps: (props: FoodProperties) => void;
  onNext: () => void;
  onBack: () => void;
}

export const Step2Properties: React.FC<Step2Props> = ({ foodProps, setFoodProps, onNext, onBack }) => {
  const handleChange = (field: keyof FoodProperties, value: any) => {
    setFoodProps({ ...foodProps, [field]: value });
  };

  const categories: FoodCategory[] = [
    'Fruits',
    'Vegetables',
    'Dairy',
    'Meat',
    'Fish',
    'Grains',
    'Pulses',
    'Bakery',
    'Snacks',
    'Processed Foods',
    'Custom Product'
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs">
        <div className="flex items-center space-x-3 mb-4 pb-4 border-b border-slate-100">
          <div className="p-2.5 bg-emerald-50 rounded-xl text-emerald-600">
            <Activity className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-900">Step 2: Food Physico-Chemical Properties</h2>
            <p className="text-xs text-slate-500">Fine-tune the physiological parameters of {foodProps.commodityName}.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Commodity Name */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Commodity Name
            </label>
            <input
              type="text"
              value={foodProps.commodityName}
              onChange={(e) => handleChange('commodityName', e.target.value)}
              className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 font-semibold focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            />
          </div>

          {/* Commodity Category */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Commodity Category
            </label>
            <select
              value={foodProps.category}
              onChange={(e) => handleChange('category', e.target.value as FoodCategory)}
              className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 font-semibold focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            >
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          {/* Moisture Content */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-bold text-slate-700 flex items-center">
                Moisture Content (%)
                <Tooltip content="Percentage of water present in the food. High moisture foods generally require stronger moisture barriers or breathable films to prevent condensation." />
              </label>
              <span className="text-xs font-mono font-bold text-emerald-700">{foodProps.moistureContent}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              step="0.5"
              value={foodProps.moistureContent}
              onChange={(e) => handleChange('moistureContent', parseFloat(e.target.value))}
              className="w-full accent-emerald-600 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 mt-0.5">
              <span>0% (Dry)</span>
              <span>50%</span>
              <span>100% (High moisture)</span>
            </div>
          </div>

          {/* Oil / Fat Content */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-bold text-slate-700 flex items-center">
                Oil / Fat Content (%)
                <Tooltip content="Fat level in food. High oil/fat products (like chips or groundnuts) oxidise easily in presence of oxygen and UV light, requiring high barrier metallic or foil laminates." />
              </label>
              <span className="text-xs font-mono font-bold text-emerald-700">{foodProps.oilFatContent}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="60"
              step="0.5"
              value={foodProps.oilFatContent}
              onChange={(e) => handleChange('oilFatContent', parseFloat(e.target.value))}
              className="w-full accent-emerald-600 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 mt-0.5">
              <span>0% (Lean)</span>
              <span>30%</span>
              <span>60% (High fat)</span>
            </div>
          </div>

          {/* pH */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-bold text-slate-700 flex items-center">
                Acidity Level (pH)
                <Tooltip content="Measure of acidity (0-14). Acidic foods (pH < 4.5) dictate anti-corrosive sealant layers and affect microbial spoilage risk." />
              </label>
              <span className="text-xs font-mono font-bold text-emerald-700">pH {foodProps.pH}</span>
            </div>
            <input
              type="number"
              min="1.0"
              max="14.0"
              step="0.1"
              value={foodProps.pH}
              onChange={(e) => handleChange('pH', parseFloat(e.target.value))}
              className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 font-semibold focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            />
          </div>

          {/* Respiration Rate */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center">
              Respiration Rate
              <Tooltip content="Rate at which living produce consumes oxygen and releases CO2. High respiration commodities (mango, tomato) require micro-perforated or breathable packaging rather than hermetic seals." />
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(['Low', 'Medium', 'High'] as RespirationRate[]).map((rate) => (
                <button
                  type="button"
                  key={rate}
                  onClick={() => handleChange('respirationRate', rate)}
                  className={`py-2 rounded-xl text-xs font-bold transition-all ${
                    foodProps.respirationRate === rate
                      ? 'bg-slate-900 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {rate}
                </button>
              ))}
            </div>
          </div>

          {/* Initial Shelf Life */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center">
              Initial Baseline Shelf Life (days)
              <Tooltip content="Unpackaged or standard bulk storage shelf life under normal baseline conditions." />
            </label>
            <input
              type="number"
              min="1"
              max="730"
              value={foodProps.initialShelfLife}
              onChange={(e) => handleChange('initialShelfLife', parseInt(e.target.value) || 1)}
              className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 font-semibold focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            />
          </div>

          {/* Target Shelf Life */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center">
              Target Extended Shelf Life (days)
              <Tooltip content="Desired shelf life expected with optimized intelligent packaging and modified atmosphere." />
            </label>
            <input
              type="number"
              min="1"
              max="730"
              value={foodProps.targetShelfLife}
              onChange={(e) => handleChange('targetShelfLife', parseInt(e.target.value) || 1)}
              className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 font-semibold focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
        <button
          type="button"
          onClick={onBack}
          className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-all flex items-center space-x-2"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Back to Commodity Selection</span>
        </button>

        <button
          type="button"
          onClick={onNext}
          className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-md transition-all flex items-center space-x-2"
        >
          <span>Continue to Storage Conditions</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
