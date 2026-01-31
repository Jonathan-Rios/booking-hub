import { type InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

export function InputText({ className, error, ...props }: InputProps) {
  return (
    <div className="w-full">
      <input
        className={cn(
          "border-input bg-background flex h-10 w-full rounded-md border px-3 py-2 text-sm",
          error && "border-destructive",
          className,
        )}
        {...props}
      />
      {error && <span className="text-destructive mt-1 text-sm">{error}</span>}
    </div>
  );
}
