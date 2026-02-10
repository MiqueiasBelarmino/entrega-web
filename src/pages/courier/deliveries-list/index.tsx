import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { api } from '../../../lib/api';
import { DashboardLayout } from '../../../components/layout/dashboard-layout';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { Badge } from '../../../components/ui/badge';
import { Button } from '../../../components/ui/button';
import { ArrowLeft } from 'lucide-react';
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
  ISSUE: 'Problema Reportado',
};

const statusColor: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
  AVAILABLE: 'secondary',
  ACCEPTED: 'default',
  PICKED_UP: 'default',
  COMPLETED: 'outline',
  CANCELED: 'destructive',
  ISSUE: 'destructive',
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

  const handleAction = async (id: string, action: 'pickup' | 'complete' | 'cancel' | 'accept') => {
      try {
          await api.post(`/deliveries/${id}/${action}`);
          toast.success('Status atualizado!');
          
          if (action === 'accept') {
             navigate(`/courier/deliveries/${id}`);
             return;
          }
          
          fetchDeliveries();
      } catch (error: any) {
          console.error(error);
          if (action === 'accept' && error.response?.status === 409) {
             toast.error('Esta entrega já foi aceita por outro entregador.');
             setDeliveries(prev => prev.filter(d => d.id !== id));
          } else {
             toast.error('Erro ao atualizar status.');
          }
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
            <div key={delivery.id}>
              <Card className="hover:shadow-md transition-shadow">
                <Link to={`/courier/deliveries/${delivery.id}`}>
                 <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 cursor-pointer">
                  <CardTitle className="text-sm font-medium">
                    {delivery.business.name}
                  </CardTitle>
                   <Badge variant={statusColor[delivery.status] as any}>
                    {statusMap[delivery.status]}
                  </Badge>
                </CardHeader>
                <CardContent className="cursor-pointer">
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
                {(delivery.status === 'ACCEPTED' || delivery.status === 'PICKED_UP' || delivery.status === 'AVAILABLE') && (
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
                )}
              </Card>
            </div>
          ))}
        </div>
      )}
    </DashboardLayout>
  );
}
