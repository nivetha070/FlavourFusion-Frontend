import { useState } from 'react';
import { Link } from 'wouter';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dropzone } from '@/components/ui/dropzone';
import { identifyIngredientsFromImage } from '@/lib/openai';
import { IdentifiedIngredient } from '@/lib/types';

export function IngredientScanner() {
  const [isUploading, setIsUploading] = useState(false);
  const [identifiedIngredients, setIdentifiedIngredients] = useState<IdentifiedIngredient[]>([]);
  
  const handleFilesSelected = async (files: File[]) => {
    if (files.length === 0) return;
    
    setIsUploading(true);
    
    try {
      const response = await identifyIngredientsFromImage(files[0]);
      setIdentifiedIngredients(response.identifiedIngredients);
    } catch (error) {
      console.error("Error identifying ingredients:", error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <section className="py-16 bg-neutral-100">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="font-display text-3xl font-bold mb-6">Scan Your Ingredients</h2>
            <p className="text-neutral-700 mb-6">
              Upload a photo of your ingredients and let our advanced AI identify them for you. 
              Get instant information about their flavor profiles and potential pairings.
            </p>
            
            {/* Upload Box */}
            <Dropzone 
              onFilesSelected={handleFilesSelected}
              className="mb-6"
              disabled={isUploading}
            />
            
            <p className="text-xs text-neutral-500 italic">
              For best results, ensure ingredients are clearly visible and well-lit.
            </p>
          </div>
          
          <Card className="rounded-xl overflow-hidden shadow-lg relative">
            {/* Image preview area */}
            <div className="w-full h-64 bg-neutral-200 flex items-center justify-center">
              {isUploading ? (
                <div className="flex flex-col items-center">
                  <svg 
                    className="animate-spin h-10 w-10 text-primary mb-2" 
                    xmlns="http://www.w3.org/2000/svg" 
                    fill="none" 
                    viewBox="0 0 24 24"
                  >
                    <circle 
                      className="opacity-25" 
                      cx="12" 
                      cy="12" 
                      r="10" 
                      stroke="currentColor" 
                      strokeWidth="4"
                    ></circle>
                    <path 
                      className="opacity-75" 
                      fill="currentColor" 
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  <p className="text-neutral-600">Analyzing ingredients...</p>
                </div>
              ) : identifiedIngredients.length > 0 ? (
                <img 
                  src="https://pixabay.com/get/g6d3c3b49e0ac81a6645d278799b8d9df5d1487dfa705c00855e1b002c185477e78c14867d316fd70265eab01b8d1e8c992493fea99d4ec63e0195f19104c37c5_1280.jpg" 
                  alt="Identified vegetables" 
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="text-center p-4">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="mx-auto h-12 w-12 text-neutral-400" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  >
                    <rect width="18" height="18" x="3" y="3" rx="2" ry="2"></rect>
                    <circle cx="9" cy="9" r="2"></circle>
                    <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"></path>
                  </svg>
                  <p className="mt-2 text-neutral-600">Upload an image to identify ingredients</p>
                </div>
              )}
            </div>
            
            <CardContent className="p-6">
              <h3 className="font-display font-bold text-xl mb-4">Identified Ingredients</h3>
              
              {identifiedIngredients.length === 0 ? (
                <div className="py-8 text-center text-neutral-500">
                  <p>No ingredients identified yet.</p>
                  <p className="text-sm mt-2">Upload an image to get started.</p>
                </div>
              ) : (
                <>
                  {identifiedIngredients.map((ingredient, index) => (
                    <div key={index} className="flex items-center gap-3 py-2 border-b border-neutral-200">
                      <div className="w-8 h-8 rounded-full bg-primary-light flex items-center justify-center text-white">
                        <svg 
                          xmlns="http://www.w3.org/2000/svg" 
                          viewBox="0 0 24 24" 
                          fill="none" 
                          stroke="currentColor" 
                          strokeWidth="2" 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          className="w-4 h-4"
                        >
                          <path d="M20 6 9 17l-5-5"></path>
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-semibold">{ingredient.name}</h4>
                        <p className="text-xs text-neutral-600">{ingredient.primaryTaste}</p>
                      </div>
                      <div className="ml-auto text-xs text-success font-accent">
                        {Math.round(ingredient.confidence * 100)}% Match
                      </div>
                    </div>
                  ))}
                  
                  <div className="mt-4">
                    <Link href="/ingredient-scanner">
                      <Button className="w-full">
                        View All Ingredients & Pairings
                      </Button>
                    </Link>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
