import { Button } from '@/components/ui/button';
import { FlavorProfile } from '@/components/FlavorProfile';

export function PersonalizedExperience() {
  return (
    <section className="py-16 bg-neutral-100">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="font-display text-3xl font-bold mb-6">Personalized To Your Taste</h2>
            <p className="text-neutral-700 mb-6">
              We adapt to your preferences, dietary needs, and cooking style to provide the most relevant recommendations.
            </p>
            
            <div className="space-y-4 mb-8">
              {/* Preference Item 1 */}
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 rounded-full bg-primary-light flex items-center justify-center text-white">
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
                    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
                  </svg>
                </div>
                <div>
                  <h3 className="font-accent font-semibold">Preference Learning</h3>
                  <p className="text-neutral-600 text-sm">Our system learns from your ratings and behavior to improve suggestions over time.</p>
                </div>
              </div>
              
              {/* Preference Item 2 */}
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 rounded-full bg-primary-light flex items-center justify-center text-white">
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
                    <circle cx="12" cy="12" r="10"></circle>
                    <path d="m4.93 4.93 14.14 14.14"></path>
                  </svg>
                </div>
                <div>
                  <h3 className="font-accent font-semibold">Dietary Restrictions</h3>
                  <p className="text-neutral-600 text-sm">Set allergies, intolerances, or preferences to get safe and relevant recommendations.</p>
                </div>
              </div>
              
              {/* Preference Item 3 */}
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 rounded-full bg-primary-light flex items-center justify-center text-white">
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
                    <circle cx="12" cy="12" r="10"></circle>
                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                    <path d="M2 12h20"></path>
                  </svg>
                </div>
                <div>
                  <h3 className="font-accent font-semibold">Cultural Cuisine Focus</h3>
                  <p className="text-neutral-600 text-sm">Specify cuisine preferences to get more culturally relevant pairing suggestions.</p>
                </div>
              </div>
            </div>
            
            <Button>
              Set Your Preferences
            </Button>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6">
            <FlavorProfile />
          </div>
        </div>
      </div>
    </section>
  );
}
