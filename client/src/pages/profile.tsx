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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Form, 
  FormControl, 
  FormDescription, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { FlavorProfile } from "@/components/FlavorProfile";
import { DietaryPreferences } from "@/components/DietaryPreferences";
import { Helmet } from "react-helmet";

const profileFormSchema = z.object({
  username: z.string().min(3, {
    message: "Username must be at least 3 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  fullName: z.string().min(2, {
    message: "Full name must be at least 2 characters.",
  }),
});

const flavorFormSchema = z.object({
  sweet: z.number().min(0).max(100),
  savory: z.number().min(0).max(100),
  spicy: z.number().min(0).max(100),
  acidic: z.number().min(0).max(100),
});

const dietaryFormSchema = z.object({
  vegetarian: z.boolean().default(false),
  vegan: z.boolean().default(false),
  glutenFree: z.boolean().default(false),
  dairyFree: z.boolean().default(false),
  nutFree: z.boolean().default(true),
  pescatarian: z.boolean().default(true),
  lowSodium: z.boolean().default(true),
});

const cuisineFormSchema = z.object({
  italian: z.boolean().default(false),
  mexican: z.boolean().default(true),
  japanese: z.boolean().default(true),
  mediterranean: z.boolean().default(true),
  indian: z.boolean().default(false),
  french: z.boolean().default(false),
  chinese: z.boolean().default(false),
  thai: z.boolean().default(false),
});

