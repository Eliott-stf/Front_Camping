import { FaChevronLeft, FaChevronRight } from 'react-icons/fa6';
import { IMAGE_URL } from '../../constants/apiConstant';
import { dataDashboard } from '../../constants/appConstant';
import Navlinks from './Navlinks';
import { IoMdClose } from 'react-icons/io';

const ImgSrc = `${IMAGE_URL}/logo.png`;

export default function Sidebar({ collapsed, onToggle, mobileOpen, onMobileClose }) {
  const sidebarData = dataDashboard.map((item) => ({
    ...item,
    title: collapsed ? item.title.substring(0, 2).toUpperCase() : item.title,
  }));

  return (
    <>
      {/* Mobile overlay */}
      {mobileOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onMobileClose}
        />
      )}

      <aside className={`fixed top-0 left-0 h-full z-50 flex flex-col transition-all duration-300 ease-in-out bg-plum-950 text-plum-100 ${collapsed ? "w-[72px]" : "w-64"} ${mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}>
        
        {/* Header */}
        <div className="flex items-center gap-3 px-4 h-16 border-b border-plum-800 shrink-0">
          <div className="w-9 h-9 shrink-0 flex items-center justify-center">
            <img src={ImgSrc} alt="Logo Les Lilas" className="w-full h-full object-contain" />
          </div>
          {!collapsed && (
            <div className="overflow-hidden">
              <p className="text-sm font-semibold text-white truncate">Les Lilas</p>
              <p className="text-xs text-plum-400 truncate">Administration</p>
            </div>
          )}
          <button 
            onClick={onMobileClose}
            className="ml-auto lg:hidden text-plum-400 hover:text-white"
          >
            <IoMdClose className="w-5 h-5" />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
          <Navlinks
            data={sidebarData}
            handleClick={onMobileClose}
            marginTop=""
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 no-underline text-plum-300 hover:bg-plum-800 hover:text-white [&.active]:bg-plum-700 [&.active]:text-white [&.active]:shadow-md ${collapsed ? "justify-center" : ""}`}
          />
        </nav>

        {/* Collapse toggle */}
        <div className="hidden lg:flex items-center justify-center py-3 border-t border-plum-800">
          <button
            onClick={onToggle}
            className="p-2 rounded-lg text-plum-400 hover:text-white hover:bg-plum-800 transition-colors"
          >
            {collapsed ? <FaChevronRight className="w-4 h-4" /> : <FaChevronLeft className="w-4 h-4" />}
          </button>
        </div>
      </aside>
    </>
  );
}