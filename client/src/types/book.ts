export interface Book {
  key: string;
  title: string;
  author_name?: string[];
  first_publish_year?: number;
  cover_i?: number;
  isbn?: string[];
  subject?: string[];
  publisher?: string[];
  language?: string[];
  number_of_pages_median?: number;
}

export interface OpenLibraryResponse {
  docs: Book[];
  numFound: number;
  start: number;
  numFoundExact: boolean;
}

export interface BookCardProps {
  book: Book;
  onToggleFavorite: (book: Book) => void;
  isFavorite: boolean;
}
