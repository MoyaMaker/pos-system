"use client";
import { useMemo, useState } from "react";
import { Check, ChevronDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "./button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "./command";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { Badge } from "./badge";

type Option = {
  label: string;
  value: string;
};

type ComboboxProps = {
  multiple?: boolean;
  options: Option[];
  /**
   * `values` depends on `multiple` param for `string[]` or `string`
   *
   * @param values string[] | string
   */
  onChange(values: string[] | string): void;
};

export function Combobox({
  multiple = false,
  options,
  onChange,
}: ComboboxProps) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [values, setValues] = useState<string[]>([]);

  const handleSelectAll = () => {
    const newValues =
      values.length === options.length ? [] : options.map((opt) => opt.value);

    setValues(newValues);
    onChange(newValues);
  };

  const handleSelect = (value: string) => {
    multiple ? handleSelectMultiple(value) : handleSelectSingle(value);
  };

  const handleSelectSingle = (currentValue: string) => {
    const newValue = value === currentValue ? "" : currentValue;
    setValue(newValue);
    onChange(newValue);
  };

  const handleSelectMultiple = (value: string) => {
    const newValues = values.includes(value)
      ? values.filter((v) => v !== value)
      : [...values, value];

    onChange(newValues);

    setValues(newValues);
  };

  const multipleSelected = useMemo(() => {
    return values.length >= 3
      ? `${values.length} selected`
      : options
          .filter((opt) => values.includes(opt.value))
          ?.map((opt) => opt.label)
          .join(", ");
  }, [options, values]);

  return (
    <div className="w-[200px]">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-[200px] justify-between"
          >
            {multiple && values.length > 0
              ? multipleSelected
              : !multiple && value
              ? options.find((opt) => opt.value === value)?.label
              : "Select"}
            <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command loop>
            <CommandInput placeholder="Search" />
            <CommandList>
              <CommandEmpty>No options found.</CommandEmpty>

              {multiple && (
                <>
                  <CommandGroup>
                    <CommandItem onSelect={handleSelectAll}>
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          values.length === options.length
                            ? "opacity-100"
                            : "opacity-0"
                        )}
                      />
                      Select all
                    </CommandItem>
                  </CommandGroup>
                  <CommandSeparator />
                </>
              )}

              <CommandGroup>
                {options.map((opt) => (
                  <CommandItem
                    key={opt.value}
                    value={opt.value}
                    onSelect={handleSelect}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        multiple
                          ? values.includes(opt.value)
                            ? "opacity-100"
                            : "opacity-0"
                          : value === opt.value
                          ? "opacity-100"
                          : "opacity-0"
                      )}
                    />
                    {opt.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      {/* Show selected items in multiple */}
      {multiple && (
        <div className="flex gap-1 flex-wrap py-1">
          {options
            .filter((opt) => values.includes(opt.value))
            ?.map((value, index) => (
              <Badge key={`selected_value_${index}`} variant="secondary">
                {value.label}
              </Badge>
            ))}
        </div>
      )}
    </div>
  );
}
