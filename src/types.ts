export type ShipmentStatus = 
  | 'en_route'          // فـ الطريق
  | 'out_for_delivery'  // خرجت للتوصيل
  | 'delivered'         // تم التوصيل
  | 'received'          // السلعة تستلمات
  | 'confirmed'         // الطلب تأكد
  | 'issue';            // متعثرة

export interface Shipment {
  id: string;
  originCity: string;
  destinationCity: string;
  senderName: string;
  senderPhone: string;
  recipientName: string;
  recipientPhone: string;
  recipientAddress: string;
  price: number;
  codCollected?: boolean;
  weightKg: number;
  packageCount: number;
  commodity: string;
  createdAt: string;
  status: ShipmentStatus;
  statusText: string;
  currentStep: number; // 1 to 8
  driverName: string;
  driverPhone: string;
  truckModel: string;
  plateNumber: string;
  speedKmh?: number;
  estimatedDeliveryTime?: string;
  notes?: string;
  gpsLocation?: {
    lat: number;
    lng: number;
    label: string;
  };
  cargoImageUrl?: string;
  podSignature?: string;
  podReceiverNote?: string;
}

export interface TimelineMilestone {
  step: number;
  title: string;
  time: string;
  description: string;
  status: 'completed' | 'active' | 'pending';
}

export interface TruckVehicle {
  id: string;
  model: string;
  tonnage: string;
  plate: string;
  driver: string;
  route: string;
  loadPercentage: number;
  fuelPercentage: number;
  status: 'in_mission' | 'available' | 'maintenance';
  statusText: string;
  techCheck: string;
}

export interface ClaimTicket {
  id: string;
  trackingId: string;
  issueType: string;
  description: string;
  solution: string;
  status: 'investigating' | 'resolved' | 'pending';
  statusText: string;
  createdAt: string;
  clientCity: string;
}

export interface MerchantClient {
  id: string;
  name: string;
  businessType: string;
  city: string;
  phone: string;
  totalOrders: number;
  pendingCod: number;
  settledCod: number;
  status: 'vip' | 'active';
}

export type MainNavTab = 
  | 'overview'       // الرئيسية
  | 'orders'         // الطلبات
  | 'new_order'      // صايب طلب جديد
  | 'live_tracking'  // التتبع المباشر
  | 'drivers'        // فضاء السائق
  | 'fleet'          // الشاحنات والأسطول
  | 'claims'         // الشكايات والرجوع
  | 'hub_location'   // موقعنا
  | 'clients'        // الزبناء
  | 'analytics'      // الإحصائيات
  | 'settings';      // الإعدادات
