import { useState, useRef } from 'react';
import { Star, Upload, Loader2, CheckCircle, AlertCircle, X } from 'lucide-react';
import { useSubmitReview } from '../hooks/useSubmitReview';
import { WebsiteData } from '../types';

interface Props {
  templates: WebsiteData['templates'];
}

export default function ReviewForm({ templates }: Props) {
  const { submitReview, status, errorMessage, reset } = useSubmitReview();
  const fileRef = useRef<HTMLInputElement>(null);

  const [form, setForm] = useState({
    customer_name: '',
    rating: 0,
    review_text: '',
    wedding_date: '',
    template_used: '',
  });
  const [hoveredStar, setHoveredStar] = useState(0);
  const [photo, setPhoto] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);

  const set = (field: string, val: string | number) =>
    setForm((prev) => ({ ...prev, [field]: val }));

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    setPhoto(file);
    if (file) {
      const url = URL.createObjectURL(file);
      setPhotoPreview(url);
    } else {
      setPhotoPreview(null);
    }
  };

  const removePhoto = () => {
    setPhoto(null);
    setPhotoPreview(null);
    if (fileRef.current) fileRef.current.value = '';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.rating === 0) return;
    await submitReview({ ...form, photo });
  };

  if (status === 'success') {
    return (
      <div className="text-center py-14 flex flex-col items-center gap-4">
        <div className="w-16 h-16 rounded-full bg-gold/10 flex items-center justify-center mb-2">
          <CheckCircle size={32} className="text-gold" />
        </div>
        <h3 className="font-heading text-2xl text-charcoal">Thank you for your review!</h3>
        <p className="font-sans text-sm text-charcoal/50 max-w-xs">
          Your review has been submitted and will appear after approval. We appreciate your kind words.
        </p>
        <button
          onClick={reset}
          className="mt-4 px-6 py-2.5 border border-charcoal/15 text-[11px] uppercase tracking-widest hover:border-gold hover:text-gold transition-all"
        >
          Submit Another
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Name */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="review-name" className="font-sans text-[10px] uppercase tracking-widest text-charcoal/50">
            Your Name *
          </label>
          <input
            id="review-name"
            type="text"
            required
            placeholder="e.g. Aisha & Rahul"
            value={form.customer_name}
            onChange={(e) => set('customer_name', e.target.value)}
            className="px-4 py-3 bg-white border border-charcoal/10 text-sm text-charcoal placeholder:text-charcoal/25 focus:outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/20 transition-all"
          />
        </div>

        {/* Wedding date */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="review-date" className="font-sans text-[10px] uppercase tracking-widest text-charcoal/50">
            Wedding / Event Date
          </label>
          <input
            id="review-date"
            type="month"
            value={form.wedding_date}
            onChange={(e) => set('wedding_date', e.target.value)}
            className="px-4 py-3 bg-white border border-charcoal/10 text-sm text-charcoal focus:outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/20 transition-all"
          />
        </div>

        {/* Template used */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="review-template" className="font-sans text-[10px] uppercase tracking-widest text-charcoal/50">
            Template Used
          </label>
          <select
            id="review-template"
            value={form.template_used}
            onChange={(e) => set('template_used', e.target.value)}
            className="px-4 py-3 bg-white border border-charcoal/10 text-sm text-charcoal focus:outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/20 transition-all appearance-none"
          >
            <option value="">Select template…</option>
            {templates.map((t) => (
              <option key={t.id} value={t.name}>{t.name}</option>
            ))}
            <option value="Custom Design">Custom Design</option>
          </select>
        </div>

        {/* Rating */}
        <div className="flex flex-col gap-1.5">
          <label className="font-sans text-[10px] uppercase tracking-widest text-charcoal/50">
            Rating *
          </label>
          <div className="flex items-center gap-1 h-[46px]" role="group" aria-label="Star rating">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                aria-label={`Rate ${star} star${star > 1 ? 's' : ''}`}
                aria-pressed={form.rating === star}
                onClick={() => set('rating', star)}
                onMouseEnter={() => setHoveredStar(star)}
                onMouseLeave={() => setHoveredStar(0)}
                className="p-1 transition-transform hover:scale-110"
              >
                <Star
                  size={22}
                  className={`transition-colors ${
                    star <= (hoveredStar || form.rating) ? 'fill-gold text-gold' : 'text-charcoal/20'
                  }`}
                />
              </button>
            ))}
            {form.rating > 0 && (
              <span className="ml-2 text-[12px] text-charcoal/40">
                {['', 'Poor', 'Fair', 'Good', 'Great', 'Excellent'][form.rating]}
              </span>
            )}
          </div>
          {form.rating === 0 && (
            <p className="text-[11px] text-charcoal/35">Please select a rating to continue</p>
          )}
        </div>
      </div>

      {/* Review text */}
      <div className="flex flex-col gap-1.5 mt-5">
        <label htmlFor="review-text" className="font-sans text-[10px] uppercase tracking-widest text-charcoal/50">
          Your Experience *
        </label>
        <textarea
          id="review-text"
          required
          rows={4}
          placeholder="Tell us about your experience with INVYTRA…"
          value={form.review_text}
          onChange={(e) => set('review_text', e.target.value)}
          className="px-4 py-3 bg-white border border-charcoal/10 text-sm text-charcoal placeholder:text-charcoal/25 focus:outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/20 transition-all resize-none"
        />
      </div>

      {/* Photo upload */}
      <div className="mt-5">
        <label className="font-sans text-[10px] uppercase tracking-widest text-charcoal/50 block mb-2">
          Wedding Photo (optional)
        </label>
        {photoPreview ? (
          <div className="relative inline-block">
            <img
              src={photoPreview}
              alt="Preview"
              className="w-24 h-24 object-cover rounded-lg border border-charcoal/10"
            />
            <button
              type="button"
              onClick={removePhoto}
              className="absolute -top-2 -right-2 w-6 h-6 bg-charcoal text-white rounded-full flex items-center justify-center hover:bg-gold transition-colors"
              aria-label="Remove photo"
            >
              <X size={12} />
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            className="flex items-center gap-3 px-5 py-3 border border-dashed border-charcoal/20 text-charcoal/50 text-[12px] uppercase tracking-widest hover:border-gold hover:text-gold transition-all"
          >
            <Upload size={15} />
            Upload Photo
          </button>
        )}
        <input
          ref={fileRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          onChange={handleFile}
          className="sr-only"
          aria-label="Upload wedding photo"
        />
        <p className="mt-1.5 text-[10px] text-charcoal/30">JPEG, PNG or WebP · Max 5MB</p>
      </div>

      {/* Error message */}
      {status === 'error' && (
        <div className="mt-5 flex items-center gap-3 px-4 py-3 bg-red-50 border border-red-100 text-red-600 text-sm">
          <AlertCircle size={16} className="flex-shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Submit */}
      <div className="mt-7 flex items-center gap-4">
        <button
          type="submit"
          disabled={status === 'loading' || form.rating === 0 || !form.customer_name.trim() || !form.review_text.trim()}
          className="flex items-center gap-2 px-8 py-4 bg-charcoal text-white text-[11px] uppercase tracking-widest font-medium hover:bg-gold disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          aria-busy={status === 'loading'}
        >
          {status === 'loading' ? (
            <>
              <Loader2 size={14} className="animate-spin" />
              Submitting…
            </>
          ) : (
            'Submit Review'
          )}
        </button>
        <p className="text-[10px] text-charcoal/30 uppercase tracking-widest">
          Reviews appear after approval
        </p>
      </div>
    </form>
  );
}
