import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { PatternFormat } from 'react-number-format';
import { useNavigate } from 'react-router-dom';
import { api } from '../../../lib/api';
import toast from 'react-hot-toast';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../components/ui/card';
import { Label } from '../../../components/ui/label';

const loginSchema = z.object({
  phone: z.string().min(11, 'Telefone inválido'), // +55 11 99999-9999
  channel: z.enum(['SMS', 'WHATSAPP']),
});

type LoginForm = z.infer<typeof loginSchema>;

export default function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  
  const { control, handleSubmit, formState: { errors } } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      phone: '',
      channel: 'SMS',
    }
  });

  const onSubmit = async (data: LoginForm) => {
    setLoading(true);
    try {
      // Remover formatação para enviar limpo ou manter se o back aceita
      // O back normaliza, então enviar formatado é OK se tiver +55
      // Mas o react-number-format com 'format' retorna formatado.
      // Vou assumir que o usuário digita o número e o componente formata.
      // O valor no state vai estar formatado.
      
      const phoneClean = data.phone.replace(/\D/g, ''); 
      // Se mandar só numeros para o back, ele precisa tratar. 
      // O back espera "+55..." ou limpo? Revendo auth-start.dto:
      // "aceita formatado; normalizamos"
      // Então mandar "+55..." é seguro.
      
      await api.post('/auth/start', {
        phone: `+${phoneClean}`, // Garante formato E.164 básico sem espaços
        channel: data.channel,
      });

      toast.success('Código enviado!');
      navigate('/verify', { state: { phone: `+${phoneClean}` } });
    } catch (error) {
      toast.error('Erro ao enviar código. Verifique o número.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Entrega Certa</CardTitle>
          <CardDescription>Entre com seu telefone para continuar</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            
            <div className="space-y-2">
              <Label>Telefone</Label>
              <Controller
                name="phone"
                control={control}
                render={({ field: { onChange, value, onBlur } }) => (
                  <PatternFormat
                    format="## #####-####"
                    mask="_"
                    customInput={Input}
                    placeholder="18 99999-9999"
                    value={value}
                    onValueChange={(values) => {
                      onChange(values.formattedValue);
                    }}
                    onBlur={onBlur}
                  />
                )}
              />
              {errors.phone && <p className="text-sm text-red-500">{errors.phone.message}</p>}
            </div>

            <div className="space-y-2">
              <Label>Receber código via</Label>
              <Controller
                control={control}
                name="channel"
                render={({ field }) => (
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o canal" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="SMS">SMS</SelectItem>
                      <SelectItem value="WHATSAPP">WhatsApp</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Enviando...' : 'Enviar Código'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
