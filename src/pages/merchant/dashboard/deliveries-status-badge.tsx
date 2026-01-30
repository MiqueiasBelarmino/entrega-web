import { Badge } from '@/components/ui/badge';
import { statusMap } from '@/lib/utils';
import { DeliveryStatus } from './use-merchant-deliveries';

interface DeliveriesStatusBadgeProps {
  status: DeliveryStatus;
}

const statusColor: Record<DeliveryStatus, "default" | "secondary" | "destructive" | "outline"> = {
  AVAILABLE: 'secondary',
  ACCEPTED: 'default',
  PICKED_UP: 'default',
  COMPLETED: 'outline',
  CANCELED: 'destructive',
};

export function DeliveriesStatusBadge({ status }: DeliveriesStatusBadgeProps) {
  return (
    <Badge variant={statusColor[status] ?? 'outline'}>
      {statusMap[status] ?? status}
    </Badge>
  );
}
