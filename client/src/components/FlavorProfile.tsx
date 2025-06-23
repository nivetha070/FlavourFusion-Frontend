import { DietaryPreferences } from '@/components/DietaryPreferences';

export function FlavorProfile() {
  // This would be fetched from the API in a real implementation
  const flavorPreferences = [
    { name: "Sweet", value: 65 },
    { name: "Savory", value: 80 },
    { name: "Spicy", value: 45 },
    { name: "Acidic", value: 70 }
  ];
  
  const dietaryPreferences = ["Pescatarian", "Low Sodium", "No Peanuts"];
  const cuisinePreferences = ["Mediterranean", "Japanese", "Mexican"];

  return (
    <>
      <h3 className="font-display font-bold text-xl mb-6 text-center">Your Flavor Profile</h3>
      
      {/* Flavor Preferences Visualization */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        {flavorPreferences.map((flavor, index) => (
          <div key={index} className="bg-neutral-100 rounded-lg p-4">
            <div className="flex justify-between items-center mb-2">
              <span className="font-accent text-sm">{flavor.name}</span>
              <span className="text-xs text-neutral-600">{flavor.value}%</span>
            </div>
            <div className="w-full bg-neutral-300 rounded-full h-2">
              <div 
                className="bg-secondary h-2 rounded-full" 
                style={{ width: `${flavor.value}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Dietary Preferences */}
      <div className="mb-6">
        <h4 className="font-accent font-semibold mb-3 text-sm uppercase text-neutral-600">Dietary Preferences</h4>
        <div className="flex flex-wrap gap-2">
          {dietaryPreferences.map((preference, index) => (
            <span 
              key={index}
              className="bg-primary-light bg-opacity-20 text-primary text-xs py-1 px-3 rounded-full"
            >
              {preference}
            </span>
          ))}
          <span className="bg-neutral-200 text-neutral-600 text-xs py-1 px-3 rounded-full cursor-pointer">
            + Add More
          </span>
        </div>
      </div>
      
      {/* Cuisine Preferences */}
      <div>
        <h4 className="font-accent font-semibold mb-3 text-sm uppercase text-neutral-600">Favorite Cuisines</h4>
        <div className="flex flex-wrap gap-2">
          {cuisinePreferences.map((cuisine, index) => (
            <span 
              key={index}
              className="bg-secondary bg-opacity-20 text-secondary-dark text-xs py-1 px-3 rounded-full"
            >
              {cuisine}
            </span>
          ))}
          <span className="bg-neutral-200 text-neutral-600 text-xs py-1 px-3 rounded-full cursor-pointer">
            + Add More
          </span>
        </div>
      </div>
    </>
  );
}
