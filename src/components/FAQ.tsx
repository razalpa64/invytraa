import { useState } from 'react';
import { useInView } from '../hooks/useInView';
import { FAQ } from '../types';
import { Plus, Minus } from 'lucide-react';

function FAQItem({ item, index }: { item: FAQ; index: number }) {
  const [open, setOpen] = useState(false);
  const id = `faq-answer-${index}`;

  return (
    <div className="reveal border-b border-charcoal/8 last:border-0" data-delay={String((index % 8) + 1)}>
      <button
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-controls={id}
        className="w-full flex items-center justify-between gap-4 py-6 text-left group focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold/40"
      >
        <span className={`font-heading text-xl md:text-2xl transition-colors duration-300 ${open ? 'text-gold' : 'text-charcoal group-hover:text-gold'}`}>
          {item.question}
        </span>
        <span className={`flex-shrink-0 w-8 h-8 rounded-full border flex items-center justify-center transition-all duration-300 ${
          open ? 'border-gold bg-gold text-white' : 'border-charcoal/15 text-charcoal group-hover:border-gold group-hover:text-gold'
        }`}>
          {open ? <Minus size={14} /> : <Plus size={14} />}
        </span>
      </button>

      <div
        id={id}
        role="region"
        aria-labelledby={`faq-q-${index}`}
        className={`faq-answer ${open ? 'open' : ''}`}
      >
        <p className="font-sans text-charcoal/60 leading-relaxed pb-6 text-[15px] max-w-3xl">
          {item.answer}
        </p>
      </div>
    </div>
  );
}

export default function FAQSection({ faqs }: { faqs: FAQ[] }) {
  const sectionRef = useInView(0.05) as React.RefObject<HTMLDivElement>;

  return (
    <section
      id="faq"
      ref={sectionRef}
      aria-label="Frequently asked questions"
      className="py-28 relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #FAF8F4 0%, #F5F1EB 100%)' }}
    >
      <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-gold/5 blur-3xl pointer-events-none animate-float-slow" />
      <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-champagne/40 blur-3xl pointer-events-none animate-float-slower" />

      <div className="max-w-4xl mx-auto px-6 md:px-12 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="reveal text-gold uppercase tracking-[0.35em] text-[11px] font-semibold mb-4 block">
            Questions Answered
          </span>
          <h2 className="reveal font-heading text-4xl md:text-5xl lg:text-6xl text-charcoal mb-4" data-delay="1">
            Frequently Asked
          </h2>
          <div className="reveal flex items-center justify-center gap-4 mt-8" data-delay="2">
            <div className="h-[1px] w-20 gold-line" />
            <div className="w-1.5 h-1.5 rotate-45 bg-gold/50" />
            <div className="h-[1px] w-20 gold-line" />
          </div>
        </div>

        {/* Accordion */}
        <div className="bg-white/60 backdrop-blur-sm rounded-2xl border border-white/60 shadow-glass px-6 md:px-10 py-2">
          {faqs.map((item, i) => (
            <FAQItem key={i} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
