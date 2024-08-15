"use client"

import React from "react"
import * as SeparatorPrimitive from "@radix-ui/react-separator"
import { cn } from "@/lib/utils"
import styles from "./Separator.module.css"

const Separator = React.forwardRef(
  ({ className, orientation = "horizontal", decorative = true, ...props }, ref) => (
    <SeparatorPrimitive.Root
      ref={ref}
      decorative={decorative}
      orientation={orientation}
      className={cn(
        "shrink-0",
        orientation === "horizontal" ? styles.horizontal : styles.vertical,
        className
      )}
      {...props}
    />
  )
)
Separator.displayName = SeparatorPrimitive.Root.displayName

export { Separator }
