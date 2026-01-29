import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate, Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { Button } from '../../components/ui/button';
import { Label } from '../../components/ui/label';
import { toast } from 'react-hot-toast';
import { Store, ArrowRight } from 'lucide-react';
import api from '../../lib/api';

const loginSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(1, 'Senha é obrigatória'),
});

type LoginForm = z.infer<typeof loginSchema>;

export default function Login() {
  const { login: setAuth } = useAuth();
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginForm) => {
    try {
      const res = await api.post('/auth/login', data);
      const { token, user } = res.data;
      
      setAuth(token, user);
      
      toast.success('Login bem sucedido!');
      
      if (user.role === 'ROOT' || user.role === 'ADMIN') navigate('/admin');
      else if (user.role === 'OWNER') navigate('/dashboard');
      else navigate('/');
      
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Credenciais inválidas ou erro no servidor.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-slate-50">
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-blue-100/40 via-transparent to-transparent pointer-events-none" />
      
      <Card className="w-full max-w-md shadow-xl border-white/50 backdrop-blur-sm z-10 overflow-hidden">
        <div className="h-2 bg-primary w-full" />
        <CardHeader className="space-y-1 pt-8">
          <div className="flex justify-center mb-6">
            <div className="bg-primary/10 p-4 rounded-3xl">
              <div className="bg-primary p-3 rounded-2xl text-white shadow-lg">
                <Store className="w-8 h-8" />
              </div>
            </div>
          </div>
          <CardTitle className="text-3xl font-bold text-center tracking-tight text-slate-900">Compre Aqui</CardTitle>
          <p className="text-center text-muted-foreground text-sm">Entre para acessar as melhores ofertas locais.</p>
        </CardHeader>
        <CardContent className="pb-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-semibold text-slate-700">Email</Label>
              <Input 
                id="email" 
                type="email" 
                {...register('email')} 
                placeholder="seu@email.com" 
                className="h-12 bg-white border-slate-200 focus:ring-primary/20 transition-all shadow-sm"
              />
              {errors.email && <span className="text-destructive text-xs font-medium">{errors.email.message}</span>}
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-sm font-semibold text-slate-700">Senha</Label>
                <button type="button" className="text-xs text-primary hover:underline font-medium">Esqueceu a senha?</button>
              </div>
              <Input 
                id="password" 
                type="password" 
                {...register('password')} 
                className="h-12 bg-white border-slate-200 focus:ring-primary/20 transition-all shadow-sm"
              />
              {errors.password && <span className="text-destructive text-xs font-medium">{errors.password.message}</span>}
            </div>
            <Button type="submit" className="w-full shadow-lg font-bold h-12 text-base group" disabled={isSubmitting}>
              {isSubmitting ? 'Verificando...' : (
                <span className="flex items-center gap-2">
                  Entrar na Plataforma <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              )}
            </Button>
            
            <div className="text-center pt-2">
              <p className="text-sm text-slate-600">
                Não tem uma conta?{' '}
                <Link to="/register" className="text-primary font-bold hover:underline">
                  Cadastre-se grátis
                </Link>
              </p>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
