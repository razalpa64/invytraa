import { useInView } from '../hooks/useInView';
import { WebsiteData } from '../types';
import { Diamond, Sparkles, Zap, Clock } from 'lucide-react';

const icons = [Diamond, Sparkles, Zap, Clock];

export default function WhyChooseUs({ features }: { features: WebsiteData['features'] }) {
  const sectionRef = useInView(0.1);

  return (
    <section ref={sectionRef as React.RefObject<HTMLDivElement>} className="py-32 relative overflow-hidden" style={{
      background: 'linear-gradient(135deg, #0A0A0A 0%, #1A1A1A 50%, #0F0F0F 100%)'
    }}>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] rounded-full bg-gold/5 blur-3xl pointer-events-none" />
      <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-gold/4 blur-3xl pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-[1px] gold-line" />
      <div className="absolute bottom-0 left-0 right-0 h-[1px] gold-line" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="text-center mb-20">
          <span className="reveal text-gold uppercase tracking-[0.3em] text-xs font-semibold mb-4 block">Why Us</span>
          <h2 className="reveal font-heading text-4xl md:text-5xl lg:text-6xl text-pearl mb-4" data-delay="1">The INVYTRA Difference</h2>
          <div className="reveal flex items-center justify-center gap-4 mt-8" data-delay="2">
            <div className="h-[1px] w-20 gold-line" />
            <div className="w-1.5 h-1.5 rotate-45 bg-gold/60" />
            <div className="h-[1px] w-20 gold-line" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const Icon = icons[index % icons.length];
            return (
              <div
                key={index}
                className="reveal feature-card group relative p-8 border border-white/8 hover:border-gold/30 rounded-xl transition-all duration-500 hover:-translate-y-2 overflow-hidden"
                style={{ background: 'rgba(255,255,255,0.04)' }}
                data-delay={String(index + 1)}
              >
                <div className="absolute inset-0 bg-gold/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative z-10">
                  <div className="w-14 h-14 rounded-full border border-gold/20 flex items-center justify-center mb-6 group-hover:border-gold/50 group-hover:bg-gold/10 transition-all duration-500">
                    <Icon className="text-gold w-5 h-5" />
                  </div>
                  <h3 className="font-heading text-2xl text-pearl mb-3">{feature.title}</h3>
                  <p className="font-sans text-sm text-pearl/50 leading-relaxed font-light">{feature.description}</p>
                </div>
                <div className="absolute top-0 right-0 w-12 h-12 border-t border-r border-gold/10 group-hover:border-gold/30 transition-colors" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}