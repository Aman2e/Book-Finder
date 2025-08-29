import { useQuery } from '@tanstack/react-query';
import type { Book } from '@/types/book';

interface PopularBooksResponse {
  works: Book[];
  numFound: number;
}

// Popular book topics to fetch
const POPULAR_TOPICS = {
  classics: 'classic literature',
  bestsellers: 'bestseller',
  scifi: 'science fiction',
  mystery: 'mystery',
  romance: 'romance',
  fantasy: 'fantasy'
};

const fetchPopularBooksByTopic = async (topic: string): Promise<PopularBooksResponse> => {
  const response = await fetch(
    `https://openlibrary.org/search.json?subject=${encodeURIComponent(topic)}&sort=rating&limit=8`
  );
  
  if (!response.ok) {
    throw new Error(`Failed to fetch popular books: ${response.statusText}`);
  }
  
  const data = await response.json();
  
  return {
    works: data.docs || [],
    numFound: data.numFound || 0
  };
};

const fetchTrendingBooks = async (): Promise<PopularBooksResponse> => {
  // Fetch books sorted by popularity/rating
  const response = await fetch(
    'https://openlibrary.org/search.json?sort=new&limit=8&has_fulltext=true'
  );
  
  if (!response.ok) {
    throw new Error(`Failed to fetch trending books: ${response.statusText}`);
  }
  
  const data = await response.json();
  
  return {
    works: data.docs || [],
    numFound: data.numFound || 0
  };
};

export function usePopularBooks() {
  // Fetch different categories of popular books
  const classicsQuery = useQuery({
    queryKey: ['popular-books', 'classics'],
    queryFn: () => fetchPopularBooksByTopic(POPULAR_TOPICS.classics),
    staleTime: 1000 * 60 * 30, // 30 minutes
  });

  const bestsellersQuery = useQuery({
    queryKey: ['popular-books', 'bestsellers'],
    queryFn: () => fetchPopularBooksByTopic(POPULAR_TOPICS.bestsellers),
    staleTime: 1000 * 60 * 30, // 30 minutes
  });

  const trendingQuery = useQuery({
    queryKey: ['popular-books', 'trending'],
    queryFn: () => fetchTrendingBooks(),
    staleTime: 1000 * 60 * 15, // 15 minutes
  });

  const scifiQuery = useQuery({
    queryKey: ['popular-books', 'scifi'],
    queryFn: () => fetchPopularBooksByTopic(POPULAR_TOPICS.scifi),
    staleTime: 1000 * 60 * 30, // 30 minutes
  });

  const getBookCoverUrl = (coverId: number | undefined) => {
    if (!coverId) return 'https://via.placeholder.com/300x400?text=No+Cover';
    return `https://covers.openlibrary.org/b/id/${coverId}-M.jpg`;
  };

  return {
    classics: {
      data: classicsQuery.data?.works || [],
      isLoading: classicsQuery.isLoading,
      error: classicsQuery.error,
    },
    bestsellers: {
      data: bestsellersQuery.data?.works || [],
      isLoading: bestsellersQuery.isLoading,
      error: bestsellersQuery.error,
    },
    trending: {
      data: trendingQuery.data?.works || [],
      isLoading: trendingQuery.isLoading,
      error: trendingQuery.error,
    },
    scifi: {
      data: scifiQuery.data?.works || [],
      isLoading: scifiQuery.isLoading,
      error: scifiQuery.error,
    },
    getBookCoverUrl,
  };
}