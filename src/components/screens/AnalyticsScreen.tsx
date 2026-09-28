import React from 'react';

export const AnalyticsScreen: React.FC = () => {
  const routesData = [
    { route: 'الدار البيضاء ➔ طنجة (A1)', pct: 38, count: 420 },
    { route: 'الدار البيضاء ➔ مراكش (A3)', pct: 26, count: 288 },
    { route: 'الرباط ➔ فاس / مكناس (A2)', pct: 18, count: 198 },
    { route: 'الدار البيضاء ➔ أكادير (A7)', pct: 12, count: 132 },
    { route: 'خطوط إقليمية أخرى', pct: 6, count: 66 },
  ];

  return (
    <div className="max-w-2xl mx-auto space-y-4" dir="rtl">
      <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-sm border border-[#e1e2e4] space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-[#191c1e]">
              الإحصائيات واللوحة البيانية (Statistiques & Performance)
            </h2>
            <p className="text-xs sm:text-sm text-[#4f4633] font-noto">
              مؤشرات الأداء اللوجستي، نسب التسليم الناجح وحجم المعاملات
            </p>
          </div>
          <span className="material-symbols-outlined text-[#785a00] text-3xl">query_stats</span>
        </div>

        {/* Big KPI Metrics Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
          <div className="p-3 bg-[#f8f9fb] rounded-xl border border-[#e1e2e4] space-y-0.5">
            <span className="text-[11px] text-gray-500 font-bold block">نسبة نجاح التوصيل</span>
            <div className="text-2xl font-black text-emerald-700 font-chivo">94.2%</div>
            <span className="text-[10px] text-emerald-600 block">مرتفعة مقارنة بالمعدل الوطني</span>
          </div>

          <div className="p-3 bg-[#f8f9fb] rounded-xl border border-[#e1e2e4] space-y-0.5">
            <span className="text-[11px] text-gray-500 font-bold block">معدل وقت التوصيل</span>
            <div className="text-2xl font-black text-[#141b2b] font-chivo">18.4 ساعة</div>
            <span className="text-[10px] text-gray-500 block">بين المدن الرئيسية</span>
          </div>

          <div className="p-3 bg-[#f8f9fb] rounded-xl border border-[#e1e2e4] space-y-0.5 col-span-2 sm:col-span-1">
            <span className="text-[11px] text-gray-500 font-bold block">إجمالي مبالغ COD اليوم</span>
            <div className="text-2xl font-black text-[#785a00] font-chivo">84,200 د.م.</div>
            <span className="text-[10px] text-emerald-600 block">تم تحصيل 92% منها</span>
          </div>
        </div>

        {/* Route distribution */}
        <div className="space-y-3 pt-2">
          <h3 className="text-xs sm:text-sm font-bold text-[#191c1e]">
            توزيع الشحنات حسب المحاور الطرقية الكبرى:
          </h3>
          <div className="space-y-2.5">
            {routesData.map((r, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex justify-between text-xs text-[#191c1e]">
                  <span className="font-bold">{r.route}</span>
                  <span className="font-chivo text-[#575e70]">
                    {r.count} طرد ({r.pct}%)
                  </span>
                </div>
                <div className="w-full bg-[#f3f4f6] rounded-full h-2 overflow-hidden border border-gray-200">
                  <div
                    className="bg-[#eab308] h-full rounded-full transition-all"
                    style={{ width: `${r.pct}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
