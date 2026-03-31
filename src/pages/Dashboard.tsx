import React from 'react';
import { Employee, AttendanceRecord } from '../types';
import { format } from 'date-fns';
import { Users, UserCheck, UserX, Clock } from 'lucide-react';

interface DashboardProps {
  employees: Employee[];
  attendance: AttendanceRecord[];
}

export function Dashboard({ employees, attendance }: DashboardProps) {
  const today = format(new Date(), 'yyyy-MM-dd');
  const todaysAttendance = attendance.filter(a => a.date === today);
  
  const presentCount = todaysAttendance.filter(a => a.status === 'Present').length;
  const absentCount = todaysAttendance.filter(a => a.status === 'Absent').length;
  const lateCount = todaysAttendance.filter(a => a.status === 'Late').length;
  const halfDayCount = todaysAttendance.filter(a => a.status === 'Half-day').length;
  
  const totalEmployees = employees.length;
  const unmarkedCount = totalEmployees - todaysAttendance.length;

  const stats = [
    { label: 'Total Employees', value: totalEmployees, icon: Users, color: 'bg-blue-500', bgColor: 'bg-blue-50' },
    { label: 'Present Today', value: presentCount, icon: UserCheck, color: 'bg-emerald-500', bgColor: 'bg-emerald-50' },
    { label: 'Absent Today', value: absentCount, icon: UserX, color: 'bg-rose-500', bgColor: 'bg-rose-50' },
    { label: 'Late / Half-day', value: lateCount + halfDayCount, icon: Clock, color: 'bg-amber-500', bgColor: 'bg-amber-50' },
  ];

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-6 md:space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div key={i} className="bg-white dark:bg-slate-900 rounded-2xl p-5 md:p-6 border border-slate-100 dark:border-slate-800 shadow-sm flex items-center space-x-4 transition-colors">
              <div className={`w-12 h-12 md:w-14 md:h-14 rounded-xl flex items-center justify-center ${stat.bgColor} dark:bg-opacity-10`}>
                <Icon className={`w-6 h-6 md:w-7 md:h-7 ${stat.color.replace('bg-', 'text-')}`} />
              </div>
              <div>
                <p className="text-xs md:text-sm font-medium text-slate-500 dark:text-slate-400">{stat.label}</p>
                <p className="text-2xl md:text-3xl font-bold text-slate-800 dark:text-slate-100">{stat.value}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Activity & Unmarked */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden transition-colors">
          <div className="p-5 md:p-6 border-b border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
            <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100">Today's Attendance Overview</h2>
            <span className="text-sm text-slate-500 dark:text-slate-400">{format(new Date(), 'MMMM d, yyyy')}</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[600px]">
              <thead>
                <tr className="bg-slate-50/50 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400 text-sm">
                  <th className="px-6 py-4 font-medium">Employee</th>
                  <th className="px-6 py-4 font-medium">Status</th>
                  <th className="px-6 py-4 font-medium">Check In</th>
                  <th className="px-6 py-4 font-medium">Check Out</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {todaysAttendance.slice(0, 5).map(record => {
                  const employee = employees.find(e => e.id === record.employeeId);
                  if (!employee) return null;
                  
                  return (
                    <tr key={record.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-300 font-medium text-sm flex-shrink-0">
                            {employee.name.charAt(0)}
                          </div>
                          <div>
                            <p className="text-sm font-medium text-slate-800 dark:text-slate-200">{employee.name}</p>
                            <p className="text-xs text-slate-500 dark:text-slate-400">{employee.department}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium
                          ${record.status === 'Present' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400' : 
                            record.status === 'Absent' ? 'bg-rose-100 text-rose-700 dark:bg-rose-500/10 dark:text-rose-400' : 
                            record.status === 'Late' ? 'bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400' : 
                            'bg-blue-100 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400'}`}>
                          {record.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">{record.checkIn || '-'}</td>
                      <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">{record.checkOut || '-'}</td>
                    </tr>
                  );
                })}
                {todaysAttendance.length === 0 && (
                  <tr>
                    <td colSpan={4} className="px-6 py-8 text-center text-slate-500 dark:text-slate-400 text-sm">
                      No attendance records for today yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm p-5 md:p-6 transition-colors">
          <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-4">Pending Actions</h2>
          
          {unmarkedCount > 0 ? (
            <div className="bg-amber-50 dark:bg-amber-500/10 border border-amber-100 dark:border-amber-500/20 rounded-xl p-4 flex items-start space-x-3">
              <Clock className="w-5 h-5 text-amber-600 dark:text-amber-500 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="text-sm font-medium text-amber-800 dark:text-amber-400">Unmarked Attendance</h3>
                <p className="text-sm text-amber-600 dark:text-amber-500/80 mt-1">
                  There are {unmarkedCount} employees whose attendance hasn't been marked for today.
                </p>
              </div>
            </div>
          ) : (
            <div className="bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-100 dark:border-emerald-500/20 rounded-xl p-4 flex items-start space-x-3">
              <UserCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-500 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="text-sm font-medium text-emerald-800 dark:text-emerald-400">All Caught Up!</h3>
                <p className="text-sm text-emerald-600 dark:text-emerald-500/80 mt-1">
                  All employee attendance has been marked for today.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
