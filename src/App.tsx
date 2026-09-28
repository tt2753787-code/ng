import { useState } from 'react';
import { MainNavTab, Shipment, ShipmentStatus } from './types';
import { INITIAL_SHIPMENTS } from './data/mockData';
import { Header } from './components/Header';
import { SubNavbar } from './components/SubNavbar';
import { BottomNavBar } from './components/BottomNavBar';

import { OverviewScreen } from './components/screens/OverviewScreen';
import { NewOrderScreen } from './components/screens/NewOrderScreen';
import { LiveTrackingScreen } from './components/screens/LiveTrackingScreen';
import { DriverWorkspaceScreen } from './components/screens/DriverWorkspaceScreen';
import { FleetScreen } from './components/screens/FleetScreen';
import { ClaimsScreen } from './components/screens/ClaimsScreen';
import { HubLocationScreen } from './components/screens/HubLocationScreen';
import { OrdersScreen } from './components/screens/OrdersScreen';
import { ClientsScreen } from './components/screens/ClientsScreen';
import { AnalyticsScreen } from './components/screens/AnalyticsScreen';
import { SettingsScreen } from './components/screens/SettingsScreen';

export default function App() {
  const [shipments, setShipments] = useState<Shipment[]>(INITIAL_SHIPMENTS);
  const [activeTab, setActiveTab] = useState<MainNavTab>('overview');
  const [selectedTrackingId, setSelectedTrackingId] = useState<string>('NG-2026-088142');
  const [globalSearch, setGlobalSearch] = useState<string>('');

  // Add new shipment from NewOrderScreen
  const handleOrderCreated = (newShipment: Shipment) => {
    setShipments((prev) => [newShipment, ...prev]);
    setSelectedTrackingId(newShipment.id);
  };

  // Update status of an existing shipment
  const handleShipmentStatusUpdate = (id: string, newStatus: ShipmentStatus, note?: string) => {
    setShipments((prev) =>
      prev.map((s) => {
        if (s.id.toUpperCase() === id.toUpperCase()) {
          const stepMapping: Record<ShipmentStatus, number> = {
            confirmed: 2,
            received: 4,
            en_route: 5,
            out_for_delivery: 7,
            delivered: 8,
            issue: 6,
          };
          const statusTextMapping: Record<ShipmentStatus, string> = {
            confirmed: 'الطلب تأكد',
            received: 'السلعة تستلمات',
            en_route: 'فـ الطريق',
            out_for_delivery: 'خرجت للتوصيل',
            delivered: 'تم التوصيل',
            issue: 'متعثرة (الزبون غير متوفر)',
          };

          return {
            ...s,
            status: newStatus,
            statusText: statusTextMapping[newStatus] || s.statusText,
            currentStep: stepMapping[newStatus] || s.currentStep,
            notes: note ? `${s.notes ? s.notes + ' · ' : ''}${note}` : s.notes,
            podReceiverNote: note && newStatus === 'delivered' ? note : s.podReceiverNote,
          };
        }
        return s;
      })
    );
  };

  const activeShipment =
    shipments.find((s) => s.id.toUpperCase() === selectedTrackingId.toUpperCase()) ||
    shipments[0];

  // Screen title for header
  const getScreenTitle = () => {
    switch (activeTab) {
      case 'overview':
        return 'Overview';
      case 'orders':
        return 'الطلبات';
      case 'new_order':
        return 'طلب جديد';
      case 'live_tracking':
        return 'التتبع المباشر';
      case 'drivers':
        return 'فضاء الشيفور';
      case 'fleet':
        return 'الأسطول';
      case 'claims':
        return 'الشكايات';
      case 'hub_location':
        return 'موقعنا';
      case 'clients':
        return 'الزبناء';
      case 'analytics':
        return 'الإحصائيات';
      case 'settings':
        return 'الإعدادات';
      default:
        return 'NEXT GEN';
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f9fb] text-[#191c1e] flex flex-col font-sans antialiased selection:bg-[#eab308] selection:text-[#141b2b]">
      {/* 1. Sticky Header */}
      <Header
        searchQuery={globalSearch}
        onSearchChange={(q) => {
          setGlobalSearch(q);
          if (q.trim() && activeTab !== 'overview' && activeTab !== 'orders') {
            setActiveTab('overview');
          }
        }}
        activeScreenTitle={getScreenTitle()}
        onSelectShipment={(id) => {
          setSelectedTrackingId(id);
          setActiveTab('live_tracking');
        }}
      />

      {/* 2. Top Horizontal Sub Navigation */}
      <SubNavbar
        activeTab={activeTab}
        onTabChange={(tab) => setActiveTab(tab)}
      />

      {/* 3. Main Body Content */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-3 sm:px-4 py-4 pb-28 sm:pb-16">
        {activeTab === 'overview' && (
          <OverviewScreen
            shipments={shipments}
            activeTab={activeTab}
            onTabChange={(tab) => setActiveTab(tab)}
            onSelectShipment={(id) => {
              setSelectedTrackingId(id);
              setActiveTab('live_tracking');
            }}
            onOpenNewOrder={() => setActiveTab('new_order')}
            searchFilter={globalSearch}
          />
        )}

        {activeTab === 'new_order' && (
          <NewOrderScreen
            onOrderCreated={handleOrderCreated}
            onTrackOrder={(id) => {
              setSelectedTrackingId(id);
              setActiveTab('live_tracking');
            }}
            onBack={() => setActiveTab('overview')}
          />
        )}

        {activeTab === 'live_tracking' && (
          <LiveTrackingScreen
            shipments={shipments}
            selectedTrackingId={selectedTrackingId}
            onSelectTrackingId={(id) => setSelectedTrackingId(id)}
            onOpenDriverTab={() => setActiveTab('drivers')}
          />
        )}

        {activeTab === 'drivers' && (
          <DriverWorkspaceScreen
            activeShipment={activeShipment}
            onShipmentStatusUpdate={handleShipmentStatusUpdate}
            onOpenReportIssue={() => setActiveTab('claims')}
            onOpenMap={() => setActiveTab('hub_location')}
          />
        )}

        {activeTab === 'fleet' && <FleetScreen />}

        {activeTab === 'claims' && <ClaimsScreen />}

        {activeTab === 'hub_location' && <HubLocationScreen />}

        {activeTab === 'orders' && (
          <OrdersScreen
            shipments={shipments}
            onSelectShipment={(id) => {
              setSelectedTrackingId(id);
              setActiveTab('live_tracking');
            }}
            onOpenNewOrder={() => setActiveTab('new_order')}
            onUpdateStatus={handleShipmentStatusUpdate}
          />
        )}

        {activeTab === 'clients' && <ClientsScreen />}

        {activeTab === 'analytics' && <AnalyticsScreen />}

        {activeTab === 'settings' && <SettingsScreen />}
      </main>

      {/* 4. Mobile Fixed Bottom Navigation Bar */}
      <BottomNavBar
        activeTab={activeTab}
        onTabChange={(tab) => setActiveTab(tab)}
      />
    </div>
  );
}
