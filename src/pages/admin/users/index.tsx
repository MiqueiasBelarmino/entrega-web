import { useAdminUsers, UserRole } from './use-admin-users';
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
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, RefreshCw, Shield, UserX, UserCheck } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { getRoleLabel } from '@/lib/utils';

export default function AdminUsers() {
  const { users, loading, updateUserRole, toggleUserStatus, refresh } = useAdminUsers();

  const getRoleBadge = (role: UserRole) => {
    switch (role) {
      case 'ADMIN': return 'default';
      case 'MERCHANT': return 'secondary';
      case 'COURIER': return 'outline';
      default: return 'outline';
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Gerenciar Usuários</h1>
        <Button variant="outline" size="icon" onClick={refresh} disabled={loading}>
          <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
        </Button>
      </div>

      <div className="rounded-md border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Telefone</TableHead>
              <TableHead>Papel</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Criado em</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading && !users.length ? (
               <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                  Carregando...
                </TableCell>
              </TableRow>
            ) : users.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                  Nenhum usuário encontrado.
                </TableCell>
              </TableRow>
            ) : (
              users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      {user.name}
                      {user.isRoot && <span title="Super Admin"><Shield className="h-3 w-3 text-yellow-600" /></span>}
                    </div>
                    {user.email && <div className="text-xs text-muted-foreground">{user.email}</div>}
                  </TableCell>
                  <TableCell>{user.phoneE164}</TableCell>
                  <TableCell>
                    <Badge variant={getRoleBadge(user.role) as any}>
                      {getRoleLabel(user.role)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                     <Badge variant={user.isActive ? 'outline' : 'destructive'}>
                      {user.isActive ? 'Ativo' : 'Inativo'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {format(new Date(user.createdAt), "dd/MM/yyyy", { locale: ptBR })}
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0" disabled={user.isRoot}>
                          <span className="sr-only">Abrir menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Gerenciar</DropdownMenuLabel>
                        
                        <DropdownMenuSub>
                          <DropdownMenuSubTrigger>Alterar Papel</DropdownMenuSubTrigger>
                          <DropdownMenuSubContent>
                            <DropdownMenuRadioGroup value={user.role} onValueChange={(v) => updateUserRole(user.id, v as UserRole)}>
                              <DropdownMenuRadioItem value="ADMIN">Admin</DropdownMenuRadioItem>
                              <DropdownMenuRadioItem value="MERCHANT">Estabelecimento</DropdownMenuRadioItem>
                              <DropdownMenuRadioItem value="COURIER">Entregador</DropdownMenuRadioItem>
                            </DropdownMenuRadioGroup>
                          </DropdownMenuSubContent>
                        </DropdownMenuSub>

                        <DropdownMenuSeparator />
                        
                        {user.isActive ? (
                          <DropdownMenuItem 
                            className="text-red-600 focus:text-red-600"
                            onClick={() => toggleUserStatus(user.id, false)}
                          >
                             <UserX className="mr-2 h-4 w-4" /> Desativar
                          </DropdownMenuItem>
                        ) : (
                          <DropdownMenuItem 
                            className="text-green-600 focus:text-green-600"
                            onClick={() => toggleUserStatus(user.id, true)}
                          >
                             <UserCheck className="mr-2 h-4 w-4" /> Ativar
                          </DropdownMenuItem>
                        )}
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