export default function Profile() {
  const [selectedTab, setSelectedTab] = useState("profile");

  const profileForm = useForm<z.infer<typeof profileFormSchema>>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      username: "foodlover",
      email: "user@example.com",
      fullName: "Alex Johnson",
    },
  });

  const flavorForm = useForm<z.infer<typeof flavorFormSchema>>({
    resolver: zodResolver(flavorFormSchema),
    defaultValues: {
      sweet: 65,
      savory: 80,
      spicy: 45,
      acidic: 70,
    },
  });

  const dietaryForm = useForm<z.infer<typeof dietaryFormSchema>>({
    resolver: zodResolver(dietaryFormSchema),
    defaultValues: {
      vegetarian: false,
      vegan: false,
      glutenFree: false,
      dairyFree: false,
      nutFree: true,
      pescatarian: true,
      lowSodium: true,
    },
  });

  const cuisineForm = useForm<z.infer<typeof cuisineFormSchema>>({
    resolver: zodResolver(cuisineFormSchema),
    defaultValues: {
      italian: false,
      mexican: true,
      japanese: true,
      mediterranean: true,
      indian: false,
      french: false,
      chinese: false,
      thai: false,
    },
  });

  function onProfileSubmit(values: z.infer<typeof profileFormSchema>) {
    console.log(values);
    // In a real app, submit to API
  }

  function onFlavorSubmit(values: z.infer<typeof flavorFormSchema>) {
    console.log(values);
    // In a real app, submit to API
  }

  function onDietarySubmit(values: z.infer<typeof dietaryFormSchema>) {
    console.log(values);
    // In a real app, submit to API
  }

  function onCuisineSubmit(values: z.infer<typeof cuisineFormSchema>) {
    console.log(values);
    // In a real app, submit to API
  }

  return (
    <>
      <Helmet>
        <title>My Profile - Flavour Fusion</title>
        <meta name="description" content="Manage your account settings, taste preferences, dietary restrictions, and favorite cuisines." />
      </Helmet>
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="font-display text-3xl md:text-4xl font-bold">My Profile</h1>
            <p className="text-neutral-700">Manage your account settings and preferences.</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="md:col-span-1">
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col items-center">
                  <div className="w-32 h-32 rounded-full bg-neutral-200 mb-4 overflow-hidden">
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      className="w-full h-full text-neutral-400 p-8"
                    >
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                      <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                  </div>
                  <h2 className="font-display text-xl font-semibold">Alex Johnson</h2>
                  <p className="text-neutral-500 text-sm">Member since June 2023</p>
                  
                  <div className="w-full mt-6 space-y-2">
                    <Button 
                      variant="outline" 
                      className="w-full justify-start"
                      onClick={() => setSelectedTab("profile")}
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
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                        <circle cx="12" cy="7" r="4"></circle>
                      </svg>
                      Account
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full justify-start"
                      onClick={() => setSelectedTab("flavors")}
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
                        <path d="M12 5v14"></path>
                        <path d="M18 13a5 5 0 0 0-6 0"></path>
                        <path d="M6 13a5 5 0 0 1 6 0"></path>
                        <path d="M18 7a7 7 0 0 0-12 0"></path>
                      </svg>
                      Flavor Preferences
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full justify-start"
                      onClick={() => setSelectedTab("dietary")}
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
                        <path d="M2.3 15.4 9 2l6.7 13.4c.3.6 0 1.3-.5 1.5-.2.1-.4.1-.6.1H3.4c-.7 0-1.2-.5-1.2-1.2 0-.2 0-.4.1-.6Z"></path>
                        <path d="M14 22H4a2 2 0 0 1 0-4h12"></path>
                        <path d="M18 18h.5c1.9 0 3.5-1.5 3.5-3.4 0-2-1.7-3.6-3.8-3.6S15 12.5 15 14.4V14c0-1.9-1.6-3.4-3.5-3.4S8 12 8 13.9"></path>
                      </svg>
                      Dietary Preferences
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full justify-start"
                      onClick={() => setSelectedTab("cuisine")}
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
                        <path d="M5 14C2 14 2 9 5 9"></path>
                        <path d="M5 9c6 0 8.5 7 13 7"></path>
                        <path d="M5 9c0-3 2-5 5-5"></path>
                        <path d="M19 9c0-3-2-5-5-5"></path>
                        <path d="M18 14l1-5h-8l1 5"></path>
                        <path d="M16 14h-4"></path>
                        <path d="M20 19c0-5-4-9-8-9s-8 4-8 9z"></path>
                      </svg>
                      Cuisine Preferences
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="md:col-span-3">
            {selectedTab === "profile" && (
              <Card>
                <CardHeader>
                  <CardTitle>Account Information</CardTitle>
                  <CardDescription>
                    Update your account details and profile settings.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Form {...profileForm}>
                    <form onSubmit={profileForm.handleSubmit(onProfileSubmit)} className="space-y-6">
                      <FormField
                        control={profileForm.control}
                        name="username"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Username</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormDescription>
                              This is your public display name.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={profileForm.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input {...field} type="email" />
                            </FormControl>
                            <FormDescription>
                              We'll never share your email with anyone else.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={profileForm.control}
                        name="fullName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Full Name</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormDescription>
                              Your full name helps us personalize your experience.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button type="submit">Save Changes</Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            )}
            
            {selectedTab === "flavors" && (
              <Card>
                <CardHeader>
                  <CardTitle>Flavor Preferences</CardTitle>
                  <CardDescription>
                    Adjust your flavor preferences to get more accurate pairing recommendations.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Form {...flavorForm}>
                    <form onSubmit={flavorForm.handleSubmit(onFlavorSubmit)} className="space-y-6">
                      <FormField
                        control={flavorForm.control}
                        name="sweet"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Sweet</FormLabel>
                            <div className="flex items-center space-x-4">
                              <FormControl>
                                <Slider
                                  value={[field.value]}
                                  min={0}
                                  max={100}
                                  step={1}
                                  onValueChange={(vals) => field.onChange(vals[0])}
                                  className="flex-1"
                                />
                              </FormControl>
                              <span className="w-12 text-center">{field.value}%</span>
                            </div>
                            <FormDescription>
                              How much you enjoy sweet flavors like fruits, desserts, and candies.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={flavorForm.control}
                        name="savory"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Savory</FormLabel>
                            <div className="flex items-center space-x-4">
                              <FormControl>
                                <Slider
                                  value={[field.value]}
                                  min={0}
                                  max={100}
                                  step={1}
                                  onValueChange={(vals) => field.onChange(vals[0])}
                                  className="flex-1"
                                />
                              </FormControl>
                              <span className="w-12 text-center">{field.value}%</span>
                            </div>
                            <FormDescription>
                              How much you enjoy savory foods like meats, cheese, and broths.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={flavorForm.control}
                        name="spicy"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Spicy</FormLabel>
                            <div className="flex items-center space-x-4">
                              <FormControl>
                                <Slider
                                  value={[field.value]}
                                  min={0}
                                  max={100}
                                  step={1}
                                  onValueChange={(vals) => field.onChange(vals[0])}
                                  className="flex-1"
                                />
                              </FormControl>
                              <span className="w-12 text-center">{field.value}%</span>
                            </div>
                            <FormDescription>
                              How much heat you prefer in your food, from mild to very spicy.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={flavorForm.control}
                        name="acidic"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Acidic</FormLabel>
                            <div className="flex items-center space-x-4">
                              <FormControl>
                                <Slider
                                  value={[field.value]}
                                  min={0}
                                  max={100}
                                  step={1}
                                  onValueChange={(vals) => field.onChange(vals[0])}
                                  className="flex-1"
                                />
                              </FormControl>
                              <span className="w-12 text-center">{field.value}%</span>
                            </div>
                            <FormDescription>
                              How much you enjoy tangy, sour flavors like citrus fruits and vinegar.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button type="submit">Save Preferences</Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            )}
            
            {selectedTab === "dietary" && (
              <Card>
                <CardHeader>
                  <CardTitle>Dietary Preferences</CardTitle>
                  <CardDescription>
                    Set your dietary restrictions and preferences to get appropriate food recommendations.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Form {...dietaryForm}>
                    <form onSubmit={dietaryForm.handleSubmit(onDietarySubmit)} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={dietaryForm.control}
                          name="vegetarian"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-start space-x-3 space-y-0 p-4 border rounded-md">
                              <FormControl>
                                <Checkbox
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                  id="vegetarian"
                                />
                              </FormControl>
                              <div className="space-y-1 leading-none">
                                <FormLabel>
                                  Vegetarian
                                </FormLabel>
                                <FormDescription>
                                  No meat, but may include dairy and eggs
                                </FormDescription>
                              </div>
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={dietaryForm.control}
                          name="vegan"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-start space-x-3 space-y-0 p-4 border rounded-md">
                              <FormControl>
                                <Checkbox
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                  id="vegan"
                                />
                              </FormControl>
                              <div className="space-y-1 leading-none">
                                <FormLabel>
                                  Vegan
                                </FormLabel>
                                <FormDescription>
                                  No animal products of any kind
                                </FormDescription>
                              </div>
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={dietaryForm.control}
                          name="glutenFree"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-start space-x-3 space-y-0 p-4 border rounded-md">
                              <FormControl>
                                <Checkbox
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                  id="gluten-free"
                                />
                              </FormControl>
                              <div className="space-y-1 leading-none">
                                <FormLabel>
                                  Gluten-Free
                                </FormLabel>
                                <FormDescription>
                                  No wheat, barley, rye, or derivatives
                                </FormDescription>
                              </div>
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={dietaryForm.control}
                          name="dairyFree"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-start space-x-3 space-y-0 p-4 border rounded-md">
                              <FormControl>
                                <Checkbox
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                  id="dairy-free"
                                />
                              </FormControl>
                              <div className="space-y-1 leading-none">
                                <FormLabel>
                                  Dairy-Free
                                </FormLabel>
                                <FormDescription>
                                  No milk, cheese, or dairy products
                                </FormDescription>
                              </div>
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={dietaryForm.control}
                          name="nutFree"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-start space-x-3 space-y-0 p-4 border rounded-md">
                              <FormControl>
                                <Checkbox
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                  id="nut-free"
                                />
                              </FormControl>
                              <div className="space-y-1 leading-none">
                                <FormLabel>
                                  Nut-Free
                                </FormLabel>
                                <FormDescription>
                                  No tree nuts or peanuts
                                </FormDescription>
                              </div>
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={dietaryForm.control}
                          name="pescatarian"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-start space-x-3 space-y-0 p-4 border rounded-md">
                              <FormControl>
                                <Checkbox
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                  id="pescatarian"
                                />
                              </FormControl>
                              <div className="space-y-1 leading-none">
                                <FormLabel>
                                  Pescatarian
                                </FormLabel>
                                <FormDescription>
                                  Vegetarian diet plus seafood
                                </FormDescription>
                              </div>
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={dietaryForm.control}
                          name="lowSodium"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-start space-x-3 space-y-0 p-4 border rounded-md">
                              <FormControl>
                                <Checkbox
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                  id="low-sodium"
                                />
                              </FormControl>
                              <div className="space-y-1 leading-none">
                                <FormLabel>
                                  Low Sodium
                                </FormLabel>
                                <FormDescription>
                                  Reduced salt in recommendations
                                </FormDescription>
                              </div>
                            </FormItem>
                          )}
                        />
                      </div>
                      <Button type="submit">Save Preferences</Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            )}
            
            {selectedTab === "cuisine" && (
              <Card>
                <CardHeader>
                  <CardTitle>Cuisine Preferences</CardTitle>
                  <CardDescription>
                    Select your favorite cuisine types to get more relevant recommendations.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Form {...cuisineForm}>
                    <form onSubmit={cuisineForm.handleSubmit(onCuisineSubmit)} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={cuisineForm.control}
                          name="italian"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-start space-x-3 space-y-0 p-4 border rounded-md">
                              <FormControl>
                                <Checkbox
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                  id="italian"
                                />
                              </FormControl>
                              <div className="space-y-1 leading-none">
                                <FormLabel>
                                  Italian
                                </FormLabel>
                                <FormDescription>
                                  Pasta, pizza, risotto, and more
                                </FormDescription>
                              </div>
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={cuisineForm.control}
                          name="mexican"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-start space-x-3 space-y-0 p-4 border rounded-md">
                              <FormControl>
                                <Checkbox
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                  id="mexican"
                                />
                              </FormControl>
                              <div className="space-y-1 leading-none">
                                <FormLabel>
                                  Mexican
                                </FormLabel>
                                <FormDescription>
                                  Tacos, enchiladas, and bold flavors
                                </FormDescription>
                              </div>
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={cuisineForm.control}
                          name="japanese"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-start space-x-3 space-y-0 p-4 border rounded-md">
                              <FormControl>
                                <Checkbox
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                  id="japanese"
                                />
                              </FormControl>
                              <div className="space-y-1 leading-none">
                                <FormLabel>
                                  Japanese
                                </FormLabel>
                                <FormDescription>
                                  Sushi, ramen, and umami flavors
                                </FormDescription>
                              </div>
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={cuisineForm.control}
                          name="mediterranean"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-start space-x-3 space-y-0 p-4 border rounded-md">
                              <FormControl>
                                <Checkbox
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                  id="mediterranean"
                                />
                              </FormControl>
                              <div className="space-y-1 leading-none">
                                <FormLabel>
                                  Mediterranean
                                </FormLabel>
                                <FormDescription>
                                  Olive oil, fresh herbs, and seafood
                                </FormDescription>
                              </div>
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={cuisineForm.control}
                          name="indian"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-start space-x-3 space-y-0 p-4 border rounded-md">
                              <FormControl>
                                <Checkbox
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                  id="indian"
                                />
                              </FormControl>
                              <div className="space-y-1 leading-none">
                                <FormLabel>
                                  Indian
                                </FormLabel>
                                <FormDescription>
                                  Curries, spices, and aromatic dishes
                                </FormDescription>
                              </div>
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={cuisineForm.control}
                          name="french"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-start space-x-3 space-y-0 p-4 border rounded-md">
                              <FormControl>
                                <Checkbox
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                  id="french"
                                />
                              </FormControl>
                              <div className="space-y-1 leading-none">
                                <FormLabel>
                                  French
                                </FormLabel>
                                <FormDescription>
                                  Rich sauces, pastries, and techniques
                                </FormDescription>
                              </div>
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={cuisineForm.control}
                          name="chinese"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-start space-x-3 space-y-0 p-4 border rounded-md">
                              <FormControl>
                                <Checkbox
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                  id="chinese"
                                />
                              </FormControl>
                              <div className="space-y-1 leading-none">
                                <FormLabel>
                                  Chinese
                                </FormLabel>
                                <FormDescription>
                                  Stir-fries, dumplings, and balanced flavors
                                </FormDescription>
                              </div>
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={cuisineForm.control}
                          name="thai"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-start space-x-3 space-y-0 p-4 border rounded-md">
                              <FormControl>
                                <Checkbox
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                  id="thai"
                                />
                              </FormControl>
                              <div className="space-y-1 leading-none">
                                <FormLabel>
                                  Thai
                                </FormLabel>
                                <FormDescription>
                                  Spicy, sweet, sour, and savory balance
                                </FormDescription>
                              </div>
                            </FormItem>
                          )}
                        />
                      </div>
                      <Button type="submit">Save Preferences</Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
