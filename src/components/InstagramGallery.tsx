import { useInView } from '../hooks/useInView';
import { WebsiteData } from '../types';

function InstagramIcon({ size = 15, className = '' }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

const galleryImages = [
  "https://images.pexels.com/photos/33344214/pexels-photo-33344214.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=600&w=600",
  "https://images.pexels.com/photos/5157294/pexels-photo-5157294.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=600&w=600",
  "https://images.pexels.com/photos/27638841/pexels-photo-27638841.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=600&w=600",
  "https://images.pexels.com/photos/36617802/pexels-photo-36617802.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=600&w=600",
  "https://images.pexels.com/photos/1730877/pexels-photo-1730877.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=600&w=600",
  "https://images.pexels.com/photos/3585810/pexels-photo-3585810.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=600&w=600",
  "https://images.pexels.com/photos/1616113/pexels-photo-1616113.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=600&w=600",
  "https://images.pexels.com/photos/931177/pexels-photo-931177.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=600&w=600",
];

export default function InstagramGallery({ contact }: { contact: WebsiteData['contact'] }) {
  const sectionRef = useInView(0.08);

  return (
    <section
      ref={sectionRef as React.RefObject<HTMLDivElement>}
      aria-label="Instagram gallery"
      className="py-20 relative overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #F5F1EB 0%, #FFFFFF 100%)',
        borderTop: '1px solid rgba(212,175,55,0.1)',
      }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div>
            <span className="reveal text-gold uppercase tracking-[0.35em] text-[11px] font-semibold mb-3 block">
              Instagram
            </span>
            <h2 className="reveal font-heading text-3xl md:text-4xl text-charcoal" data-delay="1">
              {contact.instagram}
            </h2>
            <p className="reveal font-sans text-sm text-charcoal/40 mt-2" data-delay="2">
              Follow our journey of beautiful celebrations
            </p>
          </div>
          <a
            href={contact.instagramUrl}
            target="_blank"
            rel="noreferrer"
            className="reveal flex items-center gap-2 px-7 py-3 border border-charcoal/15 text-charcoal text-[11px] uppercase tracking-widest font-medium hover:border-gold hover:text-gold transition-all duration-300 rounded-full group flex-shrink-0"
            data-delay="3"
            aria-label="Follow INVYTRA on Instagram"
          >
            <InstagramIcon size={15} className="group-hover:scale-110 transition-transform" />
            Follow Us
          </a>
        </div>

        {/* 4-col gallery */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {galleryImages.map((src, i) => (
            <a
              key={i}
              href={contact.instagramUrl}
              target="_blank"
              rel="noreferrer"
              className="reveal reveal-scale aspect-square overflow-hidden group cursor-pointer relative bg-beige-light rounded-xl shadow-glass block"
              data-delay={String((i % 4) + 1)}
              aria-label={`View on Instagram — photo ${i + 1}`}
            >
              <img
                src={src}
                alt={`INVYTRA Instagram post ${i + 1}`}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                loading="lazy"
                decoding="async"
              />
              <div className="absolute inset-0 bg-ink/0 group-hover:bg-ink/45 transition-colors duration-500 flex items-center justify-center rounded-xl">
                <div className="w-10 h-10 rounded-full bg-white/90 flex items-center justify-center opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100 transition-all duration-300">
                  <InstagramIcon size={16} className="text-charcoal" />
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}