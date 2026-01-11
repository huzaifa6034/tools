
import React, { useEffect } from 'react';
import { Tool } from '../types.ts';

interface SEOHeaderProps {
  tool: Tool;
}

const SEOHeader: React.FC<SEOHeaderProps> = ({ tool }) => {
  useEffect(() => {
    // Basic Meta
    document.title = tool.seoTitle;
    
    const updateMeta = (name: string, content: string, attr: 'name' | 'property' = 'name') => {
      let el = document.querySelector(`meta[${attr}="${name}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attr, name);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    updateMeta('description', tool.seoDescription);
    updateMeta('keywords', tool.keywords.join(', '));
    updateMeta('og:title', tool.seoTitle, 'property');
    updateMeta('og:description', tool.seoDescription, 'property');
    updateMeta('og:url', `https://toolly.online/${tool.slug}`, 'property');
    updateMeta('twitter:card', 'summary_large_image');

    // Canonical
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', `https://toolly.online/${tool.slug}`);

    // Structured Data (JSON-LD)
    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      "name": tool.name,
      "description": tool.description,
      "url": `https://toolly.online/${tool.slug}`,
      "applicationCategory": tool.category,
      "operatingSystem": "All",
      "offers": {
        "@type": "Offer",
        "price": tool.isPremium ? "9.99" : "0",
        "priceCurrency": "USD"
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.8",
        "reviewCount": "1250"
      }
    };

    let script = document.getElementById('json-ld');
    if (!script) {
      script = document.createElement('script');
      script.id = 'json-ld';
      script.setAttribute('type', 'application/ld+json');
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(jsonLd);

  }, [tool]);

  return null;
};

export default SEOHeader;
