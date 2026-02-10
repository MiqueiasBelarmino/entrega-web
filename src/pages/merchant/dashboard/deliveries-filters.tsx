import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Search } from 'lucide-react';
import type { Filters } from './use-merchant-deliveries';

interface DeliveriesFiltersProps {
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
}

export function DeliveriesFilters({ filters, setFilters }: DeliveriesFiltersProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-6">
      <div className="flex-1 relative">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Buscar por endereço..."
          value={filters.search}
          onChange={(e) => setFilters((prev) => ({ ...prev, search: e.target.value }))}
          className="pl-8"
        />
      </div>
      <div className="w-full sm:w-[180px]">
        <Select
          value={filters.status}
          onValueChange={(value: any) => setFilters((prev) => ({ ...prev, status: value }))}
        >
          <SelectTrigger>
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL">Todos os status</SelectItem>
            <SelectItem value="AVAILABLE">Disponível</SelectItem>
            <SelectItem value="ACCEPTED">Aceita</SelectItem>
            <SelectItem value="PICKED_UP">Em Rota</SelectItem>
            <SelectItem value="COMPLETED">Concluída</SelectItem>
            <SelectItem value="CANCELED">Cancelada</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="w-full sm:w-[180px]">
        <Select
          value={filters.dateRange}
          onValueChange={(value: any) => setFilters((prev) => ({ ...prev, dateRange: value }))}
        >
          <SelectTrigger>
            <SelectValue placeholder="Período" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="today">Hoje</SelectItem>
            <SelectItem value="7days">Últimos 7 dias</SelectItem>
            <SelectItem value="30days">Últimos 30 dias</SelectItem>
            <SelectItem value="all">Todo o período</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
