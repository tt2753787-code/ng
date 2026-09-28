import React, { useState, useRef, useEffect } from 'react';
import { Shipment } from '../../types';

interface DriverWorkspaceScreenProps {
  activeShipment?: Shipment;
  onShipmentStatusUpdate: (id: string, status: Shipment['status'], note?: string) => void;
  onOpenReportIssue: () => void;
  onOpenMap: () => void;
}

export const DriverWorkspaceScreen: React.FC<DriverWorkspaceScreenProps> = ({
  activeShipment,
  onShipmentStatusUpdate,
  onOpenReportIssue,
  onOpenMap,
}) => {
  const [showPodModal, setShowPodModal] = useState(false);
  const [podNote, setPodNote] = useState('');
  const [pickupAlert, setPickupAlert] = useState(false);
  const [podSuccessAlert, setPodSuccessAlert] = useState(false);
  const [deliveryPhotoUploaded, setDeliveryPhotoUploaded] = useState(false);

  // Canvas signature state
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasSignature, setHasSignature] = useState(false);

  // Setup canvas drawing
  useEffect(() => {
    if (showPodModal && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.strokeStyle = '#141b2b';
        ctx.lineWidth = 2.5;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
      }
    }
  }, [showPodModal]);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

    ctx.beginPath();
    ctx.moveTo(clientX - rect.left, clientY - rect.top);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

    ctx.lineTo(clientX - rect.left, clientY - rect.top);
    ctx.stroke();
    setHasSignature(true);
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearSignature = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setHasSignature(false);
  };

  const handleConfirmPickup = () => {
    if (activeShipment) {
      onShipmentStatusUpdate(activeShipment.id, 'en_route');
      setPickupAlert(true);
      setTimeout(() => setPickupAlert(false), 4000);
    }
  };

  const handleConfirmPod = () => {
    if (activeShipment) {
      onShipmentStatusUpdate(
        activeShipment.id,
        'delivered',
        podNote || 'تم التسليم والتوقيع من طرف الزبون'
      );
      setShowPodModal(false);
      setPodSuccessAlert(true);
      setTimeout(() => setPodSuccessAlert(false), 4000);
    }
  };

  const currentShipment = activeShipment || {
    id: 'NG-2026-088142',
    recipientName: 'أيوب العلمي',
    recipientPhone: '0XXXXX',
    recipientAddress: 'شارع فاس، قرب محطة القطار طنجة المدينة',
    commodity: 'قطع غيار خفيفة (2.3 كغ)',
    price: 350,
  };

  return (
    <div className="max-w-2xl mx-auto space-y-4" dir="rtl">
      {/* 1. Driver Profile Card */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-sm border border-[#e1e2e4] space-y-3.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-[#141b2b] text-[#eab308] flex items-center justify-center font-black text-xl shadow-xs">
              يو
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-black text-[#191c1e]">
                فضاء الشيفور: يوسف العمراني
              </h2>
              <span className="text-xs text-[#575e70] block font-noto">
                الشاحنة: Renault Master · ترقيم <span className="font-chivo font-bold" dir="ltr">#42-أ-16</span>
              </span>
            </div>
          </div>
          <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>متصل الآن</span>
          </span>
        </div>

        <div className="p-3 bg-[#eab308]/15 rounded-xl flex items-center justify-between border border-[#eab308]/30">
          <span className="text-xs sm:text-sm font-bold text-[#141b2b]">
            المهمات المعينة لليوم: 3 كوليات
          </span>
          <span className="text-xs font-bold text-[#785a00] underline cursor-pointer">
            تحديث التعيينات
          </span>
        </div>
      </div>

      {/* Instant Feedback Toasts */}
      {pickupAlert && (
        <div className="p-3 rounded-xl bg-[#d9dff5] text-[#141b2b] text-xs sm:text-sm font-bold flex items-center gap-2 border border-[#b8c2e6] animate-in slide-in-from-top">
          <span className="material-symbols-outlined text-emerald-600 text-xl">check_circle</span>
          <span>تم تسجيل استلام السلعة بنجاح مع التاريخ، التوقيت، وإحداثيات الـ GPS الحالية.</span>
        </div>
      )}

      {podSuccessAlert && (
        <div className="p-3 rounded-xl bg-emerald-100 text-emerald-900 text-xs sm:text-sm font-bold flex items-center gap-2 border border-emerald-300 animate-in slide-in-from-top">
          <span className="material-symbols-outlined text-emerald-600 text-xl">verified</span>
          <span>تم توصيل السلعة بنجاح وتوثيق إثبات التسليم (POD) فالسيستيم!</span>
        </div>
      )}

      {/* 2. Active Driver Mission Card */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-sm border border-[#e1e2e4] space-y-3.5">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <span className="px-2.5 py-0.5 rounded-full bg-[#eab308] text-[#141b2b] text-xs font-black">
              مهمة عاجلة
            </span>
            <span className="text-base sm:text-lg font-black text-[#191c1e] font-chivo block mt-1" dir="ltr">
              إرسالية #{currentShipment.id}
            </span>
          </div>
          <span className="text-lg sm:text-xl font-black text-[#785a00] font-chivo" dir="ltr">
            {currentShipment.price} د.م. COD
          </span>
        </div>

        {/* Mission Details */}
        <div className="space-y-2 text-xs sm:text-sm text-[#191c1e] bg-[#f8f9fb] p-3.5 rounded-xl border border-[#e1e2e4]/70">
          <div className="flex items-center justify-between">
            <span className="text-[#575e70]">الزبون:</span>
            <span className="font-bold">{currentShipment.recipientName}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[#575e70]">رقم التيليفون:</span>
            <span className="font-bold font-chivo" dir="ltr">
              {currentShipment.recipientPhone}
            </span>
          </div>
          <div className="flex items-start justify-between gap-2">
            <span className="text-[#575e70] shrink-0">العنوان:</span>
            <span className="font-bold text-left">{currentShipment.recipientAddress}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[#575e70]">محتوى الكولية:</span>
            <span>{currentShipment.commodity}</span>
          </div>
        </div>

        {/* Driver Quick Action Rails */}
        <div className="grid grid-cols-2 gap-2 pt-1">
          <button
            className="h-11 rounded-xl bg-[#f8f9fb] hover:bg-[#edeef0] text-[#191c1e] text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5 border border-[#e1e2e4] transition-colors"
            onClick={() => alert('رقم تقديري للتوضيح: ' + currentShipment.recipientPhone)}
            type="button"
          >
            <span className="material-symbols-outlined text-[18px]">call</span>
            <span>عيّط للزبون</span>
          </button>

          <button
            className="h-11 rounded-xl bg-[#f8f9fb] hover:bg-[#edeef0] text-[#191c1e] text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5 border border-[#e1e2e4] transition-colors"
            onClick={onOpenMap}
            type="button"
          >
            <span className="material-symbols-outlined text-[18px]">map</span>
            <span>شوف الخريطة</span>
          </button>
        </div>

        {/* Driver Workflow Progression Buttons */}
        <div className="space-y-2 pt-2 border-t border-[#f3f4f6]">
          <div className="flex gap-2">
            <button
              className="flex-1 h-12 rounded-xl bg-[#141b2b] hover:bg-[#252f48] text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5 transition-colors shadow-xs active:scale-[0.98]"
              onClick={handleConfirmPickup}
              type="button"
            >
              <span className="material-symbols-outlined text-[20px]">inventory</span>
              <span>استلمات السلعة (Pick up)</span>
            </button>

            <button
              className="flex-1 h-12 rounded-xl bg-[#eab308] hover:bg-[#f7be1d] text-[#141b2b] text-xs sm:text-sm font-black flex items-center justify-center gap-1.5 transition-colors shadow-xs active:scale-[0.98]"
              onClick={() => setShowPodModal(true)}
              type="button"
            >
              <span className="material-symbols-outlined text-[20px]">verified</span>
              <span>تأكيد التوصيل (POD)</span>
            </button>
          </div>

          <button
            className="w-full h-10 rounded-xl bg-[#ffdad7] hover:bg-[#ffc5c0] text-[#410004] text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
            onClick={onOpenReportIssue}
            type="button"
          >
            <span className="material-symbols-outlined text-[18px]">emergency</span>
            <span>بلّغ على مشكل / تعثر فالطريق</span>
          </button>
        </div>
      </div>

      {/* Proof Of Delivery (POD) Interactive Modal */}
      {showPodModal && (
        <div className="fixed inset-0 z-50 bg-[#191c1e]/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-5 max-w-sm w-full shadow-2xl space-y-3.5 border border-[#e1e2e4] animate-in zoom-in-95">
            <div className="flex items-center justify-between pb-2 border-b border-[#f3f4f6]">
              <h3 className="text-base sm:text-lg font-bold text-[#191c1e]">
                إثبات التسليم النهائي (POD)
              </h3>
              <button
                className="text-gray-400 hover:text-gray-600 p-1"
                onClick={() => setShowPodModal(false)}
                type="button"
              >
                <span className="material-symbols-outlined text-xl">close</span>
              </button>
            </div>

            <div className="space-y-3">
              {/* Digital Signature Pad */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-bold text-[#575e70]">
                    توقيع الزبون الرقمي:
                  </label>
                  <button
                    className="text-xs text-[#b91a24] font-bold hover:underline"
                    onClick={clearSignature}
                    type="button"
                  >
                    مسح التوقيع
                  </button>
                </div>
                <div className="w-full h-28 bg-[#f8f9fb] rounded-xl border border-dashed border-[#817660]/40 relative overflow-hidden flex items-center justify-center">
                  <canvas
                    ref={canvasRef}
                    width={320}
                    height={110}
                    className="w-full h-full cursor-crosshair touch-none"
                    onMouseDown={startDrawing}
                    onMouseMove={draw}
                    onMouseUp={stopDrawing}
                    onMouseLeave={stopDrawing}
                    onTouchStart={startDrawing}
                    onTouchMove={draw}
                    onTouchEnd={stopDrawing}
                  />
                  {!hasSignature && (
                    <span className="absolute pointer-events-none text-xs text-[#817660]/60 font-bold select-none">
                      وقع هنا بالإصبع أو الفأرة
                    </span>
                  )}
                </div>
              </div>

              {/* Delivery Photo */}
              <div>
                <label className="text-xs font-bold text-[#575e70] block mb-1">
                  صورة إثبات التسليم عند العميل:
                </label>
                <label className="h-16 rounded-xl bg-[#f8f9fb] border border-dashed border-[#817660]/40 flex items-center justify-center gap-2 cursor-pointer hover:bg-[#edeef0] transition-colors">
                  <span className="material-symbols-outlined text-[#785a00] text-xl">
                    camera_alt
                  </span>
                  <span className="text-xs text-[#191c1e] font-bold">
                    {deliveryPhotoUploaded ? 'تم حفظ الصورة بنجاح' : 'التقط صورة التسليم'}
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={() => setDeliveryPhotoUploaded(true)}
                  />
                </label>
              </div>

              {/* Delivery Notes */}
              <div>
                <input
                  className="w-full h-10 px-3 rounded-lg bg-[#f8f9fb] border border-[#e1e2e4] text-xs text-[#191c1e] focus:outline-none focus:border-[#eab308]"
                  placeholder="ملاحظة (مثال: استلمها الحارس أو الأخ)"
                  type="text"
                  value={podNote}
                  onChange={(e) => setPodNote(e.target.value)}
                />
              </div>
            </div>

            <button
              className="w-full h-12 rounded-xl bg-[#eab308] hover:bg-[#f7be1d] text-[#141b2b] text-sm sm:text-base font-black transition-colors shadow-md"
              onClick={handleConfirmPod}
              type="button"
            >
              تسجيل التسليم بنجاح
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
