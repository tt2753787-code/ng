import React from 'react';
import { MainNavTab } from '../types';

interface SubNavbarProps {
  activeTab: MainNavTab;
  onTabChange: (tab: MainNavTab) => void;
  onOpenWhatsApp?: () => void;
}

interface NavItem {
  id: MainNavTab | 'whatsapp_trigger' | 'map_trigger';
  label: string;
  icon: string;
}

export const SubNavbar: React.FC<SubNavbarProps> = ({
  activeTab,
  onTabChange,
  onOpenWhatsApp,
}) => {
  const items: NavItem[] = [
    { id: 'overview', label: 'الرئيسية', icon: 'dashboard' },
    { id: 'orders', label: 'الطلبات', icon: 'inventory_2' },
    { id: 'clients', label: 'الزبناء', icon: 'group' },
    { id: 'drivers', label: 'السائقين', icon: 'sports_motorsports' },
    { id: 'fleet', label: 'الشاحنات', icon: 'local_shipping' },
    { id: 'map_trigger', label: 'الخريطة', icon: 'map' },
    { id: 'live_tracking', label: 'التتبع', icon: 'radar' },
    { id: 'claims', label: 'الشكايات', icon: 'assignment_return' },
    { id: 'analytics', label: 'الإحصائيات', icon: 'query_stats' },
    { id: 'hub_location', label: 'موقعنا', icon: 'store' },
    { id: 'whatsapp_trigger', label: 'واتساب', icon: 'chat' },
    { id: 'settings', label: 'الإعدادات', icon: 'settings' },
  ];

  const handleClick = (item: NavItem) => {
    if (item.id === 'whatsapp_trigger') {
      if (onOpenWhatsApp) {
        onOpenWhatsApp();
      } else {
        window.open('https://api.whatsapp.com/send?text=' + encodeURIComponent('سلام NEXT GEN، بغيت نسول على خدمة النقل والتوصيل.'), '_blank');
      }
      return;
    }

    if (item.id === 'map_trigger') {
      onTabChange('hub_location');
      return;
    }

    onTabChange(item.id as MainNavTab);
  };

  return (
    <nav className="sticky top-[108px] z-30 bg-white border-b border-[#e1e2e4] shadow-[0_1px_4px_rgba(0,0,0,0.02)]">
      <div className="max-w-7xl mx-auto px-2 py-1 overflow-x-auto no-scrollbar">
        <div className="flex items-center gap-1.5 whitespace-nowrap min-w-max px-1">
          {items.map((item) => {
            const isActive = activeTab === item.id || (item.id === 'map_trigger' && activeTab === 'hub_location');
            return (
              <button
                key={item.id}
                onClick={() => handleClick(item)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                  isActive
                    ? 'bg-[#eab308] text-[#141b2b] shadow-sm'
                    : 'text-[#575e70] hover:text-[#191c1e] hover:bg-[#f3f4f6]'
                }`}
                type="button"
              >
                <span className="material-symbols-outlined text-[18px]">
                  {item.icon}
                </span>
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};
