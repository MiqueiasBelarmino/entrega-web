import { ReactNode } from 'react';
import { useAuth } from '../../contexts/auth-context';
import { Button } from '../ui/button';
import { LogOut, Settings } from 'lucide-react';
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
             {user?.role === 'ADMIN' && (
                <Button variant="ghost" size="sm" onClick={() => navigate('/admin')} className="text-primary font-bold">
                  Admin
                </Button>
             )}
             <Button variant="ghost" size="icon" onClick={() => navigate('/merchant/settings')} title="Configurações">
               <Settings className="h-5 w-5" />
             </Button>
             <Button variant="ghost" size="icon" onClick={logout} title="Sair">
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
