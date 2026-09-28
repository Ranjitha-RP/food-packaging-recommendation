import React from 'react';
import { RecommendationResult } from '../../types/packaging';
import { DisclaimerBanner } from '../common/DisclaimerBanner';
import {
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Leaf,
  Layers,
  ShieldCheck,
  TrendingUp,
  DollarSign,
  ArrowRight,
  Info,
  QrCode,
  RotateCcw,
  BarChart2,
  FileText
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, Cell } from 'recharts';

interface ResultViewProps {
  result: RecommendationResult;
  onNewRecommendation: () => void;
  onViewTraceability: (result: RecommendationResult) => void;
  onSaveToHistory: (result: RecommendationResult) => void;
}

export const ResultView: React.FC<ResultViewProps> = ({
  result,
  onNewRecommendation,
  onViewTraceability,
  onSaveToHistory
}) => {
  const {
    foodProperties,
    storageConditions,
    primaryRecommendation,
    confidenceScore,
    alternativeRecommendations,
    whyThisMaterial,
    packagingStructure,
    specs,
    decisionFactors,
    keyDrivers,
    freshProduceMode,
    freshProduceDetails,
    shelfLifePrediction,
    sustainabilityAnalysis,
    costAnalysis
  } = result;

  // Chart data for shelf life
  const shelfLifeChartData = [
    { name: 'Current Baseline', days: shelfLifePrediction.currentDays, fill: '#94a3b8' },
    { name: 'PackWise AI Target', days: shelfLifePrediction.recommendedDays, fill: '#10b981' }
  ];

  // Chart data for cost comparison
  const costChartData = [
    { name: 'Current Pack', cost: costAnalysis.currentCostPerUnit, fill: '#f59e0b' },
    { name: 'Recommended', cost: costAnalysis.recommendedCostPerUnit, fill: '#10b981' },
    { name: 'Eco Alternative', cost: costAnalysis.ecoAlternativeCostPerUnit, fill: '#0284c7' }
  ];

  return (
    <div className="space-y-8">
      {/* Top Banner & Confidence Overview */}
      <div className="bg-slate-900 rounded-2xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden border border-slate-800">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="px-3 py-1 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded-full text-xs font-bold uppercase tracking-wider flex items-center">
                <Sparkles className="w-3.5 h-3.5 mr-1" />
                AI Recommendation Complete
              </span>
              {freshProduceMode && (
                <span className="px-3 py-1 bg-amber-500/20 text-amber-300 border border-amber-500/30 rounded-full text-xs font-bold">
                  Fresh Produce Respiration Mode
                </span>
              )}
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
              {foodProperties.commodityName}
            </h1>
            <p className="text-sm text-slate-300 mt-1">
              Primary Recommended Material: <strong className="text-emerald-400 font-bold text-base">{primaryRecommendation.name}</strong>
            </p>
          </div>

          {/* Confidence Indicator Circle */}
          <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-4 flex items-center space-x-4 flex-shrink-0">
            <div className="relative w-16 h-16 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-slate-800"
                  strokeWidth="3.5"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="text-emerald-400"
                  strokeDasharray={`${confidenceScore}, 100`}
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <span className="absolute text-sm font-extrabold text-emerald-400 font-mono">{confidenceScore}%</span>
            </div>
            <div>
              <p className="text-xs font-bold text-slate-200">AI Confidence Match</p>
              <p className="text-[10px] text-slate-400">Weighted matrix score</p>
            </div>
          </div>
        </div>
      </div>

      {/* Action Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
        <div className="flex items-center space-x-2 text-xs font-semibold text-slate-600">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>Recommendation ID: <strong className="text-slate-900 font-mono">{result.id}</strong></span>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => onSaveToHistory(result)}
            className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs rounded-lg transition-colors flex items-center space-x-1.5"
          >
            <FileText className="w-3.5 h-3.5 text-slate-600" />
            <span>Save to History</span>
          </button>
          <button
            onClick={() => onViewTraceability(result)}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs rounded-lg shadow-xs transition-colors flex items-center space-x-1.5"
          >
            <QrCode className="w-3.5 h-3.5" />
            <span>Generate Traceability Report</span>
          </button>
          <button
            onClick={onNewRecommendation}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs rounded-lg transition-colors flex items-center space-x-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>New Analysis</span>
          </button>
        </div>
      </div>

      {/* SECTION 1: "Why this material?" Explainable AI Narrative */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs">
        <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-2 flex items-center">
          <Sparkles className="w-4 h-4 text-emerald-600 mr-2" />
          Why this material? (Explainable AI Rationale)
        </h2>
        <p className="text-xs text-slate-700 leading-relaxed bg-emerald-50/60 p-4 rounded-xl border border-emerald-100 font-medium">
          "{whyThisMaterial}"
        </p>

        {/* Key Drivers */}
        <div className="mt-4 pt-4 border-t border-slate-100">
          <p className="text-xs font-bold text-slate-800 mb-2">Key Decision Drivers:</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {keyDrivers.map((driver, i) => (
              <div key={i} className="flex items-center text-xs text-slate-600 space-x-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                <span>{driver}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* SECTION 2: Fresh Produce Mode Banner (If Fruit or Veg) */}
      {freshProduceMode && (
        <div className="bg-gradient-to-r from-emerald-900 to-teal-900 rounded-xl p-6 text-white shadow-md border border-emerald-800">
          <div className="flex items-start space-x-3">
            <div className="p-2 bg-emerald-700/60 rounded-xl text-emerald-300">
              <Leaf className="w-5 h-5" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <h3 className="text-sm font-bold text-emerald-200">Fresh Produce Mode Activated</h3>
                <span className="text-[10px] px-2 py-0.5 bg-emerald-800 text-emerald-300 rounded-full font-mono">Respiration: {foodProperties.respirationRate}</span>
              </div>
              <p className="text-xs text-emerald-100/90 leading-relaxed">
                Fresh produce continues to respire after harvesting. Packaging therefore needs controlled gas exchange (micro-perforation or tailored breathability) rather than simply maximizing barrier performance.
              </p>

              {freshProduceDetails && (
                <div className="mt-3 pt-3 border-t border-emerald-800/80 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                  <div className="bg-emerald-950/60 p-2.5 rounded-lg border border-emerald-800">
                    <span className="text-[10px] text-emerald-400 block font-semibold uppercase">O₂ Target Range</span>
                    <span className="font-bold font-mono">{freshProduceDetails.illustrativeO2}</span>
                  </div>
                  <div className="bg-emerald-950/60 p-2.5 rounded-lg border border-emerald-800">
                    <span className="text-[10px] text-emerald-400 block font-semibold uppercase">CO₂ Target Range</span>
                    <span className="font-bold font-mono">{freshProduceDetails.illustrativeCO2}</span>
                  </div>
                  <div className="bg-emerald-950/60 p-2.5 rounded-lg border border-emerald-800">
                    <span className="text-[10px] text-emerald-400 block font-semibold uppercase">N₂ Balance</span>
                    <span className="font-bold font-mono">{freshProduceDetails.illustrativeN2}</span>
                  </div>
                  <div className="bg-emerald-950/60 p-2.5 rounded-lg border border-emerald-800">
                    <span className="text-[10px] text-emerald-400 block font-semibold uppercase">MAP Status</span>
                    <span className="font-bold font-mono text-emerald-300">{freshProduceDetails.MAPRecommended}</span>
                  </div>
                </div>
              )}
              <p className="text-[10px] text-emerald-300/70 italic mt-1">
                * Prototype illustrative targets — final MAP gas composition must be validated experimentally for the specific commodity.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 3: Visual Packaging Structure & Technical Specs */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Visual Packaging Structure */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-4">
          <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center">
            <Layers className="w-4 h-4 text-emerald-600 mr-2" />
            Recommended Packaging Layer Structure
          </h2>

          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
            <div className="flex items-center justify-between p-2.5 bg-slate-800 text-white rounded-lg text-xs font-semibold">
              <span>Outer Layer:</span>
              <span className="font-mono text-emerald-400">{packagingStructure.outerLayer}</span>
            </div>
            <div className="text-center text-xs text-slate-400 font-bold">↓</div>
            <div className="flex items-center justify-between p-2.5 bg-emerald-600 text-white rounded-lg text-xs font-semibold shadow-xs">
              <span>Core Film Layer:</span>
              <span className="font-mono text-white font-bold">{packagingStructure.coreLayer}</span>
            </div>
            <div className="text-center text-xs text-slate-400 font-bold">↓</div>
            <div className="flex items-center justify-between p-2.5 bg-teal-700 text-white rounded-lg text-xs font-semibold">
              <span>Inner Sealant Layer:</span>
              <span className="font-mono text-teal-200">{packagingStructure.innerLayer}</span>
            </div>
            <div className="text-center text-xs text-slate-400 font-bold">↓</div>
            <div className="flex items-center justify-between p-2.5 bg-slate-100 text-slate-700 rounded-lg text-xs font-semibold border border-slate-300">
              <span>Food Product Inside:</span>
              <span className="font-bold text-slate-900">{foodProperties.commodityName}</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
              <span className="text-[10px] text-slate-500 font-bold uppercase block">Thickness Range</span>
              <span className="font-bold text-slate-900 font-mono text-sm">{packagingStructure.thickness}</span>
            </div>
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
              <span className="text-[10px] text-slate-500 font-bold uppercase block">Heat Sealability</span>
              <span className="font-bold text-slate-900 text-sm">{packagingStructure.sealability}</span>
            </div>
          </div>
        </div>

        {/* Technical Specifications */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center">
              <ShieldCheck className="w-4 h-4 text-emerald-600 mr-2" />
              Technical Packaging Specifications
            </h2>
            <span className="text-[10px] px-2 py-0.5 bg-amber-100 text-amber-800 rounded font-semibold">
              Prototype target range
            </span>
          </div>

          <div className="divide-y divide-slate-100 text-xs">
            <div className="py-2.5 flex justify-between">
              <span className="text-slate-600 font-medium">Oxygen Transmission Rate (OTR)</span>
              <span className="font-bold text-slate-900 font-mono">{specs.OTR}</span>
            </div>
            <div className="py-2.5 flex justify-between">
              <span className="text-slate-600 font-medium">Water Vapor Transmission (WVTR)</span>
              <span className="font-bold text-slate-900 font-mono">{specs.WVTR}</span>
            </div>
            <div className="py-2.5 flex justify-between">
              <span className="text-slate-600 font-medium">Film Thickness Target</span>
              <span className="font-bold text-slate-900 font-mono">{specs.thickness}</span>
            </div>
            <div className="py-2.5 flex justify-between">
              <span className="text-slate-600 font-medium">Gas Permeability Characteristic</span>
              <span className="font-bold text-slate-900">{specs.gasPermeability}</span>
            </div>
            <div className="py-2.5 flex justify-between">
              <span className="text-slate-600 font-medium">Mechanical Tear Strength</span>
              <span className="font-bold text-slate-900">{specs.mechanicalStrength}</span>
            </div>
            <div className="py-2.5 flex justify-between">
              <span className="text-slate-600 font-medium">MAP Compatibility</span>
              <span className="font-bold text-emerald-700">{specs.MAPSuitability}</span>
            </div>
          </div>

          <p className="text-[10px] text-slate-400 italic">
            * Final technical specifications require laboratory barrier testing and physical seal integrity validation.
          </p>
        </div>
      </div>

      {/* SECTION 4: Explainable Recommendation Factors */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs">
        <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4 flex items-center">
          <BarChart2 className="w-4 h-4 text-emerald-600 mr-2" />
          Explainable Recommendation Weight Factors
        </h2>

        <div className="space-y-3">
          {decisionFactors.map((df, i) => (
            <div key={i} className="space-y-1">
              <div className="flex justify-between text-xs font-semibold text-slate-700">
                <span>{df.factor}</span>
                <span className="font-mono text-emerald-700">{df.percentage}%</span>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-emerald-600 rounded-full"
                  style={{ width: `${df.percentage}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 5: Material Candidate Comparison Table */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-4">
        <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center">
          <Layers className="w-4 h-4 text-emerald-600 mr-2" />
          Material Database Comparison Matrix
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase">
                <th className="p-3">Material Candidate</th>
                <th className="p-3">Moisture Barrier</th>
                <th className="p-3">Oxygen Barrier</th>
                <th className="p-3">Breathability</th>
                <th className="p-3">Strength</th>
                <th className="p-3">Cost Level</th>
                <th className="p-3">Eco Index</th>
                <th className="p-3">Match Score</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {/* Primary Material */}
              <tr className="bg-emerald-50/80 font-bold">
                <td className="p-3 text-slate-900 flex items-center">
                  <span className="w-2 h-2 rounded-full bg-emerald-600 mr-2"></span>
                  {primaryRecommendation.name}
                </td>
                <td className="p-3 text-slate-700">{primaryRecommendation.moistureBarrier}</td>
                <td className="p-3 text-slate-700">{primaryRecommendation.oxygenBarrier}</td>
                <td className="p-3 text-slate-700">{primaryRecommendation.breathability}</td>
                <td className="p-3 text-slate-700">{primaryRecommendation.mechanicalStrength}</td>
                <td className="p-3 text-slate-700">{primaryRecommendation.costLevel}</td>
                <td className="p-3 text-slate-700 font-mono">{primaryRecommendation.recyclabilityScore}%</td>
                <td className="p-3 text-emerald-700 font-mono text-sm">{confidenceScore}%</td>
                <td className="p-3">
                  <span className="px-2 py-0.5 bg-emerald-600 text-white rounded-full text-[10px]">
                    Recommended
                  </span>
                </td>
              </tr>

              {/* Alternative Candidates */}
              {alternativeRecommendations.map((alt) => (
                <tr key={alt.material.id} className="hover:bg-slate-50 text-slate-700">
                  <td className="p-3 font-semibold">{alt.material.name}</td>
                  <td className="p-3">{alt.material.moistureBarrier}</td>
                  <td className="p-3">{alt.material.oxygenBarrier}</td>
                  <td className="p-3">{alt.material.breathability}</td>
                  <td className="p-3">{alt.material.mechanicalStrength}</td>
                  <td className="p-3">{alt.material.costLevel}</td>
                  <td className="p-3 font-mono">{alt.material.recyclabilityScore}%</td>
                  <td className="p-3 font-mono font-semibold">{alt.compatibilityScore}%</td>
                  <td className="p-3">
                    <span className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded-full text-[10px]">
                      Alternative
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* SECTION 6: Shelf-Life, Sustainability & Cost Analysis Charts */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Shelf-Life Prediction */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-slate-900 uppercase">Shelf-Life Extension</h3>
              <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-bold">
                Prototype estimate
              </span>
            </div>
            <div className="mt-3 flex items-baseline space-x-2">
              <span className="text-3xl font-extrabold text-emerald-600">+{shelfLifePrediction.percentageImprovement}%</span>
              <span className="text-xs text-slate-500 font-semibold">increase</span>
            </div>
            <p className="text-xs text-slate-600 mt-1">
              {shelfLifePrediction.currentDays} days → <strong className="text-slate-900">{shelfLifePrediction.recommendedDays} days</strong>
            </p>
          </div>

          <div className="h-36 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={shelfLifeChartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" tick={{ fontSize: 10 }} />
                <YAxis tick={{ fontSize: 10 }} />
                <RechartsTooltip formatter={(val) => [`${val} days`, 'Shelf Life']} />
                <Bar dataKey="days" radius={[6, 6, 0, 0]}>
                  {shelfLifeChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <p className="text-[10px] text-slate-400 italic">
            * Actual shelf life depends on lab microbial testing and storage integrity.
          </p>
        </div>

        {/* Sustainability Score */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-slate-900 uppercase">Sustainability Score</h3>
              <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-bold">
                Eco Indicator
              </span>
            </div>
            <div className="mt-3 flex items-baseline space-x-2">
              <span className="text-3xl font-extrabold text-emerald-600">{sustainabilityAnalysis.overallScore}</span>
              <span className="text-xs text-slate-400">/ 100</span>
            </div>
            <p className="text-xs text-slate-600 mt-1">{sustainabilityAnalysis.biodegradability}</p>
          </div>

          <div className="space-y-2 text-xs bg-slate-50 p-3 rounded-lg border border-slate-100">
            <div className="flex justify-between">
              <span className="text-slate-500">Recyclability:</span>
              <span className="font-bold text-slate-900">{sustainabilityAnalysis.recyclability}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Est. Material Weight:</span>
              <span className="font-bold text-slate-900">{sustainabilityAnalysis.materialWeightEstimate}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Plastic Reduction:</span>
              <span className="font-bold text-emerald-700">{sustainabilityAnalysis.plasticReductionPotential}</span>
            </div>
          </div>

          <p className="text-[10px] text-slate-400 italic">
            * Prototype eco score — not an official environmental certification.
          </p>
        </div>

        {/* Cost Analysis */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-slate-900 uppercase">Unit Cost Impact</h3>
              <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-bold">
                Est. Prototype
              </span>
            </div>
            <div className="mt-3 flex items-baseline space-x-2">
              <span className="text-3xl font-extrabold text-slate-900">₹{costAnalysis.recommendedCostPerUnit}</span>
              <span className="text-xs text-slate-500">/ unit</span>
            </div>
            <p className="text-xs text-emerald-700 font-semibold mt-1">
              Est. Monthly Savings: ₹{costAnalysis.monthlyEstimatedSavings.toLocaleString()}
            </p>
          </div>

          <div className="h-36 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={costChartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" tick={{ fontSize: 10 }} />
                <YAxis tick={{ fontSize: 10 }} />
                <RechartsTooltip formatter={(val) => [`₹${val}`, 'Cost/Unit']} />
                <Bar dataKey="cost" radius={[6, 6, 0, 0]}>
                  {costChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          <p className="text-[10px] text-slate-400 italic">
            * Illustrative prototype estimates based on standard regional supplier averages.
          </p>
        </div>
      </div>

      {/* Mandatory Scientific Disclaimer Banner */}
      <DisclaimerBanner />
    </div>
  );
};
