import { WebsiteData } from '../types';
import { Mail, MessageCircle, Heart } from 'lucide-react';

function InstagramIcon({ size = 15 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

interface Props {
  brandName: string;
  contact: WebsiteData['contact'];
}

const quickLinks = [
  { name: 'Templates', href: '#templates' },
  { name: 'About', href: '#about' },
  { name: 'How It Works', href: '#process' },
  { name: 'Reviews', href: '#reviews' },
  { name: 'FAQ', href: '#faq' },
  { name: 'Contact', href: '#contact' },
];

const legalLinks = [
  { name: 'Privacy Policy', href: '#' },
  { name: 'Refund Policy', href: '#' },
  { name: 'Terms of Service', href: '#' },
];

export default function Footer({ brandName, contact }: Props) {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-ink text-pearl border-t border-white/5" aria-label="Site footer">
      {/* Top section */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">

          {/* Col 1 — Brand */}
          <div className="lg:col-span-1">
            <h2 className="font-heading text-4xl tracking-[0.22em] uppercase text-gold mb-3">
              {brandName}
            </h2>
            <p className="font-sans text-[12px] text-beige-light/45 uppercase tracking-widest mb-6">
              Where Invitations Come Alive.
            </p>
            <p className="font-sans text-[13px] text-beige-light/35 leading-relaxed mb-7">
              Crafting bespoke luxury digital invitations that captivate your guests before the celebration begins.
            </p>
            {/* Social icons */}
            <div className="flex items-center gap-4">
              <a
                href={contact.instagramUrl}
                target="_blank"
                rel="noreferrer"
                aria-label="Follow INVYTRA on Instagram"
                className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-beige-light/40 hover:border-gold/50 hover:text-gold transition-all duration-300"
              >
                <InstagramIcon size={15} />
              </a>
              <a
                href={`https://wa.me/${contact.whatsapp.replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noreferrer"
                aria-label="Contact on WhatsApp"
                className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-beige-light/40 hover:border-gold/50 hover:text-gold transition-all duration-300"
              >
                <MessageCircle size={15} />
              </a>
              <a
                href={`mailto:${contact.email}`}
                aria-label="Send email to INVYTRA"
                className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-beige-light/40 hover:border-gold/50 hover:text-gold transition-all duration-300"
              >
                <Mail size={15} />
              </a>
            </div>
          </div>

          {/* Col 2 — Quick Links */}
          <div>
            <h3 className="font-sans text-[10px] uppercase tracking-[0.3em] text-gold/80 mb-6 font-semibold">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="font-sans text-[13px] text-beige-light/40 hover:text-gold transition-colors duration-300 uppercase tracking-widest"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 — Legal */}
          <div>
            <h3 className="font-sans text-[10px] uppercase tracking-[0.3em] text-gold/80 mb-6 font-semibold">
              Legal
            </h3>
            <ul className="space-y-3">
              {legalLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="font-sans text-[13px] text-beige-light/40 hover:text-gold transition-colors duration-300 uppercase tracking-widest"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4 — Contact */}
          <div>
            <h3 className="font-sans text-[10px] uppercase tracking-[0.3em] text-gold/80 mb-6 font-semibold">
              Contact
            </h3>
            <div className="space-y-4">
              <div>
                <p className="font-sans text-[10px] text-beige-light/30 uppercase tracking-widest mb-1">WhatsApp</p>
                <a
                  href={`https://wa.me/${contact.whatsapp.replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noreferrer"
                  className="font-heading text-xl text-beige-light hover:text-gold transition-colors"
                >
                  {contact.displayWhatsapp}
                </a>
              </div>
              <div>
                <p className="font-sans text-[10px] text-beige-light/30 uppercase tracking-widest mb-1">Email</p>
                <a
                  href={`mailto:${contact.email}`}
                  className="font-heading text-xl text-beige-light hover:text-gold transition-colors break-all"
                >
                  {contact.email}
                </a>
              </div>
              <div>
                <p className="font-sans text-[10px] text-beige-light/30 uppercase tracking-widest mb-1">Instagram</p>
                <a
                  href={contact.instagramUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="font-heading text-xl text-beige-light hover:text-gold transition-colors"
                >
                  {contact.instagram}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Gold divider */}
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="h-[1px] gold-line opacity-20" />
      </div>

      {/* Bottom bar */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-7">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-center">
          <p className="font-sans text-[11px] text-beige-light/30 uppercase tracking-widest">
            © {year} {brandName}. All Rights Reserved.
          </p>
          <p className="font-sans text-[11px] text-beige-light/20 flex items-center gap-1.5">
            Crafted with <Heart size={10} className="text-gold fill-gold" /> for every celebration
          </p>
        </div>
      </div>
    </footer>
  );
}