import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { 
  Dialog, 
  DialogTrigger, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogFooter
} from '@/components/ui/dialog';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

type DietaryPreferenceType = {
  id: string;
  label: string;
  checked: boolean;
};

export function DietaryPreferences() {
  const [preferences, setPreferences] = useState<DietaryPreferenceType[]>([
    { id: 'vegetarian', label: 'Vegetarian', checked: false },
    { id: 'vegan', label: 'Vegan', checked: false },
    { id: 'pescatarian', label: 'Pescatarian', checked: true },
    { id: 'gluten-free', label: 'Gluten-Free', checked: false },
    { id: 'dairy-free', label: 'Dairy-Free', checked: false },
    { id: 'nut-free', label: 'Nut-Free', checked: true },
    { id: 'low-sodium', label: 'Low Sodium', checked: true },
    { id: 'low-carb', label: 'Low Carb', checked: false },
    { id: 'keto', label: 'Keto', checked: false },
    { id: 'paleo', label: 'Paleo', checked: false }
  ]);
  
  const [open, setOpen] = useState(false);

  const handleCheckboxChange = (id: string, checked: boolean) => {
    setPreferences(prev => 
      prev.map(pref => 
        pref.id === id ? { ...pref, checked } : pref
      )
    );
  };
  
  const selectedPreferences = preferences.filter(pref => pref.checked).map(pref => pref.label);

  return (
    <>
      <div className="flex flex-wrap gap-2">
        {selectedPreferences.map((preference, index) => (
          <span 
            key={index}
            className="bg-primary-light bg-opacity-20 text-primary text-xs py-1 px-3 rounded-full"
          >
            {preference}
          </span>
        ))}
        
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <span className="bg-neutral-200 text-neutral-600 text-xs py-1 px-3 rounded-full cursor-pointer">
              + Add More
            </span>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Dietary Preferences</DialogTitle>
              <DialogDescription>
                Select all dietary preferences that apply to you.
              </DialogDescription>
            </DialogHeader>
            
            <div className="grid grid-cols-2 gap-4 py-4">
              {preferences.map((preference) => (
                <div className="flex items-center space-x-2" key={preference.id}>
                  <Checkbox 
                    id={preference.id} 
                    checked={preference.checked}
                    onCheckedChange={(checked) => 
                      handleCheckboxChange(preference.id, checked as boolean)
                    }
                  />
                  <Label htmlFor={preference.id}>{preference.label}</Label>
                </div>
              ))}
            </div>
            
            <DialogFooter>
              <Button onClick={() => setOpen(false)}>Save Preferences</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
}
