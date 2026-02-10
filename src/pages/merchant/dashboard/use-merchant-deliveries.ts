import { useState, useEffect, useMemo } from 'react';
import { api } from '../../../lib/api';
import { isSameDay, subDays, isAfter, parseISO } from 'date-fns';

export type DeliveryStatus = 'AVAILABLE' | 'ACCEPTED' | 'PICKED_UP' | 'COMPLETED' | 'CANCELED';

export interface Courier {
  id: string;
  name: string;
  phoneE164: string;
}

export interface Business {
  id: string;
  name: string;
}

export interface Delivery {
  id: string;
  status: DeliveryStatus;
  pickupAddress: string;
  dropoffAddress: string;
  price: number;
  notes?: string;
  createdAt: string;
  updatedAt: string;
  acceptedAt?: string;
  pickedUpAt?: string;
  completedAt?: string;
  canceledAt?: string;
  courier?: Courier;
  business?: Business;
}

export interface DashboardStats {
  available: number;
  accepted: number;
  pickedUp: number;
  completedToday: number;
}

export interface Filters {
  status: 'ALL' | DeliveryStatus;
  dateRange: 'today' | '7days' | '30days' | 'all';
  search: string;
}

export function useMerchantDeliveries() {
  const [data, setData] = useState<Delivery[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const [filters, setFilters] = useState<Filters>({
    status: 'ALL',
    dateRange: 'all',
    search: '',
  });

  const fetchDeliveries = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get<Delivery[]>('/deliveries');
      setData(response.data);
    } catch (err) {
      console.error(err);
      setError('Não foi possível carregar as entregas.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDeliveries();
  }, []);

  const stats = useMemo<DashboardStats>(() => {
    if (!data) return { available: 0, accepted: 0, pickedUp: 0, completedToday: 0 };
    
    const now = new Date();
    
    return {
      available: data.filter(d => d.status === 'AVAILABLE').length,
      accepted: data.filter(d => d.status === 'ACCEPTED').length,
      pickedUp: data.filter(d => d.status === 'PICKED_UP').length,
      completedToday: data.filter(d => {
        if (d.status !== 'COMPLETED') return false;
        const dateToCheck = d.completedAt ? parseISO(d.completedAt) : parseISO(d.updatedAt);
        return isSameDay(dateToCheck, now);
      }).length,
    };
  }, [data]);

  const filteredDeliveries = useMemo(() => {
    return data.filter(delivery => {
      // 1. Status Filter
      if (filters.status !== 'ALL' && delivery.status !== filters.status) {
        return false;
      }

      // 2. Date Range Filter
      const created = parseISO(delivery.createdAt);
      const now = new Date();
      
      if (filters.dateRange === 'today') {
        if (!isSameDay(created, now)) return false;
      } else if (filters.dateRange === '7days') {
        if (!isAfter(created, subDays(now, 7))) return false;
      } else if (filters.dateRange === '30days') {
         if (!isAfter(created, subDays(now, 30))) return false;
      }

      // 3. Search Filter
      if (filters.search) {
        const query = filters.search.toLowerCase();
        const pickup = delivery.pickupAddress.toLowerCase();
        const dropoff = delivery.dropoffAddress.toLowerCase();
        if (!pickup.includes(query) && !dropoff.includes(query)) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      // Custom sort: AVAILABLE (0) -> ACCEPTED (1) -> Others (2)
      const priorityMap: Record<string, number> = {
        AVAILABLE: 0,
        ACCEPTED: 1,
      };

      const priorityA = priorityMap[a.status] ?? 2;
      const priorityB = priorityMap[b.status] ?? 2;

      if (priorityA !== priorityB) {
        return priorityA - priorityB;
      }

      // Tie-breaker: Newest first
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
  }, [data, filters]);

  return {
    deliveries: filteredDeliveries,
    loading,
    error,
    stats,
    filters,
    setFilters,
    refresh: fetchDeliveries,
  };
}
