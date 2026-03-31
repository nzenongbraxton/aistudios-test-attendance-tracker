import { useState, useEffect } from 'react';
import { Employee, AttendanceRecord, AttendanceStatus } from '../types';
import { format } from 'date-fns';

const MOCK_EMPLOYEES: Employee[] = [
  { id: '1', name: 'Alice Smith', role: 'Software Engineer', department: 'Engineering', email: 'alice@example.com' },
  { id: '2', name: 'Bob Johnson', role: 'Product Manager', department: 'Product', email: 'bob@example.com' },
  { id: '3', name: 'Charlie Davis', role: 'Designer', department: 'Design', email: 'charlie@example.com' },
  { id: '4', name: 'Diana Prince', role: 'HR Manager', department: 'HR', email: 'diana@example.com' },
  { id: '5', name: 'Evan Wright', role: 'Sales Rep', department: 'Sales', email: 'evan@example.com' },
];

const MOCK_ATTENDANCE: AttendanceRecord[] = [
  { id: '1', employeeId: '1', date: format(new Date(), 'yyyy-MM-dd'), status: 'Present', checkIn: '09:00', checkOut: '17:00' },
  { id: '2', employeeId: '2', date: format(new Date(), 'yyyy-MM-dd'), status: 'Late', checkIn: '09:45', checkOut: '17:30' },
  { id: '3', employeeId: '3', date: format(new Date(), 'yyyy-MM-dd'), status: 'Absent' },
];

export function useAttendanceData() {
  const [employees, setEmployees] = useState<Employee[]>(() => {
    const saved = localStorage.getItem('attendance_employees');
    return saved ? JSON.parse(saved) : MOCK_EMPLOYEES;
  });

  const [attendance, setAttendance] = useState<AttendanceRecord[]>(() => {
    const saved = localStorage.getItem('attendance_records');
    return saved ? JSON.parse(saved) : MOCK_ATTENDANCE;
  });

  useEffect(() => {
    localStorage.setItem('attendance_employees', JSON.stringify(employees));
  }, [employees]);

  useEffect(() => {
    localStorage.setItem('attendance_records', JSON.stringify(attendance));
  }, [attendance]);

  const addEmployee = (employee: Omit<Employee, 'id'>) => {
    const newEmployee = { ...employee, id: Math.random().toString(36).substr(2, 9) };
    setEmployees([...employees, newEmployee]);
  };

  const updateEmployee = (id: string, updates: Partial<Employee>) => {
    setEmployees(employees.map(e => e.id === id ? { ...e, ...updates } : e));
  };

  const deleteEmployee = (id: string) => {
    setEmployees(employees.filter(e => e.id !== id));
  };

  const markAttendance = (employeeId: string, date: string, status: AttendanceStatus, checkIn?: string, checkOut?: string, notes?: string) => {
    const existingIndex = attendance.findIndex(a => a.employeeId === employeeId && a.date === date);
    
    if (existingIndex >= 0) {
      const newAttendance = [...attendance];
      newAttendance[existingIndex] = { ...newAttendance[existingIndex], status, checkIn, checkOut, notes };
      setAttendance(newAttendance);
    } else {
      const newRecord: AttendanceRecord = {
        id: Math.random().toString(36).substr(2, 9),
        employeeId,
        date,
        status,
        checkIn,
        checkOut,
        notes
      };
      setAttendance([...attendance, newRecord]);
    }
  };

  return {
    employees,
    attendance,
    addEmployee,
    updateEmployee,
    deleteEmployee,
    markAttendance
  };
}
