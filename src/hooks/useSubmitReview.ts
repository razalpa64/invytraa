import { useState } from 'react';
import { supabase } from '../lib/supabase';

export interface ReviewSubmission {
  customer_name: string;
  rating: number;
  review_text: string;
  wedding_date?: string;
  template_used?: string;
  photo?: File | null;
}

export type SubmitStatus = 'idle' | 'loading' | 'success' | 'error';

export function useSubmitReview() {
  const [status, setStatus] = useState<SubmitStatus>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const submitReview = async (data: ReviewSubmission) => {
    setStatus('loading');
    setErrorMessage(null);

    try {
      let photo_url: string | null = null;

      // Upload photo to Supabase Storage if provided
      if (data.photo) {
        const fileExt = data.photo.name.split('.').pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${fileExt}`;

        const { error: uploadError } = await supabase.storage
          .from('review-photos')
          .upload(fileName, data.photo, {
            cacheControl: '3600',
            upsert: false,
            contentType: data.photo.type,
          });

        if (uploadError) {
          // Non-blocking — photo upload failure won't prevent review submission
          console.warn('[INVYTRA] Photo upload failed:', uploadError.message);
        } else {
          const { data: urlData } = supabase.storage
            .from('review-photos')
            .getPublicUrl(fileName);
          photo_url = urlData?.publicUrl ?? null;
        }
      }

      // Insert review (pending approval)
      const { error: insertError } = await supabase.from('reviews').insert({
        customer_name: data.customer_name.trim(),
        rating: data.rating,
        review_text: data.review_text.trim(),
        wedding_date: data.wedding_date || null,
        template_used: data.template_used || null,
        photo_url,
        approved: false, // Admin must approve before it's shown publicly
      });

      if (insertError) throw insertError;

      setStatus('success');
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Submission failed. Please try again.';
      setErrorMessage(msg);
      setStatus('error');
      console.error('[INVYTRA Review Submit]', msg);
    }
  };

  const reset = () => {
    setStatus('idle');
    setErrorMessage(null);
  };

  return { submitReview, status, errorMessage, reset };
}
