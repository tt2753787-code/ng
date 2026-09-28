import React from 'react';
import { MainNavTab } from '../types';

interface TabsRailProps {
  activeTab: MainNavTab;
  onTabChange: (tab: MainNavTab) => void;
}

export const TabsRail: React.FC<TabsRailProps> = ({ activeTab, onTabChange }) => {
  const tabs: { id: MainNavTab; label: string; icon: string }[] = [
    { id: 'overview', label: 'الرئيسية', icon: 'grid_view' },
    { id: 'new_order', label: 'صايب طلب جديد', icon: 'add_box' },
    { id: 'live_tracking', label: 'تتبع الشحنة', icon: 'radar' },
    { id: 'drivers', label: 'فضاء السائق', icon: 'sports_motorsports' },
    { id: 'fleet', label: 'الشاحنات والأسطول', icon: 'local_shipping' },
    { id: 'claims', label: 'الشكايات والرجوع', icon: 'assignment_return' },
    { id: 'hub_location', label: 'موقعنا (كازا)', icon: 'store' },
  ];

  return (
    <section className="bg-white rounded-xl p-1.5 shadow-sm border border-[#e1e2e4]">
      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`px-3 py-2 rounded-lg text-xs sm:text-sm font-bold flex items-center gap-1.5 whitespace-nowrap transition-all ${
                isActive
                  ? 'bg-[#eab308] text-[#141b2b] shadow-sm'
                  : 'text-[#575e70] hover:text-[#191c1e] hover:bg-[#f3f4f6]'
              }`}
              type="button"
            >
              <span className="material-symbols-outlined text-[18px]">
                {tab.icon}
              </span>
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>
    </section>
  );
};
