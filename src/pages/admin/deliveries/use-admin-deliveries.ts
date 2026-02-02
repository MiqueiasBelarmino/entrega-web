import { useState, useEffect, useCallback } from 'react';
import { api } from '../../../lib/api';
import { toast } from 'react-hot-toast';

export interface AdminDelivery {
  id: string;
  status: string;
  price: number;
  pickupAddress: string;
  dropoffAddress: string;
  createdAt: string;
  business?: { name: string };
  merchant?: { name: string };
  courier?: { name: string };
}

export interface AdminDeliveryFilters {
  status: string;
  search: string;
  period: string;
}

export function useAdminDeliveries() {
  const [deliveries, setDeliveries] = useState<AdminDelivery[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<AdminDeliveryFilters>({
    status: 'ALL',
    search: '',
    //should reflect selected value of the select
    period: 'today'
  });

  const fetchDeliveries = useCallback(async () => {
    try {
      setLoading(true);
      const params: any = { 
        period: filters.period 
      };
      
      if (filters.status !== 'ALL') {
        params.status = filters.status;
      }
      
      if (filters.search) {
        params.search = filters.search;
      }

      const response = await api.get('/admin/deliveries', { params });
      setDeliveries(response.data);
    } catch (error) {
      console.error('Error fetching admin deliveries:', error);
      toast.error('Erro ao listar entregas');
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchDeliveries();
  }, [fetchDeliveries]);

  const cancelDelivery = async (id: string) => {
    try {
      await api.post(`/admin/deliveries/${id}/cancel`);
      toast.success('Entrega cancelada com sucesso');
      fetchDeliveries();
    } catch (error) {
      console.error('Error canceling delivery:', error);
      toast.error('Erro ao cancelar entrega');
    }
  };

  return {
    deliveries,
    loading,
    filters,
    setFilters,
    refresh: fetchDeliveries,
    cancelDelivery
  };
}
