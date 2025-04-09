"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export function SelectPopover({
  values,
  filterFields,
  setFilterFields,
  filterName,
}: {
  values: string[];
  filterFields: string[];
  setFilterFields: (value: string[]) => void;
  filterName: string;
}) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  // Funzione per troncare il testo se supera i 15 caratteri
  const truncateText = (text: string) => {
    return text.length > 25 ? `${text.substring(0, 25)}...` : text;
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between rounded-none border-0 shadow-none border-r p-6"
        >
          {truncateText(value || filterName)}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[250px] p-0 left-10">
        <Command>
          <CommandInput placeholder={`Search ${filterName}...`} />
          <CommandList>
            <CommandEmpty>No {filterName} found.</CommandEmpty>
            <CommandGroup>
              {values?.map((category: string) => (
                <CommandItem
                  key={category}
                  value={category}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue);
                    setOpen(false);
                    setFilterFields([...filterFields, currentValue]);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === category ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {category}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
