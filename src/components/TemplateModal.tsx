import { useEffect, useRef } from 'react';
import { X, Check, ExternalLink, MessageCircle } from 'lucide-react';
import gsap from 'gsap';
import { WebsiteData } from '../types';

interface Props {
  template: WebsiteData['templates'][0];
  contact: WebsiteData['contact'];
  onClose: () => void;
}

export default function TemplateModal({ template, contact, onClose }: Props) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // A preview link is "real" if it starts with http/https
  const hasPreview = template.previewLink?.startsWith('http');

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    const tl = gsap.timeline();
    tl.to(overlayRef.current, {
      opacity: 1,
      duration: 0.4,
      ease: "power2.out"
    }).to(contentRef.current, {
      y: 0,
      opacity: 1,
      duration: 0.5,
      ease: "power3.out"
    }, "-=0.2");

    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  const handleClose = () => {
    const tl = gsap.timeline({ onComplete: onClose });
    tl.to(contentRef.current, {
      y: 50,
      opacity: 0,
      duration: 0.3,
      ease: "power2.in"
    }).to(overlayRef.current, {
      opacity: 0,
      duration: 0.3,
      ease: "power2.in"
    }, "-=0.1");
  };

  const handleWhatsApp = () => {
    const message = `Hello INVYTRA,%0A%0AI would like to purchase this invitation template.%0A%0A*Template Name:* ${template.name}%0A*Price:* ${template.price}%0A%0APlease contact me.`;
    window.open(`https://wa.me/${contact.whatsapp.replace(/[^0-9]/g, '')}?text=${message}`, '_blank');
  };

  const handlePreview = () => {
    if (hasPreview) {
      window.open(template.previewLink, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 md:px-0">
      <div
        ref={overlayRef}
        className="absolute inset-0 bg-ink/80 backdrop-blur-md opacity-0"
        onClick={handleClose}
      />

      <div
        ref={contentRef}
        className="relative bg-ivory w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl opacity-0 translate-y-12 flex flex-col md:flex-row"
      >
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-5 right-5 z-10 p-2 bg-white/60 backdrop-blur-sm rounded-full text-charcoal hover:bg-gold hover:text-white transition-colors duration-300"
        >
          <X size={20} />
        </button>

        {/* Left — Image */}
        <div className="w-full md:w-1/2 h-[40vh] md:h-auto relative overflow-hidden rounded-t-2xl md:rounded-l-2xl md:rounded-tr-none flex-shrink-0">
          <img
            src={template.thumbnail}
            alt={template.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-ink/20" />

          {/* Preview badge on image */}
          {hasPreview ? (
            <button
              onClick={handlePreview}
              className="absolute bottom-5 left-5 flex items-center gap-2 px-4 py-2 bg-white/90 backdrop-blur-sm text-charcoal text-xs uppercase tracking-widest font-semibold rounded-full hover:bg-gold hover:text-white transition-all duration-300 group shadow-lg"
            >
              <ExternalLink size={13} className="group-hover:scale-110 transition-transform" />
              Live Preview
            </button>
          ) : (
            <div className="absolute bottom-5 left-5 flex items-center gap-2 px-4 py-2 bg-white/30 backdrop-blur-sm text-white/60 text-xs uppercase tracking-widest font-semibold rounded-full">
              Preview Coming Soon
            </div>
          )}

          {/* Category badge */}
          <div className="absolute top-5 left-5 px-3 py-1 bg-white/80 backdrop-blur-sm rounded-full">
            <span className="text-gold text-xs uppercase tracking-widest font-semibold">{template.category}</span>
          </div>
        </div>

        {/* Right — Details */}
        <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col">
          <div className="mb-auto">
            <h2 className="font-heading text-4xl text-charcoal mb-2">{template.name}</h2>
            <p className="font-heading text-2xl text-gold mb-6">{template.price}</p>

            <div className="flex items-center gap-3 mb-8">
              <div className="h-[1px] w-10 bg-gold" />
              <div className="w-1 h-1 rounded-full bg-gold/50" />
            </div>

            <p className="font-sans text-charcoal/70 mb-8 leading-relaxed text-[15px]">
              {template.description}
            </p>

            <div className="mb-8">
              <h4 className="font-sans text-xs uppercase tracking-widest text-charcoal/50 mb-4 font-semibold">Features Included</h4>
              <ul className="space-y-2.5">
                {template.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center text-charcoal/75 font-sans text-sm gap-3">
                    <span className="w-5 h-5 rounded-full bg-gold/10 border border-gold/20 flex items-center justify-center flex-shrink-0">
                      <Check size={11} className="text-gold" />
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col gap-3 pt-6 border-t border-charcoal/8">
            {/* Primary — Choose template */}
            <button
              onClick={handleWhatsApp}
              className="flex items-center justify-center gap-2 py-4 bg-charcoal text-white text-sm uppercase tracking-widest font-medium hover:bg-gold transition-colors duration-300 rounded-none group"
            >
              <MessageCircle size={16} className="group-hover:scale-110 transition-transform" />
              Choose This Template
            </button>

            {/* Secondary — Preview */}
            {hasPreview ? (
              <button
                onClick={handlePreview}
                className="flex items-center justify-center gap-2 py-4 border border-charcoal/20 text-charcoal text-sm uppercase tracking-widest font-medium hover:border-gold hover:text-gold transition-all duration-300 group"
              >
                <ExternalLink size={15} className="group-hover:scale-110 transition-transform" />
                Preview Live Demo
              </button>
            ) : (
              <div className="flex items-center justify-center gap-2 py-4 border border-charcoal/10 text-charcoal/30 text-sm uppercase tracking-widest font-medium cursor-not-allowed rounded-none" title="Preview link not yet configured in website.json">
                <ExternalLink size={15} />
                Preview Not Available
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}