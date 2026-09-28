import React, { useState } from 'react';
import { Shipment } from '../../types';
import { ASSET_IMAGES, OFFICIAL_TIMELINE_STEPS } from '../../data/mockData';

interface LiveTrackingScreenProps {
  shipments: Shipment[];
  selectedTrackingId?: string;
  onSelectTrackingId: (id: string) => void;
  onOpenDriverTab: () => void;
}

export const LiveTrackingScreen: React.FC<LiveTrackingScreenProps> = ({
  shipments,
  selectedTrackingId,
  onSelectTrackingId,
  onOpenDriverTab,
}) => {
  const [searchInput, setSearchInput] = useState<string>(
    selectedTrackingId || shipments[0]?.id || 'NG-2026-088142'
  );

  // Find active shipment or fallback
  const activeShipment =
    shipments.find((s) => s.id.toUpperCase() === searchInput.trim().toUpperCase()) ||
    shipments[0];

  // Interactive milestone step override (for testing full 8-step tracking)
  const [customStep, setCustomStep] = useState<number>(activeShipment?.currentStep || 5);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchInput.trim()) return;
    const found = shipments.find(
      (s) => s.id.toLowerCase() === searchInput.trim().toLowerCase()
    );
    if (found) {
      onSelectTrackingId(found.id);
      setCustomStep(found.currentStep);
    }
  };

  const currentStep = customStep;

  // Timestamps for the 8 milestones
  const milestoneTimes = [
    '09:15 ص',
    '09:30 ص',
    '10:00 ص',
    '11:15 ص',
    '13:40 م',
    '16:00 م',
    '16:45 م',
    '17:30 م',
  ];

  return (
    <div className="max-w-2xl mx-auto space-y-4" dir="rtl">
      {/* 1. Search Box */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-sm border border-[#e1e2e4] space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-[#191c1e]">
              تبع السلعة ديالك (Live Tracking)
            </h2>
            <p className="text-xs sm:text-sm text-[#4f4633] font-noto">
              أدخل كود الشحنة أو رقم الهاتف للمعاينة المباشرة
            </p>
          </div>
          <span className="material-symbols-outlined text-[#785a00] text-3xl">radar</span>
        </div>

        <form onSubmit={handleSearchSubmit} className="flex gap-2">
          <input
            className="flex-1 h-11 px-3 rounded-xl bg-[#f3f4f6] text-sm text-[#191c1e] uppercase font-bold focus:outline-none focus:bg-white focus:ring-1 focus:ring-[#eab308] border border-[#e1e2e4]"
            placeholder="NG-2026-XXXXXX"
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <button
            className="px-4 h-11 rounded-xl bg-[#eab308] hover:bg-[#f7be1d] text-[#141b2b] text-xs sm:text-sm font-black shrink-0 transition-colors shadow-xs"
            type="submit"
          >
            تحديث
          </button>
        </form>

        {/* Quick select chips for sample shipments */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pt-1 text-xs">
          <span className="text-[#817660] text-[11px] shrink-0">أمثلة سريعة:</span>
          {shipments.slice(0, 4).map((s) => (
            <button
              key={s.id}
              onClick={() => {
                setSearchInput(s.id);
                onSelectTrackingId(s.id);
                setCustomStep(s.currentStep);
              }}
              className={`px-2.5 py-1 rounded-lg border font-chivo text-xs transition-colors shrink-0 ${
                s.id === activeShipment?.id
                  ? 'bg-[#141b2b] text-white border-[#141b2b]'
                  : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
              }`}
              type="button"
            >
              {s.id}
            </button>
          ))}
        </div>
      </div>

      {/* 2. Current Tracking Status Details Card */}
      {activeShipment && (
        <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-sm border border-[#e1e2e4] space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#f3f4f6]">
            <div>
              <span className="text-[11px] text-[#575e70] font-bold block">رقم الإرسالية المحددة</span>
              <span className="text-lg sm:text-xl font-black text-[#191c1e] font-chivo tracking-wider" dir="ltr">
                {activeShipment.id}
              </span>
            </div>
            <span className="px-3 py-1 rounded-full bg-[#d9dff5] text-[#141b2b] text-xs sm:text-sm font-bold shadow-xs">
              {currentStep >= 8
                ? 'تم التوصيل بنجاح'
                : currentStep === 7
                ? 'خرجت للتوصيل'
                : 'فـ الطريق (En Route)'}
            </span>
          </div>

          {/* Route Visualizer */}
          <div className="flex items-center justify-between bg-[#f8f9fb] rounded-xl p-3.5 border border-[#e1e2e4]/70">
            <div className="space-y-0.5">
              <span className="text-[11px] text-[#575e70] font-bold">المرسل</span>
              <span className="text-sm sm:text-base font-black text-[#191c1e] block">
                {activeShipment.originCity}
              </span>
              <span className="text-xs text-[#575e70]">{activeShipment.senderName}</span>
            </div>

            <div className="flex flex-col items-center px-2">
              <span className="material-symbols-outlined text-[#785a00] text-2xl animate-bounce">
                local_shipping
              </span>
              <span className="text-[11px] text-[#785a00] font-bold">A1 طريق السيار</span>
            </div>

            <div className="space-y-0.5 text-left">
              <span className="text-[11px] text-[#575e70] font-bold">المستلم</span>
              <span className="text-sm sm:text-base font-black text-[#191c1e] block">
                {activeShipment.destinationCity}
              </span>
              <span className="text-xs text-[#575e70]">{activeShipment.recipientName}</span>
            </div>
          </div>

          {/* Static Route Map Banner */}
          <div
            className="w-full h-36 rounded-xl bg-cover bg-center shadow-inner relative flex items-end p-2.5 border border-[#e1e2e4] overflow-hidden"
            style={{ backgroundImage: `url('${ASSET_IMAGES.routeMap}')` }}
          >
            <div className="px-3 py-1.5 rounded-lg bg-[#141b2b]/90 text-white text-xs font-bold flex items-center gap-2 backdrop-blur-sm shadow-md">
              <span className="w-2.5 h-2.5 rounded-full bg-[#eab308] animate-pulse"></span>
              <span>
                السرعة الحالية: {activeShipment.speedKmh || 84} كلم/ساعة · الوصول المتوقع:{' '}
                {activeShipment.estimatedDeliveryTime || '17:30'}
              </span>
            </div>
          </div>

          {/* Interactive Step Switcher for Customer Simulator */}
          <div className="bg-[#f8f9fb] p-3 rounded-xl border border-[#e1e2e4]/70 space-y-1.5">
            <div className="flex items-center justify-between text-xs font-bold text-[#575e70]">
              <span>محاكاة مراحل التوصيل (Simulateur d'étapes):</span>
              <span className="font-chivo text-[#785a00]">المرحلة {currentStep} من 8</span>
            </div>
            <div className="flex items-center gap-1 overflow-x-auto no-scrollbar py-1">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((s) => (
                <button
                  key={s}
                  onClick={() => setCustomStep(s)}
                  className={`w-8 h-8 rounded-lg text-xs font-bold shrink-0 transition-all font-chivo ${
                    currentStep === s
                      ? 'bg-[#141b2b] text-[#eab308] shadow-sm'
                      : s < currentStep
                      ? 'bg-[#eab308] text-[#141b2b]'
                      : 'bg-white text-gray-400 border border-gray-200'
                  }`}
                  type="button"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* 8-Step Official Tracking Timeline */}
          <div className="space-y-3 pt-2">
            <h3 className="text-sm sm:text-base font-bold text-[#191c1e]">
              محطات التوصيل الرسمية (Timeline)
            </h3>

            <div className="space-y-3 relative pr-4">
              {/* Timeline vertical connector line */}
              <div className="absolute top-2 bottom-4 right-[7px] w-0.5 bg-[#e1e2e4]"></div>

              {OFFICIAL_TIMELINE_STEPS.map((milestone, idx) => {
                const stepNum = milestone.step;
                const isCompleted = stepNum < currentStep;
                const isActive = stepNum === currentStep;
                const isPending = stepNum > currentStep;

                return (
                  <div key={stepNum} className="flex items-start gap-3 relative">
                    {/* Step Icon Badge */}
                    {isCompleted ? (
                      <span className="w-4 h-4 rounded-full bg-[#eab308] text-[#141b2b] flex items-center justify-center ring-4 ring-white shrink-0 z-10 shadow-xs">
                        <span className="material-symbols-outlined text-[10px] font-bold">check</span>
                      </span>
                    ) : isActive ? (
                      <span className="w-4 h-4 rounded-full bg-[#141b2b] text-[#eab308] flex items-center justify-center ring-4 ring-white shrink-0 z-10 animate-pulse">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#eab308]"></span>
                      </span>
                    ) : (
                      <span className="w-4 h-4 rounded-full bg-[#e1e2e4] ring-4 ring-white shrink-0 z-10"></span>
                    )}

                    {/* Step Content */}
                    <div
                      className={`flex-1 rounded-xl transition-all ${
                        isActive
                          ? 'bg-[#f3f4f6] p-2.5 border border-[#eab308]/50 shadow-xs'
                          : 'py-0.5'
                      } ${isPending ? 'opacity-50' : ''}`}
                    >
                      <div className="flex items-center justify-between">
                        <span
                          className={`text-xs sm:text-sm font-bold ${
                            isActive ? 'text-[#191c1e]' : 'text-[#4f4633]'
                          }`}
                        >
                          {milestone.title}
                        </span>
                        <span
                          className={`text-[11px] font-chivo ${
                            isActive ? 'text-[#785a00] font-black' : 'text-[#817660]'
                          }`}
                        >
                          {milestoneTimes[idx]}
                        </span>
                      </div>
                      <span className="text-xs text-[#575e70] block mt-0.5 font-noto">
                        {milestone.description}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Quick Actions at bottom */}
          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[#f3f4f6]">
            <button
              onClick={() => alert('رقم تقديري للتوضيح: ' + activeShipment.recipientPhone)}
              className="h-11 rounded-xl bg-[#f8f9fb] hover:bg-[#edeef0] text-[#191c1e] text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5 transition-colors border border-[#e1e2e4]"
              type="button"
            >
              <span className="material-symbols-outlined text-[18px]">call</span>
              <span>عيّط للزبون</span>
            </button>

            <button
              onClick={onOpenDriverTab}
              className="h-11 rounded-xl bg-[#141b2b] hover:bg-[#252f48] text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5 transition-colors shadow-xs"
              type="button"
            >
              <span className="material-symbols-outlined text-[18px]">sports_motorsports</span>
              <span>فضاء الشيفور</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
