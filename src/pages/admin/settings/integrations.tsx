import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../../lib/api';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Label } from '../../../components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import toast from 'react-hot-toast';
import { useAuth } from  '@/contexts/auth-context';

export default function IntegrationsSettings() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [smsProvider, setSmsProvider] = useState<string>('TWILIO');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.isRoot) {
        navigate('/admin'); 
        return;
    }
    fetchConfig();
  }, [user]);

  const fetchConfig = async () => {
    try {
      const response = await api.get('/system/config');
      const providerConfig = response.data.find((c: any) => c.key === 'SMS_PROVIDER');
      if (providerConfig) {
        setSmsProvider(providerConfig.value);
      }
    } catch (error) {
      console.error(error);
      toast.error('Failed to load settings');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      await api.put('/system/config', {
        key: 'SMS_PROVIDER',
        value: smsProvider
      });
      toast.success('Settings saved successfully');
    } catch (error) {
      console.error(error);
      toast.error('Failed to save settings');
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader>
          <CardTitle>SMS Provider</CardTitle>
          <CardDescription>Select the active provider for sending SMS notifications (OTP, Updates).</CardDescription>
        </CardHeader>
        <CardContent>
          <RadioGroup value={smsProvider} onValueChange={setSmsProvider}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="TWILIO" id="twilio" />
              <Label htmlFor="twilio">Twilio</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="MOCEAN" id="mocean" />
              <Label htmlFor="mocean">MoceanAPI</Label>
            </div>
          </RadioGroup>
        </CardContent>
        <CardFooter>
          <Button onClick={handleSave}>Save Changes</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
