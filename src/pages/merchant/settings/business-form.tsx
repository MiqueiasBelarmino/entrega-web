import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { NumericFormat } from 'react-number-format';
import toast from 'react-hot-toast';
import { useState, useEffect } from 'react';
import { api } from '@/lib/api';

const businessSchema = z.object({
  name: z.string().min(2, 'Nome muito curto'),
  phone: z.string().optional(),
  address: z.string().optional(),
  defaultDeliveryPrice: z.number().optional(),
});

type BusinessForm = z.infer<typeof businessSchema>;

interface BusinessFormProps {
  business: any; // Ideally typed
  onUpdate: () => void;
}

export function BusinessForm({ business, onUpdate }: BusinessFormProps) {
  const [loading, setLoading] = useState(false);

  const { register, control, handleSubmit, reset, formState: { errors } } = useForm<BusinessForm>({
    resolver: zodResolver(businessSchema),
    defaultValues: {
      name: '',
      phone: '',
      address: '',
      defaultDeliveryPrice: 0,
    },
  });

  useEffect(() => {
    if (business) {
      reset({
        name: business.name,
        phone: business.phone || '',
        address: business.address || '',
        defaultDeliveryPrice: Number(business.defaultDeliveryPrice) || 0,
      });
    }
  }, [business, reset]);

  const onSubmit = async (data: BusinessForm) => {
    setLoading(true);
    try {
      await api.patch(`/business/${business.id}`, data);
      toast.success('Estabelecimento atualizado com sucesso!');
      onUpdate();
    } catch (error) {
      console.error(error);
      toast.error('Erro ao atualizar estabelecimento.');
    } finally {
      setLoading(false);
    }
  };

  if (!business) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Dados do Estabelecimento</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="business-name">Nome do Estabelecimento</Label>
            <Input id="business-name" {...register('name')} />
            {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="business-phone">Telefone</Label>
            <Input id="business-phone" {...register('phone')} />
             {/* Add Mask if needed */}
          </div>

          <div className="space-y-2">
            <Label htmlFor="business-address">Endereço Padrão</Label>
            <Input id="business-address" {...register('address')} placeholder="Endereço completo para retirada" />
            <p className="text-xs text-muted-foreground">Será usado como endereço de retirada padrão.</p>
          </div>

           <div className="space-y-2">
            <Label>Valor Padrão da Entrega</Label>
            <Controller
                control={control}
                name="defaultDeliveryPrice"
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
             <p className="text-xs text-muted-foreground">Preencherá automaticamente o valor da entrega.</p>
          </div>

          <Button type="submit" disabled={loading}>
            {loading ? 'Salvando...' : 'Salvar Estabelecimento'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
