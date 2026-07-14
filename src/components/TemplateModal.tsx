import { useEffect, useRef } from 'react';
import { X, Check, ExternalLink, MessageCircle, Clock, Tag } from 'lucide-react';
import { Star } from 'lucide-react';
import gsap from 'gsap';
import { Template, WebsiteData } from '../types';

interface Props {
  template: Template;
  contact: WebsiteData['contact'];
  onClose: () => void;
}

export default function TemplateModal({ template, contact, onClose }: Props) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const hasPreview = template.previewLink?.startsWith('http');

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    const tl = gsap.timeline();
    tl.to(overlayRef.current, { opacity: 1, duration: 0.35, ease: 'power2.out' })
      .to(contentRef.current, { y: 0, opacity: 1, duration: 0.45, ease: 'power3.out' }, '-=0.15');

    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  // Keyboard close
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') handleClose(); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  const handleClose = () => {
    const tl = gsap.timeline({ onComplete: onClose });
    tl.to(contentRef.current, { y: 40, opacity: 0, duration: 0.3, ease: 'power2.in' })
      .to(overlayRef.current, { opacity: 0, duration: 0.25, ease: 'power2.in' }, '-=0.1');
  };

  const handleWhatsApp = () => {
    const msg = `Hello INVYTRA!%0A%0AI would like to order this invitation template.%0A%0A*Template:* ${template.name}%0A*Category:* ${template.category}%0A*Price:* ₹${template.price}%0A*Delivery:* ${template.deliveryTime}%0A%0APlease assist me with the next steps.`;
    window.open(`https://wa.me/${contact.whatsapp.replace(/[^0-9]/g, '')}?text=${msg}`, '_blank');
  };

  const badgeColors: Record<string, string> = {
    Bestseller: 'bg-gold text-white',
    'Most Loved': 'bg-rose-500 text-white',
    Trending: 'bg-charcoal text-white',
    New: 'bg-emerald-600 text-white',
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-4 py-6"
      role="dialog"
      aria-modal="true"
      aria-label={`${template.name} template details`}
    >
      {/* Backdrop */}
      <div
        ref={overlayRef}
        className="absolute inset-0 bg-ink/80 backdrop-blur-md opacity-0"
        onClick={handleClose}
        aria-hidden="true"
      />

      {/* Modal */}
      <div
        ref={contentRef}
        className="relative bg-ivory w-full max-w-5xl max-h-[92vh] overflow-y-auto rounded-2xl shadow-2xl opacity-0 translate-y-12 flex flex-col md:flex-row"
        tabIndex={-1}
      >
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 z-20 p-2 bg-white/70 backdrop-blur-sm rounded-full text-charcoal hover:bg-gold hover:text-white transition-colors duration-300"
          aria-label="Close modal"
        >
          <X size={18} />
        </button>

        {/* Left — Image */}
        <div className="w-full md:w-[45%] h-[50vw] md:h-auto relative overflow-hidden rounded-t-2xl md:rounded-l-2xl md:rounded-tr-none flex-shrink-0 min-h-[260px]">
          <img
            src={template.thumbnail}
            alt={`${template.name} invitation preview`}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-ink/15" />

          {/* Badge */}
          {template.badge && (
            <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-[10px] uppercase tracking-wider font-semibold ${badgeColors[template.badge] ?? 'bg-white text-charcoal'}`}>
              {template.badge}
            </div>
          )}

          {/* Category */}
          <div className="absolute top-4 right-12 px-3 py-1 bg-white/85 backdrop-blur-sm rounded-full">
            <span className="text-gold text-[10px] uppercase tracking-widest font-semibold">{template.category}</span>
          </div>

          {/* Live preview button */}
          {hasPreview ? (
            <a
              href={template.previewLink}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute bottom-4 left-4 flex items-center gap-2 px-4 py-2 bg-white/90 backdrop-blur-sm text-charcoal text-[11px] uppercase tracking-widest font-semibold rounded-full hover:bg-gold hover:text-white transition-all duration-300 group shadow-lg"
            >
              <ExternalLink size={12} className="group-hover:scale-110 transition-transform" />
              Live Demo
            </a>
          ) : (
            <div className="absolute bottom-4 left-4 flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm text-white/50 text-[11px] uppercase tracking-widest font-semibold rounded-full">
              Preview Coming Soon
            </div>
          )}
        </div>

        {/* Right — Details */}
        <div className="w-full md:flex-1 p-8 md:p-10 flex flex-col overflow-y-auto">
          <div className="flex-1">
            {/* Name & price */}
            <div className="flex items-start justify-between gap-3 mb-2">
              <h2 className="font-heading text-3xl md:text-4xl text-charcoal leading-tight">{template.name}</h2>
              <span className="font-heading text-3xl text-gold font-semibold flex-shrink-0">₹{template.price}</span>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-4">
              <div className="flex gap-0.5">
                {[1,2,3,4,5].map((i) => (
                  <Star key={i} size={13} className={i <= Math.round(template.rating) ? 'fill-gold text-gold' : 'text-charcoal/15'} />
                ))}
              </div>
              <span className="text-[12px] text-charcoal/50">{template.rating.toFixed(1)} · {template.reviewCount} reviews</span>
            </div>

            {/* Gold divider */}
            <div className="flex items-center gap-3 mb-6">
              <div className="h-[1px] w-10 bg-gold" />
              <div className="w-1 h-1 rounded-full bg-gold/50" />
            </div>

            {/* Description */}
            <p className="font-sans text-charcoal/65 mb-6 leading-relaxed text-[14px]">
              {template.description}
            </p>

            {/* Meta info */}
            <div className="flex flex-wrap gap-4 mb-6">
              <div className="flex items-center gap-1.5 text-[12px] text-charcoal/50">
                <Clock size={13} className="text-gold" />
                <span>Delivery: <strong className="text-charcoal">{template.deliveryTime}</strong></span>
              </div>
              <div className="flex items-center gap-1.5 text-[12px] text-charcoal/50">
                <Tag size={13} className="text-gold" />
                <span>{template.tags.join(' · ')}</span>
              </div>
            </div>

            {/* Features */}
            <div className="mb-6">
              <h4 className="font-sans text-[10px] uppercase tracking-widest text-charcoal/40 mb-3 font-semibold">
                What's Included
              </h4>
              <ul className="space-y-2">
                {template.features.map((feat, idx) => (
                  <li key={idx} className="flex items-center text-charcoal/70 font-sans text-[13px] gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-gold/10 border border-gold/20 flex items-center justify-center flex-shrink-0">
                      <Check size={10} className="text-gold" />
                    </span>
                    {feat}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* CTAs */}
          <div className="flex flex-col gap-3 pt-6 border-t border-charcoal/6">
            <button
              onClick={handleWhatsApp}
              className="flex items-center justify-center gap-2 py-4 bg-charcoal text-white text-[11px] uppercase tracking-widest font-medium hover:bg-gold transition-colors duration-300 group"
              aria-label={`Order ${template.name} via WhatsApp`}
            >
              <MessageCircle size={15} className="group-hover:scale-110 transition-transform" />
              Order This Template
            </button>
            {hasPreview ? (
              <a
                href={template.previewLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 py-3.5 border border-charcoal/15 text-charcoal text-[11px] uppercase tracking-widest font-medium hover:border-gold hover:text-gold transition-all duration-300 group"
              >
                <ExternalLink size={14} className="group-hover:scale-110 transition-transform" />
                View Live Demo
              </a>
            ) : (
              <div className="flex items-center justify-center gap-2 py-3.5 border border-charcoal/8 text-charcoal/25 text-[11px] uppercase tracking-widest cursor-not-allowed">
                <ExternalLink size={14} />
                Preview Not Available
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}