import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { api } from '../../../lib/api';
import { DashboardLayout } from '../../../components/layout/dashboard-layout';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { Badge } from '../../../components/ui/badge';
import { Button } from '../../../components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { format } from 'date-fns';

interface Delivery {
  id: string;
  status: string;
  price: number;
  pickupAddress: string;
  dropoffAddress: string;
  createdAt: string;
  business: {
    name: string;
  };
}

const statusMap: Record<string, string> = {
  AVAILABLE: 'Disponível',
  ACCEPTED: 'Aceita',
  PICKED_UP: 'Em Trânsito',
  COMPLETED: 'Concluída',
  CANCELED: 'Cancelada',
};

const statusColor: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
  AVAILABLE: 'secondary',
  ACCEPTED: 'default',
  PICKED_UP: 'default',
  COMPLETED: 'outline',
  CANCELED: 'destructive',
};

export default function CourierMyDeliveries() {
  const [deliveries, setDeliveries] = useState<Delivery[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchDeliveries();
  }, []);

  const fetchDeliveries = async () => {
    try {
      const response = await api.get('/deliveries/active');
      setDeliveries(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="flex items-center gap-4 mb-6">
        <Button variant="ghost" size="icon" onClick={() => navigate('/courier')}>
            <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-2xl font-bold">Minhas Entregas</h1>
      </div>

      {loading ? (
        <div>Carregando...</div>
      ) : deliveries.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          Você ainda não aceitou nenhuma entrega.
        </div>
      ) : (
        <div className="grid gap-4">
          {deliveries.map((delivery) => (
            <Link key={delivery.id} to={`/courier/deliveries/${delivery.id}`}>
              <Card className="hover:shadow-md transition-shadow cursor-pointer">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    {delivery.business.name}
                  </CardTitle>
                   <Badge variant={statusColor[delivery.status] as any}>
                    {statusMap[delivery.status]}
                  </Badge>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-1 text-sm mt-2">
                    <p><strong>De:</strong> {delivery.pickupAddress}</p>
                    <p><strong>Para:</strong> {delivery.dropoffAddress}</p>
                    <div className="flex justify-between items-center mt-2">
                        <span className="font-bold">R$ {Number(delivery.price).toFixed(2)}</span>
                        <span className="text-xs text-gray-400">{format(new Date(delivery.createdAt), 'dd/MM/yyyy HH:mm')}</span>
                    </div>
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
