import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export function CtaSection() {
  return (
    <section className="py-16 bg-primary-dark text-white relative overflow-hidden">
      {/* Background image with overlay */}
      <div 
        className="absolute inset-0 opacity-20 bg-cover bg-center"
        style={{ 
          backgroundImage: 'url(https://images.unsplash.com/photo-1606787366850-de6330128bfc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&h=1080)'
        }}
      ></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-6">
            Transform Your Cooking Experience Today
          </h2>
          <p className="text-lg opacity-90 mb-8">
            Join thousands of users who have discovered new flavors, reduced food waste, and simplified their meal planning.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
            <Link href="/ingredient-scanner">
              <Button 
                size="lg"
                className="bg-accent hover:bg-accent-dark text-white"
              >
                Get Started For Free
              </Button>
            </Link>
            
            <Link href="/dashboard">
              <Button 
                size="lg"
                variant="outline"
                className="bg-white hover:bg-neutral-100 text-primary"
              >
                Learn More
              </Button>
            </Link>
          </div>
          
          <p className="text-sm opacity-75">No credit card required. Free basic plan available.</p>
        </div>
      </div>
    </section>
  );
}
