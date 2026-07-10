import { useInView } from '../hooks/useInView';
import { WebsiteData } from '../types';

export default function About({ data }: { data: WebsiteData['brand']['about'] }) {
  const sectionRef = useInView(0.1);

  return (
    <section id="about" ref={sectionRef as React.RefObject<HTMLElement>} className="py-32 relative overflow-hidden" style={{
      background: 'linear-gradient(135deg, #F5F1EB 0%, #FAF8F4 60%, #F0EBE0 100%)'
    }}>
      <div className="absolute top-1/4 right-[-10%] w-80 h-80 rounded-full bg-gold/6 blur-3xl pointer-events-none animate-float-slow" />
      <div className="absolute bottom-1/4 left-[-5%] w-60 h-60 rounded-full bg-champagne/50 blur-3xl pointer-events-none animate-float-slower" />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">

          <div className="w-full lg:w-1/2">
            <span className="reveal text-gold uppercase tracking-[0.3em] text-xs font-semibold mb-6 block">The Art of Invitation</span>
            <h2 className="reveal font-heading text-4xl md:text-5xl lg:text-6xl text-charcoal mb-8 leading-tight" data-delay="1">
              {data.heading}
            </h2>
            <div className="reveal flex items-center gap-4 mb-10" data-delay="2">
              <div className="h-[1px] w-16 gold-line" />
              <div className="w-1 h-1 rounded-full bg-gold/50" />
            </div>
            <div className="space-y-6 font-sans text-charcoal/65 text-lg leading-relaxed font-light">
              <p className="reveal" data-delay="3">{data.description1}</p>
              <p className="reveal" data-delay="4">{data.description2}</p>
            </div>
            <div className="mt-12 flex gap-12">
              <div className="reveal" data-delay="5">
                <div className="font-heading text-3xl text-gold mb-1">5+</div>
                <div className="font-sans text-xs uppercase tracking-widest text-charcoal/45">Years Crafting</div>
              </div>
              <div className="reveal" data-delay="6">
                <div className="font-heading text-3xl text-gold mb-1">200+</div>
                <div className="font-sans text-xs uppercase tracking-widest text-charcoal/45">Events Designed</div>
              </div>
            </div>
          </div>

          <div className="reveal reveal-scale w-full lg:w-1/2 overflow-hidden rounded-2xl shadow-luxury relative" data-delay="2">
            <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-gold/40 z-10" />
            <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-gold/40 z-10" />
            <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-gold/40 z-10" />
            <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-gold/40 z-10" />
            <div className="aspect-[4/5] relative">
              <img
                src={data.image}
                alt="Luxury Invitations"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-ink/10" />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}