import React, { useState } from 'react';
import { Logo } from './Logo';

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  activeScreenTitle: string;
  onOpenNotifications?: () => void;
  onSelectShipment?: (id: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  searchQuery,
  onSearchChange,
  activeScreenTitle,
  onSelectShipment,
}) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  return (
    <header className="sticky top-0 w-full z-40 bg-[#f8f9fb]/95 backdrop-blur-md border-b border-[#e1e2e4] shadow-sm">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 py-2 space-y-2">
        {/* Top Row: Logo, Brand & Actions */}
        <div className="flex items-center justify-between gap-2">
          {/* Logo & Slogan + Stylish WhatsApp Icon Button */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            <Logo size="md" />

            {/* Small stylish WhatsApp icon button (icon only, no number) */}
            <a
              href="https://api.whatsapp.com/send?text=%D8%B3%D9%84%D8%A7%D9%85%20NEXT%20GEN%D8%8C%20%D8%A8%D8%BA%D9%8A%D8%AA%20%D9%86%D8%B3%D9%88%D9%84%20%D8%B9%D9%84%D9%89%20%D8%AE%D8%AF%D9%85%D8%A9%20%D8%A7%D9%84%D9%86%D9%82%D9%84%20%D9%88%D8%A7%D9%84%D8%AA%D9%88%D8%B5%D9%8A%D9%84."
              target="_blank"
              rel="noopener noreferrer"
              title="واتساب مباشر"
              className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#25D366] hover:bg-[#20ba59] active:scale-95 text-white flex items-center justify-center shadow-xs transition-all hover:shadow-md shrink-0 border border-white"
              aria-label="WhatsApp"
            >
              <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
              </svg>
            </a>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2">
            {/* Direct Hub Status Indicator */}
            <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#f3f4f6] text-[11px] font-bold text-[#575e70]">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>Hub كازا نشط 24/7</span>
            </div>

            {/* Notification Bell */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="w-10 h-10 relative flex items-center justify-center rounded-xl bg-[#f3f4f6] hover:bg-[#edeef0] text-[#191c1e] transition-colors"
                title="الإشعارات والإنذارات"
                type="button"
              >
                <span className="material-symbols-outlined text-[20px]">notifications</span>
                <span className="absolute top-2 left-2 w-2.5 h-2.5 rounded-full bg-[#b91a24] ring-2 ring-white"></span>
              </button>

              {/* Notifications Dropdown */}
              {showNotifications && (
                <div 
                  className="absolute left-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-[#e1e2e4] p-3 z-50 animate-in fade-in slide-in-from-top-2"
                  dir="rtl"
                >
                  <div className="flex items-center justify-between pb-2 border-b border-[#f3f4f6]">
                    <span className="font-bold text-sm text-[#191c1e]">التنبيهات العاجلة (3)</span>
                    <button 
                      onClick={() => setShowNotifications(false)}
                      className="text-xs text-[#785a00] hover:underline"
                    >
                      إغلاق
                    </button>
                  </div>
                  <div className="divide-y divide-[#f3f4f6] text-xs">
                    <div 
                      className="py-2.5 hover:bg-[#f8f9fb] px-1 rounded cursor-pointer"
                      onClick={() => {
                        setShowNotifications(false);
                        onSelectShipment?.('NG-2026-088142');
                      }}
                    >
                      <div className="flex items-center justify-between text-[#b91a24] font-bold">
                        <span>قرب الوصول لطنجة</span>
                        <span className="text-[10px] text-gray-400">منذ 5 د</span>
                      </div>
                      <p className="text-gray-600 mt-0.5">الشاحنة Renault Master على بعد 15 كم من مركز التوزيع بطنجة.</p>
                    </div>

                    <div 
                      className="py-2.5 hover:bg-[#f8f9fb] px-1 rounded cursor-pointer"
                      onClick={() => {
                        setShowNotifications(false);
                        onSelectShipment?.('NG-2026-087920');
                      }}
                    >
                      <div className="flex items-center justify-between text-amber-600 font-bold">
                        <span>إعادة جدولة مراكش</span>
                        <span className="text-[10px] text-gray-400">منذ 20 د</span>
                      </div>
                      <p className="text-gray-600 mt-0.5">طلب الزبون تأجيل التسليم لصباح الغد #NG-2026-087920.</p>
                    </div>

                    <div className="py-2.5 hover:bg-[#f8f9fb] px-1 rounded">
                      <div className="flex items-center justify-between text-emerald-600 font-bold">
                        <span>تم تحصيل COD كازا</span>
                        <span className="text-[10px] text-gray-400">منذ ساعة</span>
                      </div>
                      <p className="text-gray-600 mt-0.5">تم تحصيل 1,250 د.م. وإيداعها في خزينة المحطة المركزية.</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* User Profile Avatar */}
            <div className="relative">
              <button
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="w-9 h-9 rounded-full bg-[#141b2b] text-[#eab308] font-bold flex items-center justify-center hover:opacity-90 transition-opacity border-2 border-[#eab308]"
                type="button"
                title="الملف الشخصي"
              >
                <span className="material-symbols-outlined text-[19px]">person</span>
              </button>

              {/* Profile dropdown */}
              {showProfileMenu && (
                <div 
                  className="absolute left-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-[#e1e2e4] p-3 z-50 text-right"
                  dir="rtl"
                >
                  <div className="pb-2 border-b border-[#f3f4f6]">
                    <div className="font-bold text-sm text-[#191c1e]">مصطفى يا تقادي</div>
                    <div className="text-[11px] text-[#785a00]">مسؤول اللوجستيك والمحطة المركزية</div>
                  </div>
                  <div className="py-2 space-y-1 text-xs">
                    <div className="text-gray-500">الفرع: الدار البيضاء - عين السبع</div>
                    <div className="text-gray-500">الصلاحيات: مدير عمليات كامل</div>
                  </div>
                  <button 
                    onClick={() => setShowProfileMenu(false)}
                    className="w-full mt-1 py-1.5 bg-[#f3f4f6] hover:bg-[#edeef0] text-xs font-bold rounded-lg text-center text-[#191c1e]"
                  >
                    إغلاق
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Row: Quick Search Input & Screen Title Indicator */}
        <div className="flex items-center gap-2">
          <div className="flex-1 h-11 px-3 bg-white rounded-xl flex items-center gap-2 shadow-[0_1px_4px_rgba(0,0,0,0.04)] border border-[#e1e2e4] focus-within:border-[#eab308] focus-within:ring-1 focus-within:ring-[#eab308] transition-all">
            <span className="material-symbols-outlined text-[#817660] text-[20px]">search</span>
            <input
              className="w-full bg-transparent border-0 outline-none text-sm text-[#191c1e] placeholder:text-[#817660]"
              placeholder="بحث سريع برقم الإرسالية (NG-2026-...)، العميل أو السائق..."
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="text-[#817660] hover:text-[#191c1e] p-1"
                type="button"
              >
                <span className="material-symbols-outlined text-[18px]">cancel</span>
              </button>
            )}
          </div>
          <span className="text-xs sm:text-sm font-bold text-[#4f4633] px-2 py-1.5 bg-[#edeef0] rounded-lg truncate max-w-[120px] select-none text-center">
            {activeScreenTitle}
          </span>
        </div>
      </div>
    </header>
  );
};
