import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../../../lib/api';
import { DashboardLayout } from '../../../components/layout/dashboard-layout';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { Badge } from '../../../components/ui/badge';
import { Button } from '../../../components/ui/button';
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

export default function CourierDashboard() {
  const [deliveries, setDeliveries] = useState<Delivery[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDeliveries();
  }, []);

  const fetchDeliveries = async () => {
    try {
      const response = await api.get('/deliveries/available');
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
        <h1 className="text-2xl font-bold">Entregas Disponíveis</h1>
        <Link to="/courier/my-deliveries">
            <Button variant="outline">Minhas Entregas</Button>
        </Link>
      </div>

      {loading ? (
        <div>Carregando...</div>
      ) : deliveries.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          Nenhuma entrega disponível no momento.
        </div>
      ) : (
        <div className="grid gap-4">
          {deliveries.map((delivery) => (
            <Link key={delivery.id} to={`/courier/deliveries/${delivery.id}`}>
              <Card className="hover:shadow-md transition-shadow cursor-pointer border-l-4 border-l-green-500">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    {delivery.business.name}
                  </CardTitle>
                  <Badge variant="secondary">
                     R$ {Number(delivery.price).toFixed(2)}
                  </Badge>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-1 text-sm mt-2">
                    <p><strong>De:</strong> {delivery.pickupAddress}</p>
                    <p><strong>Para:</strong> {delivery.dropoffAddress}</p>
                    <p className="text-xs text-gray-400 mt-2">Requested {format(new Date(delivery.createdAt), 'HH:mm')}</p>
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
