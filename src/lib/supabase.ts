import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn(
    '[INVYTRA] Supabase environment variables are not configured. ' +
    'Reviews will not be loaded from the database. ' +
    'Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to your .env.local file.'
  );
}

export const supabase = createClient(
  supabaseUrl ?? '',
  supabaseAnonKey ?? '',
  {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  }
);

/**
 * SQL to create the reviews table in your Supabase project:
 *
 * CREATE TABLE reviews (
 *   id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
 *   customer_name text NOT NULL,
 *   rating integer NOT NULL CHECK (rating BETWEEN 1 AND 5),
 *   review_text text NOT NULL,
 *   wedding_date date,
 *   template_used text,
 *   photo_url text,
 *   approved boolean DEFAULT false,
 *   created_at timestamptz DEFAULT now()
 * );
 *
 * -- Enable RLS
 * ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
 *
 * -- Allow anyone to insert (submit a review)
 * CREATE POLICY "Anyone can submit reviews"
 *   ON reviews FOR INSERT WITH CHECK (true);
 *
 * -- Only show approved reviews publicly
 * CREATE POLICY "Show approved reviews"
 *   ON reviews FOR SELECT USING (approved = true);
 */
