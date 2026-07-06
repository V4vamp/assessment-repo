/* eslint-disable @typescript-eslint/no-unused-vars */
import { useCallback } from 'react';
import { useToast } from '../components/ui/use-toast';
import { fakeToggleFavoriteRequest } from '../services/fakeApis';

export function useFavorite(
  toggleFavoriteState: (id: string, isFav: boolean) => void
) {
  const { toast } = useToast();

  const toggleFavorite = useCallback(
    async (id: string, currentStatus: boolean) => {
      const newStatus = !currentStatus;
      toggleFavoriteState(id, newStatus);

      try {
        await fakeToggleFavoriteRequest();
      } catch (error) {
        toggleFavoriteState(id, currentStatus);
        toast({
          title: "Couldn't update favorite. Please try again.",
          variant: "destructive",
        });
      }
    },
    [toggleFavoriteState, toast]
  );

  return { toggleFavorite };
}
