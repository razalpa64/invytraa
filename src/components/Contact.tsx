import { useInView } from '../hooks/useInView';
import { WebsiteData } from '../types';
import { Mail, MessageCircle } from 'lucide-react';

function InstagramIcon({ size = 22, className = '' }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

interface ContactCard {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  label: string;
  value: string;
  sub?: string;
  action?: () => void;
  href?: string;
  color: string;
}

export default function Contact({ contact }: { contact: WebsiteData['contact'] }) {
  const sectionRef = useInView(0.1);

  const cards: ContactCard[] = [
    {
      icon: MessageCircle,
      label: 'WhatsApp',
      value: contact.displayWhatsapp,
      sub: 'Available 9am – 9pm IST',
      href: `https://wa.me/${contact.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent('Hello INVYTRA! I would like to discuss a digital invitation.')}`,
      color: 'from-green-500/10 to-emerald-500/5',
    },
    {
      icon: InstagramIcon,
      label: 'Instagram',
      value: contact.instagram,
      sub: 'Follow for inspiration',
      href: contact.instagramUrl,
      color: 'from-pink-500/10 to-purple-500/5',
    },
    {
      icon: Mail,
      label: 'Email',
      value: contact.email,
      sub: 'Response within 24 hours',
      href: `mailto:${contact.email}`,
      color: 'from-blue-500/10 to-indigo-500/5',
    },
  ];

  return (
    <section
      id="contact"
      ref={sectionRef as React.RefObject<HTMLElement>}
      aria-label="Contact us"
      className="py-28 relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #FAF8F4 0%, #F5F1EB 100%)' }}
    >
      <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-gold/6 blur-3xl pointer-events-none animate-float-slow" />
      <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-champagne/40 blur-3xl pointer-events-none animate-float-slower" />

      <div className="max-w-6xl mx-auto px-6 md:px-12 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="reveal text-gold uppercase tracking-[0.35em] text-[11px] font-semibold mb-4 block">
            Get in Touch
          </span>
          <h2 className="reveal font-heading text-4xl md:text-6xl text-charcoal mb-5" data-delay="1">
            Start Your Masterpiece
          </h2>
          <p className="reveal font-sans text-charcoal/55 max-w-lg mx-auto text-lg font-light" data-delay="2">
            Ready to create an unforgettable digital experience? Reach out — we'd love to hear about your celebration.
          </p>
          <div className="reveal flex items-center justify-center gap-4 mt-10" data-delay="3">
            <div className="h-[1px] w-16 gold-line" />
            <div className="w-1 h-1 rounded-full bg-gold/50" />
            <div className="h-[1px] w-16 gold-line" />
          </div>
        </div>

        {/* Contact cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-14 max-w-4xl mx-auto w-full">
          {cards.map((card, i) => {
            const Icon = card.icon;
            const content = (
              <div
                className={`reveal group h-full flex flex-col items-center text-center p-8 rounded-2xl border border-white/60 bg-gradient-to-br ${card.color} glass-card hover:shadow-luxury transition-all duration-500 hover:-translate-y-1.5 cursor-pointer`}
                data-delay={String(i + 1)}
              >
                <div className="w-14 h-14 rounded-full bg-white/70 border border-charcoal/8 flex items-center justify-center mb-5 group-hover:border-gold/30 group-hover:bg-gold/10 transition-all duration-400">
                  <Icon size={22} className="text-charcoal/60 group-hover:text-gold transition-colors duration-300" />
                </div>
                <p className="font-sans text-[10px] uppercase tracking-[0.25em] text-charcoal/40 mb-2">{card.label}</p>
                <p className="font-heading text-xl text-charcoal group-hover:text-gold transition-colors duration-300 break-all">{card.value}</p>
                {card.sub && <p className="font-sans text-[11px] text-charcoal/35 mt-2">{card.sub}</p>}
              </div>
            );

            return card.href ? (
              <a key={i} href={card.href} target={card.href.startsWith('http') ? '_blank' : undefined} rel="noreferrer">
                {content}
              </a>
            ) : (
              <div key={i}>{content}</div>
            );
          })}
        </div>

        {/* Primary CTA */}
        <div className="reveal text-center" data-delay="5">
          <a
            href={`https://wa.me/${contact.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent('Hello INVYTRA! I would like to start my invitation project.')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-10 py-4 bg-charcoal text-white text-[11px] uppercase tracking-widest hover:bg-gold transition-colors duration-400 font-medium group"
            aria-label="Start your project on WhatsApp"
          >
            <MessageCircle size={16} className="group-hover:scale-110 transition-transform" />
            Begin Your Invitation Journey
          </a>
        </div>
      </div>
    </section>
  );
}