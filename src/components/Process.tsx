import { useInView } from '../hooks/useInView';
import { WebsiteData } from '../types';
import {
  LayoutTemplate, MessageCircle, ClipboardList, Paintbrush, Eye, Globe, Share2,
} from 'lucide-react';

const STEP_ICONS: Record<string, React.ComponentType<{ className?: string; size?: number }>> = {
  LayoutTemplate, MessageCircle, ClipboardList, Paintbrush, Eye, Globe, Share2,
};

export default function Process({ steps }: { steps: WebsiteData['process'] }) {
  const sectionRef = useInView(0.05);

  return (
    <section
      id="process"
      ref={sectionRef as React.RefObject<HTMLDivElement>}
      aria-label="How it works"
      className="py-28 relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #0A0A0A 0%, #111111 100%)' }}
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] rounded-full bg-gold/4 blur-3xl pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-[1px] gold-line opacity-60" />
      <div className="absolute bottom-0 left-0 right-0 h-[1px] gold-line opacity-60" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Header */}
        <div className="text-center mb-20">
          <span className="reveal text-gold uppercase tracking-[0.35em] text-[11px] font-semibold mb-4 block">
            The Journey
          </span>
          <h2 className="reveal font-heading text-4xl md:text-5xl lg:text-6xl text-pearl mb-4" data-delay="1">
            How It Works
          </h2>
          <p className="reveal font-sans text-white/35 uppercase tracking-[0.2em] text-[11px]" data-delay="2">
            From idea to a live invitation — in 7 elegant steps
          </p>
          <div className="reveal flex items-center justify-center gap-4 mt-10" data-delay="3">
            <div className="h-[1px] w-20 gold-line" />
            <div className="w-1.5 h-1.5 rotate-45 bg-gold/50" />
            <div className="h-[1px] w-20 gold-line" />
          </div>
        </div>

        <div className="relative">
          {/* Desktop connecting line */}
          <div className="hidden lg:block absolute top-[52px] left-[calc(100%/14)] right-[calc(100%/14)] h-[1px]">
            <div className="h-full gold-line opacity-30" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-10 lg:gap-3 relative z-10">
            {steps.map((step, index) => {
              const Icon = STEP_ICONS[step.icon] ?? LayoutTemplate;
              return (
                <div
                  key={index}
                  className="reveal process-step relative flex flex-col items-center text-center group"
                  data-delay={String(index + 1)}
                >
                  {/* Step circle */}
                  <div className="relative w-[104px] h-[104px] mb-6 flex-shrink-0">
                    <div className="w-full h-full rounded-full border border-white/10 bg-white/3 flex flex-col items-center justify-center gap-1 group-hover:border-gold/50 transition-all duration-500 group-hover:shadow-[0_0_40px_rgba(212,175,55,0.15)]">
                      <Icon className="text-gold w-5 h-5" />
                      <span className="font-heading text-[11px] text-gold/60">{step.step}</span>
                    </div>
                    {/* Outer ring */}
                    <div className="absolute inset-[-6px] rounded-full border border-gold/8 group-hover:border-gold/22 transition-all duration-500" />
                  </div>

                  {/* Mobile connector */}
                  {index !== steps.length - 1 && (
                    <div className="lg:hidden w-[1px] h-8 gold-line mb-6 opacity-30" />
                  )}

                  <h3 className="font-heading text-lg text-pearl mb-2">{step.title}</h3>
                  <p className="font-sans text-[12px] text-white/38 font-light leading-relaxed max-w-[120px] lg:max-w-none">
                    {step.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}