import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { WebsiteData } from '../types';

interface Props {
  data: WebsiteData | null;
  onComplete: () => void;
}

export default function LoadingScreen({ data, onComplete }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const quoteRef = useRef<HTMLParagraphElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  
  const [quote, setQuote] = useState("");

  useEffect(() => {
    if (data?.brand?.loadingQuotes?.length) {
      const quotes = data.brand.loadingQuotes;
      setQuote(quotes[Math.floor(Math.random() * quotes.length)]);
    }
  }, [data]);

  useEffect(() => {
    if (!data || !quote) return;

    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to(containerRef.current, {
          yPercent: -100,
          duration: 1.2,
          ease: "power4.inOut",
          onComplete
        });
      }
    });

    tl.to(barRef.current, {
      scaleX: 1,
      duration: 2.5,
      ease: "power2.inOut"
    })
    .fromTo(textRef.current?.children || [], {
      y: 40,
      opacity: 0
    }, {
      y: 0,
      opacity: 1,
      duration: 0.8,
      stagger: 0.05,
      ease: "power3.out"
    }, "-=1.5")
    .fromTo(quoteRef.current, {
      opacity: 0,
      y: 20
    }, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power2.out"
    }, "-=1")
    .to([textRef.current, quoteRef.current, barRef.current], {
      opacity: 0,
      y: -20,
      duration: 0.8,
      ease: "power2.in",
      delay: 0.5
    });

  }, [data, quote, onComplete]);

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-ink text-pearl"
    >
      <div className="flex flex-col items-center">
        <h1 
          ref={textRef} 
          className="font-heading text-5xl md:text-7xl lg:text-8xl tracking-[0.2em] uppercase text-gold overflow-hidden flex"
        >
          {data?.brand.name.split('').map((char, i) => (
            <span key={i} className="inline-block">{char}</span>
          ))}
        </h1>
        <p 
          ref={quoteRef}
          className="mt-8 text-sm md:text-base font-sans tracking-widest text-beige-light font-light uppercase opacity-0"
        >
          {quote}
        </p>
      </div>
      
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 w-64 h-[1px] bg-white/10 overflow-hidden">
        <div 
          ref={barRef}
          className="w-full h-full bg-gold origin-left scale-x-0"
        />
      </div>
    </div>
  );
}