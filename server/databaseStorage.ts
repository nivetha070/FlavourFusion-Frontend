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
import { db } from "./db";
import { eq, or, and, ilike } from "drizzle-orm";
import { IStorage } from './storage';

export class DatabaseStorage implements IStorage {
  // User operations
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }
  
  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user;
  }
  
  async getUserByEmail(email: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.email, email));
    return user;
  }
  
  async createUser(user: InsertUser): Promise<User> {
    const [newUser] = await db.insert(users).values(user).returning();
    return newUser;
  }
  
  // Dietary preferences operations
  async getDietaryPreferences(userId: number): Promise<DietaryPreference[]> {
    return db.select().from(dietaryPreferences).where(eq(dietaryPreferences.user_id, userId));
  }
  
  async addDietaryPreference(preference: InsertDietaryPreference): Promise<DietaryPreference> {
    const [newPreference] = await db.insert(dietaryPreferences).values(preference).returning();
    return newPreference;
  }
  
  async removeDietaryPreference(id: number): Promise<void> {
    await db.delete(dietaryPreferences).where(eq(dietaryPreferences.id, id));
  }
  
  // Flavor preferences operations
  async getFlavorPreferences(userId: number): Promise<FlavorPreference[]> {
    return db.select().from(flavorPreferences).where(eq(flavorPreferences.user_id, userId));
  }
  
  async addFlavorPreference(preference: InsertFlavorPreference): Promise<FlavorPreference> {
    const [newPreference] = await db.insert(flavorPreferences).values(preference).returning();
    return newPreference;
  }
  
  async updateFlavorPreference(id: number, level: number): Promise<FlavorPreference | undefined> {
    const [updatedPreference] = await db
      .update(flavorPreferences)
      .set({ preference_level: level })
      .where(eq(flavorPreferences.id, id))
      .returning();
    return updatedPreference;
  }
  
  // Cuisine preferences operations
  async getCuisinePreferences(userId: number): Promise<CuisinePreference[]> {
    return db.select().from(cuisinePreferences).where(eq(cuisinePreferences.user_id, userId));
  }
  
  async addCuisinePreference(preference: InsertCuisinePreference): Promise<CuisinePreference> {
    const [newPreference] = await db.insert(cuisinePreferences).values(preference).returning();
    return newPreference;
  }
  
  async removeCuisinePreference(id: number): Promise<void> {
    await db.delete(cuisinePreferences).where(eq(cuisinePreferences.id, id));
  }
  
  // Ingredient operations
  async getIngredient(id: number): Promise<Ingredient | undefined> {
    const [ingredient] = await db.select().from(ingredients).where(eq(ingredients.id, id));
    return ingredient;
  }
  
  async getIngredientByName(name: string): Promise<Ingredient | undefined> {
    const [ingredient] = await db.select().from(ingredients).where(ilike(ingredients.name, name));
    return ingredient;
  }
  
  async getAllIngredients(): Promise<Ingredient[]> {
    return db.select().from(ingredients);
  }
  
  async createIngredient(ingredient: InsertIngredient): Promise<Ingredient> {
    const [newIngredient] = await db.insert(ingredients).values(ingredient).returning();
    return newIngredient;
  }
  
  async searchIngredients(query: string): Promise<Ingredient[]> {
    return db.select().from(ingredients).where(
      or(
        ilike(ingredients.name, `%${query}%`),
        ilike(ingredients.category, `%${query}%`),
        ilike(ingredients.primary_taste, `%${query}%`)
      )
    );
  }
  
  // Pairing operations
  async getPairing(ingredient1Id: number, ingredient2Id: number): Promise<Pairing | undefined> {
    const [pairing] = await db.select().from(pairings).where(
      or(
        and(
          eq(pairings.ingredient1_id, ingredient1Id),
          eq(pairings.ingredient2_id, ingredient2Id)
        ),
        and(
          eq(pairings.ingredient1_id, ingredient2Id),
          eq(pairings.ingredient2_id, ingredient1Id)
        )
      )
    );
    return pairing;
  }
  
  async getAllPairings(): Promise<Pairing[]> {
    return db.select().from(pairings);
  }
  
  async createPairing(pairing: InsertPairing): Promise<Pairing> {
    const [newPairing] = await db.insert(pairings).values(pairing).returning();
    return newPairing;
  }
  
  async getPairingsForIngredient(ingredientId: number): Promise<Pairing[]> {
    return db.select().from(pairings).where(
      or(
        eq(pairings.ingredient1_id, ingredientId),
        eq(pairings.ingredient2_id, ingredientId)
      )
    );
  }
  
  // User ingredients operations
  async getUserIngredients(userId: number): Promise<UserIngredient[]> {
    return db.select().from(userIngredients).where(eq(userIngredients.user_id, userId));
  }
  
  async addUserIngredient(userIngredient: InsertUserIngredient): Promise<UserIngredient> {
    const [newUserIngredient] = await db.insert(userIngredients).values(userIngredient).returning();
    return newUserIngredient;
  }
  
  async removeUserIngredient(id: number): Promise<void> {
    await db.delete(userIngredients).where(eq(userIngredients.id, id));
  }
  
  async updateUserIngredient(id: number, quantity: string, expiryDate?: Date): Promise<UserIngredient | undefined> {
    const updateValues: Partial<UserIngredient> = { quantity };
    if (expiryDate !== undefined) {
      updateValues.expiry_date = expiryDate;
    }
    
    const [updatedUserIngredient] = await db
      .update(userIngredients)
      .set(updateValues)
      .where(eq(userIngredients.id, id))
      .returning();
    return updatedUserIngredient;
  }
}