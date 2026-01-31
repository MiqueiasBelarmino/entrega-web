import { useAdminBusinesses, BusinessStatus } from './use-admin-businesses';
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
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, RefreshCw, CheckCircle, XCircle, Ban } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

export default function AdminBusinesses() {
  const { businesses, loading, updateStatus, refresh } = useAdminBusinesses();

  const getStatusColor = (status: BusinessStatus) => {
    switch (status) {
      case 'APPROVED': return 'default'; // dark/black
      case 'PENDING': return 'outline'; // yellow-ish usually, but outline for now
      case 'REJECTED': return 'destructive';
      case 'SUSPENDED': return 'destructive';
      default: return 'secondary';
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Gerenciar Empresas</h1>
        <Button variant="outline" size="icon" onClick={refresh} disabled={loading}>
          <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
        </Button>
      </div>

      <div className="rounded-md border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Proprietário</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Endereço</TableHead>
              <TableHead>Criado em</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading && !businesses.length ? (
               <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                  Carregando...
                </TableCell>
              </TableRow>
            ) : businesses.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                  Nenhuma empresa encontrada.
                </TableCell>
              </TableRow>
            ) : (
              businesses.map((business) => (
                <TableRow key={business.id}>
                  <TableCell className="font-medium">{business.name}</TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span>{business.owner?.name}</span>
                      <span className="text-xs text-muted-foreground">{business.owner?.email}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getStatusColor(business.status) as any}>
                      {business.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="max-w-[200px] truncate" title={business.address}>
                    {business.address || '-'}
                  </TableCell>
                  <TableCell>
                    {format(new Date(business.createdAt), "dd/MM/yyyy HH:mm", { locale: ptBR })}
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
                        <DropdownMenuLabel>Alterar Status</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => updateStatus(business.id, 'APPROVED')}>
                          <CheckCircle className="mr-2 h-4 w-4 text-green-600" /> Aprovar
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => updateStatus(business.id, 'PENDING')}>
                          Reiniciar Pendência
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => updateStatus(business.id, 'REJECTED')}>
                           <XCircle className="mr-2 h-4 w-4 text-red-600" /> Rejeitar
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => updateStatus(business.id, 'SUSPENDED')}>
                           <Ban className="mr-2 h-4 w-4 text-orange-600" /> Suspender
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
