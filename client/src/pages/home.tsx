import { AlertCircle, Search, BookOpen, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SearchBar } from '@/components/search-bar';
import { BookCard } from '@/components/book-card';
import { LoadingSkeleton, LoadingSpinner } from '@/components/loading-skeleton';
import { ThemeToggle } from '@/components/theme-toggle';
import { useBookSearch } from '@/hooks/use-book-search';

export default function Home() {
  const {
    searchResults,
    isLoading,
    error,
    totalResults,
    recentSearches,
    hasSearched,
    handleSearch,
    toggleFavorite,
    isFavorite,
    clearRecentSearches,
    getBookCoverUrl,
    refetch,
  } = useBookSearch();

  const renderSearchResults = () => {
    if (isLoading) {
      return (
        <div>
          <LoadingSpinner />
          <LoadingSkeleton />
        </div>
      );
    }

    if (error) {
      return (
        <div className="flex flex-col items-center justify-center py-16 text-center" data-testid="error-state">
          <div className="text-6xl text-destructive mb-4">
            <AlertCircle className="w-16 h-16 mx-auto" />
          </div>
          <h3 className="text-xl font-semibold text-foreground mb-2">Oops! Something went wrong</h3>
          <p className="text-muted-foreground mb-6 max-w-md">
            We couldn't fetch the books right now. Please check your connection and try again.
          </p>
          <Button
            onClick={() => refetch()}
            className="bg-primary text-primary-foreground px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors"
            data-testid="button-retry"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Try Again
          </Button>
        </div>
      );
    }

    if (hasSearched && searchResults.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center py-16 text-center" data-testid="no-results-state">
          <div className="text-6xl text-muted-foreground mb-4">
            <Search className="w-16 h-16 mx-auto" />
          </div>
          <h3 className="text-xl font-semibold text-foreground mb-2">No books found</h3>
          <p className="text-muted-foreground mb-6 max-w-md">
            We couldn't find any books matching your search. Try different keywords or check the spelling.
          </p>
          <div className="flex flex-wrap gap-2 justify-center">
            <span className="text-sm text-muted-foreground mr-2">Suggestions:</span>
            <Button variant="secondary" size="sm" className="text-sm">
              Try broader terms
            </Button>
            <Button variant="secondary" size="sm" className="text-sm">
              Check spelling
            </Button>
          </div>
        </div>
      );
    }

    if (hasSearched && searchResults.length > 0) {
      return (
        <div data-testid="results-grid">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold text-foreground">
              Search Results{' '}
              <span className="text-muted-foreground text-lg" data-testid="text-results-count">
                ({totalResults.toLocaleString()} books found)
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {searchResults.map((book) => (
              <BookCard
                key={book.key}
                book={book}
                coverUrl={getBookCoverUrl(book.cover_i)}
                isFavorite={isFavorite(book)}
                onToggleFavorite={() => toggleFavorite(book)}
              />
            ))}
          </div>
        </div>
      );
    }

    return null;
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      {/* Header */}
      <header className="bg-card border-b border-border shadow-sm">
        <div className="container mx-auto px-4 py-6 max-w-6xl">
          <div className="flex items-center justify-between">
            <div className="flex-1"></div>
            <div className="flex items-center text-center">
              <div>
                <h1 className="font-serif text-4xl md:text-5xl font-bold text-primary mb-2" data-testid="text-app-title">
                  <BookOpen className="inline-block mr-3 w-12 h-12" />
                  Book Finder
                </h1>
                <p className="text-muted-foreground text-lg" data-testid="text-app-subtitle">
                  Discover your next great read
                </p>
              </div>
            </div>
            <div className="flex-1 flex justify-end">
              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Search Section */}
        <SearchBar onSearch={handleSearch} isLoading={isLoading} />

        {/* Search Results */}
        <section id="search-results">
          {renderSearchResults()}
        </section>

        {/* Recent Searches */}
        {recentSearches.length > 0 && (
          <section className="mt-16 bg-muted/30 rounded-lg p-6" data-testid="recent-searches">
            <h3 className="font-serif text-xl font-semibold text-foreground mb-4">Recent Searches</h3>
            <div className="flex flex-wrap gap-2">
              {recentSearches.map((search, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  onClick={() => handleSearch(search)}
                  className="text-sm bg-card border border-border text-foreground px-3 py-2 rounded-md hover:bg-muted transition-colors"
                  data-testid={`button-recent-search-${index}`}
                >
                  "{search}"
                </Button>
              ))}
              <Button
                variant="ghost"
                size="sm"
                onClick={clearRecentSearches}
                className="text-sm text-muted-foreground px-3 py-2 hover:text-foreground transition-colors"
                data-testid="button-clear-recent"
              >
                <AlertCircle className="w-4 h-4 mr-1" />
                Clear All
              </Button>
            </div>
          </section>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-muted/30 border-t border-border mt-16">
        <div className="container mx-auto px-4 py-8 max-w-6xl">
          <div className="text-center">
            <p className="text-muted-foreground text-sm">
              Powered by{' '}
              <a 
                href="https://openlibrary.org" 
                className="text-primary hover:underline" 
                target="_blank" 
                rel="noopener noreferrer"
                data-testid="link-open-library"
              >
                Open Library API
              </a>
            </p>
            <p className="text-muted-foreground text-xs mt-2">
              Built with React, Tailwind CSS, and love for books 📚
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
