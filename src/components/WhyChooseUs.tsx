import { useInView } from '../hooks/useInView';
import { WebsiteData } from '../types';
import {
  Diamond, Palette, Sparkles, Zap, RefreshCw, Smartphone, MessageCircle, BadgeDollarSign,
} from 'lucide-react';

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  Diamond, Palette, Sparkles, Zap, RefreshCw, Smartphone, MessageCircle, BadgeDollarSign,
};

export default function WhyChooseUs({ features }: { features: WebsiteData['features'] }) {
  const sectionRef = useInView(0.08);

  return (
    <section
      ref={sectionRef as React.RefObject<HTMLDivElement>}
      id="why"
      aria-label="Why choose INVYTRA"
      className="py-28 relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #0A0A0A 0%, #1A1A1A 50%, #0F0F0F 100%)' }}
    >
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] rounded-full bg-gold/5 blur-3xl pointer-events-none" />
      <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-gold/4 blur-3xl pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-[1px] gold-line opacity-60" />
      <div className="absolute bottom-0 left-0 right-0 h-[1px] gold-line opacity-60" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Header */}
        <div className="text-center mb-18">
          <span className="reveal text-gold uppercase tracking-[0.35em] text-[11px] font-semibold mb-4 block">
            Why Us
          </span>
          <h2 className="reveal font-heading text-4xl md:text-5xl lg:text-6xl text-pearl mb-4" data-delay="1">
            The INVYTRA Difference
          </h2>
          <div className="reveal flex items-center justify-center gap-4 mt-8" data-delay="2">
            <div className="h-[1px] w-20 gold-line" />
            <div className="w-1.5 h-1.5 rotate-45 bg-gold/60" />
            <div className="h-[1px] w-20 gold-line" />
          </div>
        </div>

        {/* Feature cards — 2 col tablet, 4 col desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map((feature, index) => {
            const Icon = ICON_MAP[feature.icon] ?? Diamond;
            return (
              <div
                key={index}
                className="reveal feature-card group relative p-7 border border-white/8 hover:border-gold/30 rounded-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden"
                style={{ background: 'rgba(255,255,255,0.03)' }}
                data-delay={String((index % 8) + 1)}
              >
                {/* Hover fill */}
                <div className="absolute inset-0 rounded-2xl bg-gold/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Corner accent */}
                <div className="absolute top-0 right-0 w-10 h-10 border-t border-r border-gold/8 group-hover:border-gold/25 transition-colors rounded-tr-2xl" />

                <div className="relative z-10">
                  {/* Icon */}
                  <div className="w-12 h-12 rounded-full border border-gold/20 flex items-center justify-center mb-5 group-hover:border-gold/50 group-hover:bg-gold/10 transition-all duration-500">
                    <Icon className="text-gold w-5 h-5" />
                  </div>

                  <h3 className="font-heading text-xl text-pearl mb-2.5">{feature.title}</h3>
                  <p className="font-sans text-[13px] text-pearl/45 leading-relaxed font-light">{feature.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}