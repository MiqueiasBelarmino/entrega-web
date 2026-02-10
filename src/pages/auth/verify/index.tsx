import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useLocation, useNavigate } from 'react-router-dom';
import { api } from '../../../lib/api';
import { useAuth } from '../../../contexts/auth-context';
import toast from 'react-hot-toast';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../components/ui/card';
import { Label } from '../../../components/ui/label';

const verifySchema = z.object({
  code: z.string().length(6, 'O código deve ter 6 dígitos'),
});

type VerifyForm = z.infer<typeof verifySchema>;

export default function Verify() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const phone = location.state?.phone;

  const { register, handleSubmit, formState: { errors } } = useForm<VerifyForm>({
    resolver: zodResolver(verifySchema),
  });

  useEffect(() => {
    if (!phone) {
      toast.error('Telefone não informado');
      navigate('/login');
    }
  }, [phone, navigate]);

  const onSubmit = async (data: VerifyForm) => {
    setLoading(true);
    try {
      const response = await api.post('/auth/verify', {
        phone,
        code: data.code,
      });

      const { accessToken } = response.data;
      await login(accessToken);
      
      toast.success('Login realizado com sucesso!');
      // App.tsx vai redirecionar baseado na role
    } catch (error) {
      toast.error('Código inválido ou expirado.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Verificação</CardTitle>
          <CardDescription>Digite o código enviado para {phone}</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            
            <div className="space-y-2">
              <Label>Código OTP</Label>
              <Input 
                {...register('code')} 
                placeholder="123456" 
                maxLength={6} 
                className="text-center text-lg tracking-widest"
              />
              {errors.code && <p className="text-sm text-red-500">{errors.code.message}</p>}
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Verificando...' : 'Entrar'}
            </Button>
            
            <Button 
                type="button" 
                variant="link" 
                className="w-full" 
                onClick={() => navigate('/login')}
            >
                Voltar
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
