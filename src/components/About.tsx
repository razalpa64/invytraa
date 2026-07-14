import { useInView } from '../hooks/useInView';
import { useCounter } from '../hooks/useCounter';
import { WebsiteData } from '../types';

function Stat({ number, suffix, label }: { number: number; suffix: string; label: string }) {
  const { ref, count } = useCounter(number, 1800);
  return (
    <div ref={ref as React.RefObject<HTMLDivElement>} className="reveal" data-delay="5">
      <div className="font-heading text-4xl text-gold mb-1 tabular-nums">
        {Math.floor(count)}{suffix}
      </div>
      <div className="font-sans text-[11px] uppercase tracking-widest text-charcoal/40">{label}</div>
    </div>
  );
}

export default function About({ data }: { data: WebsiteData['brand']['about'] }) {
  const sectionRef = useInView(0.1);

  return (
    <section
      id="about"
      ref={sectionRef as React.RefObject<HTMLElement>}
      aria-label="About INVYTRA"
      className="py-28 relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #F5F1EB 0%, #FAF8F4 60%, #F0EBE0 100%)' }}
    >
      <div className="absolute top-1/4 right-[-10%] w-80 h-80 rounded-full bg-gold/6 blur-3xl pointer-events-none animate-float-slow" />
      <div className="absolute bottom-1/4 left-[-5%] w-60 h-60 rounded-full bg-champagne/50 blur-3xl pointer-events-none animate-float-slower" />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">

          {/* Text side */}
          <div className="w-full lg:w-1/2">
            <span className="reveal text-gold uppercase tracking-[0.35em] text-[11px] font-semibold mb-6 block">
              The Art of Invitation
            </span>
            <h2 className="reveal font-heading text-4xl md:text-5xl lg:text-6xl text-charcoal mb-8 leading-tight" data-delay="1">
              {data.heading}
            </h2>
            <div className="reveal flex items-center gap-4 mb-10" data-delay="2">
              <div className="h-[1px] w-16 gold-line" />
              <div className="w-1 h-1 rounded-full bg-gold/50" />
            </div>
            <div className="space-y-6 font-sans text-charcoal/60 text-lg leading-relaxed font-light">
              <p className="reveal" data-delay="3">{data.description1}</p>
              <p className="reveal" data-delay="4">{data.description2}</p>
            </div>

            {/* Animated stats */}
            <div className="mt-12 flex gap-14">
              <Stat number={5} suffix="+" label="Years Crafting" />
              <Stat number={200} suffix="+" label="Events Designed" />
              <Stat number={99} suffix="%" label="Satisfaction Rate" />
            </div>
          </div>

          {/* Image side */}
          <div
            className="reveal reveal-scale w-full lg:w-1/2 overflow-hidden rounded-2xl shadow-luxury relative"
            data-delay="2"
          >
            <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-gold/40 z-10" />
            <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-gold/40 z-10" />
            <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-gold/40 z-10" />
            <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-gold/40 z-10" />
            <div className="aspect-[4/5] relative overflow-hidden">
              <img
                src={data.image}
                alt="Luxury wedding invitation craftsmanship"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-ink/10" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}