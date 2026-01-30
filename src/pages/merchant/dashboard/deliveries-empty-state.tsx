import { PackageOpen } from 'lucide-react';

export function DeliveriesEmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="bg-muted/50 p-4 rounded-full mb-4">
        <PackageOpen className="h-8 w-8 text-muted-foreground" />
      </div>
      <h3 className="text-lg font-medium">Nenhuma entrega encontrada</h3>
      <p className="text-muted-foreground mt-2 max-w-sm">
        Não encontramos entregas com os filtros selecionados ou você ainda não criou nenhuma.
      </p>
    </div>
  );
}
