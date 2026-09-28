import React from 'react';
import { Shipment } from '../types';
import { Logo } from './Logo';

interface WaybillModalProps {
  shipment: Shipment;
  onClose: () => void;
}

export const WaybillModal: React.FC<WaybillModalProps> = ({ shipment, onClose }) => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#191c1e]/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4">
      <div 
        className="bg-white rounded-2xl max-w-lg w-full shadow-2xl p-5 space-y-4 border border-[#e1e2e4] max-h-[90vh] overflow-y-auto animate-in zoom-in-95"
        dir="rtl"
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#e1e2e4]">
          <div className="flex items-center gap-2">
            <Logo size="sm" />
            <span className="text-xs font-bold text-[#785a00] bg-[#f8f9fb] px-2 py-0.5 rounded border border-[#e1e2e4]">
              وصل الإرسال (Bordereau)
            </span>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 p-1"
            type="button"
          >
            <span className="material-symbols-outlined text-2xl">close</span>
          </button>
        </div>

        {/* Printable Shipping Label Content */}
        <div className="p-4 border-2 border-black rounded-xl space-y-3 bg-white font-sans text-xs">
          {/* Top Bar with Barcode */}
          <div className="flex items-center justify-between border-b pb-3 border-black">
            <div>
              <span className="text-[10px] text-gray-500 block uppercase font-mono">Bordereau d'expédition</span>
              <span className="text-lg font-black font-chivo tracking-widest text-black" dir="ltr">
                {shipment.id}
              </span>
              <span className="text-[11px] block text-gray-600 font-bold mt-0.5">
                تاريخ الإصدار: {new Date().toLocaleDateString('fr-MA')}
              </span>
            </div>

            {/* Visual Barcode SVG */}
            <div className="flex flex-col items-center">
              <svg className="w-36 h-10" viewBox="0 0 160 40">
                <rect x="0" y="0" width="4" height="40" fill="black" />
                <rect x="6" y="0" width="2" height="40" fill="black" />
                <rect x="10" y="0" width="6" height="40" fill="black" />
                <rect x="18" y="0" width="2" height="40" fill="black" />
                <rect x="22" y="0" width="4" height="40" fill="black" />
                <rect x="28" y="0" width="8" height="40" fill="black" />
                <rect x="38" y="0" width="2" height="40" fill="black" />
                <rect x="42" y="0" width="6" height="40" fill="black" />
                <rect x="50" y="0" width="4" height="40" fill="black" />
                <rect x="56" y="0" width="2" height="40" fill="black" />
                <rect x="60" y="0" width="8" height="40" fill="black" />
                <rect x="70" y="0" width="4" height="40" fill="black" />
                <rect x="76" y="0" width="2" height="40" fill="black" />
                <rect x="80" y="0" width="6" height="40" fill="black" />
                <rect x="88" y="0" width="4" height="40" fill="black" />
                <rect x="94" y="0" width="8" height="40" fill="black" />
                <rect x="104" y="0" width="2" height="40" fill="black" />
                <rect x="108" y="0" width="6" height="40" fill="black" />
                <rect x="116" y="0" width="4" height="40" fill="black" />
                <rect x="122" y="0" width="8" height="40" fill="black" />
                <rect x="132" y="0" width="2" height="40" fill="black" />
                <rect x="136" y="0" width="6" height="40" fill="black" />
                <rect x="144" y="0" width="4" height="40" fill="black" />
                <rect x="150" y="0" width="6" height="40" fill="black" />
              </svg>
              <span className="text-[10px] font-mono tracking-widest text-black" dir="ltr">
                *{shipment.id}*
              </span>
            </div>
          </div>

          {/* Sender & Receiver Grid */}
          <div className="grid grid-cols-2 gap-3 border-b pb-3 border-black">
            <div className="border-l pl-2 border-gray-300 space-y-1">
              <span className="font-bold text-gray-500 text-[10px] block uppercase">المرسل (Expéditeur)</span>
              <div className="font-bold text-sm text-black">{shipment.senderName}</div>
              <div className="text-gray-700 font-mono" dir="ltr">{shipment.senderPhone}</div>
              <div className="text-gray-600">{shipment.originCity}</div>
            </div>

            <div className="space-y-1 pr-1">
              <span className="font-bold text-gray-500 text-[10px] block uppercase">المرسل إليه (Destinataire)</span>
              <div className="font-black text-sm text-black">{shipment.recipientName}</div>
              <div className="font-bold text-black font-mono" dir="ltr">{shipment.recipientPhone}</div>
              <div className="text-black font-medium">{shipment.destinationCity}</div>
              <div className="text-gray-700 text-[11px] leading-tight">{shipment.recipientAddress}</div>
            </div>
          </div>

          {/* Package Details & COD Value */}
          <div className="grid grid-cols-3 gap-2 bg-gray-50 p-2.5 rounded border border-gray-200 text-center">
            <div>
              <span className="text-[10px] text-gray-500 block">الوزن (Poids)</span>
              <span className="font-bold font-mono text-black">{shipment.weightKg} كغ</span>
            </div>
            <div>
              <span className="text-[10px] text-gray-500 block">عدد الطرود (Colis)</span>
              <span className="font-bold font-mono text-black">{shipment.packageCount}</span>
            </div>
            <div>
              <span className="text-[10px] text-gray-500 block">نوع السلعة</span>
              <span className="font-bold text-black truncate block">{shipment.commodity}</span>
            </div>
          </div>

          {/* Cash On Delivery Large Box */}
          <div className="p-3 bg-black text-white rounded flex items-center justify-between">
            <div>
              <span className="text-[11px] font-bold block text-yellow-400">
                مبلغ التحصيل نقداً (Montant à Recouvrer COD)
              </span>
              <span className="text-[10px] text-gray-300">يؤدى نقداً عند التسليم فقط</span>
            </div>
            <span className="text-2xl font-black font-chivo text-yellow-400" dir="ltr">
              {shipment.price} MAD
            </span>
          </div>

          {/* Signature Boxes */}
          <div className="grid grid-cols-2 gap-3 pt-2 text-[11px]">
            <div className="border border-dashed border-gray-400 p-2 rounded h-16 flex flex-col justify-between">
              <span className="text-gray-500">توقيع وخاتم السائق:</span>
              <span className="text-[10px] font-bold text-gray-700">{shipment.driverName}</span>
            </div>
            <div className="border border-dashed border-gray-400 p-2 rounded h-16 flex flex-col justify-between">
              <span className="text-gray-500">توقيع المستلم (إبراء الذمة):</span>
              <span className="text-[10px] text-gray-400">التاريخ: ... / ... / 2026</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 pt-2">
          <button
            onClick={handlePrint}
            className="flex-1 h-11 rounded-xl bg-[#eab308] hover:bg-[#f7be1d] text-[#141b2b] text-xs sm:text-sm font-black flex items-center justify-center gap-1.5 shadow-sm transition-colors"
            type="button"
          >
            <span className="material-symbols-outlined text-[18px]">print</span>
            <span>طبع الوصل (Imprimer)</span>
          </button>

          <button
            onClick={onClose}
            className="h-11 px-5 rounded-xl bg-[#f3f4f6] hover:bg-[#edeef0] text-[#191c1e] text-xs sm:text-sm font-bold transition-colors"
            type="button"
          >
            إغلاق
          </button>
        </div>
      </div>
    </div>
  );
};
