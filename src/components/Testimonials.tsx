import { useInView } from '../hooks/useInView';
import { WebsiteData } from '../types';
import { Star, Quote } from 'lucide-react';

export default function Testimonials({ testimonials }: { testimonials: WebsiteData['testimonials'] }) {
  const sectionRef = useInView(0.1);

  return (
    <section ref={sectionRef as React.RefObject<HTMLDivElement>} className="py-32 relative overflow-hidden" style={{
      background: 'linear-gradient(135deg, #F5F1EB 0%, #FAF8F4 100%)'
    }}>
      <div className="absolute top-0 left-0 w-full h-full opacity-[0.025] pointer-events-none"
        style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/cubes.png')" }} />
      <div className="absolute top-10 right-10 w-64 h-64 rounded-full bg-gold/6 blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-64 h-64 rounded-full bg-champagne/40 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="text-center mb-20">
          <span className="reveal text-gold uppercase tracking-[0.3em] text-xs font-semibold mb-4 block">Testimonials</span>
          <h2 className="reveal font-heading text-4xl md:text-5xl lg:text-6xl text-charcoal mb-4" data-delay="1">Kind Words</h2>
          <div className="reveal flex items-center justify-center gap-4 mt-8" data-delay="2">
            <div className="h-[1px] w-20 gold-line" />
            <div className="w-1.5 h-1.5 rotate-45 bg-gold/50" />
            <div className="h-[1px] w-20 gold-line" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="reveal glass-card p-10 rounded-2xl hover:shadow-luxury transition-all duration-500 hover:-translate-y-1 relative"
              data-delay={String(idx + 1)}
            >
              <div className="absolute top-6 right-8 text-gold/10">
                <Quote size={48} fill="currentColor" />
              </div>
              <div className="flex gap-1 mb-6">
                {[...Array(t.rating)].map((_, i) => (
                  <Star key={i} size={14} className="text-gold fill-gold" />
                ))}
              </div>
              <p className="font-sans text-charcoal/75 text-lg leading-relaxed mb-8 italic relative z-10">
                "{t.text}"
              </p>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-gold/15 border border-gold/20 flex items-center justify-center">
                  <span className="font-heading text-sm text-gold">{t.name[0]}</span>
                </div>
                <div>
                  <h4 className="font-heading text-xl text-charcoal">{t.name}</h4>
                  <p className="font-sans text-xs text-gold uppercase tracking-widest mt-0.5">{t.event}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}