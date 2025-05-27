export interface User {
  id: string;
  name: string;
  role: string;
  avatar?: string;
}

export interface Shift {
  id: string;
  userId: string;
  date: string; // ISO string
  startTime: string; // 24h format "HH:MM"
  end_time: string; // 24h format "HH:MM"
  notes?: string;
}

export interface ShiftStats {
  userId: string;
  totalShifts: number;
  totalHours: number;
  averageShiftLength: number;
}

export type ViewMode = 'week' | 'month';