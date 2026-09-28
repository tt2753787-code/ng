import React, { useState } from 'react';
import { Shipment, MainNavTab } from '../../types';
import { TabsRail } from '../TabsRail';

interface OverviewScreenProps {
  shipments: Shipment[];
  activeTab: MainNavTab;
  onTabChange: (tab: MainNavTab) => void;
  onSelectShipment: (id: string) => void;
  onOpenNewOrder: () => void;
  searchFilter: string;
}

export const OverviewScreen: React.FC<OverviewScreenProps> = ({
  shipments,
  activeTab,
  onTabChange,
  onSelectShipment,
  onOpenNewOrder,
  searchFilter,
}) => {
  const [selectedRouteFilter, setSelectedRouteFilter] = useState<string>('all');
  const [localSearch, setLocalSearch] = useState<string>('');

  const effectiveSearch = searchFilter || localSearch;

  // Filter shipments
  const filteredShipments = shipments.filter((item) => {
    // Route pill filter
    if (selectedRouteFilter === 'casa_tanger') {
      if (!(item.originCity.includes('الدار البيضاء') && item.destinationCity.includes('طنجة'))) return false;
    } else if (selectedRouteFilter === 'casa_marrakech') {
      if (!(item.originCity.includes('الدار البيضاء') || item.originCity.includes('الرباط')) || !item.destinationCity.includes('مراكش')) {
        // also check if route involves Marrakech
        if (!item.destinationCity.includes('مراكش')) return false;
      }
    } else if (selectedRouteFilter === 'in_delivery') {
      if (item.status !== 'en_route' && item.status !== 'out_for_delivery') return false;
    } else if (selectedRouteFilter === 'issues') {
      if (item.status !== 'issue') return false;
    }

    // Search query
    if (effectiveSearch.trim()) {
      const q = effectiveSearch.toLowerCase().trim();
      const match =
        item.id.toLowerCase().includes(q) ||
        item.originCity.toLowerCase().includes(q) ||
        item.destinationCity.toLowerCase().includes(q) ||
        item.recipientName.toLowerCase().includes(q) ||
        item.recipientPhone.includes(q) ||
        item.driverName.toLowerCase().includes(q) ||
        item.commodity.toLowerCase().includes(q);
      if (!match) return false;
    }

    return true;
  });

  return (
    <div className="space-y-4 max-w-4xl mx-auto" dir="rtl">
      {/* 1. Hero / Dashboard Welcome Card */}
      <section className="bg-white rounded-2xl p-4 sm:p-5 shadow-sm border border-[#e1e2e4] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-44 h-44 bg-[#eab308]/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="flex items-start justify-between relative z-10 gap-3">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#eab308] text-[#141b2b] text-xs font-black shadow-xs">
              <span className="w-2 h-2 rounded-full bg-[#141b2b] animate-pulse"></span>
              المنصة المركزية المغربية
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-[#191c1e] font-chivo leading-snug">
              مرحبا بك فـ <span className="text-[#141b2b]">NEXT</span><span className="text-[#eab308]">GEN</span>
            </h1>
            <p className="text-xs sm:text-sm text-[#4f4633] max-w-lg leading-relaxed font-noto">
              حلول النقل، الكوليكط، والتوصيل السريع لجميع المدن المغربية بحرفية وموثوقية عالية.
            </p>
          </div>

          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-[#141b2b] flex items-center justify-center text-[#eab308] shadow-md shrink-0">
            <span className="material-symbols-outlined text-2xl sm:text-3xl">local_shipping</span>
          </div>
        </div>

        {/* Quick Metrics Counters */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mt-4 pt-3 border-t border-[#f3f4f6]">
          <div className="bg-[#f8f9fb] rounded-xl p-3 flex items-center justify-between border border-[#e1e2e4]/70">
            <div>
              <span className="text-[11px] text-[#575e70] font-bold block">الطلبات النشطة</span>
              <span className="text-xl sm:text-2xl text-[#191c1e] font-black font-chivo">142</span>
            </div>
            <div className="w-9 h-9 rounded-xl bg-white text-[#785a00] flex items-center justify-center shadow-xs">
              <span className="material-symbols-outlined text-[20px]">inventory_2</span>
            </div>
          </div>

          <div className="bg-[#f8f9fb] rounded-xl p-3 flex items-center justify-between border border-[#e1e2e4]/70">
            <div>
              <span className="text-[11px] text-[#575e70] font-bold block">فـ الطريق</span>
              <span className="text-xl sm:text-2xl text-[#eab308] font-black font-chivo">48</span>
            </div>
            <div className="w-9 h-9 rounded-xl bg-white text-[#eab308] flex items-center justify-center shadow-xs">
              <span className="material-symbols-outlined text-[20px]">alt_route</span>
            </div>
          </div>

          <div className="bg-[#f8f9fb] rounded-xl p-3 flex items-center justify-between border border-[#e1e2e4]/70">
            <div>
              <span className="text-[11px] text-[#575e70] font-bold block">تسلمات اليوم</span>
              <span className="text-xl sm:text-2xl text-[#191c1e] font-black font-chivo">89</span>
            </div>
            <div className="w-9 h-9 rounded-xl bg-white text-[#575e70] flex items-center justify-center shadow-xs">
              <span className="material-symbols-outlined text-[20px]">task_alt</span>
            </div>
          </div>

          <div className="bg-[#f8f9fb] rounded-xl p-3 flex items-center justify-between border border-[#e1e2e4]/70">
            <div>
              <span className="text-[11px] text-[#b91a24] font-bold block">الشكايات النشطة</span>
              <span className="text-xl sm:text-2xl text-[#b91a24] font-black font-chivo">3</span>
            </div>
            <div className="w-9 h-9 rounded-xl bg-[#ffdad7] text-[#410004] flex items-center justify-center shadow-xs">
              <span className="material-symbols-outlined text-[20px]">report_problem</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Global Logistics Search & Filter bar */}
      <section className="bg-white rounded-xl p-3 shadow-sm border border-[#e1e2e4] space-y-2">
        <div className="relative flex items-center">
          <span className="material-symbols-outlined absolute right-3 text-[#817660] text-[20px] pointer-events-none">
            search
          </span>
          <input
            className="w-full h-11 pr-10 pl-10 rounded-lg bg-[#f3f4f6] text-sm text-[#191c1e] placeholder:text-[#817660] focus:outline-none focus:bg-white focus:ring-1 focus:ring-[#eab308] transition-all"
            placeholder="بحث بالرقم (NG-2026-...)، الزبون، التيليفون، أو المدينة..."
            type="text"
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)}
          />
          {localSearch && (
            <button
              className="absolute left-3 text-[#817660] hover:text-[#191c1e]"
              onClick={() => setLocalSearch('')}
              type="button"
            >
              <span className="material-symbols-outlined text-[18px]">cancel</span>
            </button>
          )}
        </div>

        {/* Quick Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
          <button
            onClick={() => setSelectedRouteFilter('all')}
            className={`px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap transition-colors ${
              selectedRouteFilter === 'all'
                ? 'bg-[#141b2b] text-white shadow-xs'
                : 'bg-[#f3f4f6] text-[#575e70] hover:bg-[#edeef0]'
            }`}
            type="button"
          >
            الكل
          </button>
          <button
            onClick={() => setSelectedRouteFilter('casa_tanger')}
            className={`px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap transition-colors ${
              selectedRouteFilter === 'casa_tanger'
                ? 'bg-[#141b2b] text-white shadow-xs'
                : 'bg-[#f3f4f6] text-[#575e70] hover:bg-[#edeef0]'
            }`}
            type="button"
          >
            كازا ➔ طنجة
          </button>
          <button
            onClick={() => setSelectedRouteFilter('casa_marrakech')}
            className={`px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap transition-colors ${
              selectedRouteFilter === 'casa_marrakech'
                ? 'bg-[#141b2b] text-white shadow-xs'
                : 'bg-[#f3f4f6] text-[#575e70] hover:bg-[#edeef0]'
            }`}
            type="button"
          >
            كازا ➔ مراكش
          </button>
          <button
            onClick={() => setSelectedRouteFilter('in_delivery')}
            className={`px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap transition-colors ${
              selectedRouteFilter === 'in_delivery'
                ? 'bg-[#141b2b] text-white shadow-xs'
                : 'bg-[#f3f4f6] text-[#575e70] hover:bg-[#edeef0]'
            }`}
            type="button"
          >
            قيد التوصيل
          </button>
          <button
            onClick={() => setSelectedRouteFilter('issues')}
            className={`px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap transition-colors ${
              selectedRouteFilter === 'issues'
                ? 'bg-[#b91a24] text-white shadow-xs'
                : 'bg-[#f3f4f6] text-[#b91a24] hover:bg-[#ffdad7]'
            }`}
            type="button"
          >
            متعثرة
          </button>
        </div>
      </section>

      {/* 3. Dashboard Interactive Tabs Rail */}
      <TabsRail activeTab={activeTab} onTabChange={onTabChange} />

      {/* 4. Live Operations Feed (Recent Shipments) */}
      <section className="bg-white rounded-xl p-4 shadow-sm border border-[#e1e2e4] space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#eab308] animate-pulse"></span>
            <h2 className="text-base sm:text-lg font-bold text-[#191c1e]">
              آخر الإرساليات والتحركات
            </h2>
          </div>
          <button
            onClick={() => onTabChange('live_tracking')}
            className="text-xs sm:text-sm font-bold text-[#785a00] hover:underline flex items-center gap-1"
            type="button"
          >
            <span>شوف التتبع المباشر</span>
            <span className="material-symbols-outlined text-[16px]">arrow_left</span>
          </button>
        </div>

        {/* Shipment Cards Feed */}
        <div className="space-y-3">
          {filteredShipments.length === 0 ? (
            <div className="text-center py-8 text-gray-500 bg-[#f8f9fb] rounded-xl">
              <span className="material-symbols-outlined text-4xl text-gray-400 block mb-1">
                inventory
              </span>
              <p className="text-sm font-bold">ما لقينا حتى إرسالية بهاد المعايير</p>
              <button
                onClick={() => {
                  setSelectedRouteFilter('all');
                  setLocalSearch('');
                }}
                className="mt-2 text-xs font-bold text-[#785a00] underline"
              >
                مسح الفلتر
              </button>
            </div>
          ) : (
            filteredShipments.map((shipment) => {
              const isEnRoute = shipment.status === 'en_route';
              const isOutForDelivery = shipment.status === 'out_for_delivery';
              const isDelivered = shipment.status === 'delivered';
              const isIssue = shipment.status === 'issue';

              const badgeColor = isEnRoute
                ? 'bg-[#d9dff5] text-[#141b2b]'
                : isOutForDelivery
                ? 'bg-[#f7be1d]/30 text-[#785a00]'
                : isDelivered
                ? 'bg-emerald-100 text-emerald-800'
                : 'bg-[#ffdad7] text-[#b91a24]';

              return (
                <div
                  key={shipment.id}
                  className="bg-[#f8f9fb] hover:bg-[#f3f4f6] transition-colors rounded-xl p-3.5 space-y-2 border border-[#e1e2e4]/70"
                >
                  {/* Top Bar of Card */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-base sm:text-lg font-black tracking-wider text-[#191c1e] font-chivo" dir="ltr">
                        {shipment.id}
                      </span>
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${badgeColor}`}>
                        {shipment.statusText}
                      </span>
                    </div>
                    <span className="text-xs text-[#575e70] font-medium">
                      {shipment.createdAt}
                    </span>
                  </div>

                  {/* Route & Price */}
                  <div className="flex items-center justify-between text-sm text-[#191c1e] py-1 border-y border-[#edeef0]/60">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="font-bold">{shipment.originCity}</span>
                      <span className="material-symbols-outlined text-[16px] text-[#817660]">
                        arrow_back
                      </span>
                      <span className="font-bold text-[#141b2b]">{shipment.destinationCity}</span>
                    </div>
                    <span className="text-base sm:text-lg font-black text-[#785a00] font-chivo shrink-0" dir="ltr">
                      {shipment.price} د.م.
                    </span>
                  </div>

                  {/* Driver & Track Button */}
                  <div className="flex items-center justify-between pt-1 gap-2">
                    <div className="text-xs text-[#575e70] truncate max-w-[240px] sm:max-w-md">
                      <span>الشيفور: {shipment.driverName}</span>
                      <span className="text-gray-400 mx-1">·</span>
                      <span className="text-gray-600 font-chivo" dir="ltr">({shipment.truckModel})</span>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      <button
                        onClick={() => {
                          onSelectShipment(shipment.id);
                          onTabChange('live_tracking');
                        }}
                        className="px-3 py-1.5 rounded-lg bg-[#141b2b] hover:bg-[#252f48] text-white text-xs font-bold transition-all shadow-xs flex items-center gap-1"
                        type="button"
                      >
                        <span className="material-symbols-outlined text-[15px]">radar</span>
                        <span>تتبع الآن</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </section>

      {/* 5. Quick Actions Grid */}
      <section className="grid grid-cols-2 gap-2.5">
        <button
          onClick={onOpenNewOrder}
          className="p-3.5 rounded-xl bg-[#eab308] hover:bg-[#f7be1d] text-[#141b2b] text-sm sm:text-base font-black flex items-center justify-center gap-2 shadow-sm transition-all active:scale-[0.98]"
          type="button"
        >
          <span className="material-symbols-outlined text-[22px]">add_circle</span>
          <span>إرسالية جديدة</span>
        </button>

        <button
          onClick={() => onTabChange('drivers')}
          className="p-3.5 rounded-xl bg-[#141b2b] hover:bg-[#252f48] text-white text-sm sm:text-base font-black flex items-center justify-center gap-2 shadow-sm transition-all active:scale-[0.98]"
          type="button"
        >
          <span className="material-symbols-outlined text-[22px]">assignment_turned_in</span>
          <span>مهمات الشيفور</span>
        </button>
      </section>
    </div>
  );
};
