import React, { useState } from "react"
import { Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"

import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import {
  Command,
  CommandGroup,
  CommandItem,
} from "@/components/ui/command"

import { options } from "@/lib/data"

const DateTimeFilter = ({ dateQuery, setDateQuery }) => {
  const [open, setOpen] = useState(false)
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          size="lg"
          className="justify-between cursor-pointer w-30 hover:bg-accent transition"
        >
          {dateQuery ? options.find((opt) => opt.value === dateQuery)?.label : options[0].label}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-auto p-0">
        <Command>
          <CommandGroup>
            {options.map((item) => (
              <CommandItem
                key={item.value}
                value={item.value}
                className="cursor-pointer w-34 hover:bg-accent transition"
                onSelect={(curentValue) => {
                  setDateQuery(curentValue);
                  setOpen(false);

                }}
              >
                {item.label}
                <Check
                  className={cn(
                    " ml-auto transition-opacity",
                    dateQuery === item.value ? "opacity-100" : "opacity-0"
                  )}
                />
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

export default DateTimeFilter