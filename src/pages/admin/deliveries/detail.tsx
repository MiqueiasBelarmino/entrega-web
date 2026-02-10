import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { api } from '../../../lib/api';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, MapPin, Calendar, DollarSign, User, Store } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { toast } from 'react-hot-toast';

export default function AdminDeliveryDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [delivery, setDelivery] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDelivery() {
      try {
        const response = await api.get(`/admin/deliveries/${id}`);
        setDelivery(response.data);
      } catch (error) {
        toast.error('Erro ao carregar detalhes da entrega');
        navigate('/admin/deliveries');
      } finally {
        setLoading(false);
      }
    }
    fetchDelivery();
  }, [id, navigate]);

  if (loading) return <div className="p-8">Carregando...</div>;
  if (!delivery) return null;

  return (
    <div className="space-y-6 animate-in fade-in">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate('/admin/deliveries')}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-2xl font-bold">Detalhes da Entrega #{delivery.id.slice(0, 8)}</h1>
        <Badge variant="outline" className="ml-auto">
          {delivery.status}
        </Badge>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5" /> Rota
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Retirada</p>
              <p>{delivery.pickupAddress}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Entrega</p>
              <p>{delivery.dropoffAddress}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
             <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5" /> Informações Financeiras
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
             <div>
              <p className="text-sm font-medium text-muted-foreground">Valor da Entrega</p>
              <p className="text-2xl font-bold">
                {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(delivery.price)}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
           <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Store className="h-5 w-5" /> Empresa
            </CardTitle>
          </CardHeader>
          <CardContent>
            {delivery.business ? (
              <div className="space-y-1">
                <p className="font-medium">{delivery.business.name}</p>
                 <p className="text-sm text-muted-foreground">ID: {delivery.business.id}</p>
              </div>
            ) : (
              <p className="text-muted-foreground">Não disponível</p>
            )}
            {delivery.merchant && (
               <div className="mt-4 pt-4 border-t">
                  <p className="text-sm font-medium text-muted-foreground">Solicitado por</p>
                  <p>{delivery.merchant.name}</p>
               </div>
            )}
          </CardContent>
        </Card>

        <Card>
           <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" /> Entregador
            </CardTitle>
          </CardHeader>
          <CardContent>
             {delivery.courier ? (
              <div className="space-y-1">
                <p className="font-medium">{delivery.courier.name}</p>
                <p className="text-sm text-muted-foreground">{delivery.courier.phoneE164}</p>
              </div>
            ) : (
              <p className="text-muted-foreground">Nenhum entregador atribuído</p>
            )}
          </CardContent>
        </Card>
      </div>

       <Card>
           <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" /> Histórico
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
             <div className="flex justify-between text-sm">
               <span className="text-muted-foreground">Criado em</span>
               <span>{format(new Date(delivery.createdAt), "dd/MM/yyyy HH:mm", { locale: ptBR })}</span>
             </div>
             {delivery.acceptedAt && (
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Aceito em</span>
                  <span>{format(new Date(delivery.acceptedAt), "dd/MM/yyyy HH:mm", { locale: ptBR })}</span>
                </div>
             )}
             {delivery.pickedUpAt && (
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Coletado em</span>
                  <span>{format(new Date(delivery.pickedUpAt), "dd/MM/yyyy HH:mm", { locale: ptBR })}</span>
                </div>
             )}
              {delivery.completedAt && (
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Entregue em</span>
                  <span>{format(new Date(delivery.completedAt), "dd/MM/yyyy HH:mm", { locale: ptBR })}</span>
                </div>
             )}
             {delivery.canceledAt && (
                <div className="flex justify-between text-sm text-red-600">
                  <span className="font-medium">Cancelado em</span>
                  <span>{format(new Date(delivery.canceledAt), "dd/MM/yyyy HH:mm", { locale: ptBR })}</span>
                </div>
             )}
          </CardContent>
        </Card>
    </div>
  );
}
