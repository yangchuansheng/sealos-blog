import { cn } from '@/lib/utils';

export function BlogCardSkeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'group flex flex-col overflow-hidden rounded-xl bg-card text-card-foreground shadow-md',
        className
      )}
    >
      <div className="relative aspect-video h-auto w-full bg-muted" />
      <div className="flex flex-1 flex-col gap-2.5 p-5">
        <div className="h-6 w-3/4 rounded-md bg-muted" />
        <div className="mt-2 space-y-2">
          <div className="h-4 w-full rounded-md bg-muted" />
          <div className="h-4 w-5/6 rounded-md bg-muted" />
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {[1, 2].map((i) => (
            <div key={i} className="h-5 w-16 rounded-full bg-muted" />
          ))}
        </div>
        <div className="mt-auto flex flex-row items-center pt-3">
          <div className="flex -space-x-2">
            {[1, 2].map((i) => (
              <div key={i} className="h-7 w-7 rounded-full bg-muted" />
            ))}
          </div>
          <div className="ml-auto h-4 w-24 rounded-md bg-muted" />
        </div>
      </div>
    </div>
  );
}
