"use client"

import * as React from "react"
import * as AccordionPrimitive from "@radix-ui/react-accordion"
import { Plus, Minus } from "lucide-react"


import { cn } from "@/lib/utils"

const Accordion = AccordionPrimitive.Root

const AccordionItem = React.forwardRef(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item ref={ref} className={cn("border-b border-opacity-20 md:border-opacity-50 border-gray-950 ", className)} {...props} />
))
AccordionItem.displayName = "AccordionItem"

const AccordionTrigger = React.forwardRef(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Header className="flex">
  <AccordionPrimitive.Trigger
    ref={ref}
    className={cn(
      // Existing Tailwind classes
      "flex flex-1 items-center justify-between py-2 md:py-4 font-medium transition-all hover:underline",
      
      // This line ensures that when the accordion is open, the Plus icon is hidden
      "[&[data-state=open]>.plus-icon]:hidden",
      
      // This ensures that the Minus icon is only shown when the accordion is open
      "[&[data-state=closed]>.minus-icon]:hidden",

      // Any additional classes passed as props
      className
    )}
    {...props}
  >
    {children}

    {/* Show Plus when closed and hide it when open */}
    <Plus className="plus-icon h-4 w-4 shrink-0 transition-transform duration-200" />

    {/* Show Minus when open and hide it when closed */}
    <Minus className="minus-icon h-4 w-4 shrink-0 transition-transform duration-200" />
  </AccordionPrimitive.Trigger>
</AccordionPrimitive.Header>

))
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName

const AccordionContent = React.forwardRef(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className="overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
    {...props}>
    <div className={cn("pb-4 pt-0", className)}>{children}</div>
  </AccordionPrimitive.Content>
))

AccordionContent.displayName = AccordionPrimitive.Content.displayName

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }
