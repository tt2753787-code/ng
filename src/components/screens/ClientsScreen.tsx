import React from 'react';
import { INITIAL_CLIENTS } from '../../data/mockData';

export const ClientsScreen: React.FC = () => {
  return (
    <div className="max-w-2xl mx-auto space-y-4" dir="rtl">
      <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-sm border border-[#e1e2e4] space-y-3.5">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-[#191c1e]">
              الزبناء والشركات (Clients & Partenaires B2B)
            </h2>
            <p className="text-xs sm:text-sm text-[#4f4633] font-noto">
              حسابات المتاجر الإلكترونية والتجار، ومتابعة مبالغ التحصيل COD
            </p>
          </div>
          <span className="material-symbols-outlined text-[#785a00] text-3xl">group</span>
        </div>

        <div className="space-y-3 pt-1">
          {INITIAL_CLIENTS.map((client) => (
            <div
              key={client.id}
              className="bg-[#f8f9fb] rounded-xl p-3.5 space-y-2 border border-[#e1e2e4]/70"
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm sm:text-base font-black text-[#191c1e]">
                      {client.name}
                    </span>
                    {client.status === 'vip' && (
                      <span className="px-2 py-0.5 rounded-full bg-[#eab308] text-[#141b2b] text-[10px] font-black">
                        شريك رئيسي VIP
                      </span>
                    )}
                  </div>
                  <span className="text-xs text-[#575e70]">{client.businessType} · {client.city}</span>
                </div>

                <button
                  onClick={() => alert('رقم تقديري للتوضيح: ' + client.phone)}
                  className="px-2.5 py-1 rounded-lg bg-white border border-[#e1e2e4] text-xs font-bold text-[#141b2b] flex items-center gap-1 hover:bg-[#edeef0] transition-colors"
                  type="button"
                >
                  <span className="material-symbols-outlined text-[14px]">call</span>
                  <span dir="ltr">{client.phone}</span>
                </button>
              </div>

              <div className="grid grid-cols-3 gap-2 pt-1 border-t border-[#edeef0] text-center text-xs">
                <div className="p-2 bg-white rounded-lg border border-[#e1e2e4]">
                  <span className="text-[10px] text-gray-500 block">إجمالي الطرود</span>
                  <strong className="text-sm font-chivo text-black">{client.totalOrders}</strong>
                </div>
                <div className="p-2 bg-white rounded-lg border border-[#e1e2e4]">
                  <span className="text-[10px] text-amber-600 block">COD قيد التحصيل</span>
                  <strong className="text-sm font-chivo text-amber-700">{client.pendingCod.toLocaleString()} د.م.</strong>
                </div>
                <div className="p-2 bg-white rounded-lg border border-[#e1e2e4]">
                  <span className="text-[10px] text-emerald-600 block">COD تم صرفه</span>
                  <strong className="text-sm font-chivo text-emerald-700">{client.settledCod.toLocaleString()} د.م.</strong>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
