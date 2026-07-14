import { ExternalLink, MessageCircle } from 'lucide-react';
import { Template } from '../types';

interface Props {
  template: Template | null;
  whatsapp: string;
  onViewDetails: (id: string) => void;
}

/**
 * Sticky bottom action bar — visible on mobile only when a template is selected.
 * Shows Live Demo and Order on WhatsApp buttons.
 */
export default function MobileBottomBar({ template, whatsapp, onViewDetails }: Props) {
  if (!template) return null;

  const handleWhatsApp = () => {
    const msg = `Hello INVYTRA!%0A%0AI would like to order this template:%0A%0A*Template:* ${template.name}%0A*Price:* ₹${template.price}%0A%0APlease assist me.`;
    window.open(`https://wa.me/${whatsapp.replace(/[^0-9]/g, '')}?text=${msg}`, '_blank');
  };

  const hasPreview = template.previewLink?.startsWith('http');

  return (
    <div
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-ivory/95 backdrop-blur-lg border-t border-charcoal/8 safe-bottom"
      role="complementary"
      aria-label={`Quick actions for ${template.name}`}
    >
      <div className="flex gap-3 px-4 py-3">
        {hasPreview && (
          <a
            href={template.previewLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 py-3 border border-charcoal/15 text-charcoal text-[11px] uppercase tracking-widest font-medium hover:border-gold hover:text-gold transition-all"
          >
            <ExternalLink size={13} />
            Live Demo
          </a>
        )}
        <button
          onClick={handleWhatsApp}
          className="flex-1 flex items-center justify-center gap-2 py-3 bg-charcoal text-white text-[11px] uppercase tracking-widest font-medium hover:bg-gold transition-colors"
          aria-label={`Order ${template.name} on WhatsApp`}
        >
          <MessageCircle size={13} />
          Order Now
        </button>
      </div>
    </div>
  );
}
