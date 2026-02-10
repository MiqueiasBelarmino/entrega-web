import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Eye } from 'lucide-react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { DeliveriesStatusBadge } from './deliveries-status-badge';
import type { Delivery } from './use-merchant-deliveries';

interface DeliveriesTableProps {
  deliveries: Delivery[];
}

export function DeliveriesTable({ deliveries }: DeliveriesTableProps) {
  return (
    <div className="rounded-md border bg-card">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Status</TableHead>
            <TableHead>Entrega</TableHead>
            <TableHead>Valor</TableHead>
            <TableHead>Criada em</TableHead>
            <TableHead>Entregador</TableHead>
            <TableHead className="text-right">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {deliveries.map((delivery) => (
            <TableRow key={delivery.id}>
              <TableCell>
                <DeliveriesStatusBadge status={delivery.status} />
              </TableCell>
              <TableCell className="max-w-[200px] truncate" title={delivery.dropoffAddress}>
                {delivery.dropoffAddress}
              </TableCell>
              <TableCell>
                {new Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                }).format(Number(delivery.price))}
              </TableCell>
              <TableCell>
                {format(new Date(delivery.createdAt), 'dd/MM/yyyy HH:mm')}
              </TableCell>
              <TableCell>
                {delivery.courier?.name || '-'}
              </TableCell>
              <TableCell className="text-right">
                <Button variant="ghost" size="icon" asChild>
                  <Link to={`/merchant/deliveries/${delivery.id}`}>
                    <Eye className="h-4 w-4" />
                    <span className="sr-only">Ver detalhes</span>
                  </Link>
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
