import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export function FlavorPairing() {
  const pairingExamples = [
    {
      id: 1,
      ingredient1: "Tomato",
      ingredient2: "Basil",
      description: "The bright acidity of tomatoes perfectly complements the aromatic, slightly peppery notes of fresh basil.",
      affinity: 95,
      cuisine: "Italian"
    },
    {
      id: 2,
      ingredient1: "Chocolate",
      ingredient2: "Orange",
      description: "The richness of chocolate pairs harmoniously with the citrusy brightness of orange, creating a balanced flavor contrast.",
      affinity: 88,
      cuisine: "Dessert"
    },
    {
      id: 3,
      ingredient1: "Strawberry",
      ingredient2: "Balsamic",
      description: "The sweetness of strawberries is enhanced by the complex sweetness and acidity of balsamic vinegar.",
      affinity: 86,
      cuisine: "Mediterranean"
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-neutral-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl font-bold mb-3">Discover Perfect Flavor Pairings</h2>
          <p className="text-neutral-700 max-w-2xl mx-auto">
            Our AI analyzes thousands of ingredient combinations to suggest perfect pairings based on complementary flavor profiles.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {pairingExamples.map((pairing) => (
            <div key={pairing.id} className="bg-white rounded-xl shadow-md overflow-hidden border border-neutral-200">
              <div className="bg-neutral-50 p-4 border-b border-neutral-200">
                <div className="flex justify-between items-center">
                  <span className="bg-primary-light bg-opacity-20 text-primary text-xs py-1 px-3 rounded-full">
                    Affinity: {pairing.affinity}%
                  </span>
                  <span className="bg-secondary bg-opacity-20 text-secondary-dark text-xs py-1 px-3 rounded-full">
                    {pairing.cuisine}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-display font-bold text-xl mb-3">
                  {pairing.ingredient1} + {pairing.ingredient2}
                </h3>
                <p className="text-neutral-700 mb-4">
                  {pairing.description}
                </p>
                <div className="flex space-x-2 mt-4">
                  <Button variant="outline" size="sm" className="w-full">
                    View Recipes
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="bg-primary bg-opacity-10 rounded-xl p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="font-display text-2xl font-bold mb-4">Science Behind Flavor Pairing</h3>
              <p className="text-neutral-700 mb-4">
                Our advanced algorithm analyzes molecular compounds shared between ingredients to identify complementary flavor profiles that work well together.
              </p>
              <p className="text-neutral-700 mb-6">
                By understanding the chemistry of taste and aroma, we can predict which ingredients will enhance each other, creating balanced and exciting flavor combinations.
              </p>
              <Link href="/ingredient-scanner">
                <Button>
                  Try It Yourself
                </Button>
              </Link>
            </div>
            <div className="flex justify-center">
              <div className="relative w-full max-w-md aspect-square rounded-xl bg-white p-6 shadow-lg border border-neutral-200">
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg
                    width="280"
                    height="280"
                    viewBox="0 0 280 280"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="text-neutral-200"
                  >
                    <circle cx="140" cy="140" r="138" stroke="currentColor" strokeWidth="2" />
                    <circle cx="140" cy="140" r="110" stroke="currentColor" strokeWidth="2" />
                    <circle cx="140" cy="140" r="80" stroke="currentColor" strokeWidth="2" />
                    <line x1="140" y1="0" x2="140" y2="280" stroke="currentColor" strokeWidth="2" />
                    <line x1="0" y1="140" x2="280" y2="140" stroke="currentColor" strokeWidth="2" />
                    <line x1="35" y1="35" x2="245" y2="245" stroke="currentColor" strokeWidth="2" />
                    <line x1="245" y1="35" x2="35" y2="245" stroke="currentColor" strokeWidth="2" />
                  </svg>
                  
                  {/* Flavor nodes */}
                  <div className="absolute top-[50px] left-[50px] w-12 h-12 rounded-full bg-primary-light flex items-center justify-center text-white font-bold">
                    Sweet
                  </div>
                  <div className="absolute top-[50px] right-[50px] w-12 h-12 rounded-full bg-secondary flex items-center justify-center text-white font-bold">
                    Sour
                  </div>
                  <div className="absolute bottom-[50px] left-[50px] w-12 h-12 rounded-full bg-accent flex items-center justify-center text-white font-bold">
                    Bitter
                  </div>
                  <div className="absolute bottom-[50px] right-[50px] w-12 h-12 rounded-full bg-primary-dark flex items-center justify-center text-white font-bold">
                    Umami
                  </div>
                  <div className="absolute top-[140px] left-[30px] w-12 h-12 rounded-full bg-secondary-dark flex items-center justify-center text-white font-bold">
                    Salty
                  </div>
                  
                  {/* Connecting lines */}
                  <svg
                    width="280"
                    height="280"
                    viewBox="0 0 280 280"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="absolute"
                  >
                    <line x1="62" y1="62" x2="218" y2="62" stroke="#4CAF50" strokeWidth="1.5" />
                    <line x1="62" y1="62" x2="62" y2="218" stroke="#FF9800" strokeWidth="1.5" />
                    <line x1="62" y1="218" x2="218" y2="218" stroke="#9C27B0" strokeWidth="1.5" />
                    <line x1="218" y1="62" x2="218" y2="218" stroke="#2196F3" strokeWidth="1.5" />
                    <line x1="62" y1="62" x2="218" y2="218" stroke="#E91E63" strokeWidth="1.5" />
                    <line x1="218" y1="62" x2="62" y2="218" stroke="#009688" strokeWidth="1.5" />
                    <line x1="42" y1="140" x2="238" y2="140" stroke="#607D8B" strokeWidth="1.5" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}