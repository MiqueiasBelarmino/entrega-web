import { useAdminDashboard } from './use-admin-dashboard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Loader2, RefreshCw, TrendingUp, Users, Store, Package, AlertOctagon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export default function AdminDashboard() {
  const { 
    stats, 
    pendingBusinesses, 
    issueDeliveries, 
    loading, 
    period, 
    setPeriod, 
    refresh 
  } = useAdminDashboard();

  if (loading && !stats) {
    return (
      <div className="flex items-center justify-center h-96">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard Admin</h1>
        <div className="flex items-center gap-4">
          <Select value={period} onValueChange={(v: any) => setPeriod(v)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Período" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="today">Hoje</SelectItem>
              <SelectItem value="7d">Últimos 7 dias</SelectItem>
              <SelectItem value="30d">Últimos 30 dias</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon" onClick={refresh} disabled={loading}>
            <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Entregas Totais</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.totalDeliveries || 0}</div>
            <p className="text-xs text-muted-foreground">
              {period === 'today' ? 'Hoje' : 'No período selecionado'}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Receita Total</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(stats?.totalRevenue || 0)}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Empresas Ativas</CardTitle>
            <Store className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.merchantsActive || 0}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Entregadores Ativos</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.couriersActive || 0}</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        {/* Pending Businesses */}
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Empresas Pendentes</CardTitle>
          </CardHeader>
          <CardContent>
            {pendingBusinesses.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                Nenhuma empresa pendente de aprovação.
              </div>
            ) : (
              <div className="space-y-4">
                {pendingBusinesses.map((business) => (
                  <div key={business.id} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
                    <div className="flex items-center gap-4">
                      <div className="bg-orange-100 p-2 rounded-full">
                        <Store className="h-5 w-5 text-orange-600" />
                      </div>
                      <div>
                        <p className="font-medium">{business.name}</p>
                        <p className="text-sm text-muted-foreground">Proprietário: {business.owner.name}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                       <span className="text-xs text-muted-foreground">
                        {format(new Date(business.createdAt), "dd 'de' MMM", { locale: ptBR })}
                      </span>
                      <Link to={`/admin/businesses?id=${business.id}`}>
                        <Button variant="outline" size="sm">Ver</Button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Issue Deliveries */}
        <Card className="col-span-3">
           <CardHeader>
            <CardTitle className="text-destructive flex items-center gap-2">
              <AlertOctagon className="h-5 w-5" />
              Entregas com Problema
            </CardTitle>
          </CardHeader>
          <CardContent>
             {issueDeliveries.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                Nenhuma entrega com problemas reportados.
              </div>
            ) : (
              <div className="space-y-4">
                {issueDeliveries.map((delivery) => (
                   <div key={delivery.id} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
                     <div>
                        <div className="flex items-center gap-2">
                          <p className="font-medium">#{delivery.id.slice(0, 8)}</p>
                          <Badge variant="destructive">{delivery.status}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">
                          {delivery.merchant.name}
                        </p>
                     </div>
                     <Link to={`/admin/deliveries?id=${delivery.id}`}>
                        <Button size="sm" variant="ghost">Resolver</Button>
                     </Link>
                   </div>
                ))}
              </div>
             )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
