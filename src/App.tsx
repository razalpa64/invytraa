import { useEffect, useState } from 'react';
import Lenis from 'lenis';
import { useWebsiteData } from './hooks/useWebsiteData';
import LoadingScreen from './components/LoadingScreen';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import FeaturedTemplates from './components/FeaturedTemplates';
import About from './components/About';
import WhyChooseUs from './components/WhyChooseUs';
import Process from './components/Process';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import InstagramGallery from './components/InstagramGallery';
import Footer from './components/Footer';
import TemplateModal from './components/TemplateModal';

function App() {
  const { data, loading, error } = useWebsiteData();
  const [isAppReady, setIsAppReady] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 0.9,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.8,
      touchMultiplier: 1.8,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  if (error) {
    return <div className="h-screen w-full flex items-center justify-center text-charcoal font-sans text-xl">Error loading website data. Please try again.</div>;
  }

  if (loading || !data || !isAppReady) {
    return <LoadingScreen data={data} onComplete={() => setIsAppReady(true)} />;
  }

  const selectedTemplateData = selectedTemplate ? data.templates.find(t => t.id === selectedTemplate) : null;

  return (
    <div className="bg-ivory min-h-screen text-charcoal overflow-hidden">
      <Navbar brandName={data.brand.name} />
      <main>
        <Hero data={data.hero} />
        <FeaturedTemplates templates={data.templates} onSelectTemplate={setSelectedTemplate} />
        <About data={data.brand.about} />
        <WhyChooseUs features={data.features} />
        <Process steps={data.process} />
        <Testimonials testimonials={data.testimonials} />
        <Contact contact={data.contact} />
        <InstagramGallery contact={data.contact} />
      </main>
      <Footer brandName={data.brand.name} contact={data.contact} />
      
      {selectedTemplateData && (
        <TemplateModal 
          template={selectedTemplateData} 
          contact={data.contact}
          onClose={() => setSelectedTemplate(null)} 
        />
      )}
    </div>
  );
}

export default App;