import React from 'react';
import { LucideIcon, TrendingUp, TrendingDown } from 'lucide-react';

interface KpiCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  change?: string;
  isPositive?: boolean;
  icon: LucideIcon;
  iconBg?: string;
  iconColor?: string;
}

export const KpiCard: React.FC<KpiCardProps> = ({
  title,
  value,
  subtitle,
  change,
  isPositive = true,
  icon: Icon,
  iconBg = 'bg-emerald-50',
  iconColor = 'text-emerald-600'
}) => {
  return (
    <div className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-xs hover:shadow-md transition-shadow duration-200 relative overflow-hidden">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{title}</p>
          <h3 className="text-2xl font-bold text-slate-900 mt-1 tracking-tight">{value}</h3>
          {subtitle && <p className="text-xs text-slate-500 mt-1">{subtitle}</p>}
        </div>
        <div className={`p-3 rounded-xl ${iconBg} ${iconColor} flex-shrink-0`}>
          <Icon className="w-5 h-5" />
        </div>
      </div>
      {change && (
        <div className="mt-3 pt-3 border-t border-slate-100 flex items-center text-xs">
          {isPositive ? (
            <span className="text-emerald-600 font-semibold flex items-center mr-1.5">
              <TrendingUp className="w-3.5 h-3.5 mr-0.5" />
              {change}
            </span>
          ) : (
            <span className="text-rose-600 font-semibold flex items-center mr-1.5">
              <TrendingDown className="w-3.5 h-3.5 mr-0.5" />
              {change}
            </span>
          )}
          <span className="text-slate-400">vs historical baseline</span>
        </div>
      )}
    </div>
  );
};
