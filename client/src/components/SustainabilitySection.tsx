export function SustainabilitySection() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl font-bold mb-3">Reduce Food Waste, Cook Sustainably</h2>
          <p className="text-neutral-700 max-w-2xl mx-auto">
            Our intelligent system helps you use what you have effectively, reducing waste and environmental impact.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Stat 1 */}
          <div className="bg-neutral-100 rounded-xl p-8 text-center">
            <div className="text-4xl font-display font-bold text-primary mb-2">30%</div>
            <p className="text-neutral-700">Average reduction in household food waste with smart ingredient pairing</p>
          </div>
          
          {/* Stat 2 */}
          <div className="bg-neutral-100 rounded-xl p-8 text-center">
            <div className="text-4xl font-display font-bold text-primary mb-2">85%</div>
            <p className="text-neutral-700">Of users report discovering new ways to use ingredients they already had</p>
          </div>
          
          {/* Stat 3 */}
          <div className="bg-neutral-100 rounded-xl p-8 text-center">
            <div className="text-4xl font-display font-bold text-primary mb-2">5+</div>
            <p className="text-neutral-700">Additional meal ideas on average from each set of scanned ingredients</p>
          </div>
        </div>
        
        <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <img 
              src="https://images.unsplash.com/photo-1540420773420-3366772f4999?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=800" 
              alt="Creative use of vegetables to reduce food waste" 
              className="rounded-xl shadow-lg"
            />
          </div>
          
          <div>
            <h3 className="font-display text-2xl font-bold mb-4">Smart Suggestions for What You Already Have</h3>
            <p className="text-neutral-700 mb-6">
              Our intelligent system analyzes your available ingredients and suggests creative ways to use them before they go bad.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-success bg-opacity-20 flex items-center justify-center text-success mt-1">
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
                    <path d="M8 3H7a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h1"></path>
                    <path d="M17 3h1a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-1"></path>
                    <path d="M12 12h1a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-1"></path>
                    <path d="M8 12H7a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h1"></path>
                    <path d="M8 7h8"></path>
                    <path d="M8 17h8"></path>
                  </svg>
                </div>
                <div>
                  <h4 className="font-accent font-semibold">Smart Inventory Management</h4>
                  <p className="text-neutral-600">Get alerts when ingredients are about to expire and suggestions for how to use them.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-success bg-opacity-20 flex items-center justify-center text-success mt-1">
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
                    <path d="M2 22a10 10 0 0 1 10-10"></path>
                    <path d="M16 6a4 4 0 1 0-8 0c0 1.45.77 2.3 1.5 3.5.82 1.35 1.5 2.7 1.5 4.5 0 2.21-1.79 4-4 4-1.8 0-3.35-1.2-3.88-2.89"></path>
                    <path d="M13.4 6h5.3"></path>
                    <path d="M13.5 12h5.3a5 5 0 0 1-5.3 5"></path>
                  </svg>
                </div>
                <div>
                  <h4 className="font-accent font-semibold">Full Ingredient Usage</h4>
                  <p className="text-neutral-600">Learn how to use every part of your produce, from roots to stems to leaves.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-success bg-opacity-20 flex items-center justify-center text-success mt-1">
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
                    <path d="M7 10v12"></path>
                    <path d="M15 5.88V10"></path>
                    <circle cx="15" cy="5" r="3"></circle>
                    <circle cx="17" cy="17" r="3"></circle>
                    <path d="M7 3v4"></path>
                    <path d="M7 7H4a1 1 0 0 0-1 1v7a1 1 0 0 0 1 1h3"></path>
                    <path d="M20 18a1 1 0 0 0 1-1v-5a1 1 0 0 0-1-1h-3"></path>
                  </svg>
                </div>
                <div>
                  <h4 className="font-accent font-semibold">Smarter Shopping</h4>
                  <p className="text-neutral-600">Get a shopping list that complements what you already have to minimize waste.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
