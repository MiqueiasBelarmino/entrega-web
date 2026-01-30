import { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { NumericFormat } from 'react-number-format';
import { useNavigate } from 'react-router-dom';
import { api } from '../../../lib/api';
import { useAuth } from '../../../contexts/auth-context';
import { DashboardLayout } from '../../../components/layout/dashboard-layout';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { Textarea } from '../../../components/ui/textarea';
import { Label } from '../../../components/ui/label';
import { Card, CardContent } from '../../../components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../components/ui/select';
import toast from 'react-hot-toast';
import { ArrowLeft } from 'lucide-react';

const deliverySchema = z.object({
  businessId: z.string().min(1, 'Selecione um estabelecimento'),
  pickupAddress: z.string().min(5, 'Endereço muito curto'),
  dropoffAddress: z.string().min(5, 'Endereço muito curto'),
  price: z.number().min(0.01, 'Valor inválido'),
  notes: z.string().optional(),
});

type DeliveryForm = z.infer<typeof deliverySchema>;

export default function NewDelivery() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  
  const { control, register, handleSubmit, setValue, formState: { errors } } = useForm<DeliveryForm>({
    resolver: zodResolver(deliverySchema),
    defaultValues: {
        pickupAddress: '', // Could pre-fill with business address if available
    }
  });

  // Pre-select first business if available
  useEffect(() => {
    if (user?.businesses && user.businesses.length > 0) {
      setValue('businessId', user.businesses[0].id);
      // Optional: pre-fill pickup address from business address if we had it in the context
    }
  }, [user, setValue]);

  const onSubmit = async (data: DeliveryForm) => {
    setLoading(true);
    try {
      if (!user?.businesses?.length) {
          toast.error("Você não possui estabelecimentos cadastrados.");
          return;
      }
      
      await api.post('/deliveries', {
        ...data,
        price: Number(data.price),
      });

      toast.success('Entrega criada com sucesso!');
      navigate('/merchant');
    } catch (error) {
      toast.error('Erro ao criar entrega.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <Button variant="ghost" className="mb-4 pl-0 hover:bg-transparent" onClick={() => navigate(-1)}>
            <ArrowLeft className="mr-2 h-4 w-4" /> Voltar
        </Button>
       <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Nova Entrega</h1>
        
        <Card>
            <CardContent className="pt-6">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    
                    <div className="space-y-2">
                        <Label>Estabelecimento</Label>
                        {user?.businesses && user.businesses.length > 1 ? (
                             <Controller
                                control={control}
                                name="businessId"
                                render={({ field }) => (
                                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Selecione..." />
                                    </SelectTrigger>
                                    <SelectContent>
                                      {user.businesses?.map(b => (
                                          <SelectItem key={b.id} value={b.id}>{b.name}</SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                )}
                              />
                        ) : (
                            <Input 
                                value={user?.businesses?.[0]?.name || 'Carregando...'} 
                                disabled 
                            />
                        )}
                         <input type="hidden" {...register('businessId')} />
                         {errors.businessId && <p className="text-sm text-red-500">{errors.businessId.message}</p>}
                    </div>

                    <div className="space-y-2">
                        <Label>Endereço de Retirada</Label>
                        <Input {...register('pickupAddress')} placeholder="Rua A, 123" />
                        {errors.pickupAddress && <p className="text-sm text-red-500">{errors.pickupAddress.message}</p>}
                    </div>

                    <div className="space-y-2">
                        <Label>Endereço de Entrega</Label>
                        <Input {...register('dropoffAddress')} placeholder="Av. B, 500" />
                        {errors.dropoffAddress && <p className="text-sm text-red-500">{errors.dropoffAddress.message}</p>}
                    </div>

                    <div className="space-y-2">
                        <Label>Valor da Entrega (R$)</Label>
                        <Controller
                            control={control}
                            name="price"
                            render={({ field: { onChange, value } }) => (
                                <NumericFormat
                                    value={value}
                                    onValueChange={(values) => {
                                        onChange(values.floatValue);
                                    }}
                                    customInput={Input}
                                    prefix="R$ "
                                    decimalSeparator=","
                                    thousandSeparator="."
                                    placeholder="R$ 0,00"
                                />
                            )}
                        />
                        {errors.price && <p className="text-sm text-red-500">{errors.price.message}</p>}
                    </div>

                    <div className="space-y-2">
                        <Label>Observações</Label>
                        <Textarea {...register('notes')} placeholder="Detalhes do pedido, ponto de referência..." />
                    </div>

                    <Button type="submit" className="w-full" disabled={loading}>
                        {loading ? 'Criando...' : 'Solicitar Entregador'}
                    </Button>
                </form>
            </CardContent>
        </Card>
       </div>
    </DashboardLayout>
  );
}
