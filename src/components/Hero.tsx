import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { WebsiteData } from '../types';
import { ArrowRight, ChevronDown } from 'lucide-react';

export default function Hero({ data }: { data: WebsiteData['hero'] }) {
  const containerRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subheadRef = useRef<HTMLParagraphElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headlineRef.current, {
        y: 60,
        opacity: 0,
        duration: 1.4,
        ease: "power3.out",
        delay: 0.3
      });

      gsap.from(subheadRef.current, {
        y: 30,
        opacity: 0,
        duration: 1.2,
        ease: "power2.out",
        delay: 0.7
      });

      gsap.from(".hero-btn", {
        y: 20,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power2.out",
        delay: 1.1
      });

      gsap.from(".hero-badge", {
        y: -20,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
        delay: 0.1
      });

      // Gentle parallax on background — reduced yPercent to lessen lag
      gsap.to(bgRef.current, {
        yPercent: 20,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
          once: false,
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background — video (if set in website.json) or static image fallback */}
      <div ref={bgRef} className="absolute inset-0 z-0 overflow-hidden" style={{ willChange: 'transform' }}>
        {data.video ? (
          <video
            src={data.video}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
            style={{ opacity: 0.35 }}
          />
        ) : (
          <div
            className="w-full h-full bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: "url('https://images.pexels.com/photos/17206110/pexels-photo-17206110.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1080&w=1920')",
              opacity: 0.28,
            }}
          />
        )}
      </div>

      {/* Subtle radial vignette overlay — much lighter than before */}
      <div className="absolute inset-0 z-0" style={{
        background: 'radial-gradient(ellipse at center, rgba(250,248,244,0.55) 0%, rgba(245,241,235,0.85) 100%)'
      }} />

      {/* Floating decorative gold orbs (CSS-only, zero JS) */}
      <div className="absolute top-[12%] left-[8%] w-72 h-72 rounded-full bg-gold/5 blur-3xl animate-float-slow pointer-events-none z-0" />
      <div className="absolute bottom-[15%] right-[6%] w-96 h-96 rounded-full bg-gold/4 blur-3xl animate-float-slower pointer-events-none z-0" />
      <div className="absolute top-[40%] right-[15%] w-40 h-40 rounded-full bg-champagne/40 blur-2xl animate-float-slow pointer-events-none z-0" style={{ animationDelay: '2s' }} />

      {/* Decorative thin gold lines */}
      <div className="absolute top-1/2 left-0 w-16 h-[1px] bg-gold/30 hidden lg:block" />
      <div className="absolute top-1/2 right-0 w-16 h-[1px] bg-gold/30 hidden lg:block" />

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        {/* Badge */}
        <div className="hero-badge inline-flex items-center gap-2 px-5 py-2 border border-gold/30 bg-white/40 backdrop-blur-sm rounded-full mb-10">
          <span className="w-1.5 h-1.5 rounded-full bg-gold animate-gold-pulse" />
          <span className="text-xs uppercase tracking-[0.3em] text-gold font-medium">Premium Digital Invitations</span>
        </div>

        <h1
          ref={headlineRef}
          className="font-heading text-5xl md:text-7xl lg:text-[88px] text-charcoal leading-[1.05] tracking-tight mb-8"
        >
          {data.headline}
        </h1>

        {/* Animated gold divider */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <div className="h-[1px] w-16 gold-line animate-gold-pulse" />
          <div className="w-1.5 h-1.5 rounded-full bg-gold" />
          <div className="h-[1px] w-16 gold-line animate-gold-pulse" />
        </div>

        <p
          ref={subheadRef}
          className="font-sans text-lg md:text-xl text-charcoal/65 max-w-2xl mx-auto font-light leading-relaxed mb-14"
        >
          {data.subheading}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
          <a
            href="#templates"
            className="hero-btn group relative px-10 py-4 bg-charcoal text-white overflow-hidden rounded-none"
          >
            <span className="relative z-10 text-sm tracking-widest uppercase font-medium flex items-center gap-2">
              Explore Templates <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
            </span>
            <div className="absolute inset-0 bg-gold transform scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-500 ease-in-out" />
          </a>
          <a
            href="#contact"
            className="hero-btn group px-10 py-4 border border-charcoal/30 text-charcoal hover:border-gold hover:text-gold transition-all duration-300 relative"
          >
            <span className="text-sm tracking-widest uppercase font-medium">Start Project</span>
          </a>
        </div>

        {/* Stats row */}
        <div className="mt-20 flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-16">
          {[
            { number: "200+", label: "Events Delivered" },
            { number: "100%", label: "Custom Made" },
            { number: "4.9★", label: "Client Rating" },
          ].map((stat) => (
            <div key={stat.label} className="hero-btn text-center">
              <div className="font-heading text-3xl text-gold mb-1">{stat.number}</div>
              <div className="font-sans text-xs uppercase tracking-widest text-charcoal/50">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10">
        <span className="font-sans text-[10px] uppercase tracking-widest text-charcoal/30">Scroll</span>
        <ChevronDown size={16} className="text-gold animate-scroll-bounce" />
      </div>
    </section>
  );
}