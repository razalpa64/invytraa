import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';

export default function Navbar({ brandName }: { brandName: string }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Templates', href: '#templates' },
    { name: 'About', href: '#about' },
    { name: 'Process', href: '#process' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav 
      className={`fixed top-0 w-full z-40 transition-all duration-500 ease-in-out ${
        isScrolled ? 'bg-ivory/90 backdrop-blur-md shadow-glass py-4' : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        <a href="#" className="font-heading text-2xl tracking-[0.2em] uppercase font-bold text-charcoal hover:text-gold transition-colors">
          {brandName}
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-12">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href}
              className="text-sm uppercase tracking-widest font-sans font-medium text-charcoal hover:text-gold transition-colors relative group"
            >
              {link.name}
              <span className="absolute -bottom-2 left-0 w-full h-[1px] bg-gold scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></span>
            </a>
          ))}
          <a href="#contact" className="px-6 py-2 border border-charcoal text-sm uppercase tracking-widest hover:bg-charcoal hover:text-white transition-all duration-300">
            Start Project
          </a>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-charcoal"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden absolute top-full left-0 w-full bg-ivory shadow-glass transition-all duration-300 overflow-hidden ${isMenuOpen ? 'max-h-96 py-6' : 'max-h-0 py-0'}`}>
        <div className="flex flex-col items-center space-y-6">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href}
              onClick={() => setIsMenuOpen(false)}
              className="text-lg uppercase tracking-widest font-sans font-medium text-charcoal"
            >
              {link.name}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}