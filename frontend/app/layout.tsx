
import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import CreatePlanModal from '../components/CreatePlanModal';
import { useApp } from './providers';
import { Menu, X, LogOut } from 'lucide-react';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const { logout } = useApp();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'The Arena' },
    { path: '/leaderboard', label: 'Leaderboard' },
    { path: '/profile', label: 'My Profile' },
  ];

  return (
    <div className="min-h-screen bg-brand-dark text-gray-100 font-sans selection:bg-neon-green selection:text-black overflow-x-hidden">
      {/* Desktop Sidebar */}
      <Sidebar onOpenCreate={() => setIsCreateModalOpen(true)} />

      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-brand-dark/80 backdrop-blur-md border-b border-brand-border z-50 flex items-center justify-between px-4 transition-all">
        <div className="font-black text-xl italic text-white tracking-tighter">
          We'll<span className="text-neon-green">SEE</span>
        </div>
        <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
            className="text-white p-2 active:scale-95 transition-transform"
        >
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-brand-dark pt-24 px-6 md:hidden animate-in slide-in-from-top-5 duration-200">
          <div className="space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`block w-full text-left py-4 px-4 text-2xl font-bold rounded-xl transition-colors ${
                   location.pathname === item.path 
                   ? 'bg-zinc-800 text-neon-green' 
                   : 'text-gray-500 hover:text-white hover:bg-zinc-900'
                }`}
              >
                {item.label}
              </Link>
            ))}
            <button
                onClick={logout}
                className="block w-full text-left py-4 px-4 text-xl font-bold text-neon-red"
            >
                Sign Out
            </button>
            <div className="pt-8">
                <button
                onClick={() => {
                    setIsCreateModalOpen(true);
                    setMobileMenuOpen(false);
                }}
                className="w-full bg-white text-black py-4 rounded-xl font-black text-lg uppercase tracking-widest shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                >
                Declare Plan
                </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <main className="md:pl-64 pt-20 md:pt-0 min-h-screen transition-all duration-300">
        <div className="max-w-4xl mx-auto px-4 md:px-10 py-8 md:py-12">
          {children}
        </div>
      </main>

      {/* Global Modal */}
      <CreatePlanModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />
    </div>
  );
}
