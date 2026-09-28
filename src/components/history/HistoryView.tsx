import React, { useState } from 'react';
import { MOCK_HISTORY } from '../../data/mockHistory';
import { HistoryRecord } from '../../types/packaging';
import { DisclaimerBanner } from '../common/DisclaimerBanner';
import { History, Search, Filter, Eye, ArrowRight, CheckCircle2 } from 'lucide-react';

interface HistoryViewProps {
  onViewRecord: (record: HistoryRecord) => void;
}

export const HistoryView: React.FC<HistoryViewProps> = ({ onViewRecord }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');

  const filteredHistory = MOCK_HISTORY.filter((item) => {
    const matchCategory = categoryFilter === 'All' || item.category === categoryFilter;
    const matchSearch =
      item.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.recommendedMaterial.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.id.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchSearch;
  });

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight flex items-center">
            <History className="w-6 h-6 text-emerald-600 mr-2" />
            Recommendation History Log
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Archived record of all previous AI packaging recommendations, scores, and shelf-life predictions.
          </p>
        </div>
      </div>

      {/* Search & Filter bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search product, material or REC ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        <div className="flex items-center space-x-2 w-full sm:w-auto">
          <Filter className="w-4 h-4 text-slate-400" />
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:outline-none"
          >
            <option value="All">All Categories</option>
            <option value="Fruits">Fruits</option>
            <option value="Vegetables">Vegetables</option>
            <option value="Dairy">Dairy</option>
            <option value="Meat">Meat</option>
            <option value="Fish">Fish</option>
            <option value="Grains">Grains</option>
            <option value="Snacks">Snacks</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase">
                <th className="p-3.5">REC ID</th>
                <th className="p-3.5">Food Product</th>
                <th className="p-3.5">Storage</th>
                <th className="p-3.5">Recommended Material</th>
                <th className="p-3.5">Shelf Life</th>
                <th className="p-3.5">Sustainability</th>
                <th className="p-3.5">Match Score</th>
                <th className="p-3.5">Date</th>
                <th className="p-3.5 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredHistory.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                  <td className="p-3.5 font-mono font-bold text-slate-900">{item.id}</td>
                  <td className="p-3.5">
                    <span className="font-bold text-slate-900 block">{item.productName}</span>
                    <span className="text-[10px] text-slate-400">{item.category}</span>
                  </td>
                  <td className="p-3.5">
                    <span className="px-2 py-0.5 bg-slate-100 text-slate-700 rounded text-[10px] font-semibold">
                      {item.storageType}
                    </span>
                  </td>
                  <td className="p-3.5 font-semibold text-emerald-800">{item.recommendedMaterial}</td>
                  <td className="p-3.5 font-mono">{item.shelfLife}</td>
                  <td className="p-3.5">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      item.sustainability === 'High'
                        ? 'bg-emerald-100 text-emerald-800'
                        : item.sustainability === 'Medium'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}>
                      {item.sustainability} Eco
                    </span>
                  </td>
                  <td className="p-3.5 font-mono font-bold text-slate-900">{item.confidence}%</td>
                  <td className="p-3.5 text-slate-500">{item.date}</td>
                  <td className="p-3.5 text-right">
                    <button
                      onClick={() => onViewRecord(item)}
                      className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-lg text-xs transition-colors inline-flex items-center space-x-1"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>View</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <DisclaimerBanner />
    </div>
  );
};
