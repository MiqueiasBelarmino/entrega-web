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

export default function MerchantDashboard() {
  const {
    deliveries,
    loading,
    error,
    stats,
    filters,
    setFilters,
    refresh
  } = useMerchantDeliveries();

  return (
    <DashboardLayout>
      <DashboardHeader onRefresh={refresh} loading={loading} />

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
                <DeliveriesTable deliveries={deliveries} />
              </div>

              {/* Mobile view */}
              <div className="md:hidden">
                <DeliveriesCards deliveries={deliveries} />
              </div>
            </>
          )}
        </>
      )}
    </DashboardLayout>
  );
}
