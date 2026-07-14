import { useInView } from '../hooks/useInView';
import { useCounter } from '../hooks/useCounter';
import { Stat } from '../types';

function CounterItem({ stat }: { stat: Stat }) {
  const target = parseFloat(stat.number);
  const { ref, count } = useCounter(target, 2200);
  const isDecimal = !Number.isInteger(target);
  const displaySuffix = stat.suffix === 'STAR' ? '★' : stat.suffix;

  return (
    <div className="reveal text-center px-6 py-10 relative group" data-delay="1">
      {/* Subtle hover glow */}
      <div className="absolute inset-0 rounded-2xl bg-gold/0 group-hover:bg-gold/5 transition-colors duration-500" />
      <div
        ref={ref as React.RefObject<HTMLDivElement>}
        className="font-heading text-5xl md:text-6xl lg:text-7xl text-gold mb-3 tabular-nums relative z-10"
        aria-label={`${stat.number}${displaySuffix} ${stat.label}`}
      >
        {isDecimal ? count.toFixed(1) : Math.floor(count)}{displaySuffix}
      </div>
      <div className="font-sans text-xs uppercase tracking-[0.3em] text-pearl/50 relative z-10">
        {stat.label}
      </div>
    </div>
  );
}

export default function Statistics({ stats }: { stats: Stat[] }) {
  const sectionRef = useInView(0.15) as React.RefObject<HTMLDivElement>;

  return (
    <section
      ref={sectionRef}
      id="statistics"
      aria-label="Statistics"
      className="py-20 relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #0A0A0A 0%, #111111 100%)' }}
    >
      {/* Top/bottom gold lines */}
      <div className="absolute top-0 left-0 right-0 h-[1px] gold-line opacity-60" />
      <div className="absolute bottom-0 left-0 right-0 h-[1px] gold-line opacity-60" />

      {/* Center glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full bg-gold/6 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-white/8">
          {stats.map((stat) => (
            <CounterItem key={stat.label} stat={stat} />
          ))}
        </div>
      </div>
    </section>
  );
}
