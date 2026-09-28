import React from 'react';
import { KpiCard } from '../common/KpiCard';
import { DisclaimerBanner } from '../common/DisclaimerBanner';
import { MOCK_HISTORY } from '../../data/mockHistory';
import { HistoryRecord } from '../../types/packaging';
import {
  Sparkles,
  PackageSearch,
  TrendingUp,
  ShieldCheck,
  ArrowRight,
  Eye,
  Layers,
  Leaf,
  BarChart3,
  Award
} from 'lucide-react';

interface DashboardPageProps {
  onStartRecommendation: () => void;
  onLoadDemo: () => void;
  onViewRecord: (record: HistoryRecord) => void;
  setActiveTab: (tab: string) => void;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({
  onStartRecommendation,
  onLoadDemo,
  onViewRecord,
  setActiveTab
}) => {
  const recentRows = MOCK_HISTORY.slice(0, 6);

  return (
    <div className="space-y-8">
      {/* Hero Welcome Card */}
      <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-teal-950 rounded-3xl p-6 sm:p-10 text-white shadow-xl relative overflow-hidden border border-slate-800">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-2xl space-y-4 relative z-10">
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded-full text-xs font-semibold">
            <Award className="w-3.5 h-3.5 text-emerald-400" />
            <span>Smart India Hackathon 2026 Prototype • MoFPI Domain</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
            Make smarter packaging decisions with AI
          </h1>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
            Analyze food properties, storage conditions and transportation requirements to identify suitable packaging materials and specifications.
          </p>

          <div className="pt-3 flex flex-wrap items-center gap-3">
            <button
              onClick={onStartRecommendation}
              className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-slate-950 font-extrabold text-xs sm:text-sm rounded-xl shadow-lg shadow-emerald-900/30 transition-all flex items-center space-x-2 transform hover:scale-[1.02]"
            >
              <Sparkles className="w-4 h-4 text-slate-950" />
              <span>Generate Packaging Recommendation</span>
            </button>

            <button
              onClick={onLoadDemo}
              className="px-5 py-3 bg-slate-800 hover:bg-slate-700 text-emerald-300 font-bold text-xs sm:text-sm rounded-xl border border-slate-700 transition-colors flex items-center space-x-2"
            >
              <Leaf className="w-4 h-4 text-emerald-400" />
              <span>Load Alphonso Mango Demo</span>
            </button>
          </div>
        </div>
      </div>

      {/* KPI Cards (Req #4) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <KpiCard
          title="Products Analyzed"
          value="1,284"
          subtitle="Indian food commodities"
          change="+14% this month"
          isPositive={true}
          icon={PackageSearch}
          iconBg="bg-blue-50"
          iconColor="text-blue-600"
        />

        <KpiCard
          title="Packaging Recommendations"
          value="1,092"
          subtitle="AI verified matrices"
          change="+18% adoption"
          isPositive={true}
          icon={Sparkles}
          iconBg="bg-emerald-50"
          iconColor="text-emerald-600"
        />

        <KpiCard
          title="Average Shelf-Life Improvement"
          value="+28%"
          subtitle="Commercial extension target"
          change="+6.2% vs baseline"
          isPositive={true}
          icon={TrendingUp}
          iconBg="bg-teal-50"
          iconColor="text-teal-600"
        />

        <KpiCard
          title="Food Waste Reduction"
          value="18.6%"
          subtitle="Post-harvest prevention"
          change="-4.1% spoilage loss"
          isPositive={true}
          icon={ShieldCheck}
          iconBg="bg-purple-50"
          iconColor="text-purple-600"
        />
      </div>

      {/* Quick Navigation Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div
          onClick={() => setActiveTab('library')}
          className="bg-white p-5 rounded-xl border border-slate-200/80 hover:border-emerald-300 hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="p-2.5 bg-emerald-50 text-emerald-600 rounded-xl">
              <Layers className="w-5 h-5" />
            </div>
            <ArrowRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
          </div>
          <h3 className="text-sm font-bold text-slate-900 group-hover:text-emerald-700">Explore Packaging Library</h3>
          <p className="text-xs text-slate-500 mt-1">
            Browse 10+ polymer films, biopolymers, laminates & technical barrier properties.
          </p>
        </div>

        <div
          onClick={() => setActiveTab('analytics')}
          className="bg-white p-5 rounded-xl border border-slate-200/80 hover:border-blue-300 hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl">
              <BarChart3 className="w-5 h-5" />
            </div>
            <ArrowRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
          </div>
          <h3 className="text-sm font-bold text-slate-900 group-hover:text-blue-700">Analytics Dashboard</h3>
          <p className="text-xs text-slate-500 mt-1">
            View shelf-life boost, cost comparisons, material usage distribution & food waste trends.
          </p>
        </div>

        <div
          onClick={() => setActiveTab('traceability')}
          className="bg-white p-5 rounded-xl border border-slate-200/80 hover:border-purple-300 hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="p-2.5 bg-purple-50 text-purple-600 rounded-xl">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <ArrowRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
          </div>
          <h3 className="text-sm font-bold text-slate-900 group-hover:text-purple-700">Batch Traceability</h3>
          <p className="text-xs text-slate-500 mt-1">
            Generate printable PDF reports & QR code passports for batch audit verification.
          </p>
        </div>
      </div>

      {/* Recent Recommendations Table (Req #4) */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-slate-900">Recent Recommendations</h2>
            <p className="text-xs text-slate-500">Latest decision-support recommendations evaluated by the AI engine.</p>
          </div>
          <button
            onClick={() => setActiveTab('history')}
            className="text-xs font-bold text-emerald-600 hover:text-emerald-700 flex items-center space-x-1"
          >
            <span>View All ({MOCK_HISTORY.length})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200/80 text-slate-600 font-bold uppercase tracking-wider">
                <th className="p-4">Product</th>
                <th className="p-4">Storage</th>
                <th className="p-4">Recommended Material</th>
                <th className="p-4">Shelf Life</th>
                <th className="p-4">Sustainability</th>
                <th className="p-4">Date</th>
                <th className="p-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {recentRows.map((row) => (
                <tr key={row.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="p-4">
                    <span className="font-bold text-slate-900 block">{row.productName}</span>
                    <span className="text-[10px] text-slate-400 font-semibold">{row.category}</span>
                  </td>
                  <td className="p-4">
                    <span className="px-2.5 py-1 bg-slate-100 text-slate-700 rounded-md text-[10px] font-bold">
                      {row.storageType}
                    </span>
                  </td>
                  <td className="p-4 font-semibold text-emerald-800">{row.recommendedMaterial}</td>
                  <td className="p-4 font-mono font-semibold text-slate-700">{row.shelfLife}</td>
                  <td className="p-4">
                    <span
                      className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                        row.sustainability === 'High'
                          ? 'bg-emerald-100 text-emerald-800'
                          : row.sustainability === 'Medium'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {row.sustainability}
                    </span>
                  </td>
                  <td className="p-4 text-slate-500 font-mono">{row.date}</td>
                  <td className="p-4 text-right">
                    <button
                      onClick={() => onViewRecord(row)}
                      className="px-3.5 py-1.5 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-lg text-xs transition-colors inline-flex items-center space-x-1 shadow-2xs"
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
