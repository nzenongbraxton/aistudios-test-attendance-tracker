export type AttendanceStatus = 'Present' | 'Absent' | 'Late' | 'Half-day';

export interface Employee {
  id: string;
  name: string;
  role: string;
  department: string;
  email: string;
  avatar?: string;
}

export interface AttendanceRecord {
  id: string;
  employeeId: string;
  date: string; // YYYY-MM-DD
  status: AttendanceStatus;
  checkIn?: string; // HH:mm
  checkOut?: string; // HH:mm
  notes?: string;
}
