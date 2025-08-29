import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

interface SearchBarProps {
  onSearch: (query: string) => void;
  isLoading?: boolean;
}

export function SearchBar({ onSearch, isLoading }: SearchBarProps) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  const handleSuggestedSearch = (suggestion: string) => {
    setQuery(suggestion);
    onSearch(suggestion);
  };

  return (
    <section className="mb-12">
      <div className="max-w-2xl mx-auto">
        <form onSubmit={handleSubmit} className="relative">
          <Input
            type="text"
            placeholder="Search for books by title..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full px-6 py-4 text-lg bg-input border border-border rounded-lg search-focus outline-none transition-all duration-200 pl-14"
            data-testid="input-search"
            disabled={isLoading}
          />
          <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 text-muted-foreground text-lg w-5 h-5" />
          <Button
            type="submit"
            className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 transition-colors"
            disabled={isLoading || !query.trim()}
            data-testid="button-search"
          >
            Search
          </Button>
        </form>
        
        <div className="flex flex-wrap gap-2 mt-4 justify-center">
          <span className="text-sm text-muted-foreground mr-2">Try:</span>
          {['Harry Potter', 'The Great Gatsby', 'Pride and Prejudice'].map((suggestion) => (
            <Button
              key={suggestion}
              variant="secondary"
              size="sm"
              onClick={() => handleSuggestedSearch(suggestion)}
              className="text-sm bg-secondary text-secondary-foreground px-3 py-1 rounded-full hover:bg-secondary/80 transition-colors"
              data-testid={`button-suggestion-${suggestion.toLowerCase().replace(/\s+/g, '-')}`}
            >
              "{suggestion}"
            </Button>
          ))}
        </div>
      </div>
    </section>
  );
}
