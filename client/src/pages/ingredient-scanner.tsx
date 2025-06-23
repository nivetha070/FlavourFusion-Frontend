import { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dropzone } from "@/components/ui/dropzone";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { identifyIngredientsFromImage, getPairingRecommendations } from "@/lib/openai";
import { IdentifiedIngredient, PairingRecommendation } from "@/lib/types";
import { useToast } from "@/hooks/use-toast";
import { Helmet } from "react-helmet";

export default function IngredientScannerPage() {
  const [isUploading, setIsUploading] = useState(false);
  const [isPairingLoading, setIsPairingLoading] = useState(false);
  const [identifiedIngredients, setIdentifiedIngredients] = useState<IdentifiedIngredient[]>([]);
  const [pairingRecommendations, setPairingRecommendations] = useState<PairingRecommendation[]>([]);
  const [selectedTab, setSelectedTab] = useState("identification");
  const { toast } = useToast();

  const handleFilesSelected = async (files: File[]) => {
    if (files.length === 0) return;
    
    setIsUploading(true);
    
    try {
      const response = await identifyIngredientsFromImage(files[0]);
      setIdentifiedIngredients(response.identifiedIngredients);
      toast({
        title: "Ingredients Identified",
        description: `Successfully identified ${response.identifiedIngredients.length} ingredients.`,
        variant: "default",
      });
    } catch (error) {
      console.error("Error identifying ingredients:", error);
      toast({
        title: "Error",
        description: "Failed to identify ingredients. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleGetPairings = async () => {
    if (identifiedIngredients.length === 0) {
      toast({
        title: "No Ingredients",
        description: "Please scan ingredients first before getting pairings.",
        variant: "destructive",
      });
      return;
    }

    setIsPairingLoading(true);
    
    try {
      // Normally we would use ingredient IDs from the database
      // For this demo, we'll just simulate it with mock IDs
      const ingredientNames = identifiedIngredients.map(i => i.name);
      const mockIds = Array.from({ length: ingredientNames.length }, (_, i) => i + 1);
      
      const response = await getPairingRecommendations(mockIds);
      setPairingRecommendations(response.pairingRecommendations);
      setSelectedTab("pairings");
      
      toast({
        title: "Pairings Generated",
        description: "Successfully generated ingredient pairing recommendations.",
        variant: "default",
      });
    } catch (error) {
      console.error("Error getting pairings:", error);
      toast({
        title: "Error",
        description: "Failed to get pairing recommendations. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsPairingLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Ingredient Scanner - Flavour Fusion</title>
        <meta name="description" content="Upload photos of your ingredients and get AI-powered identification and flavor pairing recommendations." />
      </Helmet>
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="font-display text-3xl md:text-4xl font-bold mb-4 text-center">Ingredient Scanner</h1>
          <p className="text-neutral-700 text-center mb-8 max-w-2xl mx-auto">
            Upload a photo of your ingredients and let our AI identify them. Get personalized pairing recommendations based on flavor profiles.
          </p>
          
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Upload Your Ingredients</CardTitle>
              <CardDescription>
                Take a clear photo of your ingredients for the best results. Place them on a plain background with good lighting.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Dropzone 
                onFilesSelected={handleFilesSelected}
                disabled={isUploading}
              />
            </CardContent>
            <CardFooter className="flex flex-col sm:flex-row gap-4">
              <div className="text-sm text-neutral-500 italic flex-1">
                For best results, ensure ingredients are clearly visible and well-lit.
              </div>
              <Button
                onClick={handleGetPairings}
                disabled={isUploading || identifiedIngredients.length === 0 || isPairingLoading}
                className="whitespace-nowrap"
              >
                {isPairingLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Getting Pairings...
                  </>
                ) : "Get Pairing Recommendations"}
              </Button>
            </CardFooter>
          </Card>
          
          <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-4">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="identification">Identified Ingredients</TabsTrigger>
              <TabsTrigger value="pairings">Pairing Recommendations</TabsTrigger>
            </TabsList>
            
            <TabsContent value="identification" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Identified Ingredients</CardTitle>
                  <CardDescription>
                    Here are the ingredients our AI has identified from your image.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {isUploading ? (
                    <div className="flex flex-col items-center justify-center py-8">
                      <svg className="animate-spin h-10 w-10 text-primary mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <p>Analyzing your ingredients...</p>
                    </div>
                  ) : identifiedIngredients.length === 0 ? (
                    <div className="text-center py-8">
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className="mx-auto h-12 w-12 text-neutral-400 mb-4" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="2" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                      >
                        <path d="M2 20a5 5 0 0 1 5-5h10a5 5 0 0 1 5 5v1a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1v-1Z"></path>
                        <path d="M12 15v-2"></path>
                        <path d="M10 7.5a2 2 0 0 1 4 0V15"></path>
                      </svg>
                      <p className="text-neutral-600">No ingredients identified yet.</p>
                      <p className="text-sm mt-2 text-neutral-500">Upload an image to get started.</p>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {identifiedIngredients.map((ingredient, index) => (
                        <div key={index} className="flex items-center gap-3 p-3 rounded-md border border-neutral-200 bg-neutral-50">
                          <div className="w-10 h-10 rounded-full bg-primary-light flex items-center justify-center text-white">
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
                              <path d="M20 6 9 17l-5-5"></path>
                            </svg>
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold">{ingredient.name}</h4>
                            <p className="text-xs text-neutral-600">{ingredient.primaryTaste}</p>
                            
                            <div className="mt-2 grid grid-cols-5 gap-1">
                              <div className="space-y-1">
                                <p className="text-xs text-neutral-500">Sweet</p>
                                <div className="w-full bg-neutral-300 rounded-full h-1.5">
                                  <div 
                                    className="bg-secondary h-1.5 rounded-full" 
                                    style={{ width: `${ingredient.flavorProfile.sweet}%` }}
                                  ></div>
                                </div>
                              </div>
                              <div className="space-y-1">
                                <p className="text-xs text-neutral-500">Salty</p>
                                <div className="w-full bg-neutral-300 rounded-full h-1.5">
                                  <div 
                                    className="bg-secondary h-1.5 rounded-full" 
                                    style={{ width: `${ingredient.flavorProfile.salty}%` }}
                                  ></div>
                                </div>
                              </div>
                              <div className="space-y-1">
                                <p className="text-xs text-neutral-500">Sour</p>
                                <div className="w-full bg-neutral-300 rounded-full h-1.5">
                                  <div 
                                    className="bg-secondary h-1.5 rounded-full" 
                                    style={{ width: `${ingredient.flavorProfile.sour}%` }}
                                  ></div>
                                </div>
                              </div>
                              <div className="space-y-1">
                                <p className="text-xs text-neutral-500">Bitter</p>
                                <div className="w-full bg-neutral-300 rounded-full h-1.5">
                                  <div 
                                    className="bg-secondary h-1.5 rounded-full" 
                                    style={{ width: `${ingredient.flavorProfile.bitter}%` }}
                                  ></div>
                                </div>
                              </div>
                              <div className="space-y-1">
                                <p className="text-xs text-neutral-500">Umami</p>
                                <div className="w-full bg-neutral-300 rounded-full h-1.5">
                                  <div 
                                    className="bg-secondary h-1.5 rounded-full" 
                                    style={{ width: `${ingredient.flavorProfile.umami}%` }}
                                  ></div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="text-xs text-success font-accent">
                            {Math.round(ingredient.confidence * 100)}% Match
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="pairings" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Pairing Recommendations</CardTitle>
                  <CardDescription>
                    Based on your ingredients, here are some recommended pairings.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {isPairingLoading ? (
                    <div className="flex flex-col items-center justify-center py-8">
                      <svg className="animate-spin h-10 w-10 text-primary mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <p>Generating pairing recommendations...</p>
                    </div>
                  ) : pairingRecommendations.length === 0 ? (
                    <div className="text-center py-8">
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className="mx-auto h-12 w-12 text-neutral-400 mb-4" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="2" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                      >
                        <path d="M5.5 8.5 9 12l-3.5 3.5L9 19l3.5-3.5L16 12l-3.5-3.5L9 5l-3.5 3.5Z"></path>
                        <path d="m16 8 2 2-2 2"></path>
                        <path d="m16 16 2-2-2-2"></path>
                      </svg>
                      <p className="text-neutral-600">No pairing recommendations yet.</p>
                      <p className="text-sm mt-2 text-neutral-500">Click "Get Pairing Recommendations" after identifying ingredients.</p>
                    </div>
                  ) : (
                    <div className="grid gap-4 sm:grid-cols-2">
                      {pairingRecommendations.map((pairing, index) => (
                        <div key={index} className="border border-neutral-200 rounded-lg overflow-hidden">
                          <div className="bg-neutral-50 p-3 border-b border-neutral-200">
                            <div className="flex justify-between items-center">
                              <div className="flex items-center gap-2">
                                <span className="bg-primary-light bg-opacity-20 text-primary text-xs py-1 px-3 rounded-full">
                                  Score: {pairing.affinityScore}/100
                                </span>
                                <span className="bg-secondary bg-opacity-20 text-secondary-dark text-xs py-1 px-3 rounded-full">
                                  {pairing.cuisineType}
                                </span>
                              </div>
                              <div className="text-xs text-neutral-600">
                                {pairing.recipes} Recipes
                              </div>
                            </div>
                          </div>
                          
                          <div className="p-4">
                            <h3 className="font-display font-bold text-lg mb-2">
                              {pairing.ingredient} + {pairing.pairsWith}
                            </h3>
                            <p className="text-sm text-neutral-700 mb-4">
                              {pairing.pairingNotes}
                            </p>
                            
                            <Button variant="outline" size="sm" className="w-full">
                              Explore Recipes
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
}
