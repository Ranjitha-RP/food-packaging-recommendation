import React, { useState } from 'react';
import { COMMODITY_PRESETS, CommodityPreset } from '../../data/commodities';
import { FoodCategory, FoodProperties, StorageConditions, PackagingRequirements } from '../../types/packaging';
import { Search, Sparkles, Check, ChevronRight, Apple, Carrot, Wheat, Milk, Package, Cookie, Fish, Drumstick, Flame, Layers } from 'lucide-react';

interface Step1Props {
  foodProps: FoodProperties;
  setFoodProps: (props: FoodProperties) => void;
  setStorageProps: (props: StorageConditions) => void;
  setRequirements: (reqs: PackagingRequirements) => void;
  onNext: () => void;
  onLoadDemo: () => void;
}

export const Step1Commodity: React.FC<Step1Props> = ({
  foodProps,
  setFoodProps,
  setStorageProps,
  setRequirements,
  onNext,
  onLoadDemo
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories: string[] = [
    'All',
    'Fruits',
    'Vegetables',
    'Dairy',
    'Meat',
    'Fish',
    'Grains',
    'Pulses',
    'Bakery',
    'Snacks',
    'Processed Foods'
  ];

  const filteredPresets = COMMODITY_PRESETS.filter((item) => {
    const matchCat = selectedCategory === 'All' || item.category === selectedCategory;
    const matchSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  const handleSelectPreset = (preset: CommodityPreset) => {
    setFoodProps(preset.defaultFoodProps);
    setStorageProps(preset.defaultStorageProps);
    setRequirements(preset.defaultRequirements);
  };

  const getIcon = (name: string) => {
    switch (name) {
      case 'Apple': return <Apple className="w-5 h-5 text-amber-600" />;
      case 'Carrot': return <Carrot className="w-5 h-5 text-orange-600" />;
      case 'Wheat': return <Wheat className="w-5 h-5 text-yellow-600" />;
      case 'Milk': return <Milk className="w-5 h-5 text-blue-600" />;
      case 'Cookie': return <Cookie className="w-5 h-5 text-amber-700" />;
      case 'Fish': return <Fish className="w-5 h-5 text-cyan-600" />;
      case 'Drumstick': return <Drumstick className="w-5 h-5 text-red-600" />;
      case 'Flame': return <Flame className="w-5 h-5 text-red-500" />;
      default: return <Package className="w-5 h-5 text-emerald-600" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner & Quick Demo Preload */}
      <div className="bg-gradient-to-r from-emerald-900 to-teal-800 rounded-2xl p-6 text-white shadow-lg relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="z-10 max-w-xl">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 bg-emerald-700/60 rounded-full text-xs font-semibold text-emerald-200 mb-2 border border-emerald-500/30">
            <Sparkles className="w-3.5 h-3.5" />
            <span>SIH Demo Scenario Available</span>
          </div>
          <h2 className="text-xl font-bold tracking-tight">Step 1: Select Food Commodity</h2>
          <p className="text-xs text-emerald-100/90 mt-1">
            Choose from predefined Indian commodities with pre-calibrated baseline parameters, or enter custom product properties.
          </p>
        </div>

        <button
          type="button"
          onClick={onLoadDemo}
          className="z-10 px-4 py-2.5 bg-white text-emerald-900 hover:bg-emerald-50 font-bold rounded-xl text-xs shadow-md transition-all flex items-center space-x-2 flex-shrink-0"
        >
          <Sparkles className="w-4 h-4 text-emerald-600" />
          <span>Preload Alphonso Mango Demo</span>
        </button>
      </div>

      {/* Category Tabs & Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Category selector pills */}
        <div className="flex items-center space-x-1.5 overflow-x-auto w-full pb-2 sm:pb-0 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
                selectedCategory === cat
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200/80'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search input */}
        <div className="relative w-full sm:w-64 flex-shrink-0">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search food product..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent shadow-2xs"
          />
        </div>
      </div>

      {/* Commodity Presets Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredPresets.map((preset) => {
          const isSelected = foodProps.commodityName === preset.name;
          return (
            <div
              key={preset.id}
              onClick={() => handleSelectPreset(preset)}
              className={`p-4 rounded-xl border transition-all cursor-pointer relative flex flex-col justify-between ${
                isSelected
                  ? 'bg-emerald-50/90 border-emerald-500 ring-2 ring-emerald-500/20 shadow-sm'
                  : 'bg-white border-slate-200 hover:border-slate-300 hover:shadow-sm'
              }`}
            >
              {isSelected && (
                <span className="absolute top-3 right-3 p-1 bg-emerald-600 text-white rounded-full">
                  <Check className="w-3.5 h-3.5" />
                </span>
              )}
              <div>
                <div className="flex items-center space-x-3 mb-2">
                  <div className={`p-2.5 rounded-xl ${isSelected ? 'bg-emerald-100' : 'bg-slate-100'}`}>
                    {getIcon(preset.iconName)}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">{preset.name}</h3>
                    <span className="text-[10px] font-semibold px-2 py-0.5 bg-slate-100 text-slate-600 rounded-full border border-slate-200">
                      {preset.category}
                    </span>
                  </div>
                </div>
                <p className="text-xs text-slate-500 line-clamp-2 mt-1">{preset.description}</p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100/80 flex items-center justify-between text-[11px] text-slate-600 font-medium">
                <span>Moisture: <strong className="text-slate-900">{preset.defaultFoodProps.moistureContent}%</strong></span>
                <span>Respiration: <strong className="text-slate-900">{preset.defaultFoodProps.respirationRate}</strong></span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Custom Commodity Option */}
      <div className="bg-slate-50 border border-dashed border-slate-300 rounded-xl p-4 flex items-center justify-between">
        <div>
          <h4 className="text-xs font-bold text-slate-900">Don't see your commodity listed?</h4>
          <p className="text-xs text-slate-500">You can enter custom food parameters manually in Step 2.</p>
        </div>
        <button
          onClick={() => {
            setFoodProps({
              commodityName: 'Custom Food Product',
              category: 'Custom Product',
              moistureContent: 50,
              oilFatContent: 5,
              pH: 6.0,
              respirationRate: 'Medium',
              initialShelfLife: 7,
              targetShelfLife: 21
            });
          }}
          className="px-3.5 py-2 bg-slate-900 text-white text-xs font-semibold rounded-lg hover:bg-slate-800 transition-colors"
        >
          Select Custom Product
        </button>
      </div>

      {/* Selected Commodity Banner & Next Button */}
      <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
        <div className="text-xs text-slate-600">
          Selected Commodity: <strong className="text-emerald-700 text-sm font-bold ml-1">{foodProps.commodityName}</strong>
        </div>
        <button
          type="button"
          onClick={onNext}
          className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-md transition-all flex items-center space-x-2"
        >
          <span>Continue to Food Properties</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
