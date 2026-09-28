import React, { useState } from 'react';
import {
  Bell,
  Search,
  User,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  X,
  ChevronDown
} from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onSearch?: (query: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab, onSearch }) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const notifications = [
    {
      id: 1,
      title: 'New Alphonso Mango Presets Available',
      time: '10m ago',
      unread: true,
      icon: CheckCircle2,
      color: 'text-emerald-600 bg-emerald-50'
    },
    {
      id: 2,
      title: 'Packaging Engine Rules Updated (v2.4)',
      time: '1h ago',
      unread: true,
      icon: ShieldCheck,
      color: 'text-blue-600 bg-blue-50'
    },
    {
      id: 3,
      title: 'Cold-chain storage threshold warning forPaneer batch',
      time: '3h ago',
      unread: false,
      icon: AlertCircle,
      color: 'text-amber-600 bg-amber-50'
    }
  ];

  const mainNavItems = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'recommendation', label: 'Recommendation' },
    { id: 'library', label: 'Packaging Library' },
    { id: 'analytics', label: 'Analytics' },
    { id: 'traceability', label: 'Traceability' }
  ];

  return (
    <header className="bg-white border-b border-slate-200/80 sticky top-0 z-30 shadow-2xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left section: Nav Tabs for desktop */}
          <div className="flex items-center space-x-8">
            <div className="hidden lg:flex items-center space-x-1">
              {mainNavItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
                    activeTab === item.id
                      ? 'bg-emerald-50 text-emerald-700 font-semibold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Center search bar */}
          <div className="flex-1 max-w-xs mx-4 hidden md:block">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search commodities or materials..."
                onChange={(e) => onSearch && onSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-1.5 bg-slate-100/80 border border-transparent rounded-lg text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-emerald-500 transition-all"
              />
            </div>
          </div>

          {/* Right section: Government SIH Badge + Notifications + User Profile */}
          <div className="flex items-center space-x-3">
            {/* SIH Badge */}
            <div className="hidden sm:flex items-center space-x-1.5 px-2.5 py-1 bg-emerald-50 border border-emerald-200/70 text-emerald-800 rounded-full text-xs font-semibold">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>SIH 2026 | MoFPI</span>
            </div>

            {/* Notifications Button */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="p-2 rounded-lg text-slate-600 hover:bg-slate-100 hover:text-slate-900 relative transition-colors"
                title="Notifications"
              >
                <Bell className="w-5 h-5" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-emerald-500 rounded-full ring-2 ring-white"></span>
              </button>

              {/* Notifications Dropdown */}
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-slate-200 z-50 p-2">
                  <div className="flex items-center justify-between px-3 py-2 border-b border-slate-100">
                    <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Notifications</h4>
                    <button onClick={() => setShowNotifications(false)} className="text-slate-400 hover:text-slate-600">
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="divide-y divide-slate-100 max-h-64 overflow-y-auto">
                    {notifications.map((n) => {
                      const IconComponent = n.icon;
                      return (
                        <div key={n.id} className="p-3 hover:bg-slate-50 transition-colors flex items-start space-x-3">
                          <div className={`p-1.5 rounded-lg ${n.color}`}>
                            <IconComponent className="w-4 h-4" />
                          </div>
                          <div className="flex-1">
                            <p className="text-xs font-medium text-slate-800">{n.title}</p>
                            <span className="text-[10px] text-slate-400">{n.time}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Profile Menu */}
            <div className="relative">
              <button
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="flex items-center space-x-2 p-1.5 rounded-lg hover:bg-slate-100 transition-colors"
              >
                <div className="w-8 h-8 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center text-xs shadow-xs">
                  SI
                </div>
                <div className="hidden lg:block text-left">
                  <p className="text-xs font-semibold text-slate-800 leading-tight">SIH Evaluator</p>
                  <p className="text-[10px] text-slate-500 leading-tight">MoFPI Domain User</p>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden lg:block" />
              </button>

              {showProfileMenu && (
                <div className="absolute right-0 mt-2 w-52 bg-white rounded-xl shadow-xl border border-slate-200 z-50 p-2">
                  <div className="px-3 py-2 border-b border-slate-100">
                    <p className="text-xs font-bold text-slate-900">SIH Team PackWise</p>
                    <p className="text-[10px] text-slate-500">Ministry of Food Processing</p>
                  </div>
                  <div className="py-1">
                    <button
                      onClick={() => {
                        setActiveTab('settings');
                        setShowProfileMenu(false);
                      }}
                      className="w-full text-left px-3 py-1.5 text-xs text-slate-700 hover:bg-slate-50 rounded-md"
                    >
                      System Settings
                    </button>
                    <button
                      onClick={() => {
                        setActiveTab('traceability');
                        setShowProfileMenu(false);
                      }}
                      className="w-full text-left px-3 py-1.5 text-xs text-slate-700 hover:bg-slate-50 rounded-md"
                    >
                      Audit Trail & Logs
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
