import {
  users,
  dietaryPreferences,
  flavorPreferences,
  cuisinePreferences,
  ingredients,
  pairings,
  userIngredients,
  type User,
  type InsertUser,
  type DietaryPreference,
  type InsertDietaryPreference,
  type FlavorPreference,
  type InsertFlavorPreference,
  type CuisinePreference,
  type InsertCuisinePreference,
  type Ingredient,
  type InsertIngredient,
  type Pairing,
  type InsertPairing,
  type UserIngredient,
  type InsertUserIngredient
} from "@shared/schema";

export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Dietary preferences operations
  getDietaryPreferences(userId: number): Promise<DietaryPreference[]>;
  addDietaryPreference(preference: InsertDietaryPreference): Promise<DietaryPreference>;
  removeDietaryPreference(id: number): Promise<void>;
  
  // Flavor preferences operations
  getFlavorPreferences(userId: number): Promise<FlavorPreference[]>;
  addFlavorPreference(preference: InsertFlavorPreference): Promise<FlavorPreference>;
  updateFlavorPreference(id: number, level: number): Promise<FlavorPreference | undefined>;
  
  // Cuisine preferences operations
  getCuisinePreferences(userId: number): Promise<CuisinePreference[]>;
  addCuisinePreference(preference: InsertCuisinePreference): Promise<CuisinePreference>;
  removeCuisinePreference(id: number): Promise<void>;
  
  // Ingredient operations
  getIngredient(id: number): Promise<Ingredient | undefined>;
  getIngredientByName(name: string): Promise<Ingredient | undefined>;
  getAllIngredients(): Promise<Ingredient[]>;
  createIngredient(ingredient: InsertIngredient): Promise<Ingredient>;
  searchIngredients(query: string): Promise<Ingredient[]>;
  
  // Pairing operations
  getPairing(ingredient1Id: number, ingredient2Id: number): Promise<Pairing | undefined>;
  getAllPairings(): Promise<Pairing[]>;
  createPairing(pairing: InsertPairing): Promise<Pairing>;
  getPairingsForIngredient(ingredientId: number): Promise<Pairing[]>;
  
  // User ingredients operations
  getUserIngredients(userId: number): Promise<UserIngredient[]>;
  addUserIngredient(userIngredient: InsertUserIngredient): Promise<UserIngredient>;
  removeUserIngredient(id: number): Promise<void>;
  updateUserIngredient(id: number, quantity: string, expiryDate?: Date): Promise<UserIngredient | undefined>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private dietaryPreferences: Map<number, DietaryPreference>;
  private flavorPreferences: Map<number, FlavorPreference>;
  private cuisinePreferences: Map<number, CuisinePreference>;
  private ingredients: Map<number, Ingredient>;
  private pairings: Map<number, Pairing>;
  private userIngredients: Map<number, UserIngredient>;
  
  private userId: number;
  private dietaryPrefId: number;
  private flavorPrefId: number;
  private cuisinePrefId: number;
  private ingredientId: number;
  private pairingId: number;
  private userIngredientId: number;
  
  constructor() {
    this.users = new Map();
    this.dietaryPreferences = new Map();
    this.flavorPreferences = new Map();
    this.cuisinePreferences = new Map();
    this.ingredients = new Map();
    this.pairings = new Map();
    this.userIngredients = new Map();
    
    this.userId = 1;
    this.dietaryPrefId = 1;
    this.flavorPrefId = 1;
    this.cuisinePrefId = 1;
    this.ingredientId = 1;
    this.pairingId = 1;
    this.userIngredientId = 1;
    
    // Initialize with some example ingredients data
    this.seedData();
  }
  
  // User operations
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }
  
  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username
    );
  }
  
  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.email === email
    );
  }
  
  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userId++;
    const now = new Date();
    const user: User = { ...insertUser, id, created_at: now };
    this.users.set(id, user);
    return user;
  }
  
  // Dietary preferences operations
  async getDietaryPreferences(userId: number): Promise<DietaryPreference[]> {
    return Array.from(this.dietaryPreferences.values()).filter(
      (pref) => pref.user_id === userId
    );
  }
  
  async addDietaryPreference(preference: InsertDietaryPreference): Promise<DietaryPreference> {
    const id = this.dietaryPrefId++;
    const dietaryPref: DietaryPreference = { ...preference, id };
    this.dietaryPreferences.set(id, dietaryPref);
    return dietaryPref;
  }
  
  async removeDietaryPreference(id: number): Promise<void> {
    this.dietaryPreferences.delete(id);
  }
  
  // Flavor preferences operations
  async getFlavorPreferences(userId: number): Promise<FlavorPreference[]> {
    return Array.from(this.flavorPreferences.values()).filter(
      (pref) => pref.user_id === userId
    );
  }
  
  async addFlavorPreference(preference: InsertFlavorPreference): Promise<FlavorPreference> {
    const id = this.flavorPrefId++;
    const flavorPref: FlavorPreference = { ...preference, id };
    this.flavorPreferences.set(id, flavorPref);
    return flavorPref;
  }
  
  async updateFlavorPreference(id: number, level: number): Promise<FlavorPreference | undefined> {
    const preference = this.flavorPreferences.get(id);
    if (!preference) return undefined;
    
    const updatedPreference = { ...preference, preference_level: level };
    this.flavorPreferences.set(id, updatedPreference);
    return updatedPreference;
  }
  
  // Cuisine preferences operations
  async getCuisinePreferences(userId: number): Promise<CuisinePreference[]> {
    return Array.from(this.cuisinePreferences.values()).filter(
      (pref) => pref.user_id === userId
    );
  }
  
  async addCuisinePreference(preference: InsertCuisinePreference): Promise<CuisinePreference> {
    const id = this.cuisinePrefId++;
    const cuisinePref: CuisinePreference = { ...preference, id };
    this.cuisinePreferences.set(id, cuisinePref);
    return cuisinePref;
  }
  
  async removeCuisinePreference(id: number): Promise<void> {
    this.cuisinePreferences.delete(id);
  }
  
  // Ingredient operations
  async getIngredient(id: number): Promise<Ingredient | undefined> {
    return this.ingredients.get(id);
  }
  
  async getIngredientByName(name: string): Promise<Ingredient | undefined> {
    return Array.from(this.ingredients.values()).find(
      (ingredient) => ingredient.name.toLowerCase() === name.toLowerCase()
    );
  }
  
  async getAllIngredients(): Promise<Ingredient[]> {
    return Array.from(this.ingredients.values());
  }
  
  async createIngredient(ingredient: InsertIngredient): Promise<Ingredient> {
    const id = this.ingredientId++;
    const newIngredient: Ingredient = { ...ingredient, id };
    this.ingredients.set(id, newIngredient);
    return newIngredient;
  }
  
  async searchIngredients(query: string): Promise<Ingredient[]> {
    return Array.from(this.ingredients.values()).filter(
      (ingredient) => ingredient.name.toLowerCase().includes(query.toLowerCase())
    );
  }
  
  // Pairing operations
  async getPairing(ingredient1Id: number, ingredient2Id: number): Promise<Pairing | undefined> {
    return Array.from(this.pairings.values()).find(
      (pairing) => 
        (pairing.ingredient1_id === ingredient1Id && pairing.ingredient2_id === ingredient2Id) ||
        (pairing.ingredient1_id === ingredient2Id && pairing.ingredient2_id === ingredient1Id)
    );
  }
  
  async getAllPairings(): Promise<Pairing[]> {
    return Array.from(this.pairings.values());
  }
  
  async createPairing(pairing: InsertPairing): Promise<Pairing> {
    const id = this.pairingId++;
    const newPairing: Pairing = { ...pairing, id };
    this.pairings.set(id, newPairing);
    return newPairing;
  }
  
  async getPairingsForIngredient(ingredientId: number): Promise<Pairing[]> {
    return Array.from(this.pairings.values()).filter(
      (pairing) => pairing.ingredient1_id === ingredientId || pairing.ingredient2_id === ingredientId
    );
  }
  
  // User ingredients operations
  async getUserIngredients(userId: number): Promise<UserIngredient[]> {
    return Array.from(this.userIngredients.values()).filter(
      (userIngredient) => userIngredient.user_id === userId
    );
  }
  
  async addUserIngredient(userIngredient: InsertUserIngredient): Promise<UserIngredient> {
    const id = this.userIngredientId++;
    const newUserIngredient: UserIngredient = { ...userIngredient, id };
    this.userIngredients.set(id, newUserIngredient);
    return newUserIngredient;
  }
  
  async removeUserIngredient(id: number): Promise<void> {
    this.userIngredients.delete(id);
  }
  
  async updateUserIngredient(id: number, quantity: string, expiryDate?: Date): Promise<UserIngredient | undefined> {
    const userIngredient = this.userIngredients.get(id);
    if (!userIngredient) return undefined;
    
    const updatedUserIngredient = { 
      ...userIngredient, 
      quantity, 
      expiry_date: expiryDate || userIngredient.expiry_date 
    };
    this.userIngredients.set(id, updatedUserIngredient);
    return updatedUserIngredient;
  }
  
  // Seed with initial data
  private seedData() {
    // Add some basic ingredients
    const ingredients: InsertIngredient[] = [
      {
        name: "Tomato",
        flavor_profile: { sweet: 65, sour: 80, salty: 10, bitter: 5, umami: 60 },
        primary_taste: "Sweet, Acidic, Umami",
        category: "Vegetable"
      },
      {
        name: "Basil",
        flavor_profile: { sweet: 30, sour: 5, salty: 5, bitter: 20, umami: 10 },
        primary_taste: "Aromatic, Sweet, Peppery",
        category: "Herb"
      },
      {
        name: "Bell Pepper",
        flavor_profile: { sweet: 70, sour: 20, salty: 5, bitter: 5, umami: 10 },
        primary_taste: "Sweet, Crisp, Slightly Tangy",
        category: "Vegetable"
      },
      {
        name: "Lemon",
        flavor_profile: { sweet: 20, sour: 90, salty: 0, bitter: 10, umami: 0 },
        primary_taste: "Sour, Bright, Citrusy",
        category: "Fruit"
      },
      {
        name: "Garlic",
        flavor_profile: { sweet: 30, sour: 5, salty: 10, bitter: 20, umami: 80 },
        primary_taste: "Pungent, Savory",
        category: "Vegetable"
      },
      {
        name: "Chocolate",
        flavor_profile: { sweet: 80, sour: 10, salty: 5, bitter: 60, umami: 20 },
        primary_taste: "Sweet, Bitter, Rich",
        category: "Confectionery"
      },
      {
        name: "Berries",
        flavor_profile: { sweet: 70, sour: 60, salty: 0, bitter: 10, umami: 0 },
        primary_taste: "Sweet, Tart",
        category: "Fruit"
      },
      {
        name: "Olive Oil",
        flavor_profile: { sweet: 10, sour: 5, salty: 5, bitter: 30, umami: 40 },
        primary_taste: "Fruity, Peppery, Rich",
        category: "Oil"
      }
    ];
    
    ingredients.forEach(ingredient => {
      const id = this.ingredientId++;
      this.ingredients.set(id, { ...ingredient, id });
    });
    
    // Add some common pairings
    const tomatoId = 1;
    const basilId = 2;
    const bellPepperId = 3;
    const lemonId = 4;
    const garlicId = 5;
    const chocolateId = 6;
    const berriesId = 7;
    const oliveOilId = 8;
    
    const pairings: InsertPairing[] = [
      {
        ingredient1_id: tomatoId,
        ingredient2_id: basilId,
        affinity_score: 95,
        pairing_notes: "The bright acidity of tomatoes perfectly complements the aromatic, slightly peppery notes of fresh basil."
      },
      {
        ingredient1_id: lemonId,
        ingredient2_id: garlicId,
        affinity_score: 85,
        pairing_notes: "Lemon's brightness cuts through garlic's pungency while enhancing its savory qualities."
      },
      {
        ingredient1_id: chocolateId,
        ingredient2_id: berriesId,
        affinity_score: 90,
        pairing_notes: "The rich, bitter notes of chocolate balance perfectly with the sweet-tart flavor profile of fresh berries."
      },
      {
        ingredient1_id: tomatoId,
        ingredient2_id: oliveOilId,
        affinity_score: 88,
        pairing_notes: "Tomato's acidity is beautifully balanced by the rich, fruity notes of quality olive oil."
      },
      {
        ingredient1_id: basilId,
        ingredient2_id: oliveOilId,
        affinity_score: 92,
        pairing_notes: "Basil's aromatic qualities are enhanced and preserved by the subtle richness of olive oil."
      }
    ];
    
    pairings.forEach(pairing => {
      const id = this.pairingId++;
      this.pairings.set(id, { ...pairing, id });
    });
  }
}

import { DatabaseStorage } from './databaseStorage';
export const storage = new DatabaseStorage();
