import { Link } from 'react-router-dom';
import { SearchBar } from './SearchBar';
import { ShoppingBag } from 'lucide-react';

interface NavbarProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
}

export function Navbar({ searchQuery, onSearchChange }: NavbarProps) {
  return (
    <header className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-md border-b border-border shadow-sm">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground shadow-md">
            <ShoppingBag className="h-6 w-6" />
          </div>
          <span className="text-xl font-bold tracking-tight text-foreground hidden sm:inline-block">
            Local<span className="text-primary">Buka</span>
          </span>
        </Link>

        <div className="flex-1 max-w-xl flex justify-center">
          <SearchBar value={searchQuery} onChange={onSearchChange} />
        </div>
      </div>
    </header>
  );
}
