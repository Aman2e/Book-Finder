import { Search, BookOpen, Sparkles } from 'lucide-react';

export function LoadingSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {Array.from({ length: 8 }).map((_, index) => (
        <div
          key={index}
          className="bg-card border-2 border-border/50 rounded-xl overflow-hidden shadow-lg"
          data-testid={`skeleton-book-${index}`}
          style={{
            animationDelay: `${index * 150}ms`
          }}
        >
          <div className="h-72 bg-muted book-shimmer relative">
            <div className="absolute top-3 right-3 w-8 h-8 bg-muted/80 rounded-full book-shimmer"></div>
            <div className="absolute top-3 left-3 w-12 h-5 bg-muted/80 rounded-full book-shimmer"></div>
          </div>
          <div className="p-5 space-y-3">
            <div className="space-y-2">
              <div className="h-5 bg-muted rounded-md book-shimmer"></div>
              <div className="h-4 bg-muted rounded-md book-shimmer w-3/4"></div>
            </div>
            <div className="h-4 bg-muted rounded-md book-shimmer w-2/3"></div>
            <div className="flex gap-2">
              <div className="h-5 bg-muted rounded-full book-shimmer w-16"></div>
              <div className="h-5 bg-muted rounded-full book-shimmer w-20"></div>
            </div>
            <div className="flex justify-between items-center pt-2">
              <div className="h-4 bg-muted rounded-md book-shimmer w-20"></div>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="w-3 h-3 bg-muted rounded-sm book-shimmer"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center py-16 fade-in" data-testid="loading-spinner">
      <div className="relative mb-6">
        <div className="loading-spinner text-primary mb-4">
          <BookOpen className="w-16 h-16" />
        </div>
        <div className="absolute -top-2 -right-2">
          <Search className="w-6 h-6 text-primary floating" />
        </div>
        <div className="absolute -bottom-2 -left-2">
          <Sparkles className="w-5 h-5 text-accent floating" style={{ animationDelay: '1s' }} />
        </div>
      </div>
      <div className="text-center space-y-2">
        <p className="text-foreground text-xl font-semibold">Searching for books...</p>
        <p className="text-muted-foreground text-sm">Finding the perfect reads for you</p>
      </div>
      <div className="flex space-x-1 mt-4">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="w-2 h-2 bg-primary rounded-full animate-pulse"
            style={{
              animationDelay: `${i * 0.2}s`,
              animationDuration: '1s'
            }}
          ></div>
        ))}
      </div>
    </div>
  );
}
