
import * as React from "react"
import * as HoverCardPrimitive from "@radix-ui/react-hover-card"
import { motion } from "framer-motion"

import { cn } from "@/lib/utils"

const HoverCard = HoverCardPrimitive.Root

const HoverCardTrigger = HoverCardPrimitive.Trigger

const HoverCardContent = React.forwardRef<
  React.ElementRef<typeof HoverCardPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof HoverCardPrimitive.Content> & {
    variant?: 'default' | 'premium' | 'exclusive';
  }
>(({ className, align = "center", sideOffset = 4, variant = "default", ...props }, ref) => {
  const commonClasses = "z-50 w-64 rounded-md p-4 text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2";
  
  const variants = {
    default: "border bg-popover",
    premium: "border border-gold/20 bg-white/95 dark:bg-black/90 backdrop-blur-md shadow-lg",
    exclusive: "border border-gold/40 bg-white/95 dark:bg-black/90 backdrop-blur-md shadow-gold/10"
  };

  return (
    <HoverCardPrimitive.Content
      ref={ref}
      align={align}
      sideOffset={sideOffset}
      className={cn(
        commonClasses,
        variants[variant],
        className
      )}
      {...props}
    >
      {variant === 'exclusive' && (
        <div className="absolute -top-px left-4 right-4 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
      )}
      
      <motion.div
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
      >
        {props.children}
      </motion.div>
    </HoverCardPrimitive.Content>
  )
})

HoverCardContent.displayName = HoverCardPrimitive.Content.displayName

export { HoverCard, HoverCardTrigger, HoverCardContent }
