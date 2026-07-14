import { useState, useMemo, useCallback } from 'react';
import { useInView } from '../hooks/useInView';
import { Template } from '../types';
import { Star, Heart, ExternalLink, MessageCircle, Search, ChevronDown, Copy, Check } from 'lucide-react';

interface Props {
  templates: Template[];
  onSelectTemplate: (id: string) => void;
  whatsapp: string;
}

const CATEGORIES = ['All', 'Wedding', 'Marriage', 'Nikah', 'Engagement', 'Corporate Event', 'Luxury', 'Royal', 'Minimal', 'Floral', 'Trending'];

const SORT_OPTIONS = [
  { value: 'default', label: 'Default' },
  { value: 'rating', label: 'Highest Rated' },
  { value: 'price-asc', label: 'Price: Low → High' },
  { value: 'price-desc', label: 'Price: High → Low' },
  { value: 'reviews', label: 'Most Popular' },
];

function SkeletonCard() {
  return (
    <div className="rounded-2xl overflow-hidden border border-white/60 bg-white/40">
      <div className="skeleton aspect-[3/4]" />
      <div className="p-5 space-y-3">
        <div className="skeleton h-4 w-3/4 rounded" />
        <div className="skeleton h-3 w-1/2 rounded" />
        <div className="skeleton h-8 w-full rounded mt-4" />
      </div>
    </div>
  );
}

function TemplateCard({
  template,
  onSelectTemplate,
  whatsapp,
}: {
  template: Template;
  onSelectTemplate: (id: string) => void;
  whatsapp: string;
}) {
  const [liked, setLiked] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleWhatsApp = (e: React.MouseEvent) => {
    e.stopPropagation();
    const msg = `Hello INVYTRA!%0A%0AI would like to order this template:%0A%0A*Template:* ${template.name}%0A*Price:* AED ${template.price}%0A%0APlease assist me.`;
    window.open(`https://wa.me/${whatsapp.replace(/[^0-9]/g, '')}?text=${msg}`, '_blank');
  };

  const handleCopyLink = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (template.previewLink?.startsWith('http')) {
      navigator.clipboard.writeText(template.previewLink).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
    }
  };

  const hasPreview = template.previewLink?.startsWith('http');

  const badgeColors: Record<string, string> = {
    Bestseller: 'bg-gold text-white',
    'Most Loved': 'bg-rose-500 text-white',
    Trending: 'bg-charcoal text-white',
    New: 'bg-emerald-600 text-white',
  };

  return (
    <article className="group relative bg-white rounded-2xl overflow-hidden shadow-glass hover:shadow-luxury transition-all duration-500 hover:-translate-y-1.5 border border-white/80 flex flex-col">
      {/* Image */}
      <div className="relative aspect-[3/4] overflow-hidden bg-beige-light flex-shrink-0">
        <img
          src={template.thumbnail}
          alt={`${template.name} invitation template`}
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-in-out"
          loading="lazy"
          decoding="async"
        />

        {/* Dark overlay on hover */}
        <div className="absolute inset-0 bg-ink/0 group-hover:bg-ink/40 transition-colors duration-500" />

        {/* Badge */}
        {template.badge && (
          <div className={`absolute top-3 left-3 px-3 py-1 rounded-full text-[10px] uppercase tracking-wider font-semibold ${badgeColors[template.badge] ?? 'bg-white text-charcoal'}`}>
            {template.badge}
          </div>
        )}

        {/* Favorite */}
        <button
          onClick={(e) => { e.stopPropagation(); setLiked(!liked); }}
          aria-label={liked ? 'Remove from favourites' : 'Add to favourites'}
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center transition-all duration-300 hover:bg-white hover:scale-110"
        >
          <Heart
            size={14}
            className={`transition-colors duration-200 ${liked ? 'fill-rose-500 text-rose-500' : 'text-charcoal/60'}`}
          />
        </button>

        {/* Hover action buttons */}
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-400">
          {hasPreview && (
            <a
              href={template.previewLink}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              aria-label={`Live demo of ${template.name}`}
              className="flex items-center gap-2 px-6 py-2.5 bg-white text-charcoal text-[11px] uppercase tracking-widest font-semibold rounded-none hover:bg-gold hover:text-white transition-colors duration-300 shadow-lg"
            >
              <ExternalLink size={12} />
              Live Demo
            </a>
          )}
          <button
            onClick={handleCopyLink}
            className="flex items-center gap-2 px-6 py-2 bg-white/20 backdrop-blur-sm text-white text-[11px] uppercase tracking-widest font-medium border border-white/30 rounded-none hover:bg-white/30 transition-colors"
          >
            {copied ? <Check size={12} /> : <Copy size={12} />}
            {copied ? 'Copied!' : 'Copy Link'}
          </button>
        </div>

        {/* Category chip */}
        <div className="absolute bottom-3 left-3 px-2.5 py-1 bg-white/80 backdrop-blur-sm rounded-full">
          <span className="text-gold text-[10px] uppercase tracking-widest font-semibold">{template.category}</span>
        </div>
      </div>

      {/* Card body */}
      <div className="p-5 flex flex-col flex-1">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-heading text-xl text-charcoal leading-tight">{template.name}</h3>
          <span className="font-heading text-xl text-gold font-semibold ml-2 flex-shrink-0">
            ₹{template.price}
          </span>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-1.5 mb-3">
          <div className="flex gap-0.5">
            {[1, 2, 3, 4, 5].map((i) => (
              <Star
                key={i}
                size={11}
                className={i <= Math.round(template.rating) ? 'fill-gold text-gold' : 'text-charcoal/15'}
              />
            ))}
          </div>
          <span className="text-[11px] text-charcoal/50 font-sans">{template.rating.toFixed(1)}</span>
          <span className="text-[11px] text-charcoal/35 font-sans">({template.reviewCount})</span>
        </div>

        {/* Tags */}
        <div className="flex gap-1.5 flex-wrap mb-3">
          {template.tags.slice(0, 3).map((tag) => (
            <span key={tag} className="text-[9px] uppercase tracking-wider text-charcoal/45 border border-charcoal/10 px-2 py-0.5 rounded-full">
              {tag}
            </span>
          ))}
        </div>

        <p className="font-sans text-[12px] text-charcoal/55 line-clamp-2 mb-4 leading-relaxed flex-1">
          {template.description}
        </p>

        {/* Delivery time */}
        <p className="text-[10px] uppercase tracking-widest text-charcoal/35 mb-4">
          🕐 Delivery: {template.deliveryTime}
        </p>

        {/* Action buttons */}
        <div className="flex flex-col gap-2 mt-auto">
          <button
            onClick={handleWhatsApp}
            className="flex items-center justify-center gap-2 py-3 bg-charcoal text-white text-[11px] uppercase tracking-widest font-medium hover:bg-gold transition-colors duration-300 w-full"
            aria-label={`Order ${template.name} via WhatsApp`}
          >
            <MessageCircle size={13} />
            Order on WhatsApp
          </button>
          <button
            onClick={() => onSelectTemplate(template.id)}
            className="flex items-center justify-center gap-2 py-2.5 border border-charcoal/15 text-charcoal text-[11px] uppercase tracking-widest font-medium hover:border-gold hover:text-gold transition-all duration-300 w-full"
            aria-label={`View details for ${template.name}`}
          >
            View Details
          </button>
        </div>
      </div>
    </article>
  );
}

