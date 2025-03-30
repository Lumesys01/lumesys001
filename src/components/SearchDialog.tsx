
import React, { useState } from 'react';
import { 
  Command, 
  CommandDialog, 
  CommandEmpty, 
  CommandGroup, 
  CommandInput, 
  CommandItem, 
  CommandList 
} from "@/components/ui/command";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

// Example search data - you'd replace this with your actual content
const searchData = [
  { category: "Features", items: [
    { name: "Dashboard", link: "#dashboard" },
    { name: "Energy Monitoring", link: "#features" },
    { name: "ROI Calculator", link: "#roi" }
  ]},
  { category: "Sections", items: [
    { name: "How It Works", link: "#how-it-works" },
    { name: "Why Lumesys", link: "#why" },
    { name: "Team", link: "#team" }
  ]}
];

export const SearchDialog = () => {
  const [open, setOpen] = useState(false);

  const handleSearch = (value: string) => {
    const results = searchData.flatMap(category => 
      category.items.filter(item => 
        item.name.toLowerCase().includes(value.toLowerCase())
      )
    );
    return results;
  };

  return (
    <>
      <Button 
        variant="ghost" 
        size="icon" 
        onClick={() => setOpen(true)}
        className="text-black/70 dark:text-white/70 hover:text-black dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5 rounded-full"
        aria-label="Search"
      >
        <Search size={20} />
      </Button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <Command>
          <CommandInput 
            placeholder="Type to search..." 
            onChangeCapture={(e) => {
              const value = (e.target as HTMLInputElement).value;
              // Optional: implement live search results
              console.log(handleSearch(value));
            }}
          />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            {searchData.map((category, catIndex) => (
              <CommandGroup key={catIndex} heading={category.category}>
                {category.items.map((item, itemIndex) => (
                  <CommandItem 
                    key={itemIndex} 
                    value={item.name}
                    onSelect={() => {
                      window.location.hash = item.link;
                      setOpen(false);
                    }}
                  >
                    {item.name}
                  </CommandItem>
                ))}
              </CommandGroup>
            ))}
          </CommandList>
        </Command>
      </CommandDialog>
    </>
  );
};
