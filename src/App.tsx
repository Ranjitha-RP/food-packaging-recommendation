import React, { useState } from 'react';
import { Navbar } from './components/layout/Navbar';
import { Sidebar } from './components/layout/Sidebar';
import { Footer } from './components/layout/Footer';
import { DashboardPage } from './components/pages/DashboardPage';
import { RecommendationPage } from './components/pages/RecommendationPage';
import { LibraryPage } from './components/library/LibraryPage';
import { AnalyticsPage } from './components/analytics/AnalyticsPage';
import { TraceabilityPage } from './components/traceability/TraceabilityPage';
import { HistoryView } from './components/history/HistoryView';
import { SettingsPage } from './components/pages/SettingsPage';
import { RecommendationResult, HistoryRecord } from './types/packaging';
import { Menu, X, CheckCircle2 } from 'lucide-react';

export function App() {
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [selectedTraceabilityResult, setSelectedTraceabilityResult] = useState<RecommendationResult | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState<boolean>(false);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleViewTraceability = (result: RecommendationResult) => {
    setSelectedTraceabilityResult(result);
    setActiveTab('traceability');
  };

  const handleSaveToHistory = (result: RecommendationResult) => {
    showToast(`Recommendation (${result.id}) saved to History Log!`);
  };

  const handleViewHistoryRecord = (record: HistoryRecord) => {
    setActiveTab('traceability');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-4 py-3 rounded-xl shadow-2xl flex items-center space-x-2 border border-slate-700 animate-bounce">
          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          <span className="text-xs font-bold">{toastMessage}</span>
        </div>
      )}

      {/* Main Layout Flex Container */}
      <div className="flex-1 flex">
        {/* Desktop Sidebar */}
        <div className="hidden lg:block">
          <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>

        {/* Mobile Navigation Drawer Overlay */}
        {isMobileSidebarOpen && (
          <div className="fixed inset-0 z-50 flex lg:hidden">
            <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs" onClick={() => setIsMobileSidebarOpen(false)} />
            <div className="relative flex-1 max-w-xs w-full bg-slate-900">
              <button
                onClick={() => setIsMobileSidebarOpen(false)}
                className="absolute top-4 right-4 text-slate-400 hover:text-white p-2"
              >
                <X className="w-6 h-6" />
              </button>
              <Sidebar
                activeTab={activeTab}
                setActiveTab={(tab) => {
                  setActiveTab(tab);
                  setIsMobileSidebarOpen(false);
                }}
              />
            </div>
          </div>
        )}

        {/* Main Content Body */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Top Bar Navbar */}
          <Navbar
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />

          {/* Mobile Header Toggle */}
          <div className="lg:hidden p-3 bg-white border-b border-slate-200 flex items-center justify-between">
            <button
              onClick={() => setIsMobileSidebarOpen(true)}
              className="p-2 text-slate-700 bg-slate-100 rounded-lg"
            >
              <Menu className="w-5 h-5" />
            </button>
            <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">PackWise AI</span>
          </div>

          {/* Page Routing Switcher */}
          <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
            {activeTab === 'dashboard' && (
              <DashboardPage
                onStartRecommendation={() => setActiveTab('recommendation')}
                onLoadDemo={() => setActiveTab('recommendation')}
                onViewRecord={handleViewHistoryRecord}
                setActiveTab={setActiveTab}
              />
            )}

            {activeTab === 'recommendation' && (
              <RecommendationPage
                onViewTraceability={handleViewTraceability}
                onSaveToHistory={handleSaveToHistory}
              />
            )}

            {activeTab === 'history' && (
              <HistoryView onViewRecord={handleViewHistoryRecord} />
            )}

            {activeTab === 'library' && <LibraryPage />}

            {activeTab === 'analytics' && <AnalyticsPage />}

            {activeTab === 'traceability' && (
              <TraceabilityPage currentResult={selectedTraceabilityResult} />
            )}

            {activeTab === 'settings' && <SettingsPage />}
          </main>

          {/* Footer */}
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default App;
