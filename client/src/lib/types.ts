// User related types
export interface User {
  id: number;
  username: string;
  email: string;
}

export interface DietaryPreference {
  id: number;
  user_id: number;
  preference_type: string;
}

export interface FlavorPreference {
  id: number;
  user_id: number;
  flavor_type: string;
  preference_level: number;
}

export interface CuisinePreference {
  id: number;
  user_id: number;
  cuisine_type: string;
}

// Ingredient related types
export interface FlavorProfile {
  sweet: number;
  salty: number;
  sour: number;
  bitter: number;
  umami: number;
}

export interface Ingredient {
  id: number;
  name: string;
  flavor_profile: FlavorProfile;
  primary_taste: string;
  category: string;
}

export interface IdentifiedIngredient {
  name: string;
  confidence: number;
  flavorProfile: FlavorProfile;
  primaryTaste: string;
}

// Pairing related types
export interface Pairing {
  id: number;
  ingredient1_id: number;
  ingredient2_id: number;
  affinity_score: number;
  pairing_notes: string;
  ingredient1_name?: string;
  ingredient2_name?: string;
}

export interface EnrichedPairing extends Pairing {
  paired_ingredient_name: string;
  paired_ingredient_id: number;
}

export interface PairingRecommendation {
  ingredient: string;
  pairsWith: string;
  affinityScore: number;
  pairingNotes: string;
  recipes: number;
  cuisineType: string;
}
