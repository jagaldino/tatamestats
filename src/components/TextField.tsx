import type { InputHTMLAttributes } from "react";

type TextFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string;
};

export function TextField({
  label,
  error,
  className = "",
  ...props
}: TextFieldProps) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium text-zinc-300">
        {label}
      </span>
      <input
        {...props}
        className={`w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none transition placeholder:text-zinc-600 focus:border-green-600 focus:ring-2 focus:ring-green-600/30 ${className}`}
      />
      {error ? (
        <span className="mt-2 block text-sm text-red-500">{error}</span>
      ) : null}
    </label>
  );
}
