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
    const msg = `Hello INVYTRA!%0A%0AI would like to order this template:%0A%0A*Template:* ${template.name}%0A*Price:* ₹${template.price}%0A%0APlease assist me.`;
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

  const badgeStyles: Record<string, string> = {
    Bestseller: 'bg-[#C9A84C] text-white',
    'Most Loved': 'bg-rose-500 text-white',
    Trending: 'bg-[#1A1A1A] text-white',
    New: 'bg-emerald-700 text-white',
  };

  return (
    <article
      className="group flex flex-col bg-white overflow-hidden transition-all duration-300 hover:-translate-y-1"
      style={{
        borderRadius: '16px',
        border: '1px solid #E8E4DC',
        boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
      }}
    >
      {/* ── Image ── */}
      <div
        className="relative overflow-hidden flex-shrink-0 bg-[#F5F1EB]"
        style={{ aspectRatio: '4/5', borderRadius: '14px 14px 0 0' }}
      >
        <img
          src={template.thumbnail}
          alt={`${template.name} invitation template`}
          className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
          loading="lazy"
          decoding="async"
        />

        {/* Subtle dark veil on hover — for overlay buttons */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300" />

        {/* Badge */}
        {template.badge && (
          <div
            className={`absolute top-3 left-3 px-2.5 py-1 text-[9px] uppercase tracking-[0.18em] font-semibold ${badgeStyles[template.badge] ?? 'bg-white text-[#1A1A1A]'}`}
            style={{ borderRadius: '6px' }}
          >
            {template.badge}
          </div>
        )}

        {/* Wishlist */}
        <button
          onClick={(e) => { e.stopPropagation(); setLiked(!liked); }}
          aria-label={liked ? 'Remove from favourites' : 'Save to favourites'}
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center transition-all duration-200 hover:bg-white hover:scale-105"
        >
          <Heart
            size={13}
            className={liked ? 'fill-rose-500 text-rose-500' : 'text-[#1A1A1A]/50'}
          />
        </button>

        {/* Hover overlay actions */}
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2.5 opacity-0 group-hover:opacity-100 transition-opacity duration-250">
          {hasPreview && (
            <a
              href={template.previewLink}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              aria-label={`Live demo of ${template.name}`}
              className="flex items-center gap-2 bg-white text-[#1A1A1A] text-[10px] uppercase tracking-[0.18em] font-semibold px-5 py-2.5 hover:bg-[#C9A84C] hover:text-white transition-colors duration-250"
              style={{ borderRadius: '8px' }}
            >
              <ExternalLink size={11} strokeWidth={2} />
              Live Demo
            </a>
          )}
          <button
            onClick={handleCopyLink}
            className="flex items-center gap-2 bg-white/15 backdrop-blur-sm border border-white/40 text-white text-[10px] uppercase tracking-[0.18em] font-medium px-5 py-2 hover:bg-white/25 transition-colors duration-250"
            style={{ borderRadius: '8px' }}
          >
            {copied ? <Check size={11} strokeWidth={2} /> : <Copy size={11} strokeWidth={2} />}
            {copied ? 'Copied!' : 'Copy Link'}
          </button>
        </div>

        {/* Category — bottom-left */}
        <div
          className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm px-2.5 py-1"
          style={{ borderRadius: '6px' }}
        >
          <span className="text-[#C9A84C] text-[9px] uppercase tracking-[0.2em] font-semibold">
            {template.category}
          </span>
        </div>
      </div>

      {/* ── Body ── */}
      <div className="flex flex-col flex-1 p-5 gap-0">

        {/* Title + Price */}
        <div className="flex items-start justify-between gap-3 mb-2">
          <h3
            className="font-heading text-[#1A1A1A] leading-snug"
            style={{ fontSize: 'clamp(1rem, 2.5vw, 1.2rem)' }}
          >
            {template.name}
          </h3>
          <span
            className="font-heading text-[#C9A84C] font-semibold flex-shrink-0"
            style={{ fontSize: 'clamp(1rem, 2.5vw, 1.15rem)' }}
          >
            ₹{template.price}
          </span>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-2 mb-2.5">
          <div className="flex gap-[2px]">
            {[1, 2, 3, 4, 5].map((i) => (
              <Star
                key={i}
                size={10}
                className={i <= Math.round(template.rating) ? 'fill-[#C9A84C] text-[#C9A84C]' : 'text-[#1A1A1A]/12'}
              />
            ))}
          </div>
          <span className="text-[11px] text-[#1A1A1A]/45 font-sans tabular-nums">
            {template.rating.toFixed(1)}
          </span>
          <span className="text-[10px] text-[#1A1A1A]/30 font-sans">
            ({template.reviewCount})
          </span>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          {template.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="text-[9px] uppercase tracking-[0.15em] text-[#1A1A1A]/40 font-sans"
              style={{
                border: '1px solid #E0DBD1',
                borderRadius: '4px',
                padding: '1px 6px',
                letterSpacing: '0.12em',
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Description */}
        <p className="font-sans text-[12.5px] text-[#1A1A1A]/50 leading-relaxed line-clamp-2 flex-1 mb-3">
          {template.description}
        </p>

        {/* Delivery */}
        <div className="flex items-center gap-1.5 mb-4">
          <div className="w-3.5 h-3.5 flex-shrink-0 text-[#C9A84C]/60">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>
            </svg>
          </div>
          <span className="text-[10px] uppercase tracking-[0.18em] text-[#1A1A1A]/35 font-sans">
            Delivery in {template.deliveryTime}
          </span>
        </div>

        {/* ── CTA Buttons ── */}
        <div className="flex flex-col gap-1.5 mt-auto">
          {/* Primary */}
          <button
            onClick={handleWhatsApp}
            className="w-full flex items-center justify-center gap-2 text-white font-sans font-medium transition-all duration-250 hover:opacity-90 active:scale-[0.98]"
            style={{
              background: '#1A1A1A',
              borderRadius: '10px',
              padding: '9.5px 16px',
              fontSize: '10.5px',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
            }}
            aria-label={`Order ${template.name} via WhatsApp`}
          >
            <MessageCircle size={12} strokeWidth={2} />
            Order on WhatsApp
          </button>

          {/* Secondary */}
          <button
            onClick={() => onSelectTemplate(template.id)}
            className="w-full flex items-center justify-center gap-1.5 font-sans font-medium text-[#1A1A1A]/60 hover:text-[#C9A84C] transition-colors duration-250"
            style={{
              border: '1px solid #E8E4DC',
              borderRadius: '10px',
              padding: '8.5px 16px',
              fontSize: '10.5px',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              background: 'transparent',
            }}
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
          t.description.toLowerCase().includes(q) ||
          (t.keywords && t.keywords.some((kw) => kw.toLowerCase().includes(q)))
      );
    }

    // Category filter
    if (activeCategory !== 'All') {
      const catLower = activeCategory.toLowerCase();
      list = list.filter((t) => {
        // Match category
        const matchesCategory = t.category.toLowerCase().includes(catLower) || catLower.includes(t.category.toLowerCase());
        // Match tags
        const matchesTags = t.tags.some((tag) => tag.toLowerCase() === catLower);
        // Match keywords
        const matchesKeywords = t.keywords ? t.keywords.some((kw) => kw.toLowerCase() === catLower) : false;
        
        // Special maps/synonyms for overlapping tags or related topics
        let matchesSynonyms = false;
        if (catLower === 'wedding' || catLower === 'marriage') {
          // If we select Wedding/Marriage, show both weddings, marriages, nikah, etc.
          const text = (t.category + ' ' + (t.keywords?.join(' ') || '')).toLowerCase();
          matchesSynonyms = text.includes('wedding') || text.includes('marriage') || text.includes('nikah');
        }
        if (catLower === 'nikah') {
          const text = (t.name + ' ' + t.category + ' ' + (t.keywords?.join(' ') || '')).toLowerCase();
          matchesSynonyms = text.includes('nikah');
        }
        if (catLower === 'engagement') {
          const text = (t.name + ' ' + t.category + ' ' + (t.keywords?.join(' ') || '')).toLowerCase();
          matchesSynonyms = text.includes('engagement');
        }
        if (catLower === 'trending') {
          matchesSynonyms = t.badge?.toLowerCase() === 'trending' || t.badge?.toLowerCase() === 'bestseller' || t.badge?.toLowerCase() === 'most loved';
        }

        return matchesCategory || matchesTags || matchesKeywords || matchesSynonyms;
      });
    }

    // Sort
    switch (sortBy) {
      case 'rating':
        list.sort((a, b) => b.rating - a.rating);
        break;
      case 'price-asc':
        list.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        list.sort((a, b) => b.price - a.price);
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