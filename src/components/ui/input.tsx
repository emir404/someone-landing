import * as React from "react";

import { cn } from "@/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "h-[50px] w-full min-w-0 rounded-full bg-white/15 px-5 text-lg font-medium leading-none text-white tracking-[-0.72px] placeholder:text-white/60 outline-none transition-all duration-300 ease-out focus-visible:bg-white/20 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      style={{ fontVariationSettings: "'opsz' 6" }}
      {...props}
    />
  );
}

export { Input };
