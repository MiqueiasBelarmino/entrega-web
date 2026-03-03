import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { api } from '../../../lib/api';
import toast from 'react-hot-toast';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../components/ui/card';
import { Label } from '../../../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../components/ui/select';
import { PatternFormat } from 'react-number-format';
import { ArrowLeft } from 'lucide-react';
import { Checkbox } from '../../../components/ui/checkbox';

export default function SignupMerchant() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<{ id: string; name: string }[]>([]);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [businessPhone, setBusinessPhone] = useState('');
  const [address, setAddress] = useState('');

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const { data } = await api.get('/categories');
      setCategories(data);
    } catch (err) {
      console.error('Error fetching categories:', err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (!name || !phone || !businessName || !categoryId) {
        toast.error('Preencha todos os campos obrigatórios.');
        setLoading(false);
        return;
      }

      if (!acceptedTerms) {
        toast.error('Você precisa aceitar os Termos de Uso para continuar.');
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
        businessName,
        categoryId,
        businessPhone: businessPhone ? `+55${businessPhone.replace(/\D/g, '')}` : undefined,
        address: address || undefined,
      };

      await api.post('/auth/register/merchant', payload);
      
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
          <CardTitle className="text-2xl">Cadastro de Lojista</CardTitle>
          <CardDescription>
            Crie sua conta para começar a enviar pedidos através do Entrega Hub.
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
                <p className="text-xs text-muted-foreground">O código de acesso será enviado para este número.</p>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-sm font-medium text-muted-foreground border-b pb-2">Dados do Estabelecimento</h3>
              
              <div className="space-y-2">
                <Label htmlFor="businessName">Nome do Estabelecimento *</Label>
                <Input
                  id="businessName"
                  required
                  placeholder="Nome da sua loja"
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  disabled={loading}
                />
              </div>

              <div className="space-y-2">
                <Label>Categoria *</Label>
                <Select value={categoryId} onValueChange={setCategoryId} required disabled={loading}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o segmento" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat.id} value={cat.id}>
                        {cat.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="businessPhone">Telefone Fixo da Loja (Opcional)</Label>
                <PatternFormat
                  customInput={Input}
                  format="(##) ####-####"
                  mask="_"
                  placeholder="(11) 3333-3333"
                  value={businessPhone}
                  onValueChange={(values) => setBusinessPhone(values.value)}
                  disabled={loading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Endereço (Opcional)</Label>
                <Input
                  id="address"
                  placeholder="Rua, Número, Bairro"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  disabled={loading}
                />
              </div>
            </div>

            <div className="flex items-start gap-3 pt-2">
              <Checkbox
                id="acceptedTerms"
                checked={acceptedTerms}
                onCheckedChange={(v) => setAcceptedTerms(!!v)}
                disabled={loading}
              />
              <Label htmlFor="acceptedTerms" className="text-sm text-muted-foreground leading-snug cursor-pointer">
                Li e aceito os{' '}
                <Link to="/terms" target="_blank" className="text-orange-600 hover:underline font-medium">
                  Termos de Uso
                </Link>{' '}e a{' '}
                <Link to="/privacy" target="_blank" className="text-orange-600 hover:underline font-medium">
                  Política de Privacidade
                </Link>{' '}da plataforma.
              </Label>
            </div>

            <Button type="submit" className="w-full" size="lg" disabled={loading || !acceptedTerms}>
              {loading ? 'Cadastrando...' : 'Criar minha conta'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
