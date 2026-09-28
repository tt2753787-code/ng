import React, { useState } from 'react';
import { Shipment, ShipmentStatus } from '../../types';
import { WaybillModal } from '../WaybillModal';

interface OrdersScreenProps {
  shipments: Shipment[];
  onSelectShipment: (id: string) => void;
  onOpenNewOrder: () => void;
  onUpdateStatus: (id: string, newStatus: ShipmentStatus) => void;
}

export const OrdersScreen: React.FC<OrdersScreenProps> = ({
  shipments,
  onSelectShipment,
  onOpenNewOrder,
  onUpdateStatus,
}) => {
  const [filter, setFilter] = useState<'all' | 'en_route' | 'out_for_delivery' | 'delivered' | 'issue'>('all');
  const [search, setSearch] = useState('');
  const [selectedWaybillShipment, setSelectedWaybillShipment] = useState<Shipment | null>(null);

  const filteredShipments = shipments.filter((s) => {
    if (filter !== 'all' && s.status !== filter) return false;
    if (search.trim()) {
      const q = search.toLowerCase().trim();
      return (
        s.id.toLowerCase().includes(q) ||
        s.recipientName.toLowerCase().includes(q) ||
        s.recipientPhone.includes(q) ||
        s.originCity.toLowerCase().includes(q) ||
        s.destinationCity.toLowerCase().includes(q) ||
        s.driverName.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="max-w-4xl mx-auto space-y-4" dir="rtl">
      {/* Header card */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-sm border border-[#e1e2e4] space-y-3.5">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-[#191c1e]">
              إدارة الطلبات والإرساليات (Toutes les Expéditions)
            </h2>
            <p className="text-xs sm:text-sm text-[#4f4633] font-noto">
              قائمة تفصيلية بجميع الطرود مع إمكانية طباعة وصولات الإرسال ومتابعة التوصيل
            </p>
          </div>
          <button
            onClick={onOpenNewOrder}
            className="px-3.5 py-2 rounded-xl bg-[#eab308] hover:bg-[#f7be1d] text-[#141b2b] text-xs sm:text-sm font-black flex items-center gap-1.5 shadow-xs transition-colors shrink-0"
            type="button"
          >
            <span className="material-symbols-outlined text-[18px]">add_circle</span>
            <span>طلب جديد</span>
          </button>
        </div>

        {/* Search input */}
        <div className="relative">
          <span className="material-symbols-outlined absolute right-3 top-3 text-[#817660] text-[20px]">
            search
          </span>
          <input
            className="w-full h-11 pr-10 pl-3 rounded-xl bg-[#f8f9fb] border border-[#e1e2e4] text-xs sm:text-sm text-[#191c1e] focus:outline-none focus:border-[#eab308]"
            placeholder="بحث برقم الإرسالية، الزبون، المدينة، أو الهاتف..."
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
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
            جميع الطلبات ({shipments.length})
          </button>
          <button
            onClick={() => setFilter('en_route')}
            className={`px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap transition-colors ${
              filter === 'en_route'
                ? 'bg-[#141b2b] text-white'
                : 'bg-[#f3f4f6] text-[#575e70] hover:bg-[#edeef0]'
            }`}
            type="button"
          >
            فـ الطريق
          </button>
          <button
            onClick={() => setFilter('out_for_delivery')}
            className={`px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap transition-colors ${
              filter === 'out_for_delivery'
                ? 'bg-[#141b2b] text-white'
                : 'bg-[#f3f4f6] text-[#575e70] hover:bg-[#edeef0]'
            }`}
            type="button"
          >
            خرجت للتوصيل
          </button>
          <button
            onClick={() => setFilter('delivered')}
            className={`px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap transition-colors ${
              filter === 'delivered'
                ? 'bg-emerald-700 text-white'
                : 'bg-[#f3f4f6] text-emerald-700 hover:bg-emerald-50'
            }`}
            type="button"
          >
            تم التوصيل
          </button>
          <button
            onClick={() => setFilter('issue')}
            className={`px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap transition-colors ${
              filter === 'issue'
                ? 'bg-[#b91a24] text-white'
                : 'bg-[#f3f4f6] text-[#b91a24] hover:bg-[#ffdad7]'
            }`}
            type="button"
          >
            متعثرة
          </button>
        </div>

        {/* Orders list */}
        <div className="space-y-3 pt-1">
          {filteredShipments.length === 0 ? (
            <div className="text-center py-8 text-gray-500 bg-[#f8f9fb] rounded-xl">
              <span className="material-symbols-outlined text-4xl text-gray-400 block mb-1">
                inventory_2
              </span>
              <p className="text-sm font-bold">لا توجد إرساليات مطابقة للبحث</p>
            </div>
          ) : (
            filteredShipments.map((s) => {
              const isDelivered = s.status === 'delivered';
              const isIssue = s.status === 'issue';

              return (
                <div
                  key={s.id}
                  className="bg-[#f8f9fb] rounded-xl p-3.5 space-y-2 border border-[#e1e2e4]/70 hover:border-[#d3c5ac] transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-sm sm:text-base font-black text-[#191c1e] font-chivo tracking-wider" dir="ltr">
                        {s.id}
                      </span>
                      <span
                        className={`px-2 py-0.5 rounded-full text-[11px] font-bold ${
                          isDelivered
                            ? 'bg-emerald-100 text-emerald-800'
                            : isIssue
                            ? 'bg-[#ffdad7] text-[#410004]'
                            : 'bg-[#d9dff5] text-[#141b2b]'
                        }`}
                      >
                        {s.statusText}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-sm sm:text-base font-black text-[#785a00] font-chivo" dir="ltr">
                        {s.price} د.م.
                      </span>
                      <button
                        onClick={() => setSelectedWaybillShipment(s)}
                        className="px-2.5 py-1 rounded bg-white hover:bg-gray-100 border border-[#e1e2e4] text-[11px] font-bold text-[#141b2b] flex items-center gap-1 shadow-2xs"
                        type="button"
                        title="طباعة وصل الإرسال"
                      >
                        <span className="material-symbols-outlined text-[14px]">receipt_long</span>
                        <span>وصل الإرسال</span>
                      </button>
                    </div>
                  </div>

                  {/* Route & Details */}
                  <div className="flex items-center justify-between text-xs text-[#191c1e] py-1 border-y border-[#edeef0]/60">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="font-bold">{s.originCity}</span>
                      <span className="material-symbols-outlined text-[14px] text-gray-400">arrow_back</span>
                      <span className="font-bold">{s.destinationCity}</span>
                      <span className="text-gray-400">({s.recipientName})</span>
                    </div>

                    <div className="text-[#575e70]">
                      الوزن: <strong>{s.weightKg} كغ</strong> · الكوليات: <strong>{s.packageCount}</strong>
                    </div>
                  </div>

                  {/* Bottom Actions */}
                  <div className="flex items-center justify-between pt-1 gap-2 flex-wrap">
                    <span className="text-[11px] text-[#575e70]">
                      الشيفور: {s.driverName} ({s.truckModel})
                    </span>

                    <div className="flex items-center gap-1.5">
                      {/* Status changer dropdown */}
                      <select
                        className="text-[11px] font-bold bg-white border border-[#e1e2e4] rounded px-2 py-1 text-[#191c1e]"
                        value={s.status}
                        onChange={(e) => onUpdateStatus(s.id, e.target.value as ShipmentStatus)}
                      >
                        <option value="en_route">فـ الطريق</option>
                        <option value="out_for_delivery">خرجت للتوصيل</option>
                        <option value="delivered">تم التوصيل</option>
                        <option value="issue">متعثرة</option>
                      </select>

                      <button
                        onClick={() => alert('رقم تقديري للتوضيح: ' + s.recipientPhone)}
                        className="px-2.5 py-1 rounded bg-[#f3f4f6] hover:bg-[#edeef0] text-[11px] font-bold text-[#191c1e] flex items-center gap-1"
                        type="button"
                      >
                        <span className="material-symbols-outlined text-[13px]">call</span>
                        <span>اتصال</span>
                      </button>

                      <button
                        onClick={() => onSelectShipment(s.id)}
                        className="px-2.5 py-1 rounded bg-[#141b2b] hover:bg-[#252f48] text-white text-[11px] font-bold flex items-center gap-1"
                        type="button"
                      >
                        <span className="material-symbols-outlined text-[13px]">radar</span>
                        <span>تتبع</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Waybill Modal */}
      {selectedWaybillShipment && (
        <WaybillModal
          shipment={selectedWaybillShipment}
          onClose={() => setSelectedWaybillShipment(null)}
        />
      )}
    </div>
  );
};
