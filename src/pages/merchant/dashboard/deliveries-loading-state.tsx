import { Skeleton } from '@/components/ui/skeleton';

export function DeliveriesLoadingState() {
  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-4 mb-8">
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-12 w-full" />
      </div>
      <Skeleton className="h-[200px] w-full rounded-xl" />
    </div>
  );
}
