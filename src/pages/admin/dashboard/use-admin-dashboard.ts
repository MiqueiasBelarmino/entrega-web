import { useState, useEffect, useCallback } from 'react';
import { api } from '../../../lib/api';
import { toast } from 'react-hot-toast';

export interface AdminStats {
  totalDeliveries: number;
  merchantsActive: number;
  couriersActive: number;
  totalRevenue: number;
}

export interface PendingBusiness {
  id: string;
  name: string;
  owner: {
    name: string;
    email: string;
  };
  createdAt: string;
}

export interface IssueDelivery {
  id: string;
  status: string;
  merchant: {
    name: string;
  };
  courier?: {
    name: string;
  };
  createdAt: string;
}

export function useAdminDashboard() {
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [pendingBusinesses, setPendingBusinesses] = useState<PendingBusiness[]>([]);
  const [issueDeliveries, setIssueDeliveries] = useState<IssueDelivery[]>([]);
  const [loading, setLoading] = useState(true);
  const [period, setPeriod] = useState<'today' | '7d' | '30d'>('today');

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const [statsRes, businessesRes, deliveriesRes] = await Promise.all([
        api.get('/admin/stats', { params: { range: period } }),
        api.get('/admin/businesses', { params: { status: 'PENDING' } }),
        api.get('/admin/deliveries', { params: { status: 'ISSUE' } })
      ]);
      setStats(statsRes.data);
      setPendingBusinesses(businessesRes.data);
      setIssueDeliveries(deliveriesRes.data);
    } catch (error) {
      console.error('Error fetching admin dashboard data:', error);
      toast.error('Erro ao carregar dados do dashboard');
    } finally {
      setLoading(false);
    }
  }, [period]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    stats,
    pendingBusinesses,
    issueDeliveries,
    loading,
    period,
    setPeriod,
    refresh: fetchData
  };
}
