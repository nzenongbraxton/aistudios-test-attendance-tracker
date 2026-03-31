import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { Dashboard } from './pages/Dashboard';
import { Employees } from './pages/Employees';
import { Attendance } from './pages/Attendance';
import { useAttendanceData } from './hooks/useAttendanceData';
import { ThemeProvider } from './components/ThemeProvider';

export default function App() {
  const [currentTab, setCurrentTab] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { employees, attendance, addEmployee, markAttendance } = useAttendanceData();

  const renderContent = () => {
    switch (currentTab) {
      case 'dashboard':
        return <Dashboard employees={employees} attendance={attendance} />;
      case 'employees':
        return <Employees employees={employees} addEmployee={addEmployee} />;
      case 'attendance':
        return <Attendance employees={employees} attendance={attendance} markAttendance={markAttendance} />;
      default:
        return <Dashboard employees={employees} attendance={attendance} />;
    }
  };

  const getTitle = () => {
    switch (currentTab) {
      case 'dashboard': return 'Dashboard';
      case 'employees': return 'Employees';
      case 'attendance': return 'Attendance Tracking';
      default: return 'Dashboard';
    }
  };

  return (
    <ThemeProvider defaultTheme="system" storageKey="attendify-theme">
      <div className="flex h-screen bg-slate-50 dark:bg-slate-950 overflow-hidden font-sans transition-colors">
        <Sidebar 
          currentTab={currentTab} 
          setCurrentTab={setCurrentTab} 
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />
        
        <div className="flex-1 flex flex-col overflow-hidden w-full">
          <Header title={getTitle()} onMenuClick={() => setIsSidebarOpen(true)} />
          
          <main className="flex-1 overflow-y-auto">
            {renderContent()}
          </main>
        </div>
      </div>
    </ThemeProvider>
  );
}
