import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import multer from "multer";
import { z } from "zod";
import { 
  insertUserSchema, 
  insertDietaryPreferenceSchema,
  insertFlavorPreferenceSchema,
  insertCuisinePreferenceSchema,
  insertIngredientSchema 
} from "@shared/schema";
import OpenAI from "openai";

// Configure OpenAI
const openai = new OpenAI({ 
  apiKey: process.env.OPENAI_API_KEY 
});

// Configure multer for file uploads
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB max file size
  },
});

export async function registerRoutes(app: Express): Promise<Server> {
  // User routes
  app.post("/api/users", async (req, res) => {
    try {
      const userData = insertUserSchema.parse(req.body);
      
      // Check if username already exists
      const existingUserByUsername = await storage.getUserByUsername(userData.username);
      if (existingUserByUsername) {
        return res.status(400).json({ message: "Username already exists" });
      }
      
      // Check if email already exists
      const existingUserByEmail = await storage.getUserByEmail(userData.email);
      if (existingUserByEmail) {
        return res.status(400).json({ message: "Email already exists" });
      }
      
      const user = await storage.createUser(userData);
      res.status(201).json(user);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: error.errors });
      }
      res.status(500).json({ message: "Failed to create user" });
    }
  });
  
  // Login route
  app.post("/api/login", async (req, res) => {
    try {
      const { username, password } = req.body;
      
      if (!username || !password) {
        return res.status(400).json({ message: "Username and password are required" });
      }
      
      const user = await storage.getUserByUsername(username);
      
      if (!user || user.password !== password) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
      
      res.json({ 
        id: user.id, 
        username: user.username,
        email: user.email
      });
    } catch (error) {
      res.status(500).json({ message: "Login failed" });
    }
  });
  
  // Dietary preferences routes
  app.get("/api/users/:userId/dietary-preferences", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      if (isNaN(userId)) {
        return res.status(400).json({ message: "Invalid user ID" });
      }
      
      const preferences = await storage.getDietaryPreferences(userId);
      res.json(preferences);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch dietary preferences" });
    }
  });
  
  app.post("/api/dietary-preferences", async (req, res) => {
    try {
      const preferenceData = insertDietaryPreferenceSchema.parse(req.body);
      const preference = await storage.addDietaryPreference(preferenceData);
      res.status(201).json(preference);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: error.errors });
      }
      res.status(500).json({ message: "Failed to add dietary preference" });
    }
  });
  
  app.delete("/api/dietary-preferences/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid ID" });
      }
      
      await storage.removeDietaryPreference(id);
      res.status(204).end();
    } catch (error) {
      res.status(500).json({ message: "Failed to remove dietary preference" });
    }
  });
  
  // Flavor preferences routes
  app.get("/api/users/:userId/flavor-preferences", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      if (isNaN(userId)) {
        return res.status(400).json({ message: "Invalid user ID" });
      }
      
      const preferences = await storage.getFlavorPreferences(userId);
      res.json(preferences);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch flavor preferences" });
    }
  });
  
  app.post("/api/flavor-preferences", async (req, res) => {
    try {
      const preferenceData = insertFlavorPreferenceSchema.parse(req.body);
      const preference = await storage.addFlavorPreference(preferenceData);
      res.status(201).json(preference);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: error.errors });
      }
      res.status(500).json({ message: "Failed to add flavor preference" });
    }
  });
  
  app.patch("/api/flavor-preferences/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid ID" });
      }
      
      const { preference_level } = req.body;
      if (typeof preference_level !== 'number' || preference_level < 0 || preference_level > 100) {
        return res.status(400).json({ message: "Preference level must be a number between 0 and 100" });
      }
      
      const updatedPreference = await storage.updateFlavorPreference(id, preference_level);
      if (!updatedPreference) {
        return res.status(404).json({ message: "Flavor preference not found" });
      }
      
      res.json(updatedPreference);
    } catch (error) {
      res.status(500).json({ message: "Failed to update flavor preference" });
    }
  });
  
  // Cuisine preferences routes
  app.get("/api/users/:userId/cuisine-preferences", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      if (isNaN(userId)) {
        return res.status(400).json({ message: "Invalid user ID" });
      }
      
      const preferences = await storage.getCuisinePreferences(userId);
      res.json(preferences);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch cuisine preferences" });
    }
  });
  
  app.post("/api/cuisine-preferences", async (req, res) => {
    try {
      const preferenceData = insertCuisinePreferenceSchema.parse(req.body);
      const preference = await storage.addCuisinePreference(preferenceData);
      res.status(201).json(preference);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: error.errors });
      }
      res.status(500).json({ message: "Failed to add cuisine preference" });
    }
  });
  
  app.delete("/api/cuisine-preferences/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid ID" });
      }
      
      await storage.removeCuisinePreference(id);
      res.status(204).end();
    } catch (error) {
      res.status(500).json({ message: "Failed to remove cuisine preference" });
    }
  });
  
  // Ingredient routes
  app.get("/api/ingredients", async (req, res) => {
    try {
      const query = req.query.q as string | undefined;
      
      let ingredients;
      if (query) {
        ingredients = await storage.searchIngredients(query);
      } else {
        ingredients = await storage.getAllIngredients();
      }
      
      res.json(ingredients);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch ingredients" });
    }
  });
  
  app.get("/api/ingredients/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid ID" });
      }
      
      const ingredient = await storage.getIngredient(id);
      if (!ingredient) {
        return res.status(404).json({ message: "Ingredient not found" });
      }
      
      res.json(ingredient);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch ingredient" });
    }
  });
  
  app.post("/api/ingredients", async (req, res) => {
    try {
      const ingredientData = insertIngredientSchema.parse(req.body);
      
      // Check if ingredient already exists
      const existingIngredient = await storage.getIngredientByName(ingredientData.name);
      if (existingIngredient) {
        return res.status(400).json({ message: "Ingredient already exists" });
      }
      
      const ingredient = await storage.createIngredient(ingredientData);
      res.status(201).json(ingredient);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: error.errors });
      }
      res.status(500).json({ message: "Failed to create ingredient" });
    }
  });
  
  // Pairing routes
  app.get("/api/pairings", async (req, res) => {
    try {
      const pairings = await storage.getAllPairings();
      
      // Enrich the pairing data with ingredient names
      const enrichedPairings = await Promise.all(pairings.map(async (pairing) => {
        const ingredient1 = await storage.getIngredient(pairing.ingredient1_id);
        const ingredient2 = await storage.getIngredient(pairing.ingredient2_id);
        
        return {
          ...pairing,
          ingredient1_name: ingredient1?.name || 'Unknown',
          ingredient2_name: ingredient2?.name || 'Unknown'
        };
      }));
      
      res.json(enrichedPairings);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch pairings" });
    }
  });
  
  app.get("/api/ingredients/:id/pairings", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid ID" });
      }
      
      const ingredient = await storage.getIngredient(id);
      if (!ingredient) {
        return res.status(404).json({ message: "Ingredient not found" });
      }
      
      const pairings = await storage.getPairingsForIngredient(id);
      
      // Enrich the pairing data with ingredient names
      const enrichedPairings = await Promise.all(pairings.map(async (pairing) => {
        const pairedWithId = pairing.ingredient1_id === id 
          ? pairing.ingredient2_id 
          : pairing.ingredient1_id;
        
        const pairedIngredient = await storage.getIngredient(pairedWithId);
        
        return {
          ...pairing,
          paired_ingredient_name: pairedIngredient?.name || 'Unknown',
          paired_ingredient_id: pairedWithId
        };
      }));
      
      res.json(enrichedPairings);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch pairings for ingredient" });
    }
  });
  
  // AI-powered image recognition and pairing recommendation
  app.post("/api/identify-ingredients", upload.single("image"), async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: "No image file provided" });
      }
      
      // Convert image buffer to base64
      const base64Image = req.file.buffer.toString("base64");
      
      try {
        // Use OpenAI's Vision API to identify ingredients
        const response = await openai.chat.completions.create({
          model: "gpt-4o", // the newest OpenAI model is "gpt-4o" which was released May 13, 2024
          messages: [
            {
              role: "system",
              content: "You are an expert at identifying food ingredients in images. Identify all visible ingredients in the image and provide their flavor profiles. Respond with JSON in this format: { 'identifiedIngredients': [{ 'name': string, 'confidence': number (between 0-1), 'flavorProfile': { 'sweet': number (0-100), 'salty': number (0-100), 'sour': number (0-100), 'bitter': number (0-100), 'umami': number (0-100) }, 'primaryTaste': string }] }"
            },
            {
              role: "user",
              content: [
                { type: "text", text: "Identify all food ingredients in this image." },
                { 
                  type: "image_url", 
                  image_url: { 
                    url: `data:image/jpeg;base64,${base64Image}`
                  }
                }
              ]
            }
          ],
          response_format: { type: "json_object" }
        });
        
        const result = JSON.parse(response.choices[0].message.content);
        
        // For each identified ingredient, check if it exists in our database
        // If not, add it
        for (const ingredient of result.identifiedIngredients) {
          const existingIngredient = await storage.getIngredientByName(ingredient.name);
          
          if (!existingIngredient) {
            await storage.createIngredient({
              name: ingredient.name,
              flavor_profile: ingredient.flavorProfile,
              primary_taste: ingredient.primaryTaste,
              category: "Unknown" // We could enhance this with another AI call if needed
            });
          }
        }
        
        res.json(result);
      } catch (error) {
        console.error("OpenAI API error:", error);
        res.status(500).json({ message: "Failed to process image with AI" });
      }
    } catch (error) {
      console.error("Server error:", error);
      res.status(500).json({ message: "Server error processing image" });
    }
  });
  
  // Get pairing recommendations for a set of ingredients
  app.post("/api/pairing-recommendations", async (req, res) => {
    try {
      const { ingredientIds } = req.body;
      
      if (!Array.isArray(ingredientIds) || ingredientIds.length === 0) {
        return res.status(400).json({ message: "Ingredient IDs array is required" });
      }
      
      // Get all ingredients
      const ingredients = await Promise.all(
        ingredientIds.map(id => storage.getIngredient(parseInt(id)))
      );
      
      // Filter out any undefined ingredients
      const validIngredients = ingredients.filter(ingredient => ingredient !== undefined);
      
      if (validIngredients.length === 0) {
        return res.status(400).json({ message: "No valid ingredients found" });
      }
      
      // Build the prompt for OpenAI
      const ingredientNames = validIngredients.map(i => i!.name).join(", ");
      
      try {
        const response = await openai.chat.completions.create({
          model: "gpt-4o", // the newest OpenAI model is "gpt-4o" which was released May 13, 2024
          messages: [
            {
              role: "system",
              content: `You are a culinary expert specializing in flavor pairing. Given a set of ingredients, suggest other ingredients that would pair well with them and explain why. Respond with JSON in this format: { 'pairingRecommendations': [{ 'ingredient': string, 'pairsWith': string, 'affinityScore': number (1-100), 'pairingNotes': string, 'recipes': number, 'cuisineType': string }] }`
            },
            {
              role: "user",
              content: `Suggest ingredient pairings for the following ingredients: ${ingredientNames}. For each ingredient, suggest at least 2 different ingredients that would pair well with it.`
            }
          ],
          response_format: { type: "json_object" }
        });
        
        const result = JSON.parse(response.choices[0].message.content);
        res.json(result);
      } catch (error) {
        console.error("OpenAI API error:", error);
        res.status(500).json({ message: "Failed to get pairing recommendations" });
      }
    } catch (error) {
      res.status(500).json({ message: "Failed to process pairing recommendations" });
    }
  });
  
  const httpServer = createServer(app);
  return httpServer;
}
