import { useEffect, useRef, useState } from 'react';
import { Menu, X } from 'lucide-react';
import gsap from 'gsap';

const navLinks = [
  { name: 'Templates', href: '#templates' },
  { name: 'About', href: '#about' },
  { name: 'Process', href: '#process' },
  { name: 'Reviews', href: '#reviews' },
  { name: 'FAQ', href: '#faq' },
  { name: 'Contact', href: '#contact' },
];

const sectionIds = ['templates', 'about', 'process', 'reviews', 'faq', 'contact'];

export default function Navbar({ brandName }: { brandName: string }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const menuTimeline = useRef<gsap.core.Timeline | null>(null);

  // Scroll state
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Active section via IntersectionObserver
  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id);
        },
        { rootMargin: '-30% 0px -60% 0px' }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  // Mobile menu GSAP animation
  useEffect(() => {
    if (!mobileMenuRef.current) return;

    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
      menuTimeline.current = gsap.timeline();
      menuTimeline.current
        .to(mobileMenuRef.current, { x: '0%', duration: 0.4, ease: 'power3.out' })
        .from(mobileMenuRef.current.querySelectorAll('.mobile-nav-link'), {
          x: 30, opacity: 0, duration: 0.35, stagger: 0.06, ease: 'power2.out',
        }, '-=0.1');
    } else {
      document.body.style.overflow = '';
      gsap.to(mobileMenuRef.current, { x: '100%', duration: 0.35, ease: 'power3.in' });
    }
  }, [isMenuOpen]);

  // Close on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setIsMenuOpen(false); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  const handleNavClick = (href: string) => {
    setIsMenuOpen(false);
    // Smooth scroll after menu closes
    setTimeout(() => {
      const target = document.querySelector(href);
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    }, 400);
  };

  return (
    <nav
      className={`fixed top-0 w-full z-40 transition-all duration-500 ease-in-out ${
        isScrolled
          ? 'bg-ivory/92 backdrop-blur-lg shadow-[0_1px_24px_rgba(0,0,0,0.06)] py-3'
          : 'bg-transparent py-5'
      }`}
      role="navigation"
      aria-label="Main navigation"
    >
      {/* Gold top border on scroll */}
      {isScrolled && (
        <div className="absolute top-0 left-0 right-0 h-[1px] gold-line opacity-60" />
      )}

      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Brand */}
        <a
          href="#"
          className="font-heading text-2xl tracking-[0.22em] uppercase font-bold text-charcoal hover:text-gold transition-colors duration-300"
          aria-label={`${brandName} — Home`}
        >
          {brandName}
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => {
            const id = link.href.replace('#', '');
            const isActive = activeSection === id;
            return (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                aria-current={isActive ? 'page' : undefined}
                className={`relative text-[11px] uppercase tracking-widest font-sans font-medium transition-colors duration-300 group ${
                  isActive ? 'text-gold' : 'text-charcoal hover:text-gold'
                }`}
              >
                {link.name}
                <span
                  className={`absolute -bottom-1.5 left-0 w-full h-[1px] bg-gold transition-transform duration-300 origin-left ${
                    isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                  }`}
                />
              </a>
            );
          })}
          <a
            href="#contact"
            onClick={(e) => { e.preventDefault(); handleNavClick('#contact'); }}
            className="px-6 py-2.5 bg-charcoal text-white text-[11px] uppercase tracking-widest hover:bg-gold transition-all duration-300 font-medium"
          >
            Start Project
          </a>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-charcoal p-2 -mr-2 focus-visible:outline-gold"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-menu"
        >
          {isMenuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile Menu — full-screen overlay */}
      <div
        ref={mobileMenuRef}
        id="mobile-menu"
        className="md:hidden fixed inset-0 bg-ivory z-50 flex flex-col items-center justify-center gap-1"
        style={{ transform: 'translateX(100%)' }}
        aria-hidden={!isMenuOpen}
      >
        {/* Close button */}
        <button
          className="absolute top-5 right-6 p-2 text-charcoal"
          onClick={() => setIsMenuOpen(false)}
          aria-label="Close menu"
        >
          <X size={28} />
        </button>

        {/* Brand in menu */}
        <div className="absolute top-5 left-6">
          <span className="font-heading text-xl tracking-[0.2em] uppercase text-charcoal/40">
            {brandName}
          </span>
        </div>

        {/* Links */}
        <nav className="flex flex-col items-center gap-8 mt-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
              className="mobile-nav-link font-heading text-4xl text-charcoal hover:text-gold transition-colors duration-300 tracking-[0.1em]"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* CTA */}
        <div className="mt-12 mobile-nav-link">
          <a
            href="#contact"
            onClick={(e) => { e.preventDefault(); handleNavClick('#contact'); }}
            className="px-10 py-4 bg-charcoal text-white text-sm uppercase tracking-widest hover:bg-gold transition-colors duration-300 font-medium"
          >
            Start Your Project
          </a>
        </div>

        {/* Bottom gold line */}
        <div className="absolute bottom-12 w-16 h-[1px] gold-line" />
      </div>
    </nav>
  );
}