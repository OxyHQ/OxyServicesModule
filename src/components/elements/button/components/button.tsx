import React, { forwardRef } from "react";

import { cn } from "../../../../utils/cn";

interface IButton extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, IButton>(
  ({ children, className, ...props }, ref) => {
    return (
      <button
        ref={ref}
        {...props}
        className={cn(
          "grid cursor-pointer place-items-center rounded-full",
          "transition-colors duration-200 ease-in-out",
          "fill-secondary-100 p-[0.5em]",
          "focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary-100",
          "fill-secondary-100 [&>svg]:w-h2",
          "disabled-button",
          className,
          "hover:bg-neutral-500 active:bg-neutral-600",
          "focus-visible:bg-neutral-500 focus-visible:outline-secondary-100"
        )}
        aria-pressed={props["aria-pressed"]}
        aria-disabled={props.disabled}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
