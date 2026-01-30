import { ReactNode } from 'react';
import { useAuth } from '../../contexts/auth-context';
import { Button } from '../ui/button';
import { LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function DashboardLayout({ children }: { children: ReactNode }) {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div 
             className="font-bold text-xl cursor-pointer" 
             onClick={() => navigate(user?.role === 'MERCHANT' ? '/merchant' : '/courier')}
          >
            Entrega Certa
          </div>
          
          <div className="flex items-center gap-4">
             <span className="text-sm text-gray-600 hidden md:inline">
               Olá, {user?.name.split(' ')[0]}
             </span>
             <Button variant="ghost" size="icon" onClick={logout}>
               <LogOut className="h-5 w-5" />
             </Button>
          </div>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>
    </div>
  );
}
