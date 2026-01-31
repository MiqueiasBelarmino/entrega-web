import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, AlertOctagon } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { AdminDelivery } from "./use-admin-deliveries";
import { Link } from "react-router-dom";

interface AdminDeliveriesTableProps {
  deliveries: AdminDelivery[];
  onCancel: (id: string) => void;
}

export function AdminDeliveriesTable({ deliveries, onCancel }: AdminDeliveriesTableProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'COMPLETED': return 'default'; // dark/black
      case 'CANCELED': return 'destructive';
      case 'ISSUE': return 'destructive';
      case 'AVAILABLE': return 'secondary';
      case 'ACCEPTED': return 'outline';
      case 'PICKED_UP': return 'secondary'; // using secondary for picked up
      default: return 'outline';
    }
  };

  return (
    <div className="rounded-md border bg-card">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Empresa</TableHead>
            <TableHead>Entregador</TableHead>
            <TableHead>Preço</TableHead>
            <TableHead>Criado em</TableHead>
            <TableHead className="text-right">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {deliveries.map((delivery) => (
            <TableRow key={delivery.id}>
              <TableCell className="font-medium">#{delivery.id.slice(0, 8)}</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Badge variant={getStatusColor(delivery.status) as any}>
                    {delivery.status}
                  </Badge>
                  {delivery.status === 'ISSUE' && <AlertOctagon className="h-4 w-4 text-red-500" />}
                </div>
              </TableCell>
              <TableCell>{delivery.business?.name || '-'}</TableCell>
              <TableCell>{delivery.courier?.name || '-'}</TableCell>
              <TableCell>
                {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(delivery.price)}
              </TableCell>
              <TableCell>
                {format(new Date(delivery.createdAt), "dd/MM HH:mm", { locale: ptBR })}
              </TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <span className="sr-only">Abrir menu</span>
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Ações</DropdownMenuLabel>
                    <DropdownMenuItem asChild>
                       <Link to={`/admin/deliveries/${delivery.id}`}>Ver detalhes</Link>
                    </DropdownMenuItem>
                    {['AVAILABLE', 'ACCEPTED', 'PICKED_UP', 'ISSUE'].includes(delivery.status) && (
                      <DropdownMenuItem 
                        className="text-red-600 focus:text-red-600"
                        onClick={() => {
                          if (confirm('Tem certeza que deseja cancelar esta entrega? Isso não pode ser desfeito.')) {
                            onCancel(delivery.id);
                          }
                        }}
                      >
                        Cancelar entrega
                      </DropdownMenuItem>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
