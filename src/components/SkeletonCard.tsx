import React from 'react';

export function SkeletonCard() {
  return (
    <div className="flex flex-col bg-card rounded-2xl overflow-hidden border border-card-border shadow-sm">
      <div className="aspect-[4/3] w-full bg-muted animate-pulse" />
      <div className="p-4 flex flex-col gap-3">
        <div className="flex justify-between items-start">
          <div className="h-6 w-1/2 bg-muted animate-pulse rounded" />
          <div className="h-6 w-12 bg-muted animate-pulse rounded-full" />
        </div>
        <div className="h-4 w-1/3 bg-muted animate-pulse rounded" />
        <div className="flex gap-2 mt-1">
          <div className="h-5 w-16 bg-muted animate-pulse rounded" />
          <div className="h-5 w-20 bg-muted animate-pulse rounded" />
        </div>
      </div>
    </div>
  );
}