export default function FeaturedTemplates({ templates, onSelectTemplate, whatsapp }: Props) {
  const sectionRef = useInView(0.05) as React.RefObject<HTMLDivElement>;
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [sortBy, setSortBy] = useState('default');
  const [showSort, setShowSort] = useState(false);

  const filtered = useMemo(() => {
    let list = [...templates];

    // Search
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (t) =>
          t.name.toLowerCase().includes(q) ||
          t.category.toLowerCase().includes(q) ||
          t.tags.some((tag) => tag.toLowerCase().includes(q)) ||
          t.description.toLowerCase().includes(q)
      );
    }

    // Category filter
    if (activeCategory !== 'All') {
      list = list.filter(
        (t) =>
          t.category.toLowerCase() === activeCategory.toLowerCase() ||
          t.tags.some((tag) => tag.toLowerCase() === activeCategory.toLowerCase())
      );
    }

    // Sort
    switch (sortBy) {
      case 'rating':
        list.sort((a, b) => b.rating - a.rating);
        break;
      case 'price-asc':
        list.sort((a, b) => Number(a.price) - Number(b.price));
        break;
      case 'price-desc':
        list.sort((a, b) => Number(b.price) - Number(a.price));
        break;
      case 'reviews':
        list.sort((a, b) => b.reviewCount - a.reviewCount);
        break;
    }

    return list;
  }, [templates, search, activeCategory, sortBy]);

  const handleCategoryClick = useCallback((cat: string) => {
    setActiveCategory(cat);
  }, []);

  return (
    <section
      id="templates"
      ref={sectionRef}
      className="py-28 relative z-10 overflow-hidden"
      aria-label="Template collection"
      style={{ background: 'linear-gradient(180deg, #FFFFFF 0%, #F5F1EB 100%)' }}
    >
      {/* Background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full bg-champagne/25 blur-3xl pointer-events-none -z-0" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Section header */}
        <div className="text-center mb-14">
          <span className="reveal text-gold uppercase tracking-[0.35em] text-[11px] font-semibold mb-4 block">
            Our Collection
          </span>
          <h2 className="reveal font-heading text-4xl md:text-5xl lg:text-6xl text-charcoal mb-5" data-delay="1">
            Invitation Templates
          </h2>
          <p className="reveal font-sans text-charcoal/45 uppercase tracking-[0.2em] text-[11px]" data-delay="2">
            Select your canvas — every design is fully customizable
          </p>
          <div className="reveal flex items-center justify-center gap-4 mt-10" data-delay="3">
            <div className="h-[1px] w-20 gold-line" />
            <div className="w-1 h-1 rounded-full bg-gold/50" />
            <div className="h-[1px] w-20 gold-line" />
          </div>
        </div>

        {/* Search bar */}
        <div className="reveal mb-8" data-delay="4">
          <div className="relative max-w-lg mx-auto">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-charcoal/35 pointer-events-none" />
            <input
              type="search"
              placeholder="Search by name, style, or keyword…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              aria-label="Search templates"
              className="w-full pl-11 pr-4 py-3.5 bg-white border border-charcoal/10 text-charcoal placeholder:text-charcoal/30 text-sm font-sans focus:outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/20 transition-all duration-300 rounded-none"
            />
          </div>
        </div>

        {/* Filter chips + Sort */}
        <div className="reveal flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-10" data-delay="5">
          {/* Category chips */}
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategoryClick(cat)}
                aria-pressed={activeCategory === cat}
                className={`filter-chip px-4 py-1.5 border text-[10px] uppercase tracking-widest font-medium transition-all duration-200 rounded-full ${
                  activeCategory === cat
                    ? 'bg-charcoal text-white border-charcoal'
                    : 'bg-transparent border-charcoal/15 text-charcoal/65 hover:border-gold/50 hover:text-gold'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Sort dropdown */}
          <div className="relative flex-shrink-0">
            <button
              onClick={() => setShowSort(!showSort)}
              aria-haspopup="listbox"
              aria-expanded={showSort}
              className="flex items-center gap-2 px-4 py-2 border border-charcoal/15 text-[11px] uppercase tracking-widest font-medium text-charcoal hover:border-gold hover:text-gold transition-all duration-200"
            >
              Sort: {SORT_OPTIONS.find((o) => o.value === sortBy)?.label}
              <ChevronDown size={13} className={`transition-transform ${showSort ? 'rotate-180' : ''}`} />
            </button>
            {showSort && (
              <div
                className="absolute right-0 top-full mt-1 bg-white border border-charcoal/10 shadow-luxury z-20 min-w-[180px] animate-slide-down"
                role="listbox"
              >
                {SORT_OPTIONS.map((opt) => (
                  <button
                    key={opt.value}
                    role="option"
                    aria-selected={sortBy === opt.value}
                    onClick={() => { setSortBy(opt.value); setShowSort(false); }}
                    className={`w-full text-left px-4 py-3 text-[11px] uppercase tracking-widest font-sans transition-colors hover:bg-gold/5 hover:text-gold ${
                      sortBy === opt.value ? 'text-gold bg-gold/5' : 'text-charcoal/70'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Results count */}
        <p className="reveal text-[11px] text-charcoal/40 uppercase tracking-widest mb-8" data-delay="6">
          {filtered.length} {filtered.length === 1 ? 'template' : 'templates'} found
        </p>

        {/* Template grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 lg:gap-6">
            {filtered.map((template) => (
              <TemplateCard
                key={template.id}
                template={template}
                onSelectTemplate={onSelectTemplate}
                whatsapp={whatsapp}
              />
            ))}
          </div>
        ) : (
          // Empty state
          <div className="text-center py-24 flex flex-col items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-gold/10 flex items-center justify-center mb-2">
              <Search size={24} className="text-gold" />
            </div>
            <h3 className="font-heading text-2xl text-charcoal">No templates found</h3>
            <p className="font-sans text-sm text-charcoal/50">
              Try adjusting your search or filter — or{' '}
              <button
                onClick={() => { setSearch(''); setActiveCategory('All'); }}
                className="text-gold underline underline-offset-2 hover:text-gold-dark transition-colors"
              >
                clear all filters
              </button>
            </p>
          </div>
        )}

        {/* Custom template CTA */}
        <div className="reveal mt-16 text-center" data-delay="1">
          <p className="font-sans text-sm text-charcoal/50 mb-4">
            Don't see exactly what you need?
          </p>
          <a
            href={`https://wa.me/${whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent('Hello INVYTRA! I need a fully custom invitation design that is not in your collection. Can you help?')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3.5 border border-charcoal/20 text-charcoal text-[11px] uppercase tracking-widest hover:border-gold hover:text-gold transition-all duration-300"
          >
            <MessageCircle size={14} />
            Request Custom Design
          </a>
        </div>
      </div>
    </section>
  );
}