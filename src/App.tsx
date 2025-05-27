import React from 'react';
import { ScheduleProvider } from './context/ScheduleContext';
import Header from './components/Header';
import UserManagement from './components/UserManagement';
import ShiftScheduler from './components/ShiftScheduler';
import Statistics from './components/Statistics';
import Footer from './components/Footer';


function App() {
  return (
    <ScheduleProvider>
      <div className="min-h-screen bg-gray-100 flex flex-col">
        <Header />
        
        <main className="flex-1 py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              <div className="lg:col-span-1 space-y-6">
                <UserManagement />
                <Statistics />
              </div>
              
              <div className="lg:col-span-3">
                <ShiftScheduler />
              </div>
            </div>
          </div>
        </main>
        
        <Footer />
      </div>
    </ScheduleProvider>
  );
}

export default App;