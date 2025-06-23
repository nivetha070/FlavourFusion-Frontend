import { pgTable, text, serial, integer, boolean, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  email: text("email").notNull().unique(),
  created_at: timestamp("created_at").defaultNow().notNull(),
});

export const dietaryPreferences = pgTable("dietary_preferences", {
  id: serial("id").primaryKey(),
  user_id: integer("user_id").references(() => users.id).notNull(),
  preference_type: text("preference_type").notNull(), // vegetarian, vegan, gluten-free, etc.
});

export const flavorPreferences = pgTable("flavor_preferences", {
  id: serial("id").primaryKey(),
  user_id: integer("user_id").references(() => users.id).notNull(),
  flavor_type: text("flavor_type").notNull(), // sweet, savory, spicy, etc.
  preference_level: integer("preference_level").notNull(), // 1-100 scale
});

export const cuisinePreferences = pgTable("cuisine_preferences", {
  id: serial("id").primaryKey(),
  user_id: integer("user_id").references(() => users.id).notNull(),
  cuisine_type: text("cuisine_type").notNull(), // italian, mexican, japanese, etc.
});

export const ingredients = pgTable("ingredients", {
  id: serial("id").primaryKey(),
  name: text("name").notNull().unique(),
  flavor_profile: jsonb("flavor_profile").notNull(), // sweet, sour, salty, bitter, umami levels
  primary_taste: text("primary_taste").notNull(),
  category: text("category").notNull(), // vegetable, fruit, meat, dairy, etc.
});

export const pairings = pgTable("pairings", {
  id: serial("id").primaryKey(),
  ingredient1_id: integer("ingredient1_id").references(() => ingredients.id).notNull(),
  ingredient2_id: integer("ingredient2_id").references(() => ingredients.id).notNull(),
  affinity_score: integer("affinity_score").notNull(), // 1-100 scale
  pairing_notes: text("pairing_notes"),
});

export const userIngredients = pgTable("user_ingredients", {
  id: serial("id").primaryKey(),
  user_id: integer("user_id").references(() => users.id).notNull(),
  ingredient_id: integer("ingredient_id").references(() => ingredients.id).notNull(),
  quantity: text("quantity"),
  expiry_date: timestamp("expiry_date"),
});

// Insert schemas
export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  created_at: true,
});

export const insertDietaryPreferenceSchema = createInsertSchema(dietaryPreferences).omit({
  id: true,
});

export const insertFlavorPreferenceSchema = createInsertSchema(flavorPreferences).omit({
  id: true,
});

export const insertCuisinePreferenceSchema = createInsertSchema(cuisinePreferences).omit({
  id: true,
});

export const insertIngredientSchema = createInsertSchema(ingredients).omit({
  id: true,
});

export const insertPairingSchema = createInsertSchema(pairings).omit({
  id: true,
});

export const insertUserIngredientSchema = createInsertSchema(userIngredients).omit({
  id: true,
});

// Types
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;

export type DietaryPreference = typeof dietaryPreferences.$inferSelect;
export type InsertDietaryPreference = z.infer<typeof insertDietaryPreferenceSchema>;

export type FlavorPreference = typeof flavorPreferences.$inferSelect;
export type InsertFlavorPreference = z.infer<typeof insertFlavorPreferenceSchema>;

export type CuisinePreference = typeof cuisinePreferences.$inferSelect;
export type InsertCuisinePreference = z.infer<typeof insertCuisinePreferenceSchema>;

export type Ingredient = typeof ingredients.$inferSelect;
export type InsertIngredient = z.infer<typeof insertIngredientSchema>;

export type Pairing = typeof pairings.$inferSelect;
export type InsertPairing = z.infer<typeof insertPairingSchema>;

export type UserIngredient = typeof userIngredients.$inferSelect;
export type InsertUserIngredient = z.infer<typeof insertUserIngredientSchema>;

// Additional types for API responses
export type IdentifiedIngredient = {
  name: string;
  confidence: number;
  flavorProfile: {
    sweet: number;
    salty: number;
    sour: number;
    bitter: number;
    umami: number;
  };
  primaryTaste: string;
};

export type PairingRecommendation = {
  ingredient1: string;
  ingredient2: string;
  affinityScore: number;
  pairingNotes: string;
  recipes: number;
  cuisineType: string;
};
