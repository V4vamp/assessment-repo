const tags = [
  'All',
  'Nigerian Traditional',
  'Fast Food',
  'Local Nigerian',
  'African Continental',
  'Fried Chicken',
  'Pastries & Food',
  'Grill & BBQ',
  'Seafood',
  'Pizza'
];

interface FilterTagsProps {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
}

export function FilterTags({ activeFilter, onFilterChange }: FilterTagsProps) {
  return (
    <div className="w-full overflow-x-auto pb-2 scrollbar-hide">
      <div className="flex gap-2">
        {tags.map(tag => (
          <button
            key={tag}
            onClick={() => onFilterChange(tag)}
            className={`whitespace-nowrap px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ease-in-out ${
              activeFilter === tag
                ? 'bg-primary text-primary-foreground shadow-md scale-105'
                : 'bg-card text-card-foreground border border-card-border hover:bg-muted hover:border-muted-foreground'
            }`}
            aria-pressed={activeFilter === tag}
          >
            {tag}
          </button>
        ))}
      </div>
    </div>
  );
}
