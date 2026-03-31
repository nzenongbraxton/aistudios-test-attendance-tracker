import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { Dashboard } from './pages/Dashboard';
import { Employees } from './pages/Employees';
import { Attendance } from './pages/Attendance';
import { useAttendanceData } from './hooks/useAttendanceData';

export default function App() {
  const [currentTab, setCurrentTab] = useState('dashboard');
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
    <div className="flex h-screen bg-slate-50 overflow-hidden font-sans">
      <Sidebar currentTab={currentTab} setCurrentTab={setCurrentTab} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header title={getTitle()} />
        
        <main className="flex-1 overflow-y-auto">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}
