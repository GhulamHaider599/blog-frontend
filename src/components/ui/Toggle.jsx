import * as React from "react"
import { cn } from "@/lib/utils"

const Toggle = React.forwardRef(({ className, pressed, ...props }, ref) => (
  <button
    type="button"
    className={cn(
      "inline-flex items-center justify-center rounded-md border border-input bg-background px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none data-[state=on]:bg-primary data-[state=on]:text-primary-foreground",
      pressed && "bg-primary text-primary-foreground",
      className
    )}
    aria-pressed={pressed}
    ref={ref}
    {...props}
  />
))
Toggle.displayName = "Toggle"

export { Toggle } 