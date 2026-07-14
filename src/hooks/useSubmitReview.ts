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

      // Format YYYY-MM month inputs into valid YYYY-MM-01 dates for Postgres DATE field
      let formattedDate = data.wedding_date || null;
      if (formattedDate && formattedDate.length === 7) {
        formattedDate = `${formattedDate}-01`;
      }

      // Insert review (pending approval)
      const { error: insertError } = await supabase.from('reviews').insert({
        customer_name: data.customer_name.trim(),
        rating: data.rating,
        review_text: data.review_text.trim(),
        wedding_date: formattedDate,
        template_used: data.template_used || null,
        photo_url,
        approved: false, // Admin must approve before it's shown publicly
      });

      if (insertError) throw insertError;

      setStatus('success');
    } catch (err) {
      console.error('[INVYTRA Review Submit]', err);
      let msg = 'Submission failed. Please try again.';
      if (err && typeof err === 'object') {
        if ('message' in err && typeof err.message === 'string') {
          msg = err.message;
        }
      } else if (typeof err === 'string') {
        msg = err;
      }
      setErrorMessage(msg);
      setStatus('error');
    }
  };

  const reset = () => {
    setStatus('idle');
    setErrorMessage(null);
  };

  return { submitReview, status, errorMessage, reset };
}
