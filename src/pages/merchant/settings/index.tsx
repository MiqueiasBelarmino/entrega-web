import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { ProfileForm } from './profile-form';
import { BusinessForm } from './business-form';
import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import { useAuth } from '@/contexts/auth-context';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function MerchantSettings() {
  const { user } = useAuth();
  const [businesses, setBusinesses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  
  const fetchBusinesses = async () => {
    try {
      const response = await api.get('/business/my');
      setBusinesses(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBusinesses();
  }, []);

  return (
    <DashboardLayout>
      <Button variant="ghost" className="mb-4 pl-0 hover:bg-transparent" onClick={() => navigate('/merchant')}>
        <ArrowLeft className="mr-2 h-4 w-4" /> Página Inicial
      </Button>
      <div className="max-w-2xl mx-auto">

        <h1 className="text-2xl font-bold mb-6">Configurações</h1>
        
        <div className="grid gap-6">
          
          {loading ? (
             <div className="space-y-4">
                <Skeleton className="h-[300px] w-full" />
             </div>
          ) : (
              businesses.map(business => (
                  <BusinessForm 
                      key={business.id} 
                      business={business} 
                      onUpdate={fetchBusinesses} 
                  />
              ))
          )}

          {!loading && businesses.length === 0 && (
              <div className="bg-white p-6 rounded-lg border text-center text-gray-500">
                  <p>Nenhum estabelecimento encontrado.</p>
                  {/* Future: Add button to create business */}
              </div>
          )}

          <ProfileForm />
        </div>
      </div>
    </DashboardLayout>
  );
}
