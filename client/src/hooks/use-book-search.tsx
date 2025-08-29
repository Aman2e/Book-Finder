import { useState, useCallback, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Book, OpenLibraryResponse } from '@/types/book';

const OPEN_LIBRARY_API = 'https://openlibrary.org/search.json';

export function useBookSearch() {
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [favorites, setFavorites] = useState<Book[]>([]);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);

  // Debounce search query
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery.trim());
    }, 500);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Load favorites and recent searches from localStorage
  useEffect(() => {
    const savedFavorites = localStorage.getItem('book-finder-favorites');
    const savedSearches = localStorage.getItem('book-finder-recent-searches');
    
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
    
    if (savedSearches) {
      setRecentSearches(JSON.parse(savedSearches));
    }
  }, []);

  const {
    data: searchResults,
    isLoading,
    error,
    refetch
  } = useQuery<OpenLibraryResponse>({
    queryKey: ['books', debouncedQuery],
    queryFn: async ({ queryKey }) => {
      const [, query] = queryKey;
      if (!query || typeof query !== 'string' || query.length < 2) {
        return { docs: [], numFound: 0, start: 0, numFoundExact: false };
      }

      const url = `${OPEN_LIBRARY_API}?title=${encodeURIComponent(query)}&limit=20&fields=key,title,author_name,first_publish_year,cover_i,isbn,subject,publisher,language,number_of_pages_median`;
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`Search failed: ${response.status} ${response.statusText}`);
      }
      
      return response.json();
    },
    enabled: debouncedQuery.length >= 2,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
    
    // Add to recent searches if not empty and not already in list
    if (query.trim() && !recentSearches.includes(query.trim())) {
      const newRecentSearches = [query.trim(), ...recentSearches].slice(0, 5);
      setRecentSearches(newRecentSearches);
      localStorage.setItem('book-finder-recent-searches', JSON.stringify(newRecentSearches));
    }
  }, [recentSearches]);

  const toggleFavorite = useCallback((book: Book) => {
    setFavorites(prev => {
      const isFavorited = prev.some(fav => fav.key === book.key);
      let newFavorites;
      
      if (isFavorited) {
        newFavorites = prev.filter(fav => fav.key !== book.key);
      } else {
        newFavorites = [...prev, book];
      }
      
      localStorage.setItem('book-finder-favorites', JSON.stringify(newFavorites));
      return newFavorites;
    });
  }, []);

  const isFavorite = useCallback((book: Book) => {
    return favorites.some(fav => fav.key === book.key);
  }, [favorites]);

  const clearRecentSearches = useCallback(() => {
    setRecentSearches([]);
    localStorage.removeItem('book-finder-recent-searches');
  }, []);

  const getBookCoverUrl = useCallback((coverId?: number) => {
    if (!coverId) return null;
    return `https://covers.openlibrary.org/b/id/${coverId}-M.jpg`;
  }, []);

  return {
    searchQuery,
    searchResults: searchResults?.docs || [],
    isLoading,
    error,
    favorites,
    recentSearches,
    totalResults: searchResults?.numFound || 0,
    handleSearch,
    toggleFavorite,
    isFavorite,
    clearRecentSearches,
    getBookCoverUrl,
    refetch,
    hasSearched: debouncedQuery.length >= 2,
  };
}
