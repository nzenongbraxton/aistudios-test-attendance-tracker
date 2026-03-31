import React from 'react';
import { Users, CalendarCheck, LayoutDashboard, Settings, X } from 'lucide-react';
import { cn } from '../lib/utils';

interface SidebarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ currentTab, setCurrentTab, isOpen, onClose }: SidebarProps) {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'attendance', label: 'Attendance', icon: CalendarCheck },
    { id: 'employees', label: 'Employees', icon: Users },
  ];

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/50 dark:bg-slate-900/80 z-40 md:hidden backdrop-blur-sm"
          onClick={onClose}
        />
      )}
      
      <aside className={cn(
        "fixed inset-y-0 left-0 z-50 w-64 bg-slate-900 dark:bg-slate-950 text-slate-300 flex flex-col h-full border-r border-slate-800 transition-transform duration-300 ease-in-out md:relative md:translate-x-0",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="p-6 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
              <CalendarCheck className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-white tracking-tight">Attendify</span>
          </div>
          <button onClick={onClose} className="md:hidden p-1 text-slate-400 hover:text-white rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <nav className="flex-1 px-4 space-y-1 mt-4 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setCurrentTab(item.id);
                  onClose();
                }}
                className={cn(
                  "w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200",
                  isActive 
                    ? "bg-blue-600/20 text-blue-400 font-medium" 
                    : "hover:bg-slate-800 hover:text-white"
                )}
              >
                <Icon className={cn("w-5 h-5", isActive ? "text-blue-400" : "text-slate-400")} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="p-4 border-t border-slate-800">
          <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl hover:bg-slate-800 hover:text-white transition-all duration-200">
            <Settings className="w-5 h-5 text-slate-400" />
            <span>Settings</span>
          </button>
        </div>
      </aside>
    </>
  );
}
