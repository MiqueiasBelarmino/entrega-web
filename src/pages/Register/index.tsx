import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useNavigate, Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { Button } from '../../components/ui/button';
import { Label } from '../../components/ui/label';
import { toast } from 'react-hot-toast';
import { User, Store, ArrowRight, Check } from 'lucide-react';
import api from '../../lib/api';
import { useState } from 'react';

const registerSchema = z.object({
  name: z.string().min(2, 'Nome muito curto'),
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'Senha deve ter no mínimo 6 caracteres'),
});

type RegisterForm = z.infer<typeof registerSchema>;

export default function Register() {
  const [role, setRole] = useState<'USER' | 'OWNER'>('USER');
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterForm) => {
    try {
      await api.post('/auth/register', { ...data, role });
      
      toast.success('Conta criada com sucesso!');
      
      // Wait a bit before navigating to ensure toast is displayed
      setTimeout(() => {
        navigate('/login');
      }, 1000);
      
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Erro ao criar conta.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-slate-50">
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-blue-100/40 via-transparent to-transparent pointer-events-none" />
      
      <Card className="w-full max-w-xl shadow-xl border-white/50 backdrop-blur-sm z-10 overflow-hidden">
        <div className="h-2 bg-primary w-full" />
        <CardHeader className="space-y-1 pt-8 text-center">
          <CardTitle className="text-3xl font-bold tracking-tight text-slate-900">Crie sua Conta</CardTitle>
          <p className="text-muted-foreground text-sm">Escolha como deseja usar o Compre Aqui.</p>
        </CardHeader>
        <CardContent className="pb-8">
          <div className="grid grid-cols-2 gap-4 mb-8">
            <button
              onClick={() => setRole('USER')}
              className={`p-4 rounded-2xl border-2 transition-all flex flex-col items-center gap-3 relative ${
                role === 'USER' ? 'border-primary bg-primary/5' : 'border-slate-100 bg-white hover:border-slate-200'
              }`}
            >
              {role === 'USER' && <div className="absolute top-2 right-2 text-primary"><Check className="w-5 h-5" /></div>}
              <div className={`p-3 rounded-xl ${role === 'USER' ? 'bg-primary text-white' : 'bg-slate-100 text-slate-500'}`}>
                <User className="w-6 h-6" />
              </div>
              <div className="text-center">
                <span className="font-bold block">Consumidor</span>
                <span className="text-xs text-slate-500">Quero ver ofertas</span>
              </div>
            </button>
            
            <button
              onClick={() => setRole('OWNER')}
              className={`p-4 rounded-2xl border-2 transition-all flex flex-col items-center gap-3 relative ${
                role === 'OWNER' ? 'border-primary bg-primary/5' : 'border-slate-100 bg-white hover:border-slate-200'
              }`}
            >
              {role === 'OWNER' && <div className="absolute top-2 right-2 text-primary"><Check className="w-5 h-5" /></div>}
              <div className={`p-3 rounded-xl ${role === 'OWNER' ? 'bg-primary text-white' : 'bg-slate-100 text-slate-500'}`}>
                <Store className="w-6 h-6" />
              </div>
              <div className="text-center">
                <span className="font-bold block">Lojista</span>
                <span className="text-xs text-slate-500">Quero vender</span>
              </div>
            </button>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nome Completo</Label>
              <Input id="name" {...register('name')} placeholder="Como devemos te chamar?" className="h-11 shadow-sm" />
              {errors.name && <span className="text-destructive text-xs">{errors.name.message}</span>}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" {...register('email')} placeholder="seu@email.com" className="h-11 shadow-sm" />
              {errors.email && <span className="text-destructive text-xs">{errors.email.message}</span>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>
              <Input id="password" type="password" {...register('password')} className="h-11 shadow-sm" />
              {errors.password && <span className="text-destructive text-xs">{errors.password.message}</span>}
            </div>

            <Button type="submit" className="w-full shadow-lg font-bold h-12 text-base group mt-4" disabled={isSubmitting}>
              {isSubmitting ? 'Criando conta...' : (
                <span className="flex items-center gap-2">
                  Criar minha conta <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              )}
            </Button>
            
            <div className="text-center pt-2">
              <p className="text-sm text-slate-600">
                Já tem uma conta?{' '}
                <Link to="/login" className="text-primary font-bold hover:underline">
                  Faça login
                </Link>
              </p>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
