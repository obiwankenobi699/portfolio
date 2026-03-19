import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type NeumorphButtonProps = {
  children: ReactNode;
  className?: string;
  variant?: "default" | "glass";
};

const NeumorphButton = ({ children, className, variant = "default" }: NeumorphButtonProps) => {
  if (variant === "glass") {
    return (
      <div
        className={cn(
          "relative flex w-max items-center justify-center overflow-hidden rounded-2xl border",
          "backdrop-blur-md bg-white/15 dark:bg-white/10 border-white/30 dark:border-white/20",
          "shadow-[0_8px_24px_0_rgba(0,0,0,0.15)]",
          "transition-all duration-150 ease-out",
        )}
      >
        <div className={cn("flex items-center justify-center p-0", className)}>
          {children}
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "relative flex w-max items-center justify-center overflow-hidden rounded-2xl border [box-shadow:0_4px_10px_-4px_rgba(15,23,42,0.15)]",
        "bg-neutral-50 border-neutral-200 after:border-neutral-100 after:border-t-[2px] after:border-b-[2px] after:border-b-neutral-300 dark:bg-[#212121] dark:border-black/50 dark:after:border-[#2A2A2A] dark:after:border-b-black/50",
        "after:absolute after:inset-0 after:rounded-2xl after:border-r-0 after:content-['']",
        "transition-all duration-150 ease-out hover:[&>div]:translate-y-[1px] hover:after:border-b-0 hover:after:border-t-neutral-300 hover:after:[box-shadow:0_3px_10px_0_rgba(15,23,42,0.12)_inset] dark:hover:after:border-t-black/50 dark:hover:after:[box-shadow:0_5px_15px_0_#00000070_inset]",
      )}
    >
      <div className={cn("flex items-center justify-center p-0", className)}>
        {children}
      </div>
    </div>
  );
};

export default NeumorphButton;
