import { Button } from '@/components/ui/button';
import { Plus, RotateCcw } from 'lucide-react';
import { Link } from 'react-router-dom';

interface DashboardHeaderProps {
  onRefresh: () => void;
  loading: boolean;
}

export function DashboardHeader({ onRefresh, loading }: DashboardHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
      <div className="flex items-center gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Entregas</h1>
        <Button
          variant="ghost"
          size="icon"
          onClick={onRefresh}
          disabled={loading}
          title="Atualizar"
          className="h-8 w-8"
        >
          <RotateCcw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
        </Button>
      </div>
      <Button asChild>
        <Link to="/merchant/deliveries/new">
          <Plus className="mr-2 h-4 w-4" />
          Nova entrega
        </Link>
      </Button>
    </div>
  );
}
