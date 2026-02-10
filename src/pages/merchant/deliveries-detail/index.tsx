import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { api } from '../../../lib/api';
import { DashboardLayout } from '../../../components/layout/dashboard-layout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../../components/ui/card';
import { Badge } from '../../../components/ui/badge';
import { Button } from '../../../components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { statusMap } from '@/lib/utils';

interface Delivery {
  id: string;
  status: string;
  price: number;
  pickupAddress: string;
  dropoffAddress: string;
  notes?: string;
  courier?: {
    name: string;
    phoneE164: string;
  };
}

export default function MerchantDeliveryDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [delivery, setDelivery] = useState<Delivery | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) fetchDelivery(id);
  }, [id]);

  const fetchDelivery = async (deliveryId: string) => {
    try {
      const response = await api.get(`/deliveries/${deliveryId}`);
      setDelivery(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <DashboardLayout>Loading...</DashboardLayout>;
  if (!delivery) return <DashboardLayout>Delivery not found</DashboardLayout>;

  return (
    <DashboardLayout>
        <Button variant="ghost" className="mb-4 pl-0 hover:bg-transparent" onClick={() => navigate(-1)}>
            <ArrowLeft className="mr-2 h-4 w-4" /> Voltar
        </Button>

        <Card>
            <CardHeader>
                <div className="flex justify-between">
                    <div>
                        <CardTitle>Entrega #{delivery.id.slice(0,8)}</CardTitle>
                        <CardDescription>Status atual</CardDescription>
                    </div>
                    <Badge className="text-lg h-min">{statusMap[delivery.status]}</Badge>
                </div>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                    <div className="p-4 bg-gray-50 rounded">
                        <h3 className="font-semibold mb-2">Retirada</h3>
                        <p>{delivery.pickupAddress}</p>
                    </div>
                     <div className="p-4 bg-gray-50 rounded">
                        <h3 className="font-semibold mb-2">Entrega</h3>
                        <p>{delivery.dropoffAddress}</p>
                    </div>
                </div>

                <div>
                    <h3 className="font-semibold">Valor</h3>
                    <p className="text-2xl font-bold">R$ {Number(delivery.price).toFixed(2)}</p>
                </div>

                {delivery.notes && (
                    <div>
                        <h3 className="font-semibold">Observações</h3>
                        <p className="text-gray-600">{delivery.notes}</p>
                    </div>
                )}

                 {delivery.courier && (
                    <div className="border-t pt-4">
                        <h3 className="font-semibold mb-2">Entregador</h3>
                        <p className="text-lg">{delivery.courier.name}</p>
                        <p className="text-gray-500">{delivery.courier.phoneE164}</p>
                    </div>
                )}
            </CardContent>
        </Card>
    </DashboardLayout>
  );
}
