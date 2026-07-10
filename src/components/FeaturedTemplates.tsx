import { useRef } from 'react';
import { useInView } from '../hooks/useInView';
import { WebsiteData } from '../types';
import { ArrowRight, ExternalLink } from 'lucide-react';

interface Props {
  templates: WebsiteData['templates'];
  onSelectTemplate: (id: string) => void;
}

export default function FeaturedTemplates({ templates, onSelectTemplate }: Props) {
  const sectionRef = useInView(0.1) as React.RefObject<HTMLDivElement>;

  return (
    <section id="templates" ref={sectionRef as React.RefObject<HTMLDivElement>} className="py-32 relative z-10 overflow-hidden" style={{
      background: 'linear-gradient(180deg, #FFFFFF 0%, #F5F1EB 100%)'
    }}>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-champagne/30 blur-3xl pointer-events-none -z-0" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Header */}
        <div className="text-center mb-20">
          <span className="reveal text-gold uppercase tracking-[0.3em] text-xs font-semibold mb-4 block">Our Portfolio</span>
          <h2 className="reveal font-heading text-4xl md:text-5xl lg:text-6xl text-charcoal mb-6" data-delay="1">Our Collection</h2>
          <p className="reveal font-sans text-charcoal/50 uppercase tracking-[0.2em] text-sm" data-delay="2">Select your canvas</p>
          <div className="reveal flex items-center justify-center gap-4 mt-10" data-delay="3">
            <div className="h-[1px] w-20 gold-line" />
            <div className="w-1 h-1 rounded-full bg-gold/50" />
            <div className="h-[1px] w-20 gold-line" />
          </div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16">
          {templates.map((template, idx) => (
            <div
              key={template.id}
              className="reveal template-card group relative bg-ivory rounded-2xl overflow-hidden shadow-glass hover:shadow-luxury transition-all duration-700 border border-white/60"
              data-delay={String(idx + 1)}
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={template.thumbnail}
                  alt={template.name}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-1000 ease-in-out"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-ink/20 group-hover:bg-ink/50 transition-colors duration-500" />
                <div className="absolute top-5 left-5 px-3 py-1 bg-white/80 backdrop-blur-sm rounded-full">
                  <span className="text-gold text-xs uppercase tracking-widest font-semibold">{template.category}</span>
                </div>
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <button
                    onClick={() => onSelectTemplate(template.id)}
                    className="px-8 py-3 bg-white text-charcoal font-sans text-sm uppercase tracking-widest hover:bg-gold hover:text-white transition-colors duration-300 shadow-lg"
                  >
                    View Details
                  </button>
                  {template.previewLink?.startsWith('http') && (
                    <a
                      href={template.previewLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="flex items-center gap-2 px-6 py-2.5 bg-gold/90 text-white font-sans text-xs uppercase tracking-widest hover:bg-gold transition-colors duration-300 shadow-lg"
                    >
                      <ExternalLink size={12} />
                      Live Preview
                    </a>
                  )}
                </div>
              </div>
              <div className="p-8 md:p-10 bg-white/70 backdrop-blur-sm border-t border-white/50">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-heading text-2xl text-charcoal">{template.name}</h3>
                    <div className="flex gap-1 mt-2 flex-wrap">
                      {template.features.slice(0, 2).map((f) => (
                        <span key={f} className="text-[10px] uppercase tracking-wider text-charcoal/40 border border-charcoal/10 px-2 py-0.5 rounded-full">{f}</span>
                      ))}
                    </div>
                  </div>
                  <span className="font-heading text-2xl text-gold font-semibold">{template.price}</span>
                </div>
                <p className="font-sans text-sm text-charcoal/60 line-clamp-2 mb-6">{template.description}</p>
                <button
                  onClick={() => onSelectTemplate(template.id)}
                  className="flex items-center text-sm font-medium uppercase tracking-widest text-charcoal group-hover:text-gold transition-colors gap-2"
                >
                  Select Template <ArrowRight size={15} className="transform group-hover:translate-x-2 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}