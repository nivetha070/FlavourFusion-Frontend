import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// Import Google Fonts
const fontLink = document.createElement('link');
fontLink.rel = 'stylesheet';
fontLink.href = 'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Nunito:wght@300;400;600&family=Montserrat:wght@500;600;700&display=swap';
document.head.appendChild(fontLink);

// Set page title and description
document.title = "Flavour Fusion - Intelligent Ingredient Pairing";
const metaDescription = document.createElement('meta');
metaDescription.name = 'description';
metaDescription.content = 'Discover perfect ingredient pairings, reduce food waste, and create delicious meals with AI-powered ingredient recognition and flavor pairing technology.';
document.head.appendChild(metaDescription);

// Add Open Graph tags
const ogTags = [
  { property: 'og:title', content: 'Flavour Fusion - Intelligent Ingredient Pairing' },
  { property: 'og:description', content: 'Transform your cooking experience with AI-powered ingredient identification and pairing technology.' },
  { property: 'og:type', content: 'website' },
  { property: 'og:url', content: window.location.href },
  { property: 'og:site_name', content: 'Flavour Fusion' }
];

ogTags.forEach(tag => {
  const metaTag = document.createElement('meta');
  metaTag.property = tag.property;
  metaTag.content = tag.content;
  document.head.appendChild(metaTag);
});

createRoot(document.getElementById("root")!).render(<App />);
