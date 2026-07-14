import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { WebsiteData } from '../types';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { useCounter } from '../hooks/useCounter';

gsap.registerPlugin(ScrollTrigger);

function StatCounter({ number, suffix, label }: { number: string; suffix: string; label: string }) {
  const target = parseFloat(number);
  const { ref, count } = useCounter(target, 2000);
  const displaySuffix = suffix === 'STAR' ? '★' : suffix;
  const isDecimal = !Number.isInteger(target);

  return (
    <div className="hero-stat text-center">
      <div
        ref={ref as React.RefObject<HTMLDivElement>}
        className="font-heading text-3xl md:text-4xl text-gold mb-1 tabular-nums"
      >
        {isDecimal ? count.toFixed(1) : Math.floor(count)}{displaySuffix}
      </div>
      <div className="font-sans text-[10px] uppercase tracking-[0.25em] text-charcoal/50">{label}</div>
    </div>
  );
}

export default function Hero({ data, stats }: { data: WebsiteData['hero']; stats: WebsiteData['stats'] }) {
  const containerRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subheadRef = useRef<HTMLParagraphElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.from('.hero-badge', { y: -20, opacity: 0, duration: 0.7, delay: 0.2 })
        .from(headlineRef.current, { y: 70, opacity: 0, duration: 1.4 }, '-=0.3')
        .from('.hero-divider', { scaleX: 0, opacity: 0, duration: 0.8, transformOrigin: 'center' }, '-=0.7')
        .from(subheadRef.current, { y: 30, opacity: 0, duration: 1.1 }, '-=0.6')
        .from('.hero-btn', { y: 25, opacity: 0, duration: 0.7, stagger: 0.12 }, '-=0.7')
        .from('.hero-stat', { y: 20, opacity: 0, duration: 0.6, stagger: 0.1 }, '-=0.4');

      // Parallax background
      gsap.to(bgRef.current, {
        yPercent: 22,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1.2,
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
      aria-label="Hero section"
    >
      {/* Background */}
      <div ref={bgRef} className="absolute inset-0 z-0 overflow-hidden" style={{ willChange: 'transform' }}>
        {data.video ? (
          <video
            src={data.video}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
            style={{ opacity: 0.32 }}
          />
        ) : (
          <div
            className="w-full h-full bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: "url('https://images.pexels.com/photos/17206110/pexels-photo-17206110.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1080&w=1920')",
              opacity: 0.25,
            }}
          />
        )}
      </div>

      {/* Gradient overlay */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at center, rgba(250,248,244,0.5) 0%, rgba(245,241,235,0.88) 100%)' }}
      />

      {/* Floating gold orbs */}
      <div className="absolute top-[12%] left-[8%] w-72 h-72 rounded-full bg-gold/5 blur-3xl animate-float-slow pointer-events-none z-0" />
      <div className="absolute bottom-[15%] right-[6%] w-96 h-96 rounded-full bg-gold/4 blur-3xl animate-float-slower pointer-events-none z-0" />
      <div className="absolute top-[40%] right-[15%] w-40 h-40 rounded-full bg-champagne/40 blur-2xl animate-float-slow pointer-events-none z-0" style={{ animationDelay: '2s' }} />

      {/* Subtle floral petals */}
      <div className="absolute top-[20%] left-[18%] w-3 h-3 rounded-full bg-gold/20 animate-petal-drift pointer-events-none z-0" style={{ animationDelay: '0s', animationDuration: '14s' }} />
      <div className="absolute top-[65%] left-[75%] w-2 h-2 rounded-full bg-gold/15 animate-petal-drift pointer-events-none z-0" style={{ animationDelay: '3s', animationDuration: '18s' }} />
      <div className="absolute top-[30%] right-[25%] w-2.5 h-2.5 rounded-full bg-champagne/50 animate-petal-drift pointer-events-none z-0" style={{ animationDelay: '6s', animationDuration: '20s' }} />

      {/* Decorative side lines */}
      <div className="absolute top-1/2 left-0 w-16 h-[1px] bg-gold/25 hidden lg:block" />
      <div className="absolute top-1/2 right-0 w-16 h-[1px] bg-gold/25 hidden lg:block" />

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        {/* Badge */}
        <div className="hero-badge inline-flex items-center gap-2.5 px-5 py-2.5 border border-gold/30 bg-white/50 backdrop-blur-sm rounded-full mb-10">
          <span className="w-1.5 h-1.5 rounded-full bg-gold animate-gold-pulse" />
          <span className="text-[10px] uppercase tracking-[0.35em] text-gold font-medium">Premium Digital Invitations</span>
        </div>

        {/* Headline */}
        <h1
          ref={headlineRef}
          className="font-heading text-5xl md:text-7xl lg:text-[86px] text-charcoal leading-[1.06] tracking-tight mb-8"
        >
          {data.headline}
        </h1>

        {/* Gold divider */}
        <div className="hero-divider flex items-center justify-center gap-4 mb-8">
          <div className="h-[1px] w-16 gold-line animate-gold-pulse" />
          <div className="w-1.5 h-1.5 rounded-full bg-gold" />
          <div className="h-[1px] w-16 gold-line animate-gold-pulse" />
        </div>

        {/* Subheading */}
        <p
          ref={subheadRef}
          className="font-sans text-lg md:text-xl text-charcoal/60 max-w-2xl mx-auto font-light leading-relaxed mb-14"
        >
          {data.subheading}
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-5">
          <a
            href="#templates"
            onClick={(e) => { e.preventDefault(); document.querySelector('#templates')?.scrollIntoView({ behavior: 'smooth' }); }}
            className="hero-btn btn-ripple group relative px-10 py-4 bg-charcoal text-white overflow-hidden w-full sm:w-auto text-center"
            aria-label="Explore our template collection"
          >
            <span className="relative z-10 text-[11px] tracking-widest uppercase font-medium flex items-center justify-center gap-2">
              Explore Templates <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </span>
            <div className="absolute inset-0 bg-gold transform scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-500 ease-in-out" />
          </a>
          <a
            href="#contact"
            onClick={(e) => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }); }}
            className="hero-btn group px-10 py-4 border border-charcoal/30 text-charcoal hover:border-gold hover:text-gold transition-all duration-300 w-full sm:w-auto text-center"
            aria-label="Start your invitation project"
          >
            <span className="text-[11px] tracking-widest uppercase font-medium">Start Project</span>
          </a>
        </div>

        {/* Animated stats */}
        <div className="mt-20 flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-14 lg:gap-20">
          {stats.map((stat) => (
            <StatCounter key={stat.label} {...stat} />
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10" aria-hidden="true">
        <span className="font-sans text-[9px] uppercase tracking-[0.3em] text-charcoal/30">Scroll</span>
        <ChevronDown size={15} className="text-gold animate-scroll-bounce" />
      </div>
    </section>
  );
}