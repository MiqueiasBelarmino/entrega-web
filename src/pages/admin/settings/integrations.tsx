import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../../lib/api';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Label } from '../../../components/ui/label';
import { Input } from '../../../components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../components/ui/select';
import toast from 'react-hot-toast';
import { useAuth } from  '@/contexts/auth-context';

interface NotificationProvider {
  id: string;
  name: string;
  providerKey: string;
  status: 'ACTIVE' | 'DISABLED' | 'BLOCKED';
  priority: number;
  maxRetries: number;
  retryDelayMs: number;
  timeoutMs: number;
}

export default function IntegrationsSettings() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [providers, setProviders] = useState<NotificationProvider[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.isRoot) {
        navigate('/admin'); 
        return;
    }
    fetchProviders();
  }, [user]);

  const fetchProviders = async () => {
    try {
      const response = await api.get('/system/providers');
      setProviders(response.data);
    } catch (error) {
      console.error(error);
      toast.error('Failed to load providers');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (id: string, field: keyof NotificationProvider, value: string | number) => {
    // Optimistic update locally
    setProviders((prev) => 
      prev.map((p) => (p.id === id ? { ...p, [field]: value } : p))
    );
  };

  const handleSave = async (provider: NotificationProvider) => {
    try {
      await api.put(`/system/providers/${provider.id}`, {
        status: provider.status,
        priority: Number(provider.priority),
        maxRetries: Number(provider.maxRetries),
        retryDelayMs: Number(provider.retryDelayMs),
        timeoutMs: Number(provider.timeoutMs),
      });
      toast.success(`${provider.name} saved successfully`);
    } catch (error) {
      console.error(error);
      toast.error(`Failed to save ${provider.name}`);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="grid gap-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">WhatsApp Providers</h2>
        <p className="text-muted-foreground">
          Manage WhatsApp notification providers, fallbacks, and priorities.
        </p>
      </div>

      {providers.length === 0 && (
        <Card>
          <CardContent className="pt-6">
            <p>No providers configured.</p>
          </CardContent>
        </Card>
      )}

      {providers.map((provider) => (
        <Card key={provider.id}>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>{provider.name}</CardTitle>
                <CardDescription>Key: {provider.providerKey}</CardDescription>
              </div>
              <div className="w-32">
                <Select 
                  value={provider.status} 
                  onValueChange={(val) => handleUpdate(provider.id, 'status', val)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ACTIVE">Active</SelectItem>
                    <SelectItem value="DISABLED">Disabled</SelectItem>
                    <SelectItem value="BLOCKED">Blocked</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <Label>Priority (Lower = First)</Label>
                <Input 
                  type="number" 
                  value={provider.priority} 
                  onChange={(e) => handleUpdate(provider.id, 'priority', parseInt(e.target.value) || 0)} 
                />
              </div>
              <div className="space-y-2">
                <Label>Max Retries</Label>
                <Input 
                  type="number" 
                  value={provider.maxRetries} 
                  onChange={(e) => handleUpdate(provider.id, 'maxRetries', parseInt(e.target.value) || 0)} 
                />
              </div>
              <div className="space-y-2">
                <Label>Retry Delay (ms)</Label>
                <Input 
                  type="number" 
                  value={provider.retryDelayMs} 
                  onChange={(e) => handleUpdate(provider.id, 'retryDelayMs', parseInt(e.target.value) || 0)} 
                />
              </div>
              <div className="space-y-2">
                <Label>Timeout (ms)</Label>
                <Input 
                  type="number" 
                  value={provider.timeoutMs} 
                  onChange={(e) => handleUpdate(provider.id, 'timeoutMs', parseInt(e.target.value) || 0)} 
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="justify-end bg-gray-50 dark:bg-zinc-900 border-t items-center py-3">
            <Button onClick={() => handleSave(provider)} variant="default">
              Save configuration
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
