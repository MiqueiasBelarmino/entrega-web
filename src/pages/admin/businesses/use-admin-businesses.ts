import { useState, useEffect, useCallback } from 'react';
import { api } from '../../../lib/api';
import { toast } from 'react-hot-toast';

export type BusinessStatus = 'PENDING' | 'APPROVED' | 'REJECTED' | 'SUSPENDED';

export interface AdminBusiness {
  id: string;
  name: string;
  status: BusinessStatus;
  owner?: {
    name: string;
    email: string;
  };
  address?: string;
  createdAt: string;
}

export function useAdminBusinesses() {
  const [businesses, setBusinesses] = useState<AdminBusiness[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchBusinesses = useCallback(async () => {
    try {
      setLoading(true);
      const response = await api.get('/admin/businesses');
      setBusinesses(response.data);
    } catch (error) {
      console.error('Error fetching businesses:', error);
      toast.error('Erro ao listar empresas');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBusinesses();
  }, [fetchBusinesses]);

  const updateStatus = async (id: string, newStatus: BusinessStatus) => {
    try {
      await api.patch(`/admin/businesses/${id}/status`, { status: newStatus });
      toast.success(`Status atualizado para ${newStatus}`);
      
      // Optimistic update or refresh
      setBusinesses(prev => prev.map(b => 
        b.id === id ? { ...b, status: newStatus } : b
      ));
    } catch (error) {
      console.error('Error updating business status:', error);
      toast.error('Erro ao atualizar status da empresa');
    }
  };

  return {
    businesses,
    loading,
    updateStatus,
    refresh: fetchBusinesses
  };
}
