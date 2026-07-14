import { useEffect, useState } from 'react';
import Lenis from 'lenis';
import { useWebsiteData } from './hooks/useWebsiteData';

// Core layout
import LoadingScreen from './components/LoadingScreen';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Page sections
import Hero from './components/Hero';
import FeaturedTemplates from './components/FeaturedTemplates';
import About from './components/About';
import Statistics from './components/Statistics';
import WhyChooseUs from './components/WhyChooseUs';
import Process from './components/Process';
import Testimonials from './components/Testimonials';
import ReviewForm from './components/ReviewForm';
import FAQSection from './components/FAQ';
import Contact from './components/Contact';
import InstagramGallery from './components/InstagramGallery';

// Modals & overlays
import TemplateModal from './components/TemplateModal';
import MobileBottomBar from './components/MobileBottomBar';

// UI utilities
import ScrollProgress from './components/ui/ScrollProgress';
import CustomCursor from './components/ui/CustomCursor';
import FloatingWhatsApp from './components/ui/FloatingWhatsApp';

function App() {
  const { data, loading, error } = useWebsiteData();
  const [isAppReady, setIsAppReady] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);

  // Lenis smooth scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 0.95,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.85,
      touchMultiplier: 1.8,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, []);

  if (error) {
    return (
      <div className="h-screen w-full flex items-center justify-center text-charcoal font-sans text-xl px-6 text-center">
        <div>
          <p className="font-heading text-4xl text-gold mb-4">INVYTRA</p>
          <p className="text-charcoal/60">Unable to load website data. Please refresh the page.</p>
        </div>
      </div>
    );
  }

  if (loading || !data || !isAppReady) {
    return <LoadingScreen data={data} onComplete={() => setIsAppReady(true)} />;
  }

  const selectedTemplateData = selectedTemplate
    ? data.templates.find((t) => t.id === selectedTemplate) ?? null
    : null;

  return (
    <div className="bg-ivory min-h-screen text-charcoal overflow-x-hidden">
      {/* Global UI utilities */}
      <ScrollProgress />
      <CustomCursor />
      <FloatingWhatsApp whatsapp={data.contact.whatsapp} />

      {/* Navigation */}
      <Navbar brandName={data.brand.name} />

      <main>
        {/* Hero */}
        <Hero data={data.hero} stats={data.stats} />

        {/* Template collection */}
        <FeaturedTemplates
          templates={data.templates}
          onSelectTemplate={setSelectedTemplate}
          whatsapp={data.contact.whatsapp}
        />

        {/* Statistics */}
        <Statistics stats={data.stats} />

        {/* About */}
        <About data={data.brand.about} />

        {/* Why Choose Us */}
        <WhyChooseUs features={data.features} />

        {/* How It Works */}
        <Process steps={data.process} />

        {/* Testimonials + Review Form */}
        <Testimonials testimonials={data.testimonials} />

        {/* Review submission form */}
        <section
          id="leave-review"
          aria-label="Leave a review"
          className="py-20 relative overflow-hidden"
          style={{ background: 'linear-gradient(180deg, #F5F1EB 0%, #FAF8F4 100%)' }}
        >
          <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-gold/5 blur-3xl pointer-events-none" />
          <div className="max-w-3xl mx-auto px-6 md:px-12 relative z-10">
            <div className="text-center mb-12">
              <span className="text-gold uppercase tracking-[0.35em] text-[11px] font-semibold mb-3 block">
                Share Your Story
              </span>
              <h2 className="font-heading text-3xl md:text-4xl text-charcoal">
                Leave a Review
              </h2>
              <div className="flex items-center justify-center gap-4 mt-6">
                <div className="h-[1px] w-16 gold-line" />
                <div className="w-1 h-1 rounded-full bg-gold/50" />
                <div className="h-[1px] w-16 gold-line" />
              </div>
            </div>
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl border border-white/60 shadow-glass px-8 py-10">
              <ReviewForm templates={data.templates} />
            </div>
          </div>
        </section>

        {/* FAQ */}
        <FAQSection faqs={data.faq} />

        {/* Contact */}
        <Contact contact={data.contact} />

        {/* Instagram Gallery */}
        <InstagramGallery contact={data.contact} />
      </main>

      {/* Footer */}
      <Footer brandName={data.brand.name} contact={data.contact} />

      {/* Template modal */}
      {selectedTemplateData && (
        <TemplateModal
          template={selectedTemplateData}
          contact={data.contact}
          onClose={() => setSelectedTemplate(null)}
        />
      )}

      {/* Mobile sticky bottom bar */}
      <MobileBottomBar
        template={selectedTemplateData}
        whatsapp={data.contact.whatsapp}
        onViewDetails={setSelectedTemplate}
      />
    </div>
  );
}

export default App;