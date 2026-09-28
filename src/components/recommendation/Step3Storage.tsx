import React from 'react';
import { StorageConditions, StorageType, TransportCondition, HandlingType } from '../../types/packaging';
import { Tooltip } from '../common/Tooltip';
import { ChevronRight, ChevronLeft, Truck, Snowflake, Sun, Thermometer, ShieldAlert } from 'lucide-react';

interface Step3Props {
  storageProps: StorageConditions;
  setStorageProps: (props: StorageConditions) => void;
  onNext: () => void;
  onBack: () => void;
}

export const Step3Storage: React.FC<Step3Props> = ({ storageProps, setStorageProps, onNext, onBack }) => {
  const handleChange = (field: keyof StorageConditions, value: any) => {
    setStorageProps({ ...storageProps, [field]: value });
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs">
        <div className="flex items-center space-x-3 mb-4 pb-4 border-b border-slate-100">
          <div className="p-2.5 bg-blue-50 rounded-xl text-blue-600">
            <Truck className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-900">Step 3: Storage & Transportation Logistics</h2>
            <p className="text-xs text-slate-500">Define ambient environment, cold-chain specifics, and transit handling stress.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Storage Type */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center">
              Storage Temperature Regime
              <Tooltip content="Primary ambient or cold chain storage classification." />
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(['Ambient', 'Chilled', 'Frozen'] as StorageType[]).map((type) => (
                <button
                  type="button"
                  key={type}
                  onClick={() => {
                    const temp = type === 'Ambient' ? 25 : type === 'Chilled' ? 4 : -18;
                    setStorageProps({ ...storageProps, storageType: type, temperature: temp });
                  }}
                  className={`py-2.5 px-3 rounded-xl text-xs font-bold flex items-center justify-center space-x-1.5 transition-all ${
                    storageProps.storageType === type
                      ? 'bg-slate-900 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {type === 'Ambient' && <Sun className="w-3.5 h-3.5 text-amber-400" />}
                  {type === 'Chilled' && <Snowflake className="w-3.5 h-3.5 text-cyan-400" />}
                  {type === 'Frozen' && <Snowflake className="w-3.5 h-3.5 text-blue-400" />}
                  <span>{type}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Storage Temperature (°C) */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-bold text-slate-700 flex items-center">
                Storage Temperature (°C)
                <Tooltip content="Specific target temperature of the storage environment." />
              </label>
              <span className="text-xs font-mono font-bold text-blue-600">{storageProps.temperature}°C</span>
            </div>
            <input
              type="number"
              value={storageProps.temperature}
              onChange={(e) => handleChange('temperature', parseFloat(e.target.value) || 0)}
              className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 font-semibold focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* Relative Humidity (%) */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-bold text-slate-700 flex items-center">
                Relative Humidity (%)
                <Tooltip content="Environmental relative humidity. High RH (> 85%) demands water-resistant outer layers and moisture barriers." />
              </label>
              <span className="text-xs font-mono font-bold text-blue-600">{storageProps.relativeHumidity}% RH</span>
            </div>
            <input
              type="range"
              min="20"
              max="98"
              value={storageProps.relativeHumidity}
              onChange={(e) => handleChange('relativeHumidity', parseInt(e.target.value))}
              className="w-full accent-blue-600 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 mt-0.5">
              <span>20% (Dry)</span>
              <span>60%</span>
              <span>98% (Saturated RH)</span>
            </div>
          </div>

          {/* Transportation Duration */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center">
              Transportation Duration (hours)
              <Tooltip content="Total expected transit time from farm/factory to retail shelf." />
            </label>
            <input
              type="number"
              min="1"
              max="360"
              value={storageProps.transportDuration}
              onChange={(e) => handleChange('transportDuration', parseInt(e.target.value) || 1)}
              className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 font-semibold focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* Transport Condition */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center">
              Transportation Condition
              <Tooltip content="Type of vehicle or cold chain logistics container employed." />
            </label>
            <select
              value={storageProps.transportCondition}
              onChange={(e) => handleChange('transportCondition', e.target.value as TransportCondition)}
              className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 font-semibold focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              {(['Normal', 'Refrigerated', 'Cold Chain', 'Frozen Chain'] as TransportCondition[]).map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          {/* Expected Handling */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center">
              Expected Mechanical Handling Stress
              <Tooltip content="Intensity of stacking, vibration, drops, and rough roads encountered during transport." />
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(['Low', 'Medium', 'High'] as HandlingType[]).map((h) => (
                <button
                  type="button"
                  key={h}
                  onClick={() => handleChange('handling', h)}
                  className={`py-2 rounded-xl text-xs font-bold transition-all ${
                    storageProps.handling === h
                      ? 'bg-slate-900 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {h}
                </button>
              ))}
            </div>
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
          <span>Back to Food Properties</span>
        </button>

        <button
          type="button"
          onClick={onNext}
          className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-md transition-all flex items-center space-x-2"
        >
          <span>Continue to Packaging Requirements</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
