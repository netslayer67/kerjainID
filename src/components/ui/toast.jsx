import { cn } from "@/lib/utils";
import * as ToastPrimitives from "@radix-ui/react-toast";
import { cva } from "class-variance-authority";
import { X } from "lucide-react";
import React from "react";

const ToastProvider = ToastPrimitives.Provider;

const ToastViewport = React.forwardRef(({ className, ...props }, ref) => (
    <ToastPrimitives.Viewport
        ref={ref}
        className={cn(
            `
      fixed inset-x-0 top-2 z-[100] 
      flex flex-col gap-2 px-4 
      w-full max-w-full
      sm:bottom-0 sm:right-0 sm:top-auto sm:max-w-[420px]
      `,
            className
        )}
        {...props}
    />
));

ToastViewport.displayName = ToastPrimitives.Viewport.displayName;

const toastVariants = cva(
    `
    group relative pointer-events-auto flex w-full items-start justify-between
    overflow-hidden rounded-2xl border shadow-lg
    p-4 pr-10 backdrop-blur-xl transition-all duration-300
    bg-card/70 border-border/40
    data-[state=open]:animate-in data-[state=closed]:animate-out
    data-[state=open]:fade-in-80 data-[state=closed]:fade-out-80
    data-[state=open]:slide-in-from-top-full sm:data-[state=open]:slide-in-from-bottom-full
    data-[state=closed]:slide-out-to-right-full
    data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)]
    data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)]
  `,
    {
        variants: {
            variant: {
                default: `
          bg-card/70 text-foreground
          hover:border-accent/60 focus:ring-2 focus:ring-accent
        `,
                destructive: `
          border-destructive/60 bg-destructive/30 text-destructive-foreground
          hover:border-destructive focus:ring-2 focus:ring-destructive
        `,
            },
        },
        defaultVariants: {
            variant: "default",
        },
    }
);

const Toast = React.forwardRef(({ className, variant, ...props }, ref) => (
    <ToastPrimitives.Root
        ref={ref}
        className={cn(toastVariants({ variant }), className)}
        {...props}
    />
));
Toast.displayName = ToastPrimitives.Root.displayName;

const ToastAction = React.forwardRef(({ className, ...props }, ref) => (
    <ToastPrimitives.Action
        ref={ref}
        className={cn(
            `
        inline-flex h-8 shrink-0 items-center justify-center
        rounded-full border border-border/40 bg-transparent
        px-3 text-xs font-medium transition-colors duration-300
        hover:bg-accent hover:text-accent-foreground
        focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2
        disabled:pointer-events-none disabled:opacity-50
        group-[.destructive]:border-destructive/40
        group-[.destructive]:hover:bg-destructive group-[.destructive]:hover:text-destructive-foreground
      `,
            className
        )}
        {...props}
    />
));
ToastAction.displayName = ToastPrimitives.Action.displayName;

const ToastClose = React.forwardRef(({ className, ...props }, ref) => (
    <ToastPrimitives.Close
        ref={ref}
        className={cn(
            `
        absolute right-2 top-2 rounded-full p-1
        text-foreground/50 opacity-0 transition-opacity duration-300
        hover:text-accent focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-accent
        group-hover:opacity-100
        group-[.destructive]:text-destructive-foreground/70
        group-[.destructive]:hover:text-destructive-foreground
      `,
            className
        )}
        toast-close=""
        {...props}
    >
        <X className="h-4 w-4" />
    </ToastPrimitives.Close>
));
ToastClose.displayName = ToastPrimitives.Close.displayName;

const ToastTitle = React.forwardRef(({ className, ...props }, ref) => (
    <ToastPrimitives.Title
        ref={ref}
        className={cn("text-sm font-semibold tracking-tight", className)}
        {...props}
    />
));
ToastTitle.displayName = ToastPrimitives.Title.displayName;

const ToastDescription = React.forwardRef(({ className, ...props }, ref) => (
    <ToastPrimitives.Description
        ref={ref}
        className={cn("text-xs text-muted-foreground mt-1 leading-snug", className)}
        {...props}
    />
));
ToastDescription.displayName = ToastPrimitives.Description.displayName;

export {
    Toast,
    ToastAction,
    ToastClose,
    ToastDescription,
    ToastProvider,
    ToastTitle,
    ToastViewport,
};
