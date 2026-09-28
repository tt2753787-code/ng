import React, { useState } from 'react';
import { TruckVehicle } from '../../types';
import { INITIAL_TRUCKS } from '../../data/mockData';

export const FleetScreen: React.FC = () => {
  const [trucks] = useState<TruckVehicle[]>(INITIAL_TRUCKS);
  const [filter, setFilter] = useState<'all' | 'in_mission' | 'available' | 'maintenance'>('all');

  const filteredTrucks = trucks.filter((t) => {
    if (filter === 'all') return true;
    return t.status === filter;
  });

  return (
    <div className="max-w-2xl mx-auto space-y-4" dir="rtl">
      <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-sm border border-[#e1e2e4] space-y-3.5">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-[#191c1e]">
              الشاحنات والأسطول (Gestion Flotte)
            </h2>
            <p className="text-xs sm:text-sm text-[#4f4633] font-noto">
              متابعة جاهزية الشاحنات وعمليات النقل البيني
            </p>
          </div>
          <span className="material-symbols-outlined text-[#785a00] text-3xl">commute</span>
        </div>

        {/* Filter Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap transition-colors ${
              filter === 'all'
                ? 'bg-[#141b2b] text-white'
                : 'bg-[#f3f4f6] text-[#575e70] hover:bg-[#edeef0]'
            }`}
            type="button"
          >
            جميع الآليات ({trucks.length})
          </button>
          <button
            onClick={() => setFilter('in_mission')}
            className={`px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap transition-colors ${
              filter === 'in_mission'
                ? 'bg-[#141b2b] text-white'
                : 'bg-[#f3f4f6] text-[#575e70] hover:bg-[#edeef0]'
            }`}
            type="button"
          >
            فـ مهمة (2)
          </button>
          <button
            onClick={() => setFilter('available')}
            className={`px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap transition-colors ${
              filter === 'available'
                ? 'bg-[#141b2b] text-white'
                : 'bg-[#f3f4f6] text-[#575e70] hover:bg-[#edeef0]'
            }`}
            type="button"
          >
            متاحة فـ الـ Hub (1)
          </button>
          <button
            onClick={() => setFilter('maintenance')}
            className={`px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap transition-colors ${
              filter === 'maintenance'
                ? 'bg-[#b91a24] text-white'
                : 'bg-[#f3f4f6] text-[#b91a24] hover:bg-[#ffdad7]'
            }`}
            type="button"
          >
            فـ الصيانة (1)
          </button>
        </div>

        {/* Fleet Cards */}
        <div className="space-y-3 pt-1">
          {filteredTrucks.map((truck) => {
            const isMission = truck.status === 'in_mission';
            const isAvailable = truck.status === 'available';
            const isMaint = truck.status === 'maintenance';

            return (
              <div
                key={truck.id}
                className="bg-[#f8f9fb] rounded-xl p-3.5 space-y-2.5 border border-[#e1e2e4]/70"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-sm sm:text-base font-black text-[#191c1e]">
                      {truck.model}
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded-full text-[11px] font-bold ${
                        isMission
                          ? 'bg-[#d9dff5] text-[#141b2b]'
                          : isAvailable
                          ? 'bg-[#eab308] text-[#141b2b]'
                          : 'bg-[#ffdad7] text-[#410004]'
                      }`}
                    >
                      {truck.statusText}
                    </span>
                  </div>
                  <span className="text-xs font-chivo font-black text-[#141b2b]" dir="ltr">
                    {truck.plate}
                  </span>
                </div>

                <div className="flex items-center justify-between text-xs text-[#191c1e]">
                  <span>الشيفور: <strong>{truck.driver}</strong></span>
                  <span className="text-[#575e70]">الخط: <strong>{truck.route}</strong></span>
                </div>

                {/* Capacity & Fuel progress bars */}
                {!isMaint && (
                  <div className="space-y-1.5 pt-1">
                    <div>
                      <div className="flex justify-between text-[11px] text-[#575e70] mb-0.5">
                        <span>نسبة الحمولة الحالية:</span>
                        <span className="font-chivo font-bold text-[#191c1e]">
                          {truck.loadPercentage}%
                        </span>
                      </div>
                      <div className="w-full bg-[#e1e2e4] rounded-full h-2 overflow-hidden">
                        <div
                          className="bg-[#785a00] h-full rounded-full transition-all"
                          style={{ width: `${truck.loadPercentage}%` }}
                        ></div>
                      </div>
                    </div>

                    <div className="flex justify-between text-[11px] text-[#575e70]">
                      <span className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-[14px] text-emerald-600">
                          local_gas_station
                        </span>
                        <span>مستوى الوقود: {truck.fuelPercentage}%</span>
                      </span>
                      <span>الفحص التقني: {truck.techCheck}</span>
                    </div>
                  </div>
                )}

                {isMaint && (
                  <div className="p-2.5 bg-[#ffdad7]/50 rounded-lg text-xs text-[#410004] font-bold flex items-center justify-between">
                    <span>{truck.techCheck}</span>
                    <span>جاهزة غدا 08:00 ص</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
