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
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Ingredient, PairingRecommendation } from "@/lib/types";
import { Helmet } from "react-helmet";
import { FlavorProfile } from "@/components/FlavorProfile";

// Mock data - in real app, this would come from API
const mockIngredients: Ingredient[] = [
  {
    id: 1,
    name: "Tomato",
    flavor_profile: { sweet: 65, sour: 80, salty: 10, bitter: 5, umami: 60 },
    primary_taste: "Sweet, Acidic, Umami",
    category: "Vegetable"
  },
  {
    id: 2,
    name: "Basil",
    flavor_profile: { sweet: 30, sour: 5, salty: 5, bitter: 20, umami: 10 },
    primary_taste: "Aromatic, Sweet, Peppery",
    category: "Herb"
  },
  {
    id: 3,
    name: "Bell Pepper",
    flavor_profile: { sweet: 70, sour: 20, salty: 5, bitter: 5, umami: 10 },
    primary_taste: "Sweet, Crisp, Slightly Tangy",
    category: "Vegetable"
  },
  {
    id: 4,
    name: "Garlic",
    flavor_profile: { sweet: 30, sour: 5, salty: 10, bitter: 20, umami: 80 },
    primary_taste: "Pungent, Savory",
    category: "Vegetable"
  }
];

const mockPairings: PairingRecommendation[] = [
  {
    ingredient: "Tomato",
    pairsWith: "Basil",
    affinityScore: 95,
    pairingNotes: "The bright acidity of tomatoes perfectly complements the aromatic, slightly peppery notes of fresh basil.",
    recipes: 12,
    cuisineType: "Italian"
  },
  {
    ingredient: "Tomato",
    pairsWith: "Garlic",
    affinityScore: 90,
    pairingNotes: "Tomato's sweetness and acidity balances garlic's pungency while enhancing its savory qualities.",
    recipes: 18,
    cuisineType: "Mediterranean"
  },
  {
    ingredient: "Bell Pepper",
    pairsWith: "Garlic",
    affinityScore: 85,
    pairingNotes: "The sweet crispness of bell peppers creates a wonderful contrast with garlic's savory intensity.",
    recipes: 8,
    cuisineType: "Spanish"
  }
];

