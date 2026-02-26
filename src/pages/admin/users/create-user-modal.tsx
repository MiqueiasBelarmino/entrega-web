import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { UserRole } from './use-admin-users';
import { api } from '../../../lib/api';
import toast from 'react-hot-toast';

interface CreateUserModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
}

export function CreateUserModal({ open, onOpenChange, onSuccess }: CreateUserModalProps) {
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<{ id: string; name: string }[]>([]);
  
  const [role, setRole] = useState<UserRole>('MERCHANT');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');

  // Merchant extra fields
  const [businessName, setBusinessName] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [businessPhone, setBusinessPhone] = useState('');
  const [address, setAddress] = useState('');

  useEffect(() => {
    if (open) {
      fetchCategories();
    } else {
      resetForm();
    }
  }, [open]);

  const fetchCategories = async () => {
    try {
      const { data } = await api.get('/categories');
      setCategories(data);
    } catch (err) {
      console.error('Error fetching categories:', err);
    }
  };

  const resetForm = () => {
    setRole('MERCHANT');
    setName('');
    setPhone('');
    setEmail('');
    setBusinessName('');
    setCategoryId('');
    setBusinessPhone('');
    setAddress('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload: any = {
        name,
        phone,
        email: email || undefined,
        role,
      };

      if (role === 'MERCHANT') {
        if (!businessName || !categoryId) {
          toast.error('Preencha os campos obrigatórios da loja.');
          setLoading(false);
          return;
        }
        payload.businessName = businessName;
        payload.categoryId = categoryId;
        payload.businessPhone = businessPhone || undefined;
        payload.address = address || undefined;
      }

      await api.post('/users', payload);
      toast.success('Usuário criado com sucesso!');
      onSuccess();
      onOpenChange(false);
    } catch (err: any) {
      console.error(err);
      toast.error(err.response?.data?.message || 'Erro ao criar usuário');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Novo Usuário</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-muted-foreground border-b pb-2">Dados do Usuário</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Papel</Label>
                <Select value={role} onValueChange={(val) => setRole(val as UserRole)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="MERCHANT">Estabelecimento</SelectItem>
                    <SelectItem value="COURIER">Entregador</SelectItem>
                    <SelectItem value="ADMIN">Administrador</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Telefone (Login) *</Label>
                <Input
                  id="phone"
                  required
                  placeholder="Ex: 11999999999"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="name">Nome Completo *</Label>
              <Input
                id="name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">E-mail (Opcional)</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          {role === 'MERCHANT' && (
            <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2">
              <h3 className="text-sm font-medium text-muted-foreground border-b pb-2">Dados do Estabelecimento</h3>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="businessName">Nome do Estabelecimento *</Label>
                  <Input
                    id="businessName"
                    required={role === 'MERCHANT'}
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Categoria *</Label>
                  <Select value={categoryId} onValueChange={setCategoryId} required={role === 'MERCHANT'}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione" />
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
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="businessPhone">Telefone da Loja (Opcional)</Label>
                  <Input
                    id="businessPhone"
                    value={businessPhone}
                    onChange={(e) => setBusinessPhone(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Endereço Principal (Opcional)</Label>
                  <Input
                    id="address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>
              </div>

            </div>
          )}

          <div className="flex justify-end gap-2 pt-4 border-t">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? 'Salvando...' : 'Criar Usuário'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
