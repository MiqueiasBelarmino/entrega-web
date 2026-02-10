import { useAdminDeliveries } from './use-admin-deliveries';
import { AdminDeliveriesTable } from './admin-deliveries-table';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RefreshCw, Search } from 'lucide-react';

export default function AdminDeliveries() {
  const { deliveries, loading, filters, setFilters, refresh, cancelDelivery } = useAdminDeliveries();

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Gerenciar Entregas</h1>
        <Button variant="outline" size="icon" onClick={refresh} disabled={loading}>
          <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar por ID, endereço..."
            value={filters.search}
            onChange={(e) => setFilters({ ...filters, search: e.target.value })}
            className="pl-8"
          />
        </div>
        <Select 
          value={filters.status} 
          onValueChange={(v) => setFilters({ ...filters, status: v })}
        >
           <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL">Todos os status</SelectItem>
            <SelectItem value="AVAILABLE">Disponível</SelectItem>
            <SelectItem value="ACCEPTED">Aceita</SelectItem>
            <SelectItem value="PICKED_UP">Em rota</SelectItem>
            <SelectItem value="COMPLETED">Concluída</SelectItem>
            <SelectItem value="CANCELED">Cancelada</SelectItem>
            <SelectItem value="ISSUE">Com Problema</SelectItem>
          </SelectContent>
        </Select>
        <Select 
           value={filters.period} 
           onValueChange={(v) => setFilters({ ...filters, period: v })}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Período" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="today">Hoje</SelectItem>
            <SelectItem value="7d">Últimos 7 dias</SelectItem>
            <SelectItem value="30d">Últimos 30 dias</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {loading && !deliveries.length ? (
        <div className="flex justify-center p-8">Carregando...</div>
      ) : deliveries.length === 0 ? (
        <div className="text-center py-12 border rounded-md bg-slate-50">
          <p className="text-muted-foreground">Nenhuma entrega encontrada com os filtros selecionados.</p>
        </div>
      ) : (
        <AdminDeliveriesTable deliveries={deliveries} onCancel={cancelDelivery} />
      )}
    </div>
  );
}
