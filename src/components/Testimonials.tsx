import { useReviews } from '../hooks/useReviews';
import { WebsiteData } from '../types';
import { Star, Quote, BadgeCheck } from 'lucide-react';

export default function Testimonials({ testimonials: staticReviews }: { testimonials: WebsiteData['testimonials'] }) {
  const sectionRef = useInView(0.1);
  const { reviews: dbReviews, loading } = useReviews();

  // Merge static JSON reviews with dynamic approved Supabase reviews
  const mergedReviews = [
    ...dbReviews.map(r => ({
      name: r.customer_name,
      event: r.template_used || 'Wedding',
      text: r.review_text,
      rating: r.rating,
      weddingDate: r.wedding_date ? new Date(r.wedding_date).toLocaleDateString('en-US', { year: 'numeric', month: 'long' }) : undefined,
      templateUsed: r.template_used,
      verified: true
    })),
    ...staticReviews
  ];

  const avgRating = mergedReviews.reduce((sum, t) => sum + t.rating, 0) / (mergedReviews.length || 1);

  return (
    <section
      id="reviews"
      ref={sectionRef as React.RefObject<HTMLDivElement>}
      aria-label="Customer reviews"
      className="py-28 relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #F5F1EB 0%, #FAF8F4 100%)' }}
    >
      <div className="absolute top-10 right-10 w-64 h-64 rounded-full bg-gold/6 blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-64 h-64 rounded-full bg-champagne/40 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Header */}
        <div className="text-center mb-6">
          <span className="reveal text-gold uppercase tracking-[0.35em] text-[11px] font-semibold mb-4 block">
            Client Voices
          </span>
          <h2 className="reveal font-heading text-4xl md:text-5xl lg:text-6xl text-charcoal mb-4" data-delay="1">
            Kind Words
          </h2>

          {/* Average rating display */}
          <div className="reveal flex items-center justify-center gap-3 mb-6" data-delay="2">
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} size={18} className="fill-gold text-gold" />
              ))}
            </div>
            <span className="font-heading text-2xl text-charcoal">{avgRating.toFixed(1)}</span>
            <span className="font-sans text-sm text-charcoal/40">({mergedReviews.length} reviews)</span>
          </div>

          <div className="reveal flex items-center justify-center gap-4 mt-4" data-delay="3">
            <div className="h-[1px] w-20 gold-line" />
            <div className="w-1.5 h-1.5 rotate-45 bg-gold/50" />
            <div className="h-[1px] w-20 gold-line" />
          </div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-7 mt-14">
          {mergedReviews.map((t, idx) => (
            <div
              key={idx}
              className="reveal glass-card p-9 rounded-2xl hover:shadow-luxury transition-all duration-500 hover:-translate-y-1.5 relative overflow-hidden"
              data-delay={String(idx + 1)}
            >
              {/* Quote icon */}
              <div className="absolute top-6 right-7 text-gold/8">
                <Quote size={56} fill="currentColor" />
              </div>

              {/* Stars */}
              <div className="flex gap-1 mb-5">
                {[...Array(t.rating)].map((_, i) => (
                  <Star key={i} size={13} className="text-gold fill-gold" />
                ))}
              </div>

              <p className="font-sans text-charcoal/70 text-[15px] leading-relaxed mb-7 italic relative z-10">
                "{t.text}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 pt-5 border-t border-charcoal/6">
                <div className="w-11 h-11 rounded-full bg-gold/12 border border-gold/20 flex items-center justify-center flex-shrink-0">
                  <span className="font-heading text-base text-gold">{t.name[0]}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <h4 className="font-heading text-lg text-charcoal">{t.name}</h4>
                    {t.verified && (
                      <BadgeCheck size={15} className="text-gold flex-shrink-0" aria-label="Verified customer" />
                    )}
                  </div>
                  <p className="font-sans text-[11px] text-gold uppercase tracking-widest mt-0.5">{t.event}</p>
                  {t.weddingDate && (
                    <p className="font-sans text-[10px] text-charcoal/35 mt-0.5">{t.weddingDate}</p>
                  )}
                </div>
                {t.templateUsed && (
                  <div className="text-right flex-shrink-0">
                    <span className="text-[9px] uppercase tracking-widest text-charcoal/25 block mb-0.5">Template</span>
                    <span className="text-[11px] text-charcoal/50 font-sans">{t.templateUsed}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}