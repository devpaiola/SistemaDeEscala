import React from 'react';
import { useSchedule } from '../context/ScheduleContext';
import { Calendar, Users } from 'lucide-react';

const Header: React.FC = () => {
  const { viewMode, setViewMode } = useSchedule();
  
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <Calendar className="w-8 h-8 text-blue-600 mr-2" />
            <h1 className="text-xl font-semibold text-gray-900">WorkMonitor - Escala</h1>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="bg-gray-100 rounded-md p-1">
              <button
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                  viewMode === 'week'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => setViewMode('week')}
              >
                Semana
              </button>
              <button
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                  viewMode === 'month'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => setViewMode('month')}
              >
                Mês
              </button>
            </div>
            
            <div className="flex items-center text-gray-600 hover:text-gray-900 transition-colors">
              <Users className="w-5 h-5 mr-1" />
              <span className="text-sm font-medium">Team</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;