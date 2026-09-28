import React from 'react';
import { ASSET_IMAGES } from '../../data/mockData';

export const HubLocationScreen: React.FC = () => {
  const hubs = [
    {
      city: 'الدار البيضاء (Hub Central)',
      address: 'المنطقة اللوجستيكية عين السبع، مجمع الشحن رقم 12',
      phone: '0XXXXX',
      timing: '24/7 (شحن وتوزيع مستمر)',
      isMain: true,
    },
    {
      city: 'طنجة (Hub Nord)',
      address: 'قرب ميناء طنجة المتوسط والمنطقة الصناعية كزناية',
      phone: '0XXXXX',
      timing: '08:00 - 21:00',
    },
    {
      city: 'مراكش (Hub Sud)',
      address: 'المنطقة الصناعية سيدي غانم، شارع الرئيسي',
      phone: '0XXXXX',
      timing: '08:00 - 20:00',
    },
    {
      city: 'فاس (Hub Centre)',
      address: 'المنطقة الصناعية بنسودة، تجزئة الأمل',
      phone: '0XXXXX',
      timing: '08:00 - 19:30',
    },
  ];

  return (
    <div className="max-w-2xl mx-auto space-y-4" dir="rtl">
      <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-sm border border-[#e1e2e4] space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-[#191c1e]">
              موقعنا المركزي (Hub Casablanca)
            </h2>
            <p className="text-xs sm:text-sm text-[#4f4633] font-noto">
              الدار البيضاء، المملكة المغربية
            </p>
          </div>
          <span className="material-symbols-outlined text-[#785a00] text-3xl">warehouse</span>
        </div>

        {/* Casablanca Map Canvas */}
        <div
          className="w-full h-48 sm:h-56 rounded-2xl bg-cover bg-center shadow-inner relative flex items-end p-3.5 border border-[#e1e2e4] overflow-hidden"
          style={{ backgroundImage: `url('${ASSET_IMAGES.casablancaMap}')` }}
        >
          <div className="bg-white/95 backdrop-blur-md p-3 rounded-xl shadow-md max-w-sm space-y-1 border border-[#e1e2e4]">
            <span className="text-xs sm:text-sm font-black text-[#191c1e] flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[#eab308] text-[18px]">
                location_on
              </span>
              <span>المقر المركزي والمنصة اللوجستية NEXT GEN</span>
            </span>
            <span className="text-xs text-[#575e70] block font-noto">
              المنطقة اللوجستيكية عين السبع، الدار البيضاء
            </span>
          </div>
        </div>

        {/* Working Hours & Contact Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs sm:text-sm text-[#191c1e]">
          <div className="p-3.5 bg-[#f8f9fb] rounded-xl space-y-1 border border-[#e1e2e4]/70">
            <span className="text-[11px] text-[#575e70] font-bold block">
              أوقات العمل والكوليكط
            </span>
            <span className="font-bold block">الإثنين - السبت: 08:00 - 20:00</span>
            <span className="text-[11px] text-[#785a00] block">الشحن بين المدن: 24/7 دون انقطاع</span>
          </div>

          <div className="p-3.5 bg-[#f8f9fb] rounded-xl space-y-1 border border-[#e1e2e4]/70">
            <span className="text-[11px] text-[#575e70] font-bold block">
              الهاتف المباشر والدعم
            </span>
            <span className="font-chivo font-black text-base text-[#141b2b] block" dir="ltr">
              0XXXXX
            </span>
            <span className="text-[11px] text-[#575e70] block">متاح عبر الواتساب والمكالمات</span>
          </div>
        </div>

        {/* Maps external link */}
        <a
          className="w-full h-11 rounded-xl bg-[#141b2b] hover:bg-[#252f48] text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-colors shadow-xs"
          href="https://maps.google.com/?q=Casablanca,Morocco"
          rel="noopener noreferrer"
          target="_blank"
        >
          <span className="material-symbols-outlined text-[18px]">directions</span>
          <span>فتح موقع الـ Hub فـ خرائط Google</span>
        </a>

        {/* Regional Hubs Network */}
        <div className="space-y-2 pt-2 border-t border-[#f3f4f6]">
          <span className="text-xs sm:text-sm font-bold text-[#191c1e] block">
            شبكة محطات التوزيع الجهوية (Réseau Régional):
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {hubs.map((hub, idx) => (
              <div
                key={idx}
                className="p-3 rounded-xl bg-[#f8f9fb] border border-[#e1e2e4]/70 space-y-1 text-xs"
              >
                <div className="flex items-center justify-between font-bold text-[#191c1e]">
                  <span>{hub.city}</span>
                  {hub.isMain && (
                    <span className="px-2 py-0.5 rounded-full bg-[#eab308] text-[#141b2b] text-[10px]">
                      الرئيسي
                    </span>
                  )}
                </div>
                <p className="text-[#575e70]">{hub.address}</p>
                <div className="flex items-center justify-between pt-1 text-[11px] text-[#785a00] font-chivo font-bold">
                  <span dir="ltr">{hub.phone}</span>
                  <span>{hub.timing}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
