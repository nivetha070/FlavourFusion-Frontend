import { IdentifiedIngredient, PairingRecommendation } from "./types";
import { apiRequest } from "./queryClient";

// Function to identify ingredients from an image
export async function identifyIngredientsFromImage(file: File): Promise<{ identifiedIngredients: IdentifiedIngredient[] }> {
  const formData = new FormData();
  formData.append("image", file);
  
  const response = await fetch("/api/identify-ingredients", {
    method: "POST",
    body: formData,
    credentials: "include"
  });
  
  if (!response.ok) {
    const text = await response.text();
    throw new Error(`${response.status}: ${text || response.statusText}`);
  }
  
  return response.json();
}

// Function to get pairing recommendations for a set of ingredients
export async function getPairingRecommendations(ingredientIds: number[]): Promise<{ pairingRecommendations: PairingRecommendation[] }> {
  const response = await apiRequest("POST", "/api/pairing-recommendations", { ingredientIds });
  return response.json();
}

// Function to get the user's flavor profile
export async function getUserFlavorProfile(userId: number) {
  const response = await fetch(`/api/users/${userId}/flavor-preferences`, {
    credentials: "include"
  });
  
  if (!response.ok) {
    const text = await response.text();
    throw new Error(`${response.status}: ${text || response.statusText}`);
  }
  
  return response.json();
}

// Function to get dietary preferences
export async function getUserDietaryPreferences(userId: number) {
  const response = await fetch(`/api/users/${userId}/dietary-preferences`, {
    credentials: "include"
  });
  
  if (!response.ok) {
    const text = await response.text();
    throw new Error(`${response.status}: ${text || response.statusText}`);
  }
  
  return response.json();
}

// Function to get cuisine preferences
export async function getUserCuisinePreferences(userId: number) {
  const response = await fetch(`/api/users/${userId}/cuisine-preferences`, {
    credentials: "include"
  });
  
  if (!response.ok) {
    const text = await response.text();
    throw new Error(`${response.status}: ${text || response.statusText}`);
  }
  
  return response.json();
}

// Function to add a dietary preference
export async function addDietaryPreference(userId: number, preferenceType: string) {
  return apiRequest("POST", "/api/dietary-preferences", {
    user_id: userId,
    preference_type: preferenceType
  });
}

// Function to remove a dietary preference
export async function removeDietaryPreference(id: number) {
  return apiRequest("DELETE", `/api/dietary-preferences/${id}`, undefined);
}

// Function to add a flavor preference
export async function addFlavorPreference(userId: number, flavorType: string, level: number) {
  return apiRequest("POST", "/api/flavor-preferences", {
    user_id: userId,
    flavor_type: flavorType,
    preference_level: level
  });
}

// Function to update a flavor preference
export async function updateFlavorPreference(id: number, level: number) {
  return apiRequest("PATCH", `/api/flavor-preferences/${id}`, {
    preference_level: level
  });
}

// Function to add a cuisine preference
export async function addCuisinePreference(userId: number, cuisineType: string) {
  return apiRequest("POST", "/api/cuisine-preferences", {
    user_id: userId,
    cuisine_type: cuisineType
  });
}

// Function to remove a cuisine preference
export async function removeCuisinePreference(id: number) {
  return apiRequest("DELETE", `/api/cuisine-preferences/${id}`, undefined);
}
