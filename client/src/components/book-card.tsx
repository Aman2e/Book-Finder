import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart, Eye } from 'lucide-react';
import { Book } from '@/types/book';

interface BookCardProps {
  book: Book;
  coverUrl: string | null;
  isFavorite: boolean;
  onToggleFavorite: () => void;
}

export function BookCard({ book, coverUrl, isFavorite, onToggleFavorite }: BookCardProps) {
  const [imageError, setImageError] = useState(false);

  const displayTitle = book.title || 'Unknown Title';
  const displayAuthor = book.author_name?.[0] || 'Unknown Author';
  const displayYear = book.first_publish_year || 'Unknown Year';

  const fallbackImage = "https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=400";

  return (
    <Card className="bg-card border border-border rounded-lg overflow-hidden book-card shadow-sm" data-testid={`card-book-${book.key}`}>
      <div className="relative">
        <img
          src={!imageError && coverUrl ? coverUrl : fallbackImage}
          alt={`Cover of ${displayTitle}`}
          className="w-full h-64 object-cover bg-muted"
          onError={() => setImageError(true)}
          data-testid={`img-book-cover-${book.key}`}
        />
      </div>
      <CardContent className="p-4">
        <h3 className="font-semibold text-lg text-foreground mb-1 line-clamp-2" data-testid={`text-book-title-${book.key}`}>
          {displayTitle}
        </h3>
        <p className="text-muted-foreground text-sm mb-1" data-testid={`text-book-author-${book.key}`}>
          by {displayAuthor}
        </p>
        <p className="text-muted-foreground text-xs" data-testid={`text-book-year-${book.key}`}>
          Published: {displayYear}
        </p>
        <div className="mt-3 flex justify-between items-center">
          <Button
            variant="ghost"
            size="sm"
            className="text-primary hover:text-primary/80 transition-colors text-sm p-0 h-auto"
            data-testid={`button-view-details-${book.key}`}
          >
            <Eye className="w-4 h-4 mr-1" />
            View Details
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggleFavorite}
            className={`transition-colors p-0 h-auto ${
              isFavorite 
                ? 'text-red-500 hover:text-red-600' 
                : 'text-accent hover:text-accent/80'
            }`}
            data-testid={`button-favorite-${book.key}`}
          >
            <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
