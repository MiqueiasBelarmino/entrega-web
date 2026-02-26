import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { DashboardLayout } from '../../../components/layout/dashboard-layout';
import { AlertCircle } from 'lucide-react';
import { DashboardHeader } from './dashboard-header';
import { DashboardStats } from './dashboard-stats';
import { DeliveriesFilters } from './deliveries-filters';
import { DeliveriesTable } from './deliveries-table';
import { DeliveriesCards } from './deliveries-cards';
import { DeliveriesEmptyState } from './deliveries-empty-state';
import { DeliveriesLoadingState } from './deliveries-loading-state';
import { useMerchantDeliveries } from './use-merchant-deliveries';
import { useAuth } from '../../../contexts/auth-context';

export default function MerchantDashboard() {
  const { user } = useAuth();
  
  const isPending = user?.businesses?.[0]?.status === 'PENDING';

  const {
    deliveries,
    loading,
    error,
    stats,
    filters,
    setFilters,
    refresh,
    cancelDelivery
  } = useMerchantDeliveries();

  return (
    <DashboardLayout>
      <DashboardHeader onRefresh={refresh} loading={loading} isPending={isPending} />

      {isPending && (
        <Alert className="mb-6 bg-yellow-50 border-yellow-200 text-yellow-800">
          <AlertCircle className="h-4 w-4 text-yellow-600" />
          <AlertTitle className="text-yellow-800 font-semibold">Conta em análise</AlertTitle>
          <AlertDescription className="text-yellow-700">
            Sua conta está em análise! Você poderá solicitar entregas assim que um administrador aprovar seu cadastro.
          </AlertDescription>
        </Alert>
      )}

      {loading && !deliveries.length ? (
        <DeliveriesLoadingState />
      ) : (
        <>
          <DashboardStats stats={stats} />

          <DeliveriesFilters filters={filters} setFilters={setFilters} />

          {error && (
            <Alert variant="destructive" className="mb-6">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Erro</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {!loading && !error && deliveries.length === 0 ? (
            <DeliveriesEmptyState />
          ) : (
            <>
              {/* Desktop view */}
              <div className="hidden md:block">
                <DeliveriesTable deliveries={deliveries} onCancel={cancelDelivery} />
              </div>

              {/* Mobile view */}
              <div className="md:hidden">
                <DeliveriesCards deliveries={deliveries} onCancel={cancelDelivery} />
              </div>
            </>
          )}
        </>
      )}
    </DashboardLayout>
  );
}
