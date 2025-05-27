import React, { useState } from 'react';
import { useSchedule } from '../context/ScheduleContext';
import { User, UserPlus, X } from 'lucide-react';
import UserForm from './UserForm';

const UserManagement: React.FC = () => {
  const { users, addUser, removeUser } = useSchedule();
  const [showUserForm, setShowUserForm] = useState(false);
  
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="px-4 py-3 bg-gray-50 border-b border-gray-200 flex justify-between items-center">
        <h2 className="text-sm font-medium text-gray-700 flex items-center">
          <User className="w-4 h-4 mr-1.5 text-gray-500" />
          Mebros do time.
        </h2>
        <button
          onClick={() => setShowUserForm(true)}
          className="inline-flex items-center px-2.5 py-1.5 text-xs font-medium rounded text-blue-700 bg-blue-100 hover:bg-blue-200 transition-colors"
        >
          <UserPlus className="w-3.5 h-3.5 mr-1" />
          Adicionar
        </button>
      </div>
      
      <div className="divide-y divide-gray-200">
        {users.length === 0 ? (
          <div className="px-4 py-6 text-center text-sm text-gray-500">
            Nenhum membro da equipe foi adicionado ainda. Clique em 'Adicionar' para começar!
          </div>
        ) : (
          users.map((user) => (
            <div 
              key={user.id} 
              className="px-4 py-3 flex justify-between items-center group hover:bg-gray-50 transition-colors"
            >
              <div>
                <h3 className="text-sm font-medium text-gray-900">{user.name}</h3>
                <p className="text-xs text-gray-500">{user.role}</p>
              </div>
              <button
                onClick={() => removeUser(user.id)}
                className="opacity-0 group-hover:opacity-100 p-1 text-gray-400 hover:text-red-600 transition-all rounded-full hover:bg-red-50"
                title="Remove team member"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))
        )}
      </div>
      
      {showUserForm && (
        <UserForm 
          onSubmit={addUser} 
          onClose={() => setShowUserForm(false)} 
        />
      )}
    </div>
  );
};

export default UserManagement;