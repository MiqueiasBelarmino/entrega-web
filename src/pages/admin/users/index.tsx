import { useState } from 'react';
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
import { MoreHorizontal, RefreshCw, Shield, UserX, UserCheck, Plus } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { getRoleLabel } from '@/lib/utils';
import { CreateUserModal } from './create-user-modal';

export default function AdminUsers() {
  const { users, loading, updateUserRole, toggleUserStatus, updateCourierStatus, refresh } = useAdminUsers();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getRoleBadge = (role: UserRole) => {
    switch (role) {
      case 'ADMIN': return 'default';
      case 'MERCHANT': return 'secondary';
      case 'COURIER': return 'outline';
      default: return 'outline';
    }
  };

  const getStatusBadge = (status?: string) => {
    switch (status) {
      case 'APPROVED': return 'outline';
      case 'PENDING': return 'secondary';
      case 'REJECTED': return 'destructive';
      default: return 'outline';
    }
  };

  const getStatusLabel = (status?: string) => {
    switch (status) {
      case 'APPROVED': return 'Aprovado';
      case 'PENDING': return 'Pendente';
      case 'REJECTED': return 'Rejeitado';
      default: return '-';
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Gerenciar Usuários</h1>
        <div className="flex gap-2">
          <Button variant="outline" size="icon" onClick={refresh} disabled={loading}>
            <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
          </Button>
          <Button onClick={() => setIsModalOpen(true)}>
            <Plus className="mr-2 h-4 w-4" /> Novo Usuário
          </Button>
        </div>
      </div>

      <CreateUserModal 
        open={isModalOpen} 
        onOpenChange={setIsModalOpen} 
        onSuccess={refresh} 
      />

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
                    <div className="text-xs text-muted-foreground">
                      {user.email || 'Sem email'}
                      {user.role === 'COURIER' && (
                        <div className="mt-1 flex gap-2 text-[10px] items-center">
                          {user.cpf && <span className="bg-slate-100 px-1 rounded">CPF: {user.cpf}</span>}
                          {user.cnh && <span className="bg-slate-100 px-1 rounded">CNH: {user.cnh}</span>}
                          {user.vehiclePlate && <span className="bg-slate-100 px-1 rounded">Placa: {user.vehiclePlate}</span>}
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>{user.phoneE164}</TableCell>
                  <TableCell>
                    <Badge variant={getRoleBadge(user.role) as any}>
                      {getRoleLabel(user.role)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col gap-1">
                      {user.role === 'COURIER' && user.status !== 'APPROVED' ? (
                        /* Se for entregador e NÃO estiver aprovado, mostra apenas o status (Pendente/Rejeitado) */
                        <Badge variant={getStatusBadge(user.status) as any}>
                          {getStatusLabel(user.status)}
                        </Badge>
                      ) : (
                        /* Se for Admin/Lojista OU Entregador já aprovado, mostra se a conta está Ativa/Inativa */
                        <Badge variant={user.isActive ? 'outline' : 'destructive'}>
                          {user.isActive ? 'Ativo' : 'Inativo'}
                        </Badge>
                      )}
                    </div>
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

                        {user.role === 'COURIER' && (
                          <>
                            <DropdownMenuSeparator />
                            <DropdownMenuLabel>Aprovação</DropdownMenuLabel>
                            <DropdownMenuItem onClick={() => updateCourierStatus(user.id, 'APPROVED')}>
                              ✅ Aprovar Cadastro
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              className="text-red-600 focus:text-red-600"
                              onClick={() => updateCourierStatus(user.id, 'REJECTED')}
                            >
                              ❌ Rejeitar Cadastro
                            </DropdownMenuItem>
                          </>
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
