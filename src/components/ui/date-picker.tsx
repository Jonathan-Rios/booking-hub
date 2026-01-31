import * as React from "react";
import { CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import { formatDate } from "@/utils/dateHelper";

interface IDatePickerProps {
  label?: string;
  error?: string;
  value?: Date;
  onChange: (date: Date | undefined) => void;
  minDate?: Date;
  placeholder?: string;
  id?: string;
}

export function DatePicker({
  label,
  error,
  value,
  onChange,
  minDate,
  placeholder = "Select a date",
  id,
}: IDatePickerProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <Label htmlFor={id} className="text-secondary-text text-sm font-medium">
          {label}
        </Label>
      )}
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            id={id}
            variant="outline"
            role="combobox"
            aria-expanded={open}
            aria-invalid={!!error}
            className={cn(
              "h-10 w-full justify-start text-left font-normal",
              !value && "text-muted-foreground",
              error && "border-destructive focus-visible:ring-destructive/20",
            )}
          >
            <CalendarIcon className="mb-0.5 size-4 opacity-70" />
            {value ? formatDate(value) : <span>{placeholder}</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={value}
            defaultMonth={value}
            onSelect={(date) => {
              onChange(date);
              setOpen(false);
            }}
            disabled={minDate ? { before: minDate } : undefined}
            autoFocus
          />
        </PopoverContent>
      </Popover>
      {error && <span className="text-destructive text-sm">{error}</span>}
    </div>
  );
}
