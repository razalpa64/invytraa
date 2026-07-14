import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

export interface Review {
  id: string;
  customer_name: string;
  rating: number;
  review_text: string;
  wedding_date?: string;
  template_used?: string;
  photo_url?: string;
  created_at: string;
}

export function useReviews() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const { data, error: sbError } = await supabase
          .from('reviews')
          .select('*')
          .eq('approved', true)
          .order('created_at', { ascending: false })
          .limit(20);

        if (sbError) throw sbError;
        setReviews(data ?? []);
      } catch (err) {
        const msg = err instanceof Error ? err.message : 'Failed to load reviews';
        setError(msg);
        console.error('[INVYTRA Reviews]', msg);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  return { reviews, loading, error };
}
