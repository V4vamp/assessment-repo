/* eslint-disable react-hooks/rules-of-hooks */

import { useState } from 'react';
import { Navbar } from '../components/Navbar';
import { FilterTags } from '../components/FilterTags';
import { RestaurantList } from '../components/RestaurantList';
import { VoucherLedger } from '../components/VoucherLedger';
import { useRestaurants } from '../hooks/use-restaurants';
import { useLedgerPoints } from '../hooks/use-ledgerPoints';
import { useFavorite } from '../hooks/use-favorite';

export default function Restaurants() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');

  const {
    restaurants,
    isLoading,
    isError,
    error,
    toggleFavoriteState,
  } = useRestaurants(searchQuery, activeFilter);
  const { toggleFavorite } = useFavorite(toggleFavoriteState);

  if (isError) {
    return (
      <p className="text-red-500">
        {error instanceof Error ? error.message : "Something went wrong"}
      </p>
    );
  }

  const { data: pointsLedger } = useLedgerPoints();

  return (
    <div className="min-h-screen bg-background flex flex-col font-sans w-full">
      <Navbar searchQuery={searchQuery} onSearchChange={setSearchQuery} />

      <main className="flex-1 container pl-10  w-full py-8">
        <div className="flex flex-col lg:flex-row gap-8 w-full">
          
          <div className="w-3/4 flex flex-col gap-6">
            <section aria-label="Filters">
              <h2 className="text-2xl font-extrabold text-foreground mb-4 tracking-tight">What are you craving?</h2>
              <FilterTags activeFilter={activeFilter} onFilterChange={setActiveFilter} />
            </section>

            <section aria-label="Restaurants" className="w-full">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-foreground">
                  {searchQuery || activeFilter !== 'All' ? 'Search Results' : 'Popular Near You'}
                </h2>
                {!isLoading && (
                  <span className="text-sm font-medium text-muted-foreground">
                    {restaurants.length} {restaurants.length === 1 ? 'place' : 'places'}
                  </span>
                )}
              </div>

              <RestaurantList
                restaurants={restaurants}
                isLoading={isLoading}
                onToggleFavorite={toggleFavorite}
              />
            </section>
          </div>

          <aside className="w-1/4 h-[calc(100vh-120px)] lg:w-80 xl:w-96 shrink-0" aria-label="Loyalty Voucher Ledger">
            <VoucherLedger pointsLedger={pointsLedger || []} />
          </aside>

        </div>
      </main>
    </div>
  );
}
