import React, { useState } from 'react';
import { MOCK_HISTORY } from '../../data/mockHistory';
import { RecommendationResult } from '../../types/packaging';
import { DisclaimerBanner } from '../common/DisclaimerBanner';
import { QrCode, Download, ShieldCheck, Search, CheckCircle2, Calendar, FileText, Printer } from 'lucide-react';

interface TraceabilityPageProps {
  currentResult?: RecommendationResult | null;
}

export const TraceabilityPage: React.FC<TraceabilityPageProps> = ({ currentResult }) => {
  const [selectedBatchId, setSelectedBatchId] = useState<string>(
    currentResult ? currentResult.id : MOCK_HISTORY[0].id
  );

  const selectedRecord = MOCK_HISTORY.find((item) => item.id === selectedBatchId) || MOCK_HISTORY[0];

  // Printable Report Handler
  const handlePrintReport = () => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>PackWise AI - Packaging Recommendation Report (${selectedRecord.id})</title>
          <style>
            body { font-family: 'Helvetica Neue', Arial, sans-serif; padding: 40px; color: #1e293b; background: #fff; }
            .header { border-b: 2px solid #10b981; padding-bottom: 20px; margin-bottom: 30px; display: flex; justify-space-between; align-items: center; }
            .title { font-size: 24px; font-weight: bold; color: #064e3b; }
            .subtitle { font-size: 12px; color: #059669; text-transform: uppercase; letter-spacing: 1px; }
            .meta-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 30px; }
            .box { background: #f8fafc; border: 1px solid #e2e8f0; padding: 15px; border-radius: 8px; }
            .label { font-size: 11px; text-transform: uppercase; color: #64748b; font-weight: bold; }
            .val { font-size: 14px; font-weight: bold; color: #0f172a; margin-top: 4px; }
            .disclaimer { margin-top: 40px; border-top: 1px border-dashed #cbd5e1; padding-top: 15px; font-size: 10px; color: #64748b; }
            @media print { .no-print { display: none; } }
          </style>
        </head>
        <body>
          <div className="header">
            <div>
              <div class="subtitle">Smart India Hackathon (SIH) Prototype | MoFPI</div>
              <div class="title">PackWise AI Packaging Recommendation Report</div>
            </div>
          </div>

          <div class="meta-grid">
            <div class="box">
              <div class="label">Recommendation ID</div>
              <div class="val">${selectedRecord.id}</div>
            </div>
            <div class="box">
              <div class="label">Date Generated</div>
              <div class="val">${selectedRecord.date}</div>
            </div>
            <div class="box">
              <div class="label">Food Commodity</div>
              <div class="val">${selectedRecord.productName} (${selectedRecord.category})</div>
            </div>
            <div class="box">
              <div class="label">Storage Condition</div>
              <div class="val">${selectedRecord.storageType} Storage</div>
            </div>
          </div>

          <div class="box" style="margin-bottom: 20px; background: #ecfdf5; border-color: #a7f3d0;">
            <div class="label" style="color: #047857;">Primary Recommended Packaging Material</div>
            <div class="val" style="font-size: 18px; color: #064e3b;">${selectedRecord.recommendedMaterial}</div>
            <div style="font-size: 12px; margin-top: 5px; color: #047857;">Confidence Score: ${selectedRecord.confidence}% | Target Shelf Life: ${selectedRecord.shelfLife}</div>
          </div>

          <div class="box">
            <div class="label">Traceability & Audit Verification</div>
            <div style="font-size: 12px; margin-top: 6px;">
              Engine Version: PackWise Deterministic v2.4 | MoFPI Compliance Check: Passed | QR Batch: ${selectedRecord.id}-SECURE-VERIFIED
            </div>
          </div>

          <div class="disclaimer">
            <strong>IMPORTANT SCIENTIFIC DISCLAIMER:</strong> This document is a decision-support prototype report. Packaging recommendations, shelf-life estimates and gas-composition suggestions are illustrative and require laboratory testing, regulatory compliance checks and validation for commercial use.
          </div>

          <script>
            window.onload = function() { window.print(); }
          </script>
        </body>
      </html>
    `;

    printWindow.document.write(htmlContent);
    printWindow.document.close();
  };

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight flex items-center">
            <QrCode className="w-6 h-6 text-emerald-600 mr-2" />
            Packaging Recommendation Traceability & Audit Trail
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Scan mock QR codes and inspect audit logs for every packaging recommendation batch.
          </p>
        </div>

        <button
          onClick={handlePrintReport}
          className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center space-x-2"
        >
          <Printer className="w-4 h-4" />
          <span>Download Recommendation Report (PDF)</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Batch Selector */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-3">
          <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">Select Recommendation Batch</h3>

          <div className="space-y-2 max-h-96 overflow-y-auto pr-1">
            {MOCK_HISTORY.map((item) => {
              const isSelected = item.id === selectedBatchId;
              return (
                <div
                  key={item.id}
                  onClick={() => setSelectedBatchId(item.id)}
                  className={`p-3 rounded-xl border cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-emerald-50 border-emerald-500 ring-2 ring-emerald-500/20 shadow-xs'
                      : 'bg-white border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-slate-900">{item.id}</span>
                    <span className="text-[10px] text-slate-400">{item.date}</span>
                  </div>
                  <p className="text-xs font-semibold text-emerald-700 mt-0.5">{item.productName}</p>
                  <span className="text-[10px] text-slate-500">{item.recommendedMaterial}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Center & Right: Mock QR Code & Audit Passport Card */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs flex flex-col md:flex-row items-center gap-6">
            {/* Mock QR Code Display */}
            <div className="bg-slate-900 p-4 rounded-2xl flex flex-col items-center justify-center text-center space-y-2 shadow-lg flex-shrink-0">
              {/* SVG QR Code Pattern */}
              <div className="w-36 h-36 bg-white p-2.5 rounded-xl flex items-center justify-center">
                <svg className="w-full h-full text-slate-900" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M2 2h8v8H2V2zm2 2v4h4V4H4zm9-2h8v8h-8V2zm2 2v4h4V4h-4zM2 14h8v8H2v-8zm2 2v4h4v-4H4zm13-2h4v2h-4v-2zm-4 0h2v4h-2v-4zm2 4h4v4h-4v-4zm-2 2h2v2h-2v-2zm-4-4h2v2h-2v-2zm0 4h2v2h-2v-2z" />
                </svg>
              </div>
              <span className="text-[10px] font-mono text-emerald-400 font-bold tracking-wider">{selectedRecord.id}</span>
              <span className="text-[9px] text-slate-400">Scan to verify batch metadata</span>
            </div>

            {/* Audit Details */}
            <div className="space-y-4 flex-1">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 bg-emerald-100 text-emerald-800 rounded-full">
                  Verified Recommendation Batch
                </span>
                <h2 className="text-xl font-bold text-slate-900 mt-1">{selectedRecord.productName}</h2>
                <p className="text-xs text-slate-500">Packaging Material: <strong className="text-emerald-700">{selectedRecord.recommendedMaterial}</strong></p>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200">
                  <span className="text-[10px] text-slate-400 block font-semibold">Storage Type</span>
                  <span className="font-bold text-slate-900">{selectedRecord.storageType}</span>
                </div>
                <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200">
                  <span className="text-[10px] text-slate-400 block font-semibold">Target Shelf Life</span>
                  <span className="font-bold text-slate-900 font-mono">{selectedRecord.shelfLife}</span>
                </div>
                <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200">
                  <span className="text-[10px] text-slate-400 block font-semibold">Confidence Score</span>
                  <span className="font-bold text-emerald-700 font-mono">{selectedRecord.confidence}%</span>
                </div>
                <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200">
                  <span className="text-[10px] text-slate-400 block font-semibold">Sustainability</span>
                  <span className="font-bold text-slate-900">{selectedRecord.sustainability}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Audit Timeline */}
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-4">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center">
              <ShieldCheck className="w-4 h-4 text-emerald-600 mr-2" />
              Batch Audit Trail & Verification Sequence
            </h3>

            <div className="space-y-3 relative before:absolute before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200 text-xs">
              <div className="flex items-start space-x-4 relative z-10">
                <div className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-[10px] shadow-xs">
                  ✓
                </div>
                <div>
                  <p className="font-bold text-slate-900">Food Property Input & Respiration Matrix Loaded</p>
                  <span className="text-[10px] text-slate-400">{selectedRecord.date} 10:24 AM • User Evaluator</span>
                </div>
              </div>

              <div className="flex items-start space-x-4 relative z-10">
                <div className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-[10px] shadow-xs">
                  ✓
                </div>
                <div>
                  <p className="font-bold text-slate-900">PackWise Deterministic Scoring Execution (v2.4)</p>
                  <span className="text-[10px] text-slate-400">{selectedRecord.date} 10:25 AM • Rule Engine</span>
                </div>
              </div>

              <div className="flex items-start space-x-4 relative z-10">
                <div className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-[10px] shadow-xs">
                  ✓
                </div>
                <div>
                  <p className="font-bold text-slate-900">Traceability QR Generated & Batch Log Saved</p>
                  <span className="text-[10px] text-slate-400">{selectedRecord.date} 10:25 AM • Traceability Service</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <DisclaimerBanner />
    </div>
  );
};