export default function Dashboard() {
  const [selectedTab, setSelectedTab] = useState("kitchen");
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const filteredIngredients = mockIngredients.filter(ingredient => 
    ingredient.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <Helmet>
        <title>My Kitchen - Flavour Fusion</title>
        <meta name="description" content="Manage your ingredients, view pairing recommendations, and explore your flavor preferences." />
      </Helmet>
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="font-display text-3xl md:text-4xl font-bold">My Kitchen</h1>
            <p className="text-neutral-700">Manage your ingredients and discover perfect pairings.</p>
          </div>
          <div className="flex gap-4">
            <Button 
              variant="outline"
              onClick={() => setSelectedTab("scan")}
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                className="mr-2 h-4 w-4"
              >
                <path d="M15 8v.5A2.5 2.5 0 0 1 12.5 11h-1A2.5 2.5 0 0 0 9 13.5v.5"></path>
                <path d="M17.8 15.1c-.4.2-.8.3-1.3.3-1.5 0-2.7-1-3-2.4"></path>
                <path d="M2 8v3c0 1.1.9 2 2 2h1.7c.5 0 .9.4.9.9v7.6c0 .9.6 1.5 1.5 1.5s1.5-.6 1.5-1.5V14c0-.5.4-.9.9-.9H12"></path>
                <path d="M17.1 2.1c.2.1.3.1.5.2l2 1.8c.3.1.5.4.5.9v9c0 .5-.4.9-.9.9"></path>
                <path d="M14.6 15.1A3.8 3.8 0 0 1 19 11a3.5 3.5 0 0 0-6.7-1"></path>
                <path d="M2 12v2c0 1.1.9 2 2 2h3"></path>
                <path d="M11.1 2.1c.2.1.3.1.5.2l2 1.8c.3.1.5.4.5.9v3a2 2 0 0 1-2 2h-2"></path>
                <path d="M19 2v3c0 1.1-.9 2-2 2h-2v2c0 1.1-.9 2-2 2h-1"></path>
              </svg>
              Scan New Ingredients
            </Button>
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    className="mr-2 h-4 w-4"
                  >
                    <path d="M12 5v14"></path>
                    <path d="M5 12h14"></path>
                  </svg>
                  Add Ingredient
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add Ingredient to Kitchen</DialogTitle>
                  <DialogDescription>
                    Enter the ingredient details to add it to your kitchen inventory.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">Name</Label>
                    <Input id="name" className="col-span-3" placeholder="e.g., Tomato" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="category" className="text-right">Category</Label>
                    <Input id="category" className="col-span-3" placeholder="e.g., Vegetable" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="quantity" className="text-right">Quantity</Label>
                    <Input id="quantity" className="col-span-3" placeholder="e.g., 500g, 3 pieces" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="expiry" className="text-right">Expiry Date</Label>
                    <Input id="expiry" type="date" className="col-span-3" />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit" onClick={() => setIsAddDialogOpen(false)}>Add Ingredient</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
        
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-4">
          <TabsList className="grid grid-cols-3">
            <TabsTrigger value="kitchen">My Kitchen</TabsTrigger>
            <TabsTrigger value="pairings">Pairings</TabsTrigger>
            <TabsTrigger value="profile">Flavor Profile</TabsTrigger>
          </TabsList>
          
          <TabsContent value="kitchen" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Kitchen Inventory</CardTitle>
                <CardDescription>
                  Manage your ingredients and their expiry dates to reduce food waste.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <Input 
                    placeholder="Search ingredients..." 
                    value={searchQuery} 
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="max-w-sm"
                  />
                </div>
                
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Ingredient</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Flavor Profile</TableHead>
                      <TableHead>Quantity</TableHead>
                      <TableHead>Expiry</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredIngredients.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-8">
                          <p className="text-neutral-500">No ingredients found.</p>
                          <p className="text-sm text-neutral-400 mt-1">Try adjusting your search or add new ingredients.</p>
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredIngredients.map((ingredient) => (
                        <TableRow key={ingredient.id}>
                          <TableCell className="font-medium">{ingredient.name}</TableCell>
                          <TableCell>{ingredient.category}</TableCell>
                          <TableCell className="max-w-xs">
                            <Badge variant="outline" className="mr-1">{ingredient.primary_taste}</Badge>
                          </TableCell>
                          <TableCell>500g</TableCell>
                          <TableCell>
                            <span className="text-green-600 font-medium">5 days</span>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <svg 
                                  xmlns="http://www.w3.org/2000/svg" 
                                  viewBox="0 0 24 24" 
                                  fill="none" 
                                  stroke="currentColor" 
                                  strokeWidth="2" 
                                  strokeLinecap="round" 
                                  strokeLinejoin="round" 
                                  className="h-4 w-4"
                                >
                                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                                </svg>
                              </Button>
                              <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive">
                                <svg 
                                  xmlns="http://www.w3.org/2000/svg" 
                                  viewBox="0 0 24 24" 
                                  fill="none" 
                                  stroke="currentColor" 
                                  strokeWidth="2" 
                                  strokeLinecap="round" 
                                  strokeLinejoin="round" 
                                  className="h-4 w-4"
                                >
                                  <path d="M3 6h18"></path>
                                  <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                                  <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                                  <line x1="10" x2="10" y1="11" y2="17"></line>
                                  <line x1="14" x2="14" y1="11" y2="17"></line>
                                </svg>
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="pairings" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Recommended Pairings</CardTitle>
                <CardDescription>
                  Based on your kitchen inventory, here are some perfect flavor pairings.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {mockPairings.map((pairing, index) => (
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
                          View Recipes
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="justify-center">
                <Button variant="outline">
                  Get More Pairing Suggestions
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="profile" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Your Flavor Profile</CardTitle>
                <CardDescription>
                  Your taste preferences help us suggest better pairings for you.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-white rounded-xl p-6">
                  <FlavorProfile />
                </div>
              </CardContent>
              <CardFooter className="justify-center">
                <Button>Update Preferences</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}
