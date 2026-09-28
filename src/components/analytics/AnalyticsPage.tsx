import React, { useState } from 'react';
import {
  MATERIAL_USAGE_DATA,
  SHELF_LIFE_IMPROVEMENT_DATA,
  SUSTAINABILITY_TREND_DATA,
  COST_COMPARISON_DATA,
  FOOD_WASTE_REDUCTION_DATA
} from '../../data/mockAnalytics';
import { DisclaimerBanner } from '../common/DisclaimerBanner';
import { BarChart3, Filter, PieChart as PieIcon, TrendingUp, DollarSign, Leaf, ShieldAlert } from 'lucide-react';
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
  LineChart,
  Line
} from 'recharts';

export const AnalyticsPage: React.FC = () => {
  const [selectedCommodityFilter, setSelectedCommodityFilter] = useState('All');
  const [selectedStorageFilter, setSelectedStorageFilter] = useState('All');
  const [selectedDateRange, setSelectedDateRange] = useState('Last 6 Months');

  return (
    <div className="space-y-6">
      {/* Page Title */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight flex items-center">
            <BarChart3 className="w-6 h-6 text-emerald-600 mr-2" />
            AI Packaging Analytics & Insights
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Aggregate intelligent metrics across analyzed food commodities, shelf-life boost, waste reduction & eco impact.
          </p>
        </div>
      </div>

      {/* Analytics Filter Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
        <div className="flex items-center space-x-2">
          <Filter className="w-4 h-4 text-slate-400" />
          <span className="text-xs font-bold text-slate-700">Filter Analytics:</span>
        </div>

        <div className="flex flex-wrap items-center gap-3 text-xs">
          <div>
            <select
              value={selectedCommodityFilter}
              onChange={(e) => setSelectedCommodityFilter(e.target.value)}
              className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg font-semibold text-slate-700 focus:outline-none"
            >
              <option value="All">All Commodity Categories</option>
              <option value="Fruits">Fruits & Vegetables</option>
              <option value="Dairy">Dairy & Cheese</option>
              <option value="Snacks">Snacks & Bakery</option>
              <option value="Fish">Fish & Meat</option>
            </select>
          </div>

          <div>
            <select
              value={selectedStorageFilter}
              onChange={(e) => setSelectedStorageFilter(e.target.value)}
              className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg font-semibold text-slate-700 focus:outline-none"
            >
              <option value="All">All Storage Conditions</option>
              <option value="Ambient">Ambient Storage</option>
              <option value="Chilled">Chilled Cold Chain</option>
              <option value="Frozen">Frozen Chain</option>
            </select>
          </div>

          <div>
            <select
              value={selectedDateRange}
              onChange={(e) => setSelectedDateRange(e.target.value)}
              className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg font-semibold text-slate-700 focus:outline-none"
            >
              <option value="Last 30 Days">Last 30 Days</option>
              <option value="Last 6 Months">Last 6 Months</option>
              <option value="Year 2026">Year 2026</option>
            </select>
          </div>
        </div>
      </div>

      {/* Summary KPI Badges */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
          <span className="text-[10px] text-slate-400 font-bold uppercase block">Analyzed Batches</span>
          <span className="text-xl font-extrabold text-slate-900 mt-1 block">1,284</span>
          <span className="text-[10px] text-emerald-600 font-semibold">↑ +14% this month</span>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
          <span className="text-[10px] text-slate-400 font-bold uppercase block">Avg Shelf-Life Gain</span>
          <span className="text-xl font-extrabold text-emerald-600 mt-1 block">+138%</span>
          <span className="text-[10px] text-slate-500">vs un-packaged baseline</span>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
          <span className="text-[10px] text-slate-400 font-bold uppercase block">Plastic Waste Prevented</span>
          <span className="text-xl font-extrabold text-teal-600 mt-1 block">4.21 Tons</span>
          <span className="text-[10px] text-teal-600 font-semibold">Bio-PLA adoption</span>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
          <span className="text-[10px] text-slate-400 font-bold uppercase block">Food Spoilage Reduction</span>
          <span className="text-xl font-extrabold text-blue-600 mt-1 block">18.6%</span>
          <span className="text-[10px] text-blue-600 font-semibold">Post-harvest impact</span>
        </div>
      </div>

      {/* Grid of 5 Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* CHART 1: Packaging Material Usage */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center">
              <PieIcon className="w-4 h-4 text-emerald-600 mr-2" />
              1. Packaging Material Usage Distribution
            </h3>
            <span className="text-[10px] text-slate-400 font-mono">% Share</span>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={MATERIAL_USAGE_DATA}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={85}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {MATERIAL_USAGE_DATA.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <RechartsTooltip formatter={(val) => [`${val}%`, 'Usage Share']} />
                <Legend iconSize={8} layout="horizontal" verticalAlign="bottom" wrapperStyle={{ fontSize: '10px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* CHART 2: Shelf-Life Improvement by Commodity */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center">
              <TrendingUp className="w-4 h-4 text-emerald-600 mr-2" />
              2. Shelf-Life Extension by Commodity (Days)
            </h3>
            <span className="text-[10px] text-slate-400 font-mono">Before vs After</span>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={SHELF_LIFE_IMPROVEMENT_DATA}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="commodity" tick={{ fontSize: 9 }} />
                <YAxis tick={{ fontSize: 10 }} />
                <RechartsTooltip />
                <Legend iconSize={8} wrapperStyle={{ fontSize: '10px' }} />
                <Bar dataKey="before" name="Unpackaged Baseline" fill="#cbd5e1" radius={[4, 4, 0, 0]} />
                <Bar dataKey="after" name="PackWise Recommended" fill="#10b981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* CHART 3: Sustainability Score Trends */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center">
              <Leaf className="w-4 h-4 text-emerald-600 mr-2" />
              3. Sustainability Adoption & Eco Score Trend
            </h3>
            <span className="text-[10px] text-slate-400 font-mono">Monthly Progress</span>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={SUSTAINABILITY_TREND_DATA}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="month" tick={{ fontSize: 10 }} />
                <YAxis tick={{ fontSize: 10 }} />
                <RechartsTooltip />
                <Area type="monotone" dataKey="ecoScore" name="Avg Eco Score (/100)" stroke="#10b981" fill="#d1fae5" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* CHART 4: Packaging Cost Comparison */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center">
              <DollarSign className="w-4 h-4 text-emerald-600 mr-2" />
              4. Average Unit Packaging Cost Comparison (₹)
            </h3>
            <span className="text-[10px] text-slate-400 font-mono">By Category</span>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={COST_COMPARISON_DATA}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="category" tick={{ fontSize: 9 }} />
                <YAxis tick={{ fontSize: 10 }} />
                <RechartsTooltip formatter={(val) => [`₹${val}`, 'Cost/Unit']} />
                <Legend iconSize={8} wrapperStyle={{ fontSize: '10px' }} />
                <Bar dataKey="conventional" name="Conventional Pack" fill="#f59e0b" radius={[4, 4, 0, 0]} />
                <Bar dataKey="recommended" name="PackWise Recommended" fill="#10b981" radius={[4, 4, 0, 0]} />
                <Bar dataKey="eco" name="Eco Alternative" fill="#0284c7" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* CHART 5: Food Waste Reduction Impact */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center">
            <ShieldAlert className="w-4 h-4 text-emerald-600 mr-2" />
            5. Post-Harvest Food Waste Reduction Impact (%)
          </h3>
          <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-bold">
            MoFPI Target Indicator
          </span>
        </div>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={FOOD_WASTE_REDUCTION_DATA}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="month" tick={{ fontSize: 10 }} />
              <YAxis tick={{ fontSize: 10 }} />
              <RechartsTooltip />
              <Legend iconSize={8} wrapperStyle={{ fontSize: '10px' }} />
              <Line type="monotone" dataKey="lossWithoutAI" name="Spoilage Loss without AI (%)" stroke="#f43f5e" strokeWidth={2} />
              <Line type="monotone" dataKey="lossWithAI" name="Spoilage Loss with PackWise AI (%)" stroke="#10b981" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <DisclaimerBanner />
    </div>
  );
};
