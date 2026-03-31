import React from 'react';
import { Bell, Search, User, Menu, Sun, Moon, Monitor } from 'lucide-react';
import { useTheme } from './ThemeProvider';

interface HeaderProps {
  title: string;
  onMenuClick: () => void;
}

export function Header({ title, onMenuClick }: HeaderProps) {
  const { theme, setTheme } = useTheme();

  const cycleTheme = () => {
    if (theme === 'light') setTheme('dark');
    else if (theme === 'dark') setTheme('system');
    else setTheme('light');
  };

  const ThemeIcon = theme === 'light' ? Sun : theme === 'dark' ? Moon : Monitor;

  return (
    <header className="h-16 md:h-20 px-4 md:px-8 flex items-center justify-between bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="flex items-center space-x-4">
        <button 
          onClick={onMenuClick}
          className="p-2 -ml-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg md:hidden transition-colors"
        >
          <Menu className="w-6 h-6" />
        </button>
        <h1 className="text-xl md:text-2xl font-semibold text-slate-800 dark:text-slate-100 tracking-tight">{title}</h1>
      </div>
      
      <div className="flex items-center space-x-2 md:space-x-6">
        <div className="relative hidden sm:block">
          <Search className="w-5 h-5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input 
            type="text" 
            placeholder="Search..." 
            className="pl-10 pr-4 py-2 bg-slate-100 dark:bg-slate-800 border-transparent rounded-full text-sm focus:bg-white dark:focus:bg-slate-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-900 transition-all outline-none w-48 md:w-64 text-slate-800 dark:text-slate-200"
          />
        </div>
        
        <button 
          onClick={cycleTheme}
          className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors"
          title={`Current theme: ${theme}`}
        >
          <ThemeIcon className="w-5 h-5" />
        </button>

        <button className="relative p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors hidden sm:block">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-slate-900"></span>
        </button>
        
        <div className="flex items-center space-x-3 sm:pl-6 sm:border-l border-slate-200 dark:border-slate-800">
          <div className="text-right hidden md:block">
            <p className="text-sm font-medium text-slate-700 dark:text-slate-200">Admin User</p>
            <p className="text-xs text-slate-500 dark:text-slate-400">Manager</p>
          </div>
          <div className="w-8 h-8 md:w-10 md:h-10 bg-blue-100 dark:bg-blue-900/50 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-400 flex-shrink-0">
            <User className="w-4 h-4 md:w-5 md:h-5" />
          </div>
        </div>
      </div>
    </header>
  );
}
