import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart, Eye, Star, BookOpen } from 'lucide-react';
import { Book } from '@/types/book';

interface BookCardProps {
  book: Book;
  coverUrl: string | null;
  isFavorite: boolean;
  onToggleFavorite: () => void;
}

export function BookCard({ book, coverUrl, isFavorite, onToggleFavorite }: BookCardProps) {
  const [imageError, setImageError] = useState(false);
  const [isHeartAnimating, setIsHeartAnimating] = useState(false);

  const displayTitle = book.title || 'Unknown Title';
  const displayAuthor = book.author_name?.[0] || 'Unknown Author';
  const displayYear = book.first_publish_year || 'Unknown Year';
  const pageCount = book.number_of_pages_median;
  const subjects = book.subject?.slice(0, 2) || [];

  const fallbackImage = "https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=400";

  const handleFavoriteClick = () => {
    setIsHeartAnimating(true);
    onToggleFavorite();
    setTimeout(() => setIsHeartAnimating(false), 300);
  };

  return (
    <Card className="bg-card border-2 border-border/50 rounded-xl overflow-hidden book-card shadow-lg hover:shadow-xl transition-all duration-300 group" data-testid={`card-book-${book.key}`}>
      <div className="relative overflow-hidden">
        <img
          src={!imageError && coverUrl ? coverUrl : fallbackImage}
          alt={`Cover of ${displayTitle}`}
          className="w-full h-72 object-cover bg-muted transition-transform duration-500 group-hover:scale-110"
          onError={() => setImageError(true)}
          data-testid={`img-book-cover-${book.key}`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute top-3 right-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleFavoriteClick}
            className={`transition-all duration-300 p-2 h-auto rounded-full backdrop-blur-sm ${
              isFavorite 
                ? 'text-red-500 bg-white/90 hover:text-red-600 shadow-lg' 
                : 'text-white bg-black/20 hover:bg-white/20'
            } ${isHeartAnimating ? 'pulse-heart' : ''}`}
            data-testid={`button-favorite-${book.key}`}
          >
            <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
          </Button>
        </div>
        {displayYear !== 'Unknown Year' && (
          <div className="absolute top-3 left-3">
            <span className="bg-primary/90 text-primary-foreground text-xs font-medium px-2 py-1 rounded-full backdrop-blur-sm">
              {displayYear}
            </span>
          </div>
        )}
      </div>
      <CardContent className="p-5">
        <h3 className="font-bold text-lg text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors duration-200" data-testid={`text-book-title-${book.key}`}>
          {displayTitle}
        </h3>
        <p className="text-muted-foreground text-sm mb-3 flex items-center" data-testid={`text-book-author-${book.key}`}>
          <BookOpen className="w-4 h-4 mr-1" />
          by {displayAuthor}
        </p>
        
        {subjects.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {subjects.map((subject, index) => (
              <span 
                key={index}
                className="text-xs bg-secondary/60 text-secondary-foreground px-2 py-1 rounded-full border border-border/30"
              >
                {subject}
              </span>
            ))}
          </div>
        )}
        
        <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
          {pageCount && (
            <span className="flex items-center">
              <Star className="w-3 h-3 mr-1" />
              {pageCount} pages
            </span>
          )}
        </div>
        
        <div className="flex justify-between items-center">
          <Button
            variant="ghost"
            size="sm"
            className="text-primary hover:text-primary/80 transition-all duration-200 text-sm p-0 h-auto font-medium group-hover:translate-x-1"
            data-testid={`button-view-details-${book.key}`}
          >
            <Eye className="w-4 h-4 mr-1" />
            View Details
          </Button>
          <div className="flex items-center space-x-2">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className="w-3 h-3 text-yellow-400 fill-current"
                />
              ))}
            </div>
            <span className="text-xs text-muted-foreground">4.2</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
