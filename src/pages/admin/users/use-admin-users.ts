import { useState, useEffect, useCallback } from 'react';
import { api } from '../../../lib/api';
import { toast } from 'react-hot-toast';

export type UserRole = 'MERCHANT' | 'COURIER' | 'ADMIN';

export interface AdminUser {
  id: string;
  name: string;
  email?: string;
  phoneE164: string;
  role: UserRole;
  isActive: boolean;
  isRoot: boolean;
  createdAt: string;
}

export function useAdminUsers() {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = useCallback(async () => {
    try {
      setLoading(true);
      const response = await api.get('/admin/users');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
      toast.error('Erro ao listar usuários');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const updateUserRole = async (id: string, newRole: UserRole) => {
    try {
      await api.patch(`/admin/users/${id}/role`, { role: newRole });
      toast.success(`Papel atualizado para ${newRole}`);
      setUsers(prev => prev.map(u => 
        u.id === id ? { ...u, role: newRole } : u
      ));
    } catch (error) {
      console.error('Error updating user role:', error);
      toast.error('Erro ao atualizar papel do usuário');
    }
  };

  const toggleUserStatus = async (id: string, isActive: boolean) => {
    try {
      await api.patch(`/admin/users/${id}/status`, { isActive });
      toast.success(isActive ? 'Usuário ativado' : 'Usuário desativado');
      setUsers(prev => prev.map(u => 
        u.id === id ? { ...u, isActive } : u
      ));
    } catch (error) {
      console.error('Error updating user status:', error);
      toast.error('Erro ao atualizar status do usuário');
    }
  };

  return {
    users,
    loading,
    updateUserRole,
    toggleUserStatus,
    refresh: fetchUsers
  };
}
