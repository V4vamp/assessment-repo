
import { UtensilsCrossed } from 'lucide-react';

export function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
      <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-6">
        <UtensilsCrossed className="w-12 h-12 text-muted-foreground opacity-50" />
      </div>
      <h3 className="text-xl font-bold text-foreground mb-2">No restaurants found</h3>
      <p className="text-muted-foreground max-w-md">
        We couldn't find any restaurants matching your search. Try adjusting your filters or search terms.
      </p>
    </div>
  );
}
