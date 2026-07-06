/* eslint-disable react-hooks/set-state-in-effect */

import { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { ShoppingBag, MapPin, Search, ArrowRight } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Avatar, AvatarFallback } from '../components/ui/avatar';
import { RatingStars } from '../components/RatingStars';
import type { Restaurant, Review, User } from '../types/types';
import { fetchRestaurants } from '../api/restaurants';
import { fetchReviews } from '../api/reviews';
import { fetchUsers } from '../api/users';

function getInitials(name: string) {
  return name
    .split(' ')
    .map(part => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

export default function Landing() {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    setIsLoading(true);
    Promise.all([fetchRestaurants(), fetchReviews(), fetchUsers()]).then(
      ([restaurantsData, reviewsData, usersData]) => {
        if (cancelled) return;
        setRestaurants(restaurantsData);
        setReviews(reviewsData);
        setUsers(usersData);
        setIsLoading(false);
      }
    );
    return () => {
      cancelled = true;
    };
  }, []);

  const restaurantsById = Object.fromEntries(restaurants.map(r => [r.id, r]));
  const usersById = Object.fromEntries(users.map(u => [u.id, u]));

  return (
    <div className="min-h-screen bg-background font-sans">
      <header className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white shadow-md">
              <ShoppingBag className="h-6 w-6" />
            </div>
            <span className="text-xl font-bold tracking-tight text-foreground">
              Local<span className="text-primary">Buka</span>
            </span>
          </div>
          <Link to="/restaurants">
            <Button className="rounded-full font-semibold border-white text-white hover:bg-white hover:text-primary hover:border hover:border-primary cursor-pointer transition-colors gap-2">
              Find Restaurants
            </Button>
          </Link>
        </div>
      </header>

      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/20" />

        <div className="relative container mx-auto px-4 py-24 md:py-20 flex flex-col items-center text-center gap-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 text-primary text-sm font-semibold">
            
            Nigeria's favorite buka finder
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-foreground max-w-4xl leading-[1.05]">
            Real bukas.<br />
            Real jollof.<br />
            <span className="text-primary">Real fast.</span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed">
            Discover the best local restaurants near you; from streetside amala joints
            to five-star suya spots, rated by thousands of real Nigerian foodies.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-3 mt-4">
            <Link to="/app">
              <Button size="lg" className="rounded-full px-8 h-14 text-base font-bold shadow-lg shadow-primary/20 gap-2 bg-transparent border border-primary text-primary hover:bg-primary hover:text-white transition-colors cursor-pointer">
                <Search className="w-5 h-5" />
                Find a restaurant near you
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>

          <div className="flex items-center gap-8 mt-10 flex-wrap justify-center">
            {isLoading ? (
              <>
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="flex flex-col items-center gap-2">
                    <div className="h-8 w-16 bg-muted animate-pulse rounded" />
                    <div className="h-4 w-24 bg-muted animate-pulse rounded" />
                  </div>
                ))}
              </>
            ) : (
              <>
                <div className="text-center">
                  <p className="text-3xl font-extrabold text-foreground">{restaurants.length}+</p>
                  <p className="text-sm text-muted-foreground font-medium">Restaurants listed</p>
                </div>
                <div className="h-10 w-px bg-border hidden sm:block" />
                <div className="text-center">
                  <p className="text-3xl font-extrabold text-foreground">{users.length}k+</p>
                  <p className="text-sm text-muted-foreground font-medium">Happy foodies</p>
                </div>
                <div className="h-10 w-px bg-border hidden sm:block" />
                <div className="text-center">
                  <p className="text-3xl font-extrabold text-foreground">4.6</p>
                  <p className="text-sm text-muted-foreground font-medium">Average rating</p>
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-20">
        <div className="flex flex-col items-center text-center gap-3 mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-foreground tracking-tight">
            What people are saying
          </h2>
          <p className="text-muted-foreground max-w-xl">
            Honest reviews from real customers who found their new favorite spot.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {isLoading ? (
            <>
              {Array.from({ length: 2 }).map((_, i) => (
                <div
                  key={i}
                  className="flex flex-col gap-4 bg-card border border-card-border rounded-2xl p-6 shadow-sm"
                >
                  <div className="flex items-center justify-between">
                    <div className="h-4 w-24 bg-muted animate-pulse rounded" />
                    <div className="h-3 w-16 bg-muted animate-pulse rounded" />
                  </div>
                  <div className="h-4 w-full bg-muted animate-pulse rounded" />
                  <div className="h-4 w-2/3 bg-muted animate-pulse rounded" />
                  <div className="flex gap-1.5">
                    <div className="h-5 w-14 bg-muted animate-pulse rounded" />
                    <div className="h-5 w-16 bg-muted animate-pulse rounded" />
                  </div>
                  <div className="flex items-center gap-3 mt-2 pt-4 border-t border-border">
                    <div className="h-10 w-10 rounded-full bg-muted animate-pulse" />
                    <div className="flex flex-col gap-1.5">
                      <div className="h-3.5 w-28 bg-muted animate-pulse rounded" />
                      <div className="h-3 w-20 bg-muted animate-pulse rounded" />
                    </div>
                  </div>
                </div>
              ))}
            </>
          ) : (
            reviews.map(review => {
              const restaurant = restaurantsById[review.restaurantId];
              const author = usersById[review.userId];
              return (
                <div
                  key={review.id}
                  className="flex flex-col gap-4 bg-card border border-card-border rounded-2xl p-6 shadow-sm hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-center justify-between">
                    <RatingStars rating={review.rating} size={16} />
                    <span className="text-xs text-muted-foreground font-medium">{formatDate(review.createdAt)}</span>
                  </div>

                  <p className="text-foreground text-base leading-relaxed">"{review.comment}"</p>

                  <div className="flex flex-wrap gap-1.5">
                    {review.tags.map(tag => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 bg-muted/60 text-muted-foreground rounded text-xs font-medium border border-border/50"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-3 mt-2 pt-4 border-t border-border">
                    <Avatar className="h-10 w-10 border border-border">
                      <AvatarFallback className="bg-primary/10 text-primary font-bold text-sm">
                        {author ? getInitials(author.name) : '?'}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-foreground">{author?.name ?? 'Anonymous'}</span>
                      {restaurant && (
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {restaurant.name}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </section>

      <section className="bg-muted/30 border-y border-border">
        <div className="container mx-auto px-4 py-20">
          <div className="flex flex-col items-center text-center gap-3 mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold text-foreground tracking-tight">
              Join our growing community
            </h2>
            <p className="text-muted-foreground max-w-xl">
              Thousands of foodies across Nigeria are sharing reviews, earning points, and finding hidden gems.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {isLoading ? (
              <>
                {Array.from({ length: 3 }).map((_, i) => (
                  <div
                    key={i}
                    className="flex flex-col items-center text-center gap-3 bg-card border border-card-border rounded-2xl p-6 shadow-sm"
                  >
                    <div className="h-16 w-16 rounded-full bg-muted animate-pulse" />
                    <div className="flex flex-col items-center gap-2">
                      <div className="h-4 w-24 bg-muted animate-pulse rounded" />
                      <div className="h-3 w-32 bg-muted animate-pulse rounded" />
                    </div>
                  </div>
                ))}
              </>
            ) : (
              users.map(user => {
                const userReviewCount = reviews.filter(r => r.userId === user.id).length;
                return (
                  <div
                    key={user.id}
                    className="flex flex-col items-center text-center gap-3 bg-card border border-card-border rounded-2xl p-6 shadow-sm hover:-translate-y-1 transition-transform"
                  >
                    <Avatar className="h-16 w-16 border-2 border-primary/20">
                      <AvatarFallback className="bg-primary/10 text-primary font-bold text-lg">
                        {getInitials(user.name)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-bold text-foreground">{user.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {userReviewCount} {userReviewCount === 1 ? 'review' : 'reviews'} written
                      </p>
                    </div>
                    {user.referredBy && (
                      <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-accent/10 text-primary border border-accent/20">
                        Referred member
                      </span>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-24">
        <div className="max-w-3xl mx-auto text-center flex flex-col items-center gap-6 bg-primary/5 border border-primary/15 rounded-3xl p-10 md:p-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-foreground tracking-tight">
            Hungry? Let's find your next meal.
          </h2>
          <p className="text-muted-foreground max-w-lg">
            Browse local bukas by cuisine, price, and rating, and start earning loyalty points on every visit.
          </p>
          <Link to="/restaurants">
            <Button size="lg" className="rounded-full px-8 h-14 text-base font-bold bg-transparent border-none text-primary hover:bg-primary hover:text-white transition-colors cursor-pointer">
              Explore restaurants
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </section>

      <footer className="border-t border-border py-8">
        <div className="container mx-auto px-4 flex items-center justify-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} LocalBuka. For Nigerian food lovers.
        </div>
      </footer>
    </div>
  );
}
