"use client";

import * as React from "react";
import * as SwitchPrimitive from "@radix-ui/react-switch@1.1.3";

import { cn } from "./utils";

function Switch({
  className,
  ...props
}: React.ComponentProps<typeof SwitchPrimitive.Root>) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      className={cn(
        // More elongated and minimalist switch - 44px width x 24px height
        "peer inline-flex h-6 w-11 shrink-0 items-center rounded-full border-2 border-transparent transition-all outline-none",
        "focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#C8B8FF]/50",
        // Unchecked state - gray background
        "data-[state=unchecked]:bg-gray-300",
        // Checked state - will be overridden by className prop for custom colors
        "data-[state=checked]:bg-[#C8B8FF]",
        // Disabled state
        "disabled:cursor-not-allowed disabled:opacity-40",
        className,
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className={cn(
          // Larger thumb for better visibility - 20px
          "pointer-events-none block h-5 w-5 rounded-full bg-white shadow-lg ring-0 transition-transform",
          // Movement with padding consideration
          "data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0",
        )}
      />
    </SwitchPrimitive.Root>
  );
}

export { Switch };
