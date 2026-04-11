import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../Ui/SideBar';

const AdminLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleToggle = () => {
    setCollapsed(!collapsed);
  };

  const handleMobileClose = () => {
    setMobileOpen(false);
  };

  return (
    <div className="flex h-screen bg-slate-50">
      <Sidebar 
        collapsed={collapsed} 
        onToggle={handleToggle}
        mobileOpen={mobileOpen}
        onMobileClose={handleMobileClose}
      />
      
      <main className={`flex-1 overflow-auto transition-all duration-300 ${collapsed ? 'ml-[72px]' : 'ml-64'} lg:ml-0`}>
        <div className="p-4 sm:p-6 lg:p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
