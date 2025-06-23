import { Link } from 'wouter';
import { Button } from '@/components/ui/button';

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-primary-dark text-white">
      {/* Background image */}
      <div 
        className="absolute inset-0 opacity-30 bg-cover bg-center"
        style={{ 
          backgroundImage: 'url(https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&h=1080)'
        }}
      ></div>
      
      <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
        <div className="max-w-2xl">
          <h1 className="font-display text-3xl md:text-5xl font-bold mb-4">Reimagine Your Kitchen Experience</h1>
          <p className="text-lg md:text-xl opacity-90 mb-8">
            Discover perfect ingredient pairings, reduce food waste, and create delicious meals with AI-powered ingredient recognition.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/ingredient-scanner">
              <Button 
                size="lg" 
                className="bg-accent hover:bg-accent-dark text-white flex items-center justify-center gap-2"
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  className="w-5 h-5"
                >
                  <path d="M15 8v.5A2.5 2.5 0 0 1 12.5 11h-1A2.5 2.5 0 0 0 9 13.5v.5"></path>
                  <path d="M17.8 15.1c-.4.2-.8.3-1.3.3-1.5 0-2.7-1-3-2.4"></path>
                  <path d="M2 8v3c0 1.1.9 2 2 2h1.7c.5 0 .9.4.9.9v7.6c0 .9.6 1.5 1.5 1.5s1.5-.6 1.5-1.5V14c0-.5.4-.9.9-.9H12"></path>
                  <path d="M17.1 2.1c.2.1.3.1.5.2l2 1.8c.3.1.5.4.5.9v9c0 .5-.4.9-.9.9"></path>
                  <path d="M14.6 15.1A3.8 3.8 0 0 1 19 11a3.5 3.5 0 0 0-6.7-1"></path>
                  <path d="M2 12v2c0 1.1.9 2 2 2h3"></path>
                  <path d="M11.1 2.1c.2.1.3.1.5.2l2 1.8c.3.1.5.4.5.9v3a2 2 0 0 1-2 2h-2"></path>
                  <path d="M19 2v3c0 1.1-.9 2-2 2h-2v2c0 1.1-.9 2-2 2h-1"></path>
                </svg>
                Scan Ingredients
              </Button>
            </Link>
            <Button 
              size="lg" 
              variant="outline" 
              className="bg-white hover:bg-neutral-100 text-primary"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                className="w-5 h-5 mr-2"
              >
                <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"></path>
              </svg>
              Explore Recipes
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
