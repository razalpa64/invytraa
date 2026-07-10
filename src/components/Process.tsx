import { useInView } from '../hooks/useInView';
import { WebsiteData } from '../types';

export default function Process({ steps }: { steps: WebsiteData['process'] }) {
  const sectionRef = useInView(0.1);

  return (
    <section id="process" ref={sectionRef as React.RefObject<HTMLDivElement>} className="py-32 relative overflow-hidden" style={{
      background: 'linear-gradient(180deg, #0A0A0A 0%, #111111 100%)'
    }}>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] rounded-full bg-gold/4 blur-3xl pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-[1px] gold-line" />
      <div className="absolute bottom-0 left-0 right-0 h-[1px] gold-line" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="text-center mb-24">
          <span className="reveal text-gold uppercase tracking-[0.3em] text-xs font-semibold mb-4 block">The Journey</span>
          <h2 className="reveal font-heading text-4xl md:text-5xl lg:text-6xl text-pearl mb-4" data-delay="1">How It Works</h2>
          <p className="reveal font-sans text-white/40 uppercase tracking-[0.2em] text-sm" data-delay="2">A seamless experience</p>
          <div className="reveal flex items-center justify-center gap-4 mt-10" data-delay="3">
            <div className="h-[1px] w-20 gold-line" />
            <div className="w-1.5 h-1.5 rotate-45 bg-gold/50" />
            <div className="h-[1px] w-20 gold-line" />
          </div>
        </div>

        <div className="relative">
          {/* Desktop gold connecting line */}
          <div className="hidden lg:block absolute top-12 left-[10%] right-[10%] h-[1px] bg-white/8">
            <div className="h-full gold-line" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-6 relative z-10">
            {steps.map((step, index) => (
              <div
                key={index}
                className="reveal process-step relative flex flex-col items-center text-center group"
                data-delay={String(index + 1)}
              >
                <div className="relative w-24 h-24 mb-8">
                  <div className="w-full h-full rounded-full border border-white/10 bg-white/3 flex items-center justify-center group-hover:border-gold/50 transition-all duration-500 group-hover:shadow-[0_0_40px_rgba(212,175,55,0.15)]">
                    <span className="font-heading text-3xl text-gold">{step.step}</span>
                  </div>
                  <div className="absolute inset-[-6px] rounded-full border border-gold/10 group-hover:border-gold/25 transition-all duration-500" />
                </div>

                {index !== steps.length - 1 && (
                  <div className="lg:hidden w-[1px] h-10 gold-line mb-8" />
                )}

                <h3 className="font-heading text-xl text-pearl mb-3">{step.title}</h3>
                <p className="font-sans text-sm text-white/45 font-light leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}