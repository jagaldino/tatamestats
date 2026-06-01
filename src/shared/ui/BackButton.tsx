import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

type BackButtonProps = {
  fallbackPath?: string;
  className?: string;
};

export function BackButton({
  fallbackPath = "/",
  className = "",
}: BackButtonProps) {
  const navigate = useNavigate();

  const handleBack = useCallback(() => {
    try {
      // Se não houver histórico suficiente, redireciona para fallback
      if (typeof window !== "undefined" && window.history.length > 1) {
        navigate(-1);
      } else {
        navigate(fallbackPath);
      }
    } catch (e) {
      navigate(fallbackPath);
    }
  }, [navigate, fallbackPath]);

  return (
    <button
      type="button"
      onClick={handleBack}
      aria-label="Voltar"
      className={`inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-800 transition hover:bg-slate-50 ${className}`}
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
      >
        <path
          d="M15 18L9 12L15 6"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      Voltar
    </button>
  );
}
