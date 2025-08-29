export function LoadingSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {Array.from({ length: 8 }).map((_, index) => (
        <div
          key={index}
          className="bg-card border border-border rounded-lg overflow-hidden book-shimmer"
          data-testid={`skeleton-book-${index}`}
        >
          <div className="h-64 bg-muted"></div>
          <div className="p-4">
            <div className="h-4 bg-muted rounded mb-2"></div>
            <div className="h-3 bg-muted rounded mb-1 w-3/4"></div>
            <div className="h-3 bg-muted rounded w-1/2"></div>
          </div>
        </div>
      ))}
    </div>
  );
}

export function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center py-16" data-testid="loading-spinner">
      <div className="loading-spinner text-4xl text-primary mb-4">
        <i className="fas fa-book"></i>
      </div>
      <p className="text-muted-foreground text-lg">Searching for books...</p>
    </div>
  );
}
