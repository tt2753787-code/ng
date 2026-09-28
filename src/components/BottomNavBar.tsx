import React from 'react';
import { MainNavTab } from '../types';

interface BottomNavBarProps {
  activeTab: MainNavTab;
  onTabChange: (tab: MainNavTab) => void;
}

export const BottomNavBar: React.FC<BottomNavBarProps> = ({ activeTab, onTabChange }) => {
  const tabs: { id: MainNavTab; label: string; icon: string }[] = [
    { id: 'overview', label: 'الرئيسية', icon: 'grid_view' },
    { id: 'orders', label: 'الطلبات', icon: 'local_shipping' },
    { id: 'live_tracking', label: 'التتبع', icon: 'near_me' },
    { id: 'claims', label: 'الشكايات', icon: 'report_problem' },
    { id: 'settings', label: 'الإعدادات', icon: 'tune' },
  ];

  return (
    <nav className="fixed bottom-0 w-full z-40 bg-white/95 backdrop-blur-xl border-t border-[#e1e2e4] shadow-[0_-2px_10px_rgba(0,0,0,0.04)] sm:hidden">
      <div className="flex justify-around items-center h-16 px-1">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex flex-col items-center justify-center gap-0.5 min-w-[56px] h-12 transition-all ${
                isActive
                  ? 'text-[#785a00] font-black'
                  : 'text-[#575e70] hover:text-[#191c1e]'
              }`}
              type="button"
            >
              <span
                className={`material-symbols-outlined text-[22px] ${
                  isActive ? 'fill-1 text-[#eab308]' : ''
                }`}
              >
                {tab.icon}
              </span>
              <span className="text-[11px] font-bold">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
