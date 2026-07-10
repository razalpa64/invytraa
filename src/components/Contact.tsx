import { useInView } from '../hooks/useInView';
import { WebsiteData } from '../types';
import { Mail, MessageCircle } from 'lucide-react';

export default function Contact({ contact }: { contact: WebsiteData['contact'] }) {
  const sectionRef = useInView(0.1);

  const handleWhatsApp = () => {
    window.open(`https://wa.me/${contact.whatsapp.replace(/[^0-9]/g, '')}`, '_blank');
  };

  return (
    <section id="contact" ref={sectionRef as React.RefObject<HTMLElement>} className="py-32 relative overflow-hidden" style={{
      background: 'linear-gradient(135deg, #FAF8F4 0%, #F5F1EB 100%)'
    }}>
      <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-gold/6 blur-3xl pointer-events-none animate-float-slow" />
      <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-champagne/40 blur-3xl pointer-events-none animate-float-slower" />

      <div className="max-w-5xl mx-auto px-6 md:px-12 relative z-10">
        <div className="reveal reveal-scale glass-card rounded-3xl shadow-luxury p-10 md:p-20 text-center relative overflow-hidden border border-white/50">
          <div className="absolute top-6 left-6 w-10 h-10 border-t-2 border-l-2 border-gold/20" />
          <div className="absolute top-6 right-6 w-10 h-10 border-t-2 border-r-2 border-gold/20" />
          <div className="absolute bottom-6 left-6 w-10 h-10 border-b-2 border-l-2 border-gold/20" />
          <div className="absolute bottom-6 right-6 w-10 h-10 border-b-2 border-r-2 border-gold/20" />
          <div className="absolute top-0 right-0 w-64 h-64 bg-gold/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-bronze/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none" />

          <div className="relative z-10">
            <span className="text-gold uppercase tracking-[0.3em] text-xs font-semibold mb-4 block">Get in Touch</span>
            <h2 className="font-heading text-4xl md:text-6xl text-charcoal mb-6">Start Your Masterpiece</h2>
            <div className="flex items-center justify-center gap-4 mb-10">
              <div className="h-[1px] w-16 gold-line" />
              <div className="w-1 h-1 rounded-full bg-gold/50" />
              <div className="h-[1px] w-16 gold-line" />
            </div>
            <p className="font-sans text-charcoal/60 max-w-lg mx-auto mb-14 text-lg font-light">
              Ready to create an unforgettable digital experience for your guests? Reach out directly.
            </p>

            <div className="flex flex-col md:flex-row items-center justify-center gap-5">
              <button
                onClick={handleWhatsApp}
                className="w-full md:w-auto flex items-center justify-center gap-3 px-8 py-4 bg-charcoal text-white rounded-full hover:bg-gold transition-colors duration-300 group"
              >
                <MessageCircle size={18} className="group-hover:scale-110 transition-transform" />
                <span className="text-sm uppercase tracking-widest font-medium">Chat on WhatsApp</span>
              </button>
              <a
                href={`mailto:${contact.email}`}
                className="w-full md:w-auto flex items-center justify-center gap-3 px-8 py-4 border border-charcoal/20 text-charcoal rounded-full hover:border-gold hover:text-gold transition-all duration-300"
              >
                <Mail size={18} />
                <span className="text-sm uppercase tracking-widest font-medium">Send Email</span>
              </a>
              <a
                href={contact.instagramUrl}
                target="_blank"
                rel="noreferrer"
                className="w-full md:w-auto flex items-center justify-center gap-3 px-8 py-4 border border-charcoal/20 text-charcoal rounded-full hover:border-gold hover:text-gold transition-all duration-300"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                <span className="text-sm uppercase tracking-widest font-medium">Follow Us</span>
              </a>
            </div>

            <div className="mt-16 pt-16 border-t border-charcoal/8 flex flex-col md:flex-row justify-center gap-8 md:gap-20">
              <div>
                <p className="font-sans text-xs text-charcoal/35 uppercase tracking-widest mb-2">WhatsApp</p>
                <p className="font-heading text-xl text-charcoal">{contact.displayWhatsapp}</p>
              </div>
              <div>
                <p className="font-sans text-xs text-charcoal/35 uppercase tracking-widest mb-2">Email</p>
                <p className="font-heading text-xl text-charcoal">{contact.email}</p>
              </div>
              <div>
                <p className="font-sans text-xs text-charcoal/35 uppercase tracking-widest mb-2">Instagram</p>
                <p className="font-heading text-xl text-charcoal">{contact.instagram}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}