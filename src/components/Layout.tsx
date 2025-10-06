import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { KpiStrip } from './KpiStrip';
import { KpiStripOilCellar } from './KpiStripOilCellar';

export const Layout = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const location = useLocation();

  return (
    <div className="min-h-screen bg-muted flex">
      <Sidebar isCollapsed={isSidebarCollapsed} />
      <div className={`flex-1 flex flex-col ${isSidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
        <Header
          onToggleSidebar={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
          isSidebarCollapsed={isSidebarCollapsed}
        />
        {location.pathname === '/oil-cellar' ? (
          <KpiStripOilCellar />
        ) : (
          location.pathname !== '/' ? <KpiStrip /> : null
        )}
        <main className="flex-1 p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
