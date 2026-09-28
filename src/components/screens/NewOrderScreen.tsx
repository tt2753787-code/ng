import React, { useState } from 'react';
import { Shipment } from '../../types';
import { MOROCCAN_CITIES, ASSET_IMAGES } from '../../data/mockData';

interface NewOrderScreenProps {
  onOrderCreated: (newShipment: Shipment) => void;
  onTrackOrder: (id: string) => void;
  onBack: () => void;
}

export const NewOrderScreen: React.FC<NewOrderScreenProps> = ({
  onOrderCreated,
  onTrackOrder,
  onBack,
}) => {
  // Form fields
  const [recipientName, setRecipientName] = useState('');
  const [recipientPhone, setRecipientPhone] = useState('0XXXXX');
  const [originCity, setOriginCity] = useState('الدار البيضاء (Hub Central)');
  const [destCity, setDestCity] = useState('طنجة');
  const [deliveryType, setDeliveryType] = useState<'standard' | 'express'>('standard');
  const [address, setAddress] = useState('');
  const [commodity, setCommodity] = useState('');
  const [weightKg, setWeightKg] = useState('3.5');
  const [parcelCount, setParcelCount] = useState('1');
  const [codPrice, setCodPrice] = useState('380');
  const [notes, setNotes] = useState('');

  // GPS state
  const [gpsCoords, setGpsCoords] = useState<{ lat: string; lng: string } | null>(null);
  const [gpsLoading, setGpsLoading] = useState(false);

  // Photo state
  const [cargoPhotoUrl, setCargoPhotoUrl] = useState<string | null>(ASSET_IMAGES.parcelBox);
  const [photoUploaded, setPhotoUploaded] = useState(true);

  // Modal state
  const [createdTrackingCode, setCreatedTrackingCode] = useState<string | null>(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // Approximate price calculation in MAD
  const calculatedPrice = () => {
    const base = deliveryType === 'express' ? 80 : 45;
    const weightNum = parseFloat(weightKg) || 1;
    const weightCharge = Math.max(0, weightNum - 1) * 8;
    return Math.round(base + weightCharge);
  };

  const handleCaptureGps = () => {
    setGpsLoading(true);
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setGpsCoords({
            lat: position.coords.latitude.toFixed(4),
            lng: position.coords.longitude.toFixed(4),
          });
          setGpsLoading(false);
        },
        () => {
          // Fallback to high-accuracy Casablanca hub coordinates
          const randomLat = (33.5731 + (Math.random() * 0.008 - 0.004)).toFixed(4);
          const randomLng = (-7.5898 + (Math.random() * 0.008 - 0.004)).toFixed(4);
          setGpsCoords({ lat: randomLat, lng: randomLng });
          setGpsLoading(false);
        },
        { timeout: 3000 }
      );
    } else {
      setGpsCoords({ lat: '33.5731', lng: '-7.5898' });
      setGpsLoading(false);
    }
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setCargoPhotoUrl(event.target.result as string);
          setPhotoUploaded(true);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!recipientName.trim() || !recipientPhone.trim()) return;

    // Generate authentic Moroccan tracking code
    const generatedId = `NG-2026-${Math.floor(100000 + Math.random() * 900000)}`;

    const newShipment: Shipment = {
      id: generatedId,
      originCity,
      destinationCity: destCity,
      senderName: 'المحطة المركزية كازا',
      senderPhone: '0XXXXX',
      recipientName: recipientName.trim(),
      recipientPhone: recipientPhone.trim(),
      recipientAddress: address.trim() || `${destCity} - وسط المدينة`,
      price: parseInt(codPrice) || calculatedPrice(),
      codCollected: false,
      weightKg: parseFloat(weightKg) || 1,
      packageCount: parseInt(parcelCount) || 1,
      commodity: commodity.trim() || 'طرد بضائع عامة',
      createdAt: 'الآن',
      status: 'confirmed',
      statusText: 'الطلب تأكد',
      currentStep: 2,
      driverName: 'يوسف العمراني',
      driverPhone: '0XXXXX',
      truckModel: 'Renault Master #22',
      plateNumber: '42-أ-16',
      notes: notes.trim(),
      gpsLocation: gpsCoords ? {
        lat: parseFloat(gpsCoords.lat),
        lng: parseFloat(gpsCoords.lng),
        label: `${destCity} (إحداثيات مؤكدة)`,
      } : undefined,
      cargoImageUrl: cargoPhotoUrl || undefined,
    };

    onOrderCreated(newShipment);
    setCreatedTrackingCode(generatedId);
    setShowSuccessModal(true);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-4" dir="rtl">
      {/* Header section */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-sm border border-[#e1e2e4] space-y-4">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <button
                onClick={onBack}
                className="w-8 h-8 rounded-lg bg-[#f3f4f6] hover:bg-[#edeef0] flex items-center justify-center text-[#191c1e]"
                type="button"
                title="رجوع"
              >
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </button>
              <h2 className="text-lg sm:text-xl font-bold text-[#191c1e]">
                صايب طلب جديد (Nouvelle Expédition)
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-[#4f4633] pr-10 font-noto">
              عمر المعلومات ديال الكولية وشارِك اللوكاليزاسيون للتوصيل الفوري.
            </p>
          </div>
          <span className="material-symbols-outlined text-[#785a00] text-3xl shrink-0 p-2 bg-[#f8f9fb] rounded-xl border border-[#e1e2e4]">
            local_post_office
          </span>
        </div>

        {/* The Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* 1. Recipient & Route Details */}
          <div className="space-y-3 p-3.5 bg-[#f8f9fb] rounded-xl border border-[#e1e2e4]/70">
            <span className="text-xs font-bold text-[#785a00] block">
              1. معلومات المرسل إليه والمسار
            </span>

            <div>
              <label className="text-xs font-bold text-[#575e70] block mb-1">
                الاسم الكامل للزبون / المرسل إليه <span className="text-red-500">*</span>
              </label>
              <input
                className="w-full h-11 px-3 rounded-lg bg-white border border-[#e1e2e4] text-sm text-[#191c1e] focus:outline-none focus:border-[#eab308] focus:ring-1 focus:ring-[#eab308]"
                placeholder="مثال: محمد بنجلون"
                required
                type="text"
                value={recipientName}
                onChange={(e) => setRecipientName(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <div>
                <label className="text-xs font-bold text-[#575e70] block mb-1">
                  رقم الهاتف المغربي <span className="text-red-500">*</span>
                </label>
                <input
                  className="w-full h-11 px-3 rounded-lg bg-white border border-[#e1e2e4] text-sm text-[#191c1e] focus:outline-none focus:border-[#eab308]"
                  placeholder="0XXXXX"
                  required
                  type="text"
                  dir="ltr"
                  value={recipientPhone}
                  onChange={(e) => setRecipientPhone(e.target.value)}
                />
              </div>

              <div>
                <label className="text-xs font-bold text-[#575e70] block mb-1">
                  مدينة الانطلاق
                </label>
                <select
                  className="w-full h-11 px-3 rounded-lg bg-white border border-[#e1e2e4] text-sm text-[#191c1e] focus:outline-none focus:border-[#eab308]"
                  value={originCity}
                  onChange={(e) => setOriginCity(e.target.value)}
                >
                  {MOROCCAN_CITIES.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <div>
                <label className="text-xs font-bold text-[#575e70] block mb-1">
                  مدينة الوصول <span className="text-red-500">*</span>
                </label>
                <select
                  className="w-full h-11 px-3 rounded-lg bg-white border border-[#e1e2e4] text-sm text-[#191c1e] focus:outline-none focus:border-[#eab308]"
                  value={destCity}
                  onChange={(e) => setDestCity(e.target.value)}
                >
                  {MOROCCAN_CITIES.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-[#575e70] block mb-1">
                  نوع التوصيل
                </label>
                <select
                  className="w-full h-11 px-3 rounded-lg bg-white border border-[#e1e2e4] text-sm text-[#191c1e] focus:outline-none focus:border-[#eab308]"
                  value={deliveryType}
                  onChange={(e) => setDeliveryType(e.target.value as 'standard' | 'express')}
                >
                  <option value="standard">عادي (24-48 ساعة) - اقتصادي</option>
                  <option value="express">إكسبريس سريع (نفس اليوم Express)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-[#575e70] block mb-1">
                العنوان الكامل بالتفصيل
              </label>
              <textarea
                className="w-full p-2.5 rounded-lg bg-white border border-[#e1e2e4] text-sm text-[#191c1e] focus:outline-none focus:border-[#eab308] resize-none"
                placeholder="زنقة، رقم العمارة، الحي، قرب معلمة معروفة (مسجد، مدرسة، صيدلية)..."
                rows={2}
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
          </div>

          {/* 2. GPS Localization Section */}
          <div className="bg-[#f8f9fb] rounded-xl p-3.5 space-y-2.5 border border-[#e1e2e4]/70">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-[#191c1e] block">
                  تحديد الإحداثيات (GPS)
                </span>
                <span className="text-[11px] text-[#575e70]">
                  كيساعد الشيفور يلقى العنوان بلا ما يعاود يعيط
                </span>
              </div>
              <button
                className="px-3 py-1.5 rounded-lg bg-[#eab308] hover:bg-[#f7be1d] text-[#141b2b] text-xs font-bold flex items-center gap-1 shadow-xs active:scale-95 transition-transform"
                onClick={handleCaptureGps}
                type="button"
                disabled={gpsLoading}
              >
                <span className="material-symbols-outlined text-[16px]">
                  {gpsLoading ? 'hourglass_top' : 'my_location'}
                </span>
                <span>{gpsLoading ? 'جاري التحديد...' : 'صيفط لوكاليزاسيون ديالي'}</span>
              </button>
            </div>

            {/* GPS Notification pill */}
            {gpsCoords && (
              <div className="p-2.5 rounded-lg bg-[#d9dff5] text-[#141b2b] text-xs flex items-center justify-between font-bold animate-in fade-in">
                <div className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[18px] text-emerald-700">verified</span>
                  <span>لوكاليزاسيون ديالك تصيفطات بنجاح:</span>
                </div>
                <strong dir="ltr" className="font-chivo text-xs bg-white px-2 py-0.5 rounded text-[#141b2b]">
                  {gpsCoords.lat}° N, {Math.abs(parseFloat(gpsCoords.lng))}° W
                </strong>
              </div>
            )}

            {/* Static Map Container for confirmation */}
            <div className="space-y-1">
              <span className="text-[11px] text-[#575e70] block">
                تأكد من البلاصة اللي بانات فالخريطة (Hub المركزي):
              </span>
              <div
                className="w-full h-32 rounded-lg bg-cover bg-center shadow-inner relative flex items-center justify-center border border-[#e1e2e4] overflow-hidden"
                style={{ backgroundImage: `url('${ASSET_IMAGES.casablancaMap}')` }}
              >
                <div className="px-3 py-1 rounded-full bg-[#141b2b]/90 text-white text-xs font-bold flex items-center gap-1.5 shadow-md backdrop-blur-sm">
                  <span className="material-symbols-outlined text-[#eab308] text-[16px]">pin_drop</span>
                  <span>نقطة الالتقاط المحددة: {destCity}</span>
                </div>
              </div>
            </div>
          </div>

          {/* 3. Commodity & Parcel Details */}
          <div className="bg-[#f8f9fb] rounded-xl p-3.5 space-y-3 border border-[#e1e2e4]/70">
            <span className="text-xs font-bold text-[#785a00] block">
              2. معلومات السلعة ومبلغ التحصيل
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <div>
                <label className="text-xs font-bold text-[#575e70] block mb-1">
                  شنو هي السلعة؟ <span className="text-red-500">*</span>
                </label>
                <input
                  className="w-full h-10 px-3 rounded-lg bg-white border border-[#e1e2e4] text-sm text-[#191c1e] focus:outline-none focus:border-[#eab308]"
                  placeholder="ملابس، إلكترونيك، أوراق، مستحضرات..."
                  required
                  type="text"
                  value={commodity}
                  onChange={(e) => setCommodity(e.target.value)}
                />
              </div>

              <div>
                <label className="text-xs font-bold text-[#575e70] block mb-1">
                  الوزن التقريبي (كغ)
                </label>
                <input
                  className="w-full h-10 px-3 rounded-lg bg-white border border-[#e1e2e4] text-sm text-[#191c1e] focus:outline-none focus:border-[#eab308]"
                  placeholder="مثال: 3.5"
                  step="0.1"
                  type="number"
                  value={weightKg}
                  onChange={(e) => setWeightKg(e.target.value)}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <div>
                <label className="text-xs font-bold text-[#575e70] block mb-1">
                  عدد الطرود (Colis)
                </label>
                <input
                  className="w-full h-10 px-3 rounded-lg bg-white border border-[#e1e2e4] text-sm text-[#191c1e] focus:outline-none focus:border-[#eab308]"
                  min="1"
                  type="number"
                  value={parcelCount}
                  onChange={(e) => setParcelCount(e.target.value)}
                />
              </div>

              <div>
                <label className="text-xs font-bold text-[#575e70] block mb-1">
                  مبلغ التحصيل عند الاستلام (COD د.م.)
                </label>
                <input
                  className="w-full h-10 px-3 rounded-lg bg-white border border-[#e1e2e4] text-sm text-[#191c1e] font-chivo focus:outline-none focus:border-[#eab308]"
                  placeholder="مبلغ التحصيل COD"
                  type="number"
                  value={codPrice}
                  onChange={(e) => setCodPrice(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-[#575e70] block mb-1">
                تعليمات التوصيل / ملاحظات خاصة
              </label>
              <input
                className="w-full h-10 px-3 rounded-lg bg-white border border-[#e1e2e4] text-sm text-[#191c1e] focus:outline-none focus:border-[#eab308]"
                placeholder="اتصل قبل الوصول بساعة، سلعة قابلة للكسر، وقت الفراغ..."
                type="text"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </div>
          </div>

          {/* 4. Cargo Photo Upload & Preview */}
          <div className="bg-[#f8f9fb] rounded-xl p-3.5 space-y-2.5 border border-[#e1e2e4]/70">
            <span className="text-xs font-bold text-[#785a00] block">
              3. صور السلعة ديالك (Facultatif)
            </span>

            <div className="flex items-center gap-3">
              <label className="flex-1 h-20 rounded-lg bg-white border-2 border-dashed border-[#d3c5ac] hover:border-[#eab308] flex flex-col items-center justify-center cursor-pointer transition-colors">
                <span className="material-symbols-outlined text-[#785a00] text-[24px]">
                  add_a_photo
                </span>
                <span className="text-xs text-[#575e70] font-bold mt-1">التقط صورة للسلعة</span>
                <input
                  accept="image/*"
                  className="hidden"
                  onChange={handlePhotoUpload}
                  type="file"
                />
              </label>

              {/* Preview Box with placeholder / image */}
              <div className="w-20 h-20 rounded-lg bg-[#e1e2e4] relative overflow-hidden flex items-center justify-center shrink-0 border border-[#d3c5ac]">
                {cargoPhotoUrl ? (
                  <>
                    <img
                      className="w-full h-full object-cover"
                      alt="صورة الطرد"
                      src={cargoPhotoUrl}
                      referrerPolicy="no-referrer"
                    />
                    <button
                      className="absolute top-1 left-1 w-5 h-5 rounded-full bg-[#b91a24] text-white flex items-center justify-center shadow-xs"
                      onClick={() => {
                        setCargoPhotoUrl(null);
                        setPhotoUploaded(false);
                      }}
                      type="button"
                    >
                      <span className="material-symbols-outlined text-[12px]">close</span>
                    </button>
                  </>
                ) : (
                  <span className="text-[11px] text-[#817660] text-center px-1 font-bold">
                    معاينة الصورة
                  </span>
                )}
              </div>
            </div>

            {photoUploaded && (
              <div className="text-xs text-[#785a00] flex items-center gap-1 font-bold">
                <span className="material-symbols-outlined text-[16px] text-emerald-600">
                  check_circle
                </span>
                <span>تصويرة السلعة تصيفطات بنجاح فالملف</span>
              </div>
            )}
          </div>

          {/* Cost Estimate Pill */}
          <div className="p-3 bg-[#eab308]/20 rounded-xl flex items-center justify-between border border-[#eab308]/40">
            <span className="text-xs sm:text-sm font-bold text-[#141b2b]">
              تكلفة الشحن التقديرية:
            </span>
            <span className="text-base sm:text-lg font-black text-[#141b2b] font-chivo" dir="ltr">
              {calculatedPrice()} د.م. TTC
            </span>
          </div>

          {/* Submit Order Button */}
          <button
            className="w-full h-12 rounded-xl bg-[#eab308] hover:bg-[#f7be1d] text-[#141b2b] text-base font-black shadow-md transition-all flex items-center justify-center gap-2 active:scale-[0.98]"
            type="submit"
          >
            <span className="material-symbols-outlined text-[22px]">check_box</span>
            <span>أكّد الطلب</span>
          </button>
        </form>
      </div>

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-50 bg-[#191c1e]/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-5 max-w-sm w-full shadow-2xl text-center space-y-3.5 border border-[#e1e2e4] animate-in zoom-in-95">
            <div className="w-14 h-14 rounded-full bg-[#eab308] text-[#141b2b] mx-auto flex items-center justify-center shadow-sm">
              <span className="material-symbols-outlined text-3xl font-bold">task_alt</span>
            </div>

            <div className="space-y-1">
              <h3 className="text-lg font-black text-[#191c1e]">الطلب ديالك تسجل بنجاح!</h3>
              <p className="text-xs text-[#575e70] font-noto">
                تم إصدار رقم التتبع المعتمد الخاص بإرساليتك مع شركة NEXT GEN
              </p>
            </div>

            <div className="p-3 rounded-xl bg-[#f8f9fb] text-lg font-black tracking-widest text-[#785a00] font-chivo border border-[#e1e2e4]">
              {createdTrackingCode}
            </div>

            <div className="flex flex-col gap-2 pt-1">
              <button
                className="w-full h-11 rounded-xl bg-[#141b2b] hover:bg-[#252f48] text-white text-xs sm:text-sm font-bold shadow-xs transition-colors flex items-center justify-center gap-1.5"
                onClick={() => {
                  setShowSuccessModal(false);
                  if (createdTrackingCode) onTrackOrder(createdTrackingCode);
                }}
                type="button"
              >
                <span className="material-symbols-outlined text-[18px]">radar</span>
                <span>تبع الشحنة دابا</span>
              </button>

              <button
                className="w-full h-10 rounded-xl text-[#575e70] hover:bg-[#f3f4f6] text-xs font-bold transition-colors"
                onClick={() => {
                  setShowSuccessModal(false);
                  onBack();
                }}
                type="button"
              >
                الرجوع إلى القائمة الرئيسية
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
