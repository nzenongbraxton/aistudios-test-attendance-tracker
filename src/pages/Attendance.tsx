import React, { useState } from 'react';
import { Employee, AttendanceRecord, AttendanceStatus } from '../types';
import { format, subDays, addDays } from 'date-fns';
import { ChevronLeft, ChevronRight, Check } from 'lucide-react';

interface AttendanceProps {
  employees: Employee[];
  attendance: AttendanceRecord[];
  markAttendance: (employeeId: string, date: string, status: AttendanceStatus, checkIn?: string, checkOut?: string) => void;
}

export function Attendance({ employees, attendance, markAttendance }: AttendanceProps) {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const dateStr = format(selectedDate, 'yyyy-MM-dd');

  const handlePrevDay = () => setSelectedDate(prev => subDays(prev, 1));
  const handleNextDay = () => setSelectedDate(prev => addDays(prev, 1));
  const handleToday = () => setSelectedDate(new Date());

  const getRecord = (empId: string) => attendance.find(a => a.employeeId === empId && a.date === dateStr);

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-6">
      {/* Date Navigation */}
      <div className="flex items-center justify-between bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
        <div className="flex items-center space-x-4">
          <button onClick={handlePrevDay} className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
            <ChevronLeft className="w-5 h-5 text-slate-600" />
          </button>
          <h2 className="text-lg font-semibold text-slate-800 min-w-[150px] text-center">
            {format(selectedDate, 'MMMM d, yyyy')}
          </h2>
          <button onClick={handleNextDay} className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
            <ChevronRight className="w-5 h-5 text-slate-600" />
          </button>
        </div>
        <button 
          onClick={handleToday}
          className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-medium transition-colors text-sm"
        >
          Today
        </button>
      </div>

      {/* Attendance List */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 text-sm">
              <th className="px-6 py-4 font-medium">Employee</th>
              <th className="px-6 py-4 font-medium">Status</th>
              <th className="px-6 py-4 font-medium">Check In</th>
              <th className="px-6 py-4 font-medium">Check Out</th>
              <th className="px-6 py-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {employees.map(employee => {
              const record = getRecord(employee.id);
              const status = record?.status;

              return (
                <tr key={employee.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 font-medium text-sm">
                        {employee.name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-slate-800">{employee.name}</p>
                        <p className="text-xs text-slate-500">{employee.department}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <select
                      value={status || ''}
                      onChange={(e) => markAttendance(employee.id, dateStr, e.target.value as AttendanceStatus, record?.checkIn, record?.checkOut)}
                      className={`text-sm rounded-lg border px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500
                        ${!status ? 'border-slate-300 text-slate-500' : 
                          status === 'Present' ? 'border-emerald-200 bg-emerald-50 text-emerald-700' : 
                          status === 'Absent' ? 'border-rose-200 bg-rose-50 text-rose-700' : 
                          status === 'Late' ? 'border-amber-200 bg-amber-50 text-amber-700' : 
                          'border-blue-200 bg-blue-50 text-blue-700'}`}
                    >
                      <option value="" disabled>Mark Status</option>
                      <option value="Present">Present</option>
                      <option value="Absent">Absent</option>
                      <option value="Late">Late</option>
                      <option value="Half-day">Half-day</option>
                    </select>
                  </td>
                  <td className="px-6 py-4">
                    <input
                      type="time"
                      value={record?.checkIn || ''}
                      onChange={(e) => markAttendance(employee.id, dateStr, status || 'Present', e.target.value, record?.checkOut)}
                      disabled={!status || status === 'Absent'}
                      className="text-sm border border-slate-200 rounded-lg px-2 py-1.5 disabled:bg-slate-50 disabled:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </td>
                  <td className="px-6 py-4">
                    <input
                      type="time"
                      value={record?.checkOut || ''}
                      onChange={(e) => markAttendance(employee.id, dateStr, status || 'Present', record?.checkIn, e.target.value)}
                      disabled={!status || status === 'Absent'}
                      className="text-sm border border-slate-200 rounded-lg px-2 py-1.5 disabled:bg-slate-50 disabled:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </td>
                  <td className="px-6 py-4 text-right">
                    {status ? (
                      <span className="inline-flex items-center text-emerald-600 text-sm font-medium">
                        <Check className="w-4 h-4 mr-1" /> Saved
                      </span>
                    ) : (
                      <span className="text-slate-400 text-sm">Pending</span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
