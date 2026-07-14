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
  stats: Array<{
    number: string;
    suffix: string;
    label: string;
  }>;
  hero: {
    headline: string;
    subheading: string;
    video?: string;
  };
  features: Array<{
    icon: string;
    title: string;
    description: string;
  }>;
  process: Array<{
    step: string;
    icon: string;
    title: string;
    desc: string;
  }>;
  templates: Array<{
    id: string;
    name: string;
    category: string;
    tags: string[];
    keywords?: string[];
    price: number;
    badge?: string;
    rating: number;
    reviewCount: number;
    deliveryTime: string;
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
    weddingDate?: string;
    templateUsed?: string;
    verified?: boolean;
  }>;
  faq: Array<{
    question: string;
    answer: string;
  }>;
  contact: {
    whatsapp: string;
    displayWhatsapp: string;
    email: string;
    instagram: string;
    instagramUrl: string;
    location?: string;
  };
}

export type Template = WebsiteData['templates'][0];
export type Testimonial = WebsiteData['testimonials'][0];
export type Feature = WebsiteData['features'][0];
export type ProcessStep = WebsiteData['process'][0];
export type FAQ = WebsiteData['faq'][0];
export type Stat = WebsiteData['stats'][0];