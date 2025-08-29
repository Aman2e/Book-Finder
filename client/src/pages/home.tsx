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
    <div className="min-h-screen text-foreground font-sans" style={{ background: 'var(--background)' }}>
      {/* Header */}
      <header className="backdrop-blur-sm border-b border-border/50 shadow-lg relative overflow-hidden" style={{ background: 'var(--card)' }}>
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-accent/5"></div>
        <div className="container mx-auto px-4 py-6 max-w-6xl relative z-10">
          <div className="flex items-center justify-between">
            {/* Logo and Name */}
            <div className="flex items-center space-x-3 slide-up">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center shadow-lg">
                  <BookOpen className="w-7 h-7 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-accent rounded-full flex items-center justify-center">
                  <span className="text-xs text-white font-bold">📚</span>
                </div>
              </div>
              <div>
                <h1 className="font-serif text-2xl md:text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent" data-testid="text-app-title">
                  Book Finder
                </h1>
                <p className="text-xs text-muted-foreground font-medium">
                  Your Literary Discovery Platform
                </p>
              </div>
            </div>

            {/* Center Title for larger screens */}
            <div className="hidden lg:flex items-center text-center flex-1 justify-center">
              <div className="slide-up">
                <h2 className="font-serif text-3xl font-bold mb-2 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                  Discover Your Next Great Read ✨
                </h2>
                <p className="text-muted-foreground text-sm font-medium">
                  Search millions of books • Find hidden gems • Build your reading list
                </p>
              </div>
            </div>

            {/* Theme Toggle */}
            <div className="flex justify-end">
              <ThemeToggle />
            </div>
          </div>

          {/* Mobile center content */}
          <div className="lg:hidden mt-6 text-center slide-up">
            <h2 className="font-serif text-xl font-bold mb-2 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              Discover Your Next Great Read ✨
            </h2>
            <p className="text-muted-foreground text-sm font-medium">
              Search millions of books • Find hidden gems • Build your reading list
            </p>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Search Section */}
        <SearchBar onSearch={handleSearch} isLoading={isLoading} />

        {/* Search Results */}
        <section id="search-results" className="slide-up">
          {renderSearchResults()}
        </section>

        {/* Recent Searches */}
        {recentSearches.length > 0 && (
          <section className="mt-16 bg-muted/20 backdrop-blur-sm rounded-2xl p-8 border border-border/50 shadow-lg fade-in" data-testid="recent-searches">
            <h3 className="font-serif text-2xl font-bold text-foreground mb-6 flex items-center">
              <BookOpen className="w-6 h-6 mr-2 text-primary" />
              Recent Searches
            </h3>
            <div className="flex flex-wrap gap-3">
              {recentSearches.map((search, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  onClick={() => handleSearch(search)}
                  className="text-sm bg-card/80 backdrop-blur-sm border-2 border-border/60 text-foreground px-4 py-2 rounded-full hover:bg-muted hover:scale-105 transition-all duration-300 shadow-sm"
                  data-testid={`button-recent-search-${index}`}
                  style={{
                    animationDelay: `${index * 100}ms`
                  }}
                >
                  "{search}"
                </Button>
              ))}
              <Button
                variant="ghost"
                size="sm"
                onClick={clearRecentSearches}
                className="text-sm text-muted-foreground px-4 py-2 hover:text-foreground hover:bg-destructive/10 transition-all duration-300 rounded-full"
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
      <footer className="bg-muted/20 backdrop-blur-sm border-t border-border/50 mt-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-accent/5"></div>
        <div className="container mx-auto px-4 py-12 max-w-6xl relative z-10">
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <BookOpen className="w-5 h-5 text-primary" />
              <span className="font-medium text-foreground">Book Finder</span>
            </div>
            <p className="text-muted-foreground text-sm">
              Powered by{' '}
              <a 
                href="https://openlibrary.org" 
                className="text-primary hover:underline font-medium transition-colors" 
                target="_blank" 
                rel="noopener noreferrer"
                data-testid="link-open-library"
              >
                Open Library API
              </a>
            </p>
            <p className="text-muted-foreground text-xs">
              Built with React, Tailwind CSS, and love for books 📚
            </p>
            <div className="flex justify-center space-x-6 pt-4">
              <span className="text-xs text-muted-foreground">Discover</span>
              <span className="text-xs text-muted-foreground">•</span>
              <span className="text-xs text-muted-foreground">Explore</span>
              <span className="text-xs text-muted-foreground">•</span>
              <span className="text-xs text-muted-foreground">Enjoy</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
