import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { DeliveriesStatusBadge } from './deliveries-status-badge';
import type { Delivery } from './use-merchant-deliveries';

interface DeliveriesCardsProps {
  deliveries: Delivery[];
}

export function DeliveriesCards({ deliveries }: DeliveriesCardsProps) {
  return (
    <div className="grid gap-4">
      {deliveries.map((delivery) => (
        <Card key={delivery.id}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {format(new Date(delivery.createdAt), 'dd/MM/yyyy HH:mm')}
            </CardTitle>
            <DeliveriesStatusBadge status={delivery.status} />
          </CardHeader>
          <CardContent>
            <div className="grid gap-2 text-sm mt-2">
              <div>
                <span className="font-semibold text-muted-foreground mr-2">Retirada:</span>
                <span className="line-clamp-1">{delivery.pickupAddress}</span>
              </div>
              <div>
                <span className="font-semibold text-muted-foreground mr-2">Entrega:</span>
                <span className="line-clamp-1">{delivery.dropoffAddress}</span>
              </div>
              {delivery.courier && (
                <div>
                   <span className="font-semibold text-muted-foreground mr-2">Courier:</span>
                   <span>{delivery.courier.name}</span>
                </div>
              )}
            </div>
            <div className="mt-4 flex justify-between items-center">
              <span className="font-bold text-lg">
                {new Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                }).format(Number(delivery.price))}
              </span>
              <Button size="sm" variant="outline" asChild>
                <Link to={`/merchant/deliveries/${delivery.id}`}>
                  Ver detalhes
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
