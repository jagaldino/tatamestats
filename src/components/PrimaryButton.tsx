import type { ButtonHTMLAttributes } from "react";

type PrimaryButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "solid" | "outline";
};

export function PrimaryButton({
  variant = "solid",
  className = "",
  ...props
}: PrimaryButtonProps) {
  const variantClassName =
    variant === "solid"
      ? "bg-green-600 text-white disabled:bg-green-600/40"
      : "border border-green-600 bg-transparent text-green-500";

  return (
    <button
      {...props}
      className={`rounded-xl px-4 py-3 font-semibold transition active:scale-[0.99] disabled:cursor-not-allowed ${variantClassName} ${className}`}
    />
  );
}
