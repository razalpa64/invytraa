import { useInView } from '../hooks/useInView';
import { WebsiteData } from '../types';

const galleryImages = [
  "https://images.pexels.com/photos/33344214/pexels-photo-33344214.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=400&w=400",
  "https://images.pexels.com/photos/5157294/pexels-photo-5157294.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=400&w=400",
  "https://images.pexels.com/photos/27638841/pexels-photo-27638841.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=400&w=400",
  "https://images.pexels.com/photos/36617802/pexels-photo-36617802.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=400&w=400",
];

export default function InstagramGallery({ contact }: { contact: WebsiteData['contact'] }) {
  const sectionRef = useInView(0.1);

  return (
    <section ref={sectionRef as React.RefObject<HTMLDivElement>} className="py-24 relative overflow-hidden" style={{
      background: 'linear-gradient(180deg, #F5F1EB 0%, #FFFFFF 100%)',
      borderTop: '1px solid rgba(212,175,55,0.12)'
    }}>
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row justify-between items-end mb-14 gap-6">
          <div>
            <span className="reveal text-gold uppercase tracking-[0.3em] text-xs font-semibold mb-3 block">Instagram</span>
            <h2 className="reveal font-heading text-3xl md:text-4xl text-charcoal" data-delay="1">{contact.instagram}</h2>
            <p className="reveal font-sans text-sm text-charcoal/45 mt-2" data-delay="2">Follow our journey of beautiful celebrations</p>
          </div>
          <a
            href={contact.instagramUrl}
            target="_blank"
            rel="noreferrer"
            className="reveal flex items-center gap-2 px-7 py-3 border border-charcoal/15 text-charcoal text-sm uppercase tracking-widest font-medium hover:border-gold hover:text-gold transition-all duration-300 rounded-full group"
            data-delay="3"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:scale-110 transition-transform"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
            Follow Us
          </a>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {galleryImages.map((src, i) => (
            <div
              key={i}
              className="reveal reveal-scale aspect-square overflow-hidden group cursor-pointer relative bg-beige-light rounded-xl shadow-glass"
              data-delay={String(i + 1)}
            >
              <img
                src={src}
                alt="Instagram post"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-ink/0 group-hover:bg-ink/40 transition-colors duration-500 flex items-center justify-center">
                <div className="w-10 h-10 rounded-full bg-white/90 flex items-center justify-center opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100 transition-all duration-400">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-charcoal"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}