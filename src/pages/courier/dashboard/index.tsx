import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { api } from '../../../lib/api';
import { DashboardLayout } from '../../../components/layout/dashboard-layout';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { Badge } from '../../../components/ui/badge';
import { Button } from '../../../components/ui/button';
import { format } from 'date-fns';
import toast from 'react-hot-toast';

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

export default function CourierDashboard() {
  const [availableDeliveries, setAvailableDeliveries] = useState<Delivery[]>([]);
  const [activeDeliveries, setActiveDeliveries] = useState<Delivery[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchAllDeliveries();
  }, []);

  const fetchAllDeliveries = async () => {
    setLoading(true);
    try {
      const [availableRes, activeRes] = await Promise.all([
        api.get('/deliveries/available'),
        api.get('/deliveries/active')
      ]);
      setAvailableDeliveries(availableRes.data);
      setActiveDeliveries(activeRes.data);
    } catch (error) {
      console.error(error);
      toast.error("Erro ao carregar entregas.");
    } finally {
      setLoading(false);
    }
  };

  const handleAction = async (id: string, action: 'pickup' | 'complete' | 'cancel' | 'accept') => {
      try {
          await api.post(`/deliveries/${id}/${action}`);
          toast.success('Status atualizado!');
          
          if (action === 'accept') {
             navigate(`/courier/deliveries/${id}`);
             return;
          }
          
          fetchAllDeliveries();
      } catch (error: any) {
          console.error(error);
          if (action === 'accept' && error.response?.status === 409) {
             toast.error('Esta entrega já foi aceita por outro entregador.');
             setAvailableDeliveries(prev => prev.filter(d => d.id !== id));
          } else {
             toast.error('Erro ao atualizar status.');
          }
      }
  };

  const DeliveryCard = ({ delivery }: { delivery: Delivery }) => (
    <Card className={`hover:shadow-md transition-shadow cursor-pointer ${delivery.status === 'AVAILABLE' ? 'border-l-4 border-l-green-500' : ''}`}>
      <Link to={`/courier/deliveries/${delivery.id}`}>
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
      </Link>
      
      {/* Actions */}
      <div className="px-6 pb-4 flex gap-2">
          {delivery.status === 'AVAILABLE' && (
              <Button size="sm" className="w-full" onClick={(e) => {
                  e.stopPropagation();
                  handleAction(delivery.id, 'accept');
              }}>
                  Aceitar
              </Button>
          )}
          {delivery.status === 'ACCEPTED' && (
              <>
                  <Button size="sm" className="w-full" onClick={(e) => {
                      e.stopPropagation();
                      handleAction(delivery.id, 'pickup');
                  }}>
                      Retirar
                  </Button>
                  <Button size="sm" variant="destructive" className="w-full" onClick={(e) => {
                      e.stopPropagation();
                      handleAction(delivery.id, 'cancel');
                  }}>
                      Cancelar
                  </Button>
              </>
          )}
           {delivery.status === 'PICKED_UP' && (
               <Button size="sm" className="w-full bg-green-600 hover:bg-green-700" onClick={(e) => {
                      e.stopPropagation();
                      handleAction(delivery.id, 'complete');
                  }}>
                      Concluir Entrega
                  </Button>
           )}
      </div>
    </Card>
  );

  return (
    <DashboardLayout>

      {loading ? (
        <div>Carregando...</div>
      ) : (
        <div className="space-y-8">
            {/* Active Deliveries Section */}
            {activeDeliveries.length > 0 && (
                <section>
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold mb-4">Minhas Entregas</h2>
                    <Button variant="outline" onClick={fetchAllDeliveries}>Atualizar</Button>
                  </div>
                    <div className="grid gap-4">
                        {activeDeliveries.map((delivery) => (
                            <DeliveryCard key={delivery.id} delivery={delivery} />
                        ))}
                    </div>
                </section>
            )}

            {/* Available Deliveries Section */}
            <section>
                <div className="flex justify-between items-center mb-4">
                     <h2 className="text-xl font-semibold">Entregas Disponíveis</h2>
                     {availableDeliveries.length === 0 && <span className="text-gray-500 text-sm">Nenhuma no momento</span>}
                </div>
                {availableDeliveries.length > 0 ? (
                    <div className="grid gap-4">
                        {availableDeliveries.map((delivery) => (
                            <DeliveryCard key={delivery.id} delivery={delivery} />
                        ))}
                    </div>
                ) : (
                    activeDeliveries.length === 0 && (
                        <div className="text-center py-12 text-gray-500 border rounded-lg bg-gray-50">
                            Nenhuma entrega disponível e nenhuma ativa.
                        </div>
                    )
                )}
            </section>
        </div>
      )}
    </DashboardLayout>
  );
}
