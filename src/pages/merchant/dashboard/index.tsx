import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { api } from '../../../lib/api';
import { DashboardLayout } from '../../../components/layout/dashboard-layout';
import { Button } from '../../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { Badge } from '../../../components/ui/badge';
import { Plus } from 'lucide-react';
import { format } from 'date-fns';
import { statusMap } from '@/lib/utils';

interface Delivery {
  id: string;
  status: string;
  price: number;
  pickupAddress: string;
  dropoffAddress: string;
  createdAt: string;
  courier?: {
    name: string;
  };
}

const statusColor: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
  AVAILABLE: 'secondary',
  ACCEPTED: 'default',
  PICKED_UP: 'default',
  COMPLETED: 'outline',
  CANCELED: 'destructive',
};

export default function MerchantDashboard() {
  const [deliveries, setDeliveries] = useState<Delivery[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchDeliveries();
  }, []);

  const fetchDeliveries = async () => {
    try {
      const response = await api.get('/deliveries');
      setDeliveries(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Entregadas criadas por você</h1>
        <Button onClick={() => navigate('/merchant/deliveries/new')}>
          <Plus className="mr-2 h-4 w-4" /> Nova Entrega
        </Button>
      </div>

      {loading ? (
        <div>Carregando...</div>
      ) : deliveries.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          Nenhuma entrega encontrada.
        </div>
      ) : (
        <div className="grid gap-4">
          {deliveries.map((delivery) => (
            <Link key={delivery.id} to={`/merchant/deliveries/${delivery.id}`}>
              <Card className="hover:shadow-md transition-shadow cursor-pointer">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    {format(new Date(delivery.createdAt), 'dd/MM/yyyy HH:mm')}
                  </CardTitle>
                  <Badge variant={statusColor[delivery.status] as any}>
                    {statusMap[delivery.status]}
                  </Badge>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-2 text-sm mt-2">
                    <div>
                      <p className="font-semibold text-gray-500">Retirada</p>
                      <p>{delivery.pickupAddress}</p>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-500">Entrega</p>
                      <p>{delivery.dropoffAddress}</p>
                    </div>
                  </div>
                  <div className="mt-4 flex justify-between items-center text-sm">
                    <span className="font-bold text-lg">
                      {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(Number(delivery.price))}
                    </span>
                    {delivery.courier && (
                       <span className="text-gray-600">Courier: {delivery.courier.name}</span>
                    )}
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </DashboardLayout>
  );
}
