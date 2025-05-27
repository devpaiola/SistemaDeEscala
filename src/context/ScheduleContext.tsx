import React, { createContext, useState, useEffect, ReactNode, useContext } from 'react';
import { User, Shift, ShiftStats, ViewMode } from '../types';
import { calculateHours } from '../utils/dateUtils';
import { supabase } from '../lib/supabase';

interface ScheduleContextType {
  users: User[];
  shifts: Shift[];
  viewMode: ViewMode;
  stats: ShiftStats[];
  addUser: (user: Omit<User, 'id'>) => Promise<void>;
  removeUser: (id: string) => Promise<void>;
  addShift: (shift: Omit<Shift, 'id'>) => Promise<void>;
  removeShift: (id: string) => Promise<void>;
  updateShift: (shift: Shift) => Promise<void>;
  setViewMode: (mode: ViewMode) => void;
}

const ScheduleContext = createContext<ScheduleContextType | undefined>(undefined);

export const useSchedule = () => {
  const context = useContext(ScheduleContext);
  if (!context) {
    throw new Error('useSchedule must be used within a ScheduleProvider');
  }
  return context;
};

interface ScheduleProviderProps {
  children: ReactNode;
}

export const ScheduleProvider: React.FC<ScheduleProviderProps> = ({ children }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [shifts, setShifts] = useState<Shift[]>([]);
  const [viewMode, setViewMode] = useState<ViewMode>('week');

  // Fetch initial data
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch users
        const { data: userData, error: userError } = await supabase
          .from('users')
          .select('*');
        
        if (userError) throw userError;
        setUsers(userData);

        // Fetch shifts
        const { data: shiftData, error: shiftError } = await supabase
          .from('shifts')
          .select('*');
        
        if (shiftError) throw shiftError;
        setShifts(shiftData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);
  
  // Calculate statistics based on shifts
  const stats: ShiftStats[] = users.map(user => {
    const userShifts = shifts.filter(shift => shift.userId === user.id);
    const totalShifts = userShifts.length;
    
    const totalHours = userShifts.reduce((acc, shift) => {
      return acc + calculateHours(shift.startTime, shift.endTime);
    }, 0);
    
    const averageShiftLength = totalShifts > 0 ? totalHours / totalShifts : 0;
    
    return {
      userId: user.id,
      totalShifts,
      totalHours,
      averageShiftLength
    };
  });
  
  const addUser = async (userData: Omit<User, 'id'>) => {
    try {
      const { data, error } = await supabase
        .from('users')
        .insert([userData])
        .select()
        .single();
      
      if (error) throw error;
      setUsers(prev => [...prev, data]);
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };
  
  const removeUser = async (id: string) => {
    try {
      const { error } = await supabase
        .from('users')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      setUsers(prev => prev.filter(user => user.id !== id));
      setShifts(prev => prev.filter(shift => shift.userId !== id));
    } catch (error) {
      console.error('Error removing user:', error);
    }
  };
  
  const addShift = async (shiftData: Omit<Shift, 'id'>) => {
    try {
      const { data, error } = await supabase
        .from('shifts')
        .insert([shiftData])
        .select()
        .single();
      
      if (error) throw error;
      setShifts(prev => [...prev, data]);
    } catch (error) {
      console.error('Error adding shift:', error);
    }
  };
  
  const removeShift = async (id: string) => {
    try {
      const { error } = await supabase
        .from('shifts')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      setShifts(prev => prev.filter(shift => shift.id !== id));
    } catch (error) {
      console.error('Error removing shift:', error);
    }
  };
  
  const updateShift = async (updatedShift: Shift) => {
    try {
      const { error } = await supabase
        .from('shifts')
        .update(updatedShift)
        .eq('id', updatedShift.id);
      
      if (error) throw error;
      setShifts(prev => 
        prev.map(shift => shift.id === updatedShift.id ? updatedShift : shift)
      );
    } catch (error) {
      console.error('Error updating shift:', error);
    }
  };
  
  return (
    <ScheduleContext.Provider value={{
      users,
      shifts,
      viewMode,
      stats,
      addUser,
      removeUser,
      addShift,
      removeShift,
      updateShift,
      setViewMode
    }}>
      {children}
    </ScheduleContext.Provider>
  );
};