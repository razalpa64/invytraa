export interface WebsiteData {
  brand: {
    name: string;
    tagline: string;
    loadingQuotes: string[];
    about: {
      heading: string;
      description1: string;
      description2: string;
      image: string;
    };
  };
  hero: {
    headline: string;
    subheading: string;
    video?: string;
  };
  features: Array<{ title: string; description: string }>;
  process: Array<{ step: string; title: string; desc: string }>;
  templates: Array<{
    id: string;
    name: string;
    category: string;
    price: string;
    thumbnail: string;
    previewLink: string;
    features: string[];
    description: string;
  }>;
  testimonials: Array<{
    name: string;
    event: string;
    text: string;
    rating: number;
  }>;
  contact: {
    whatsapp: string;
    displayWhatsapp: string;
    email: string;
    instagram: string;
    instagramUrl: string;
  };
}