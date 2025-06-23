export function Features() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl font-bold mb-3">How Flavour Fusion Works</h2>
          <p className="text-neutral-700 max-w-2xl mx-auto">
            Our innovative technology combines machine learning and culinary expertise to transform your cooking experience.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Feature 1 */}
          <div className="text-center p-6">
            <div className="w-16 h-16 rounded-full bg-primary-light bg-opacity-20 flex items-center justify-center mx-auto mb-4">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                className="text-primary text-2xl w-8 h-8"
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
            </div>
            <h3 className="font-display font-semibold text-xl mb-2">Identify Ingredients</h3>
            <p className="text-neutral-700">Snap a photo of your ingredients and our AI will identify them instantly.</p>
          </div>
          
          {/* Feature 2 */}
          <div className="text-center p-6">
            <div className="w-16 h-16 rounded-full bg-secondary bg-opacity-20 flex items-center justify-center mx-auto mb-4">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                className="text-secondary text-2xl w-8 h-8"
              >
                <path d="M9.5 9.5 14 14"></path>
                <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path>
                <circle cx="12" cy="12" r="3"></circle>
              </svg>
            </div>
            <h3 className="font-display font-semibold text-xl mb-2">Analyze Flavors</h3>
            <p className="text-neutral-700">Our system analyzes the flavor profile of each ingredient in your kitchen.</p>
          </div>
          
          {/* Feature 3 */}
          <div className="text-center p-6">
            <div className="w-16 h-16 rounded-full bg-accent bg-opacity-20 flex items-center justify-center mx-auto mb-4">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                className="text-accent text-2xl w-8 h-8"
              >
                <path d="M12 5v14"></path>
                <path d="M18 13a5 5 0 0 0-6 0"></path>
                <path d="M6 13a5 5 0 0 1 6 0"></path>
                <path d="M18 7a7 7 0 0 0-12 0"></path>
              </svg>
            </div>
            <h3 className="font-display font-semibold text-xl mb-2">Get Pairings</h3>
            <p className="text-neutral-700">Discover perfect ingredient combinations based on complementary flavors.</p>
          </div>
          
          {/* Feature 4 */}
          <div className="text-center p-6">
            <div className="w-16 h-16 rounded-full bg-success bg-opacity-20 flex items-center justify-center mx-auto mb-4">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                className="text-success text-2xl w-8 h-8"
              >
                <path d="M2 22a10 10 0 0 1 10-10"></path>
                <path d="M16 6a4 4 0 1 0-8 0c0 1.45.77 2.3 1.5 3.5.82 1.35 1.5 2.7 1.5 4.5 0 2.21-1.79 4-4 4-1.8 0-3.35-1.2-3.88-2.89"></path>
                <path d="M13.4 6h5.3"></path>
                <path d="M13.5 12h5.3a5 5 0 0 1-5.3 5"></path>
              </svg>
            </div>
            <h3 className="font-display font-semibold text-xl mb-2">Reduce Waste</h3>
            <p className="text-neutral-700">Use what you have efficiently and minimize food waste with smart suggestions.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
