import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../../lib/api';
import toast from 'react-hot-toast';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../components/ui/card';
import { Label } from '../../../components/ui/label';
import { PatternFormat } from 'react-number-format';
import { ArrowLeft } from 'lucide-react';

export default function SignupCourier() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [cpf, setCpf] = useState('');
  const [cnh, setCnh] = useState('');
  const [vehiclePlate, setVehiclePlate] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (!name || !phone) {
        toast.error('Preencha os campos obrigatórios.');
        setLoading(false);
        return;
      }

      const phoneClean = phone.replace(/\D/g, ''); 
      if (phoneClean.length < 10) {
        toast.error('Telefone inválido');
        setLoading(false);
        return;
      }

      const payload = {
        name,
        phone: `+55${phoneClean}`,
        cpf: cpf.replace(/\D/g, '') || undefined,
        cnh: cnh.replace(/\D/g, '') || undefined,
        vehiclePlate: vehiclePlate || undefined,
      };

      await api.post('/auth/register/courier', payload);
      
      toast.success('Cadastro realizado! O código de acesso foi enviado para seu celular.');
      navigate('/verify', { state: { phone: `+55${phoneClean}` } });
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Erro ao realizar cadastro.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4 py-8">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <button 
            type="button"
            onClick={() => navigate(-1)} 
            className="flex items-center gap-2 mb-2 text-muted-foreground hover:text-foreground transition-colors w-fit text-sm font-medium"
          >
            <ArrowLeft className="h-4 w-4" /> Voltar
          </button>
          <CardTitle className="text-2xl">Cadastro de Entregador</CardTitle>
          <CardDescription>
            Crie sua conta e aguarde a aprovação para começar a fazer entregas no Entrega Hub.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-muted-foreground border-b pb-2">Seus Dados</h3>
              
              <div className="space-y-2">
                <Label htmlFor="name">Nome Completo *</Label>
                <Input
                  id="name"
                  required
                  placeholder="Seu nome"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled={loading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Celular (WhatsApp) *</Label>
                <PatternFormat
                  customInput={Input}
                  format="(##) #####-####"
                  mask="_"
                  placeholder="(11) 99999-9999"
                  value={phone}
                  onValueChange={(values) => setPhone(values.value)}
                  required
                  disabled={loading}
                />
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-sm font-medium text-muted-foreground border-b pb-2 flex justify-between items-center">
                <span>Segurança e Identificação</span>
                <span className="text-xs bg-slate-100 px-2 py-0.5 rounded-full text-slate-500 font-normal">Opcional por enquanto</span>
              </h3>

              <div className="space-y-2">
                <Label htmlFor="cpf">CPF</Label>
                <PatternFormat
                  customInput={Input}
                  format="###.###.###-##"
                  mask="_"
                  placeholder="000.000.000-00"
                  value={cpf}
                  onValueChange={(values) => setCpf(values.value)}
                  disabled={loading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="cnh">CNH</Label>
                <Input
                  id="cnh"
                  placeholder="Número de Registro"
                  value={cnh}
                  onChange={(e) => setCnh(e.target.value)}
                  disabled={loading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="vehiclePlate">Placa do Veículo (Se aplicável)</Label>
                <Input
                  id="vehiclePlate"
                  placeholder="ABC-1234"
                  value={vehiclePlate}
                  onChange={(e) => setVehiclePlate(e.target.value)}
                  disabled={loading}
                  className="uppercase"
                  maxLength={8}
                />
              </div>
            </div>

            <Button type="submit" className="w-full" size="lg" disabled={loading}>
              {loading ? 'Solicitando...' : 'Concluir Cadastro'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
