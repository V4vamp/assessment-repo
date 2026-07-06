import React from 'react';
import { Search } from 'lucide-react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="relative w-full max-w-md">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-muted-foreground">
        <Search className="h-5 w-5" aria-hidden="true" />
      </div>
      <input
        type="search"
        className="block w-full pl-10 pr-3 py-2 border border-input rounded-full leading-5 bg-card text-card-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring sm:text-sm transition-shadow shadow-sm hover:shadow"
        placeholder="Search for restaurants, cuisines, or dishes..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label="Search restaurants"
      />
    </div>
  );
}
