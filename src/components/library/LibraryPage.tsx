import React, { useState } from 'react';
import { PACKAGING_MATERIALS } from '../../data/materials';
import { PackagingMaterial } from '../../types/packaging';
import { DisclaimerBanner } from '../common/DisclaimerBanner';
import { Search, Filter, Layers, CheckCircle2, Shield, Leaf, DollarSign, X, ExternalLink } from 'lucide-react';

export const LibraryPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedMaterial, setSelectedMaterial] = useState<PackagingMaterial | null>(null);

  const categories = ['All', 'Flexible Film', 'Flexible Plastic', 'Rigid Packaging', 'Multilayer Laminate', 'Barrier Laminate', 'Ultra-High Barrier', 'Biopolymer / Eco-Friendly', 'Specialty Film'];

  const filteredMaterials = PACKAGING_MATERIALS.filter((mat) => {
    const matchCat = selectedCategory === 'All' || mat.category.includes(selectedCategory);
    const matchSearch =
      mat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      mat.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      mat.recommendedFoodTypes.some((f) => f.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchCat && matchSearch;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight flex items-center">
            <Layers className="w-6 h-6 text-emerald-600 mr-2" />
            Packaging Material Library
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Comprehensive catalog of food packaging polymers, biopolymers, laminates, and barrier films.
          </p>
        </div>
      </div>

      {/* Filters and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search material, food type, or barrier..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        <div className="flex items-center space-x-2 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
          <Filter className="w-4 h-4 text-slate-400 flex-shrink-0" />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:outline-none"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Empty State */}
      {filteredMaterials.length === 0 && (
        <div className="bg-white rounded-xl border border-slate-200 p-12 text-center space-y-3">
          <Layers className="w-12 h-12 text-slate-300 mx-auto" />
          <h3 className="text-sm font-bold text-slate-800">No Packaging Materials Found</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Try adjusting your search query or switching category filters.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('All');
            }}
            className="px-4 py-2 bg-emerald-600 text-white text-xs font-semibold rounded-lg hover:bg-emerald-700"
          >
            Clear Filters
          </button>
        </div>
      )}

      {/* Material Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMaterials.map((mat) => (
          <div
            key={mat.id}
            onClick={() => setSelectedMaterial(mat)}
            className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-start justify-between mb-2">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 bg-slate-100 text-slate-700 rounded-full border border-slate-200">
                  {mat.category}
                </span>
                <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                  Eco {mat.recyclabilityScore}%
                </span>
              </div>

              <h3 className="text-base font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                {mat.name}
              </h3>
              <p className="text-xs text-slate-500 mt-1 line-clamp-2">{mat.description}</p>

              {/* Barrier Badges */}
              <div className="grid grid-cols-2 gap-2 mt-4 pt-3 border-t border-slate-100 text-xs">
                <div className="bg-slate-50 p-2 rounded-lg">
                  <span className="text-[10px] text-slate-400 block font-semibold">Moisture Barrier</span>
                  <span className="font-bold text-slate-800">{mat.moistureBarrier}</span>
                </div>
                <div className="bg-slate-50 p-2 rounded-lg">
                  <span className="text-[10px] text-slate-400 block font-semibold">Oxygen Barrier</span>
                  <span className="font-bold text-slate-800">{mat.oxygenBarrier}</span>
                </div>
              </div>

              {/* Food compatibility chips */}
              <div className="mt-3">
                <span className="text-[10px] text-slate-400 font-bold block mb-1">Recommended Foods:</span>
                <div className="flex flex-wrap gap-1">
                  {mat.recommendedFoodTypes.slice(0, 3).map((food) => (
                    <span key={food} className="text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-medium">
                      {food}
                    </span>
                  ))}
                  {mat.recommendedFoodTypes.length > 3 && (
                    <span className="text-[10px] text-slate-400 font-medium">+{mat.recommendedFoodTypes.length - 3} more</span>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-emerald-700">
              <span>View Technical Details</span>
              <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </div>
        ))}
      </div>

      {/* Modal / Detail Drawer for Selected Material */}
      {selectedMaterial && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 space-y-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelectedMaterial(null)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 rounded-lg bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                {selectedMaterial.category}
              </span>
              <h2 className="text-xl font-bold text-slate-900 mt-2">{selectedMaterial.name}</h2>
              <p className="text-xs text-slate-600 mt-1">{selectedMaterial.description}</p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-[10px] text-slate-400 font-bold block">Moisture Barrier</span>
                <span className="font-bold text-slate-900 text-sm">{selectedMaterial.moistureBarrier}</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-[10px] text-slate-400 font-bold block">Oxygen Barrier</span>
                <span className="font-bold text-slate-900 text-sm">{selectedMaterial.oxygenBarrier}</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-[10px] text-slate-400 font-bold block">Breathability</span>
                <span className="font-bold text-slate-900 text-sm">{selectedMaterial.breathability}</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-[10px] text-slate-400 font-bold block">Cost Level</span>
                <span className="font-bold text-slate-900 text-sm">{selectedMaterial.costLevel}</span>
              </div>
            </div>

            <div className="space-y-2 text-xs">
              <h4 className="font-bold text-slate-800">Barrier & Polymer Notes</h4>
              <p className="text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-200">{selectedMaterial.barrierNotes}</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <span className="font-bold text-slate-800 block mb-1">Recommended Food Types:</span>
                <ul className="list-disc list-inside space-y-1 text-slate-600">
                  {selectedMaterial.recommendedFoodTypes.map((ft) => (
                    <li key={ft}>{ft}</li>
                  ))}
                </ul>
              </div>
              <div className="space-y-2">
                <div>
                  <span className="font-bold text-slate-800 block">Temperature Range:</span>
                  <span className="text-slate-600 font-mono">{selectedMaterial.tempSuitability}</span>
                </div>
                <div>
                  <span className="font-bold text-slate-800 block">MAP Compatibility:</span>
                  <span className="text-emerald-700 font-semibold">{selectedMaterial.MAPSuitability ? 'Suitable for MAP' : 'Non-MAP Standard'}</span>
                </div>
                <div>
                  <span className="font-bold text-slate-800 block">Eco Recyclability Score:</span>
                  <span className="text-slate-900 font-mono font-bold">{selectedMaterial.recyclabilityScore}/100</span>
                </div>
              </div>
            </div>

            <DisclaimerBanner compact />
          </div>
        </div>
      )}

      <DisclaimerBanner />
    </div>
  );
};
