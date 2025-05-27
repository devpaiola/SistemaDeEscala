import React, { useState } from 'react';
import { useSchedule } from '../context/ScheduleContext';
import { Calendar, Clock, PlusCircle } from 'lucide-react';
import { formatDate, formatTime, getDaysInWeek, getDaysInMonth } from '../utils/dateUtils';
import ShiftForm from './ShiftForm';

const ShiftScheduler: React.FC = () => {
  const { users, shifts, viewMode, addShift, removeShift } = useSchedule();
  const [showShiftForm, setShowShiftForm] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string | undefined>(undefined);
  const [currentDate, setCurrentDate] = useState(new Date());
  
  const days = viewMode === 'week' 
    ? getDaysInWeek(currentDate)
    : getDaysInMonth(currentDate);
  
  const handlePrevious = () => {
    const newDate = new Date(currentDate);
    if (viewMode === 'week') {
      newDate.setDate(newDate.getDate() - 7);
    } else {
      newDate.setMonth(newDate.getMonth() - 1);
    }
    setCurrentDate(newDate);
  };
  
  const handleNext = () => {
    const newDate = new Date(currentDate);
    if (viewMode === 'week') {
      newDate.setDate(newDate.getDate() + 7);
    } else {
      newDate.setMonth(newDate.getMonth() + 1);
    }
    setCurrentDate(newDate);
  };
  
  const handleAddShift = (date: string) => {
    setSelectedDate(date);
    setShowShiftForm(true);
  };
  
  // Filter shifts for the visible period
  const visibleShifts = shifts.filter(shift => {
    const shiftDate = new Date(shift.date);
    if (viewMode === 'week') {
      const startOfWeek = days[0];
      const endOfWeek = new Date(days[6]);
      endOfWeek.setHours(23, 59, 59, 999);
      return shiftDate >= startOfWeek && shiftDate <= endOfWeek;
    } else {
      return (
        shiftDate.getMonth() === currentDate.getMonth() &&
        shiftDate.getFullYear() === currentDate.getFullYear()
      );
    }
  });
  
  const periodTitle = viewMode === 'week'
    ? `${formatDate(days[0])} - ${formatDate(days[6])}`
    : currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="px-4 py-3 bg-gray-50 border-b border-gray-200 flex justify-between items-center">
        <div className="flex items-center">
          <Calendar className="w-4 h-4 mr-1.5 text-gray-500" />
          <h2 className="text-sm font-medium text-gray-700">{periodTitle}</h2>
        </div>
        
        <div className="flex items-center space-x-2">
          <button
            onClick={handlePrevious}
            className="p-1 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-200 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={handleNext}
            className="p-1 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-200 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <div className={`grid ${viewMode === 'week' ? 'grid-cols-7' : 'grid-cols-7'} min-w-max`}>
          {/* Header row - days */}
          {days.map((day, index) => {
            const isToday = day.toDateString() === new Date().toDateString();
            
            return (
              <div
                key={day.toISOString()}
                className={`border-b border-r border-gray-200 p-2 ${
                  isToday ? 'bg-blue-50' : index % 7 === 0 || index % 7 === 6 ? 'bg-gray-50' : ''
                }`}
              >
                <div className="flex justify-between items-center mb-1">
                  <span className={`text-xs font-medium ${isToday ? 'text-blue-600' : 'text-gray-500'}`}>
                    {day.toLocaleDateString('en-US', { weekday: viewMode === 'week' ? 'short' : undefined })}
                  </span>
                  <span className={`w-6 h-6 flex items-center justify-center rounded-full text-xs ${
                    isToday 
                      ? 'bg-blue-600 text-white' 
                      : 'text-gray-900'
                  }`}>
                    {day.getDate()}
                  </span>
                </div>
                
                <button
                  onClick={() => handleAddShift(day.toISOString().split('T')[0])}
                  className="w-full mt-1 flex items-center justify-center text-xs text-gray-500 hover:text-blue-600 py-1 rounded-md hover:bg-blue-50 transition-colors"
                >
                  <PlusCircle className="w-3.5 h-3.5 mr-1" />
                  <span>Adicionar</span>
                </button>
              </div>
            );
          })}
          
          {/* Shifts for each day */}
          {days.map(day => {
            const dayStr = day.toISOString().split('T')[0];
            const shiftsForDay = visibleShifts.filter(shift => shift.date === dayStr);
            
            return (
              <div 
                key={`shifts-${dayStr}`} 
                className="border-r border-gray-200 p-2 min-h-[120px]"
              >
                {shiftsForDay.length === 0 ? (
                  <div className="h-full flex items-center justify-center">
                    <span className="text-xs text-gray-400">No shifts</span>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {shiftsForDay.map(shift => {
                      const user = users.find(u => u.id === shift.userId);
                      
                      return (
                        <div 
                          key={shift.id}
                          className="group bg-blue-50 border border-blue-200 rounded-md p-2 text-xs hover:shadow-sm transition-all cursor-pointer"
                        >
                          <div className="font-medium text-gray-900 truncate">{user?.name}</div>
                          <div className="flex items-center text-gray-600 mt-1">
                            <Clock className="w-3 h-3 mr-1 text-blue-500" />
                            <span>
                              {formatTime(shift.startTime)} - {formatTime(shift.endTime)}
                            </span>
                          </div>
                          {shift.notes && (
                            <div className="mt-1 text-gray-500 text-xs truncate">{shift.notes}</div>
                          )}
                          <div className="mt-1 pt-1 border-t border-blue-200 flex justify-end opacity-0 group-hover:opacity-100 transition-opacity">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                removeShift(shift.id);
                              }}
                              className="text-red-500 hover:text-red-700 transition-colors"
                            >
                              Remover
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
      
      {showShiftForm && (
        <ShiftForm 
          initialDate={selectedDate}
          onSubmit={addShift} 
          onClose={() => setShowShiftForm(false)} 
        />
      )}
    </div>
  );
};

export default ShiftScheduler;