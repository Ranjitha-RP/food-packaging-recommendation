import React from 'react';
import {
  LayoutDashboard,
  Sparkles,
  History,
  PackageSearch,
  BarChart3,
  QrCode,
  Settings,
  Leaf,
  Layers,
  ChevronRight
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isOpenMobile?: boolean;
  setIsOpenMobile?: (open: boolean) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'recommendation', label: 'New Recommendation', icon: Sparkles, badge: 'AI Engine' },
    { id: 'history', label: 'Recommendation History', icon: History },
    { id: 'library', label: 'Packaging Library', icon: PackageSearch },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'traceability', label: 'Traceability', icon: QrCode },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  return (
    <aside className="w-64 bg-slate-900 text-white flex-shrink-0 flex flex-col justify-between min-h-screen border-r border-slate-800">
      {/* Top Header Logo */}
      <div>
        <div className="p-5 border-b border-slate-800 flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-400 flex items-center justify-center shadow-lg shadow-emerald-900/30">
            <Leaf className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold tracking-tight text-white flex items-center">
              PackWise <span className="text-emerald-400 ml-1 font-extrabold">AI</span>
            </h1>
            <p className="text-[10px] text-slate-400 font-medium tracking-wide uppercase">Packaging Intelligence</p>
          </div>
        </div>

        {/* Navigation items */}
        <nav className="p-3 space-y-1 mt-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-emerald-600 text-white shadow-md shadow-emerald-900/30 font-bold'
                    : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                    isActive ? 'bg-emerald-700 text-white' : 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom SIH Metadata */}
      <div className="p-4 border-t border-slate-800 bg-slate-950/60">
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-3">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[11px] font-bold text-emerald-400 tracking-wider uppercase">SIH Prototype</span>
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
          </div>
          <p className="text-[10px] text-slate-400 leading-normal">
            Rule-Based Decision Support System
          </p>
          <div className="mt-2 text-[10px] text-slate-500 font-mono flex items-center justify-between border-t border-slate-800/80 pt-1.5">
            <span>Engine: Deterministic v2.4</span>
            <span className="text-emerald-500">Ready</span>
          </div>
        </div>
      </div>
    </aside>
  );
};
