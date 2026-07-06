import React from 'react';
import { SearchBar } from './SearchBar';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface NavbarProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
}

export function Navbar({ searchQuery, onSearchChange }: NavbarProps) {
  return (
    <header className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-md border-b border-border shadow-sm">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground shadow-md">
            <ShoppingBag className="h-6 w-6" />
          </div>
          <span className="text-xl font-bold tracking-tight text-foreground hidden sm:inline-block">
            Local<span className="text-primary">Buka</span>
          </span>
        </div>

        <div className="flex-1 max-w-xl flex justify-center">
          <SearchBar value={searchQuery} onChange={onSearchChange} />
        </div>

        <div className="flex items-center gap-4">
          <Avatar className="h-9 w-9 border border-border cursor-pointer hover:ring-2 hover:ring-primary transition-all">
            <AvatarImage src="https://i.pravatar.cc/150?u=a042581f4e29026024d" alt="User" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
}
