import React, { useState } from 'react';

export const SettingsScreen: React.FC = () => {
  const [selectedBranch, setSelectedBranch] = useState('الدار البيضاء (عين السبع المركزي)');
  const [smsAlerts, setSmsAlerts] = useState(true);
  const [waAlerts, setWaAlerts] = useState(true);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = () => {
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-4" dir="rtl">
      <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-sm border border-[#e1e2e4] space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-[#191c1e]">
              إعدادات المنصة (Paramètres)
            </h2>
            <p className="text-xs sm:text-sm text-[#4f4633] font-noto">
              تخصيص الفروع، التنبيهات وإدارة المحطة المركزية
            </p>
          </div>
          <span className="material-symbols-outlined text-[#785a00] text-3xl">tune</span>
        </div>

        {savedSuccess && (
          <div className="p-3 bg-emerald-100 border border-emerald-300 text-emerald-900 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2">
            <span className="material-symbols-outlined text-emerald-600">check_circle</span>
            <span>تم حفظ الإعدادات بنجاح.</span>
          </div>
        )}

        <div className="space-y-3.5 text-xs sm:text-sm">
          <div>
            <label className="text-xs font-bold text-[#575e70] block mb-1">
              الفرع التشغيلي الافتراضي
            </label>
            <select
              className="w-full h-11 px-3 rounded-xl bg-[#f8f9fb] border border-[#e1e2e4] text-[#191c1e] font-bold focus:outline-none focus:border-[#eab308]"
              value={selectedBranch}
              onChange={(e) => setSelectedBranch(e.target.value)}
            >
              <option value="الدار البيضاء (عين السبع المركزي)">الدار البيضاء (عين السبع المركزي)</option>
              <option value="طنجة (المنطقة الحرة المتوسطية)">طنجة (المنطقة الحرة المتوسطية)</option>
              <option value="مراكش (سيدي غانم)">مراكش (سيدي غانم)</option>
              <option value="فاس (المنطقة الصناعية بنسودة)">فاس (المنطقة الصناعية بنسودة)</option>
            </select>
          </div>

          <div className="space-y-2 pt-2 border-t border-[#f3f4f6]">
            <span className="text-xs font-bold text-[#191c1e] block">قنوات الإشعارات الفورية:</span>

            <label className="flex items-center justify-between p-3 rounded-xl bg-[#f8f9fb] border border-[#e1e2e4] cursor-pointer">
              <span className="font-bold text-[#191c1e]">تنبيهات WhatsApp المباشرة للزبناء</span>
              <input
                type="checkbox"
                checked={waAlerts}
                onChange={(e) => setWaAlerts(e.target.checked)}
                className="w-5 h-5 accent-[#eab308] rounded"
              />
            </label>

            <label className="flex items-center justify-between p-3 rounded-xl bg-[#f8f9fb] border border-[#e1e2e4] cursor-pointer">
              <span className="font-bold text-[#191c1e]">رسائل SMS لتأكيد الاستلام</span>
              <input
                type="checkbox"
                checked={smsAlerts}
                onChange={(e) => setSmsAlerts(e.target.checked)}
                className="w-5 h-5 accent-[#eab308] rounded"
              />
            </label>
          </div>

          <div className="p-3 bg-[#f8f9fb] rounded-xl border border-[#e1e2e4] space-y-1 text-xs text-[#575e70]">
            <div className="flex justify-between">
              <span>إصدار التطبيق والمنظومة:</span>
              <strong className="font-chivo text-black">NEXT GEN v2.6.4 (Morocco Core)</strong>
            </div>
            <div className="flex justify-between">
              <span>العملة الافتراضية:</span>
              <strong className="text-black">الدرهم المغربي (د.م. / MAD)</strong>
            </div>
          </div>

          <button
            onClick={handleSave}
            className="w-full h-11 rounded-xl bg-[#eab308] hover:bg-[#f7be1d] text-[#141b2b] font-black text-xs sm:text-sm transition-colors shadow-xs"
            type="button"
          >
            حفظ التغييرات
          </button>
        </div>
      </div>
    </div>
  );
};
