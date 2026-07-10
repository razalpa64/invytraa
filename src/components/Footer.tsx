import { WebsiteData } from '../types';

interface Props {
  brandName: string;
  contact: WebsiteData['contact'];
}

export default function Footer({ brandName, contact }: Props) {
  return (
    <footer className="bg-ink text-pearl py-16 md:py-24 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row justify-between items-center mb-16 gap-8 text-center md:text-left">
          
          <div>
            <h2 className="font-heading text-3xl md:text-5xl tracking-[0.2em] uppercase text-gold mb-4">
              {brandName}
            </h2>
            <p className="font-sans text-sm text-beige-light/60 uppercase tracking-widest">
              Where Invitations Come Alive.
            </p>
          </div>

          <div className="flex gap-8">
            <a href="#templates" className="font-sans text-sm uppercase tracking-widest text-beige-light hover:text-gold transition-colors">Templates</a>
            <a href="#about" className="font-sans text-sm uppercase tracking-widest text-beige-light hover:text-gold transition-colors">About</a>
            <a href="#process" className="font-sans text-sm uppercase tracking-widest text-beige-light hover:text-gold transition-colors">Process</a>
          </div>

        </div>

        <div className="w-full h-[1px] bg-white/10 mb-8" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-sans text-xs text-beige-light/40 tracking-widest">
            © {new Date().getFullYear()} {brandName}. ALL RIGHTS RESERVED.
          </p>
          
          <div className="flex gap-6">
            <a href={contact.instagramUrl} target="_blank" rel="noreferrer" className="font-sans text-xs text-beige-light/40 hover:text-gold transition-colors uppercase tracking-widest">
              Instagram
            </a>
            <a href={`mailto:${contact.email}`} className="font-sans text-xs text-beige-light/40 hover:text-gold transition-colors uppercase tracking-widest">
              Email
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}