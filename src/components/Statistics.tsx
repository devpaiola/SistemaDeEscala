import React from 'react';
import { useSchedule } from '../context/ScheduleContext';
import { BarChart2, Clock, Calendar } from 'lucide-react';

const Statistics: React.FC = () => {
  const { users, stats } = useSchedule();
  
  // Sort users by total shifts (descending)
  const sortedStats = [...stats].sort((a, b) => b.totalShifts - a.totalShifts);
  
  // Calculate total shifts and hours
  const totalShifts = stats.reduce((acc, stat) => acc + stat.totalShifts, 0);
  const totalHours = stats.reduce((acc, stat) => acc + stat.totalHours, 0);
  
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="px-4 py-3 bg-gray-50 border-b border-gray-200 flex items-center">
        <BarChart2 className="w-4 h-4 mr-1.5 text-gray-500" />
        <h2 className="text-sm font-medium text-gray-700">Estatísticas da equipe</h2>
      </div>
      
      {users.length === 0 ? (
        <div className="px-4 py-6 text-center text-sm text-gray-500">
          Adicione membros da equipe para ver estatísticas.
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 p-4 gap-4 border-b border-gray-200">
            <div className="bg-blue-50 rounded-lg p-3">
              <div className="flex items-center text-blue-600 text-xs font-medium mb-1">
                <Calendar className="w-3.5 h-3.5 mr-1" />
                Turnos totais
              </div>
              <div className="text-2xl font-bold text-gray-900">{totalShifts}</div>
            </div>
            
            <div className="bg-teal-50 rounded-lg p-3">
              <div className="flex items-center text-teal-600 text-xs font-medium mb-1">
                <Clock className="w-3.5 h-3.5 mr-1" />
                Total de horas
              </div>
              <div className="text-2xl font-bold text-gray-900">{totalHours.toFixed(1)}</div>
            </div>
          </div>
          
          <div className="p-4">
            <h3 className="text-xs font-medium text-gray-500 mb-3">Turnos por membro da equipe</h3>
            
            <div className="space-y-3">
              {sortedStats.map(stat => {
                const user = users.find(u => u.id === stat.userId);
                if (!user) return null;
                
                // Calculate percentage for progress bar
                const percentage = totalShifts > 0 
                  ? (stat.totalShifts / totalShifts) * 100 
                  : 0;
                
                return (
                  <div key={stat.userId}>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium text-gray-700">{user.name}</span>
                      <span className="text-sm text-gray-500">
                        {stat.totalShifts} Turnos ({stat.totalHours.toFixed(1)} hrs)
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div
                        className="bg-blue-600 h-2.5 rounded-full transition-all duration-500 ease-out"
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Statistics;