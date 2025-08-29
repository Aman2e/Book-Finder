import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Sparkles } from 'lucide-react';

interface SearchBarProps {
  onSearch: (query: string) => void;
  isLoading?: boolean;
}

export function SearchBar({ onSearch, isLoading }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [isAnimating, setIsAnimating] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      setIsAnimating(true);
      onSearch(query.trim());
      setTimeout(() => setIsAnimating(false), 600);
    }
  };

  const handleSuggestedSearch = (suggestion: string) => {
    setQuery(suggestion);
    setIsAnimating(true);
    onSearch(suggestion);
    setTimeout(() => setIsAnimating(false), 600);
  };

  useEffect(() => {
    if (isLoading) {
      setIsAnimating(true);
    } else {
      setTimeout(() => setIsAnimating(false), 300);
    }
  }, [isLoading]);

  return (
    <section className="mb-12 fade-in">
      <div className="max-w-2xl mx-auto">
        <div className="relative mb-4">
          <div className="flex items-center justify-center mb-6">
            <Sparkles className={`w-6 h-6 text-orange-500 dark:text-orange-400 mr-2 ${isAnimating ? 'floating' : ''} transition-all duration-300`} />
            <h2 className="text-xl font-semibold text-foreground dark:text-foreground">Find Your Next Great Read</h2>
            <Sparkles className={`w-6 h-6 text-orange-500 dark:text-orange-400 ml-2 ${isAnimating ? 'floating' : ''} transition-all duration-300`} />
          </div>
        </div>
        
        <form onSubmit={handleSubmit} className="relative search-container">
          <div className="relative">
            <Input
              type="text"
              placeholder="Search for books by title..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full px-6 py-5 text-lg bg-input dark:bg-input border-2 border-border dark:border-border rounded-xl search-focus outline-none transition-all duration-300 pl-14 text-foreground dark:text-foreground placeholder:text-muted-foreground dark:placeholder:text-muted-foreground"
              data-testid="input-search"
              disabled={isLoading}
            />
            <Search className={`absolute left-5 top-1/2 transform -translate-y-1/2 text-muted-foreground dark:text-muted-foreground w-5 h-5 transition-all duration-300 ${isAnimating ? 'animate-pulse text-orange-500 dark:text-orange-400' : ''}`} />
            <Button
              type="submit"
              className={`absolute right-3 top-1/2 transform -translate-y-1/2 gradient-button px-6 py-2 rounded-lg font-medium transition-all duration-300 ${isAnimating ? 'animate-pulse' : ''}`}
              disabled={isLoading || !query.trim()}
              data-testid="button-search"
            >
              {isLoading ? (
                <div className="flex items-center">
                  <div className="loading-spinner w-4 h-4 mr-2">🔍</div>
                  Searching...
                </div>
              ) : (
                'Search'
              )}
            </Button>
          </div>
        </form>
        
        <div className="flex flex-wrap gap-3 mt-6 justify-center">
          <span className="text-sm font-medium text-muted-foreground mr-2 flex items-center">
            <Sparkles className="w-4 h-4 mr-1" />
            Popular searches:
          </span>
          {['Harry Potter', 'The Great Gatsby', 'Pride and Prejudice', 'Dune', 'To Kill a Mockingbird'].map((suggestion, index) => (
            <Button
              key={suggestion}
              variant="secondary"
              size="sm"
              onClick={() => handleSuggestedSearch(suggestion)}
              className="text-sm bg-secondary/80 backdrop-blur-sm text-secondary-foreground px-4 py-2 rounded-full hover:bg-secondary hover:scale-105 transition-all duration-300 border border-border/50 shadow-sm"
              data-testid={`button-suggestion-${suggestion.toLowerCase().replace(/\s+/g, '-')}`}
              style={{
                animationDelay: `${index * 100}ms`
              }}
            >
              "{suggestion}"
            </Button>
          ))}
        </div>
      </div>
    </section>
  );
}
