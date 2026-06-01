import { useEffect, useMemo, useState } from "react";

type BeforeInstallPromptEvent = Event & {
  readonly platforms: string[];
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>;
};

const isStandaloneDisplay = () => {
  if (typeof window === "undefined") {
    return false;
  }

  return (
    window.matchMedia("(display-mode: standalone)").matches ||
    (window.navigator as Navigator & { standalone?: boolean }).standalone ===
      true
  );
};

export function PwaInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isInstalling, setIsInstalling] = useState(false);

  const shouldRender = useMemo(() => {
    return Boolean(deferredPrompt) && isVisible && !isStandaloneDisplay();
  }, [deferredPrompt, isVisible]);

  useEffect(() => {
    if (isStandaloneDisplay()) {
      return;
    }

    const handleBeforeInstallPrompt = (event: Event) => {
      event.preventDefault();
      setDeferredPrompt(event as BeforeInstallPromptEvent);
      setIsVisible(true);
    };

    const handleAppInstalled = () => {
      setDeferredPrompt(null);
      setIsVisible(false);
      setIsInstalling(false);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    window.addEventListener("appinstalled", handleAppInstalled);

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt,
      );
      window.removeEventListener("appinstalled", handleAppInstalled);
    };
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) {
      return;
    }

    setIsInstalling(true);

    try {
      await deferredPrompt.prompt();
      const choice = await deferredPrompt.userChoice;

      if (choice.outcome === "accepted") {
        setIsVisible(false);
      }
    } finally {
      setDeferredPrompt(null);
      setIsInstalling(false);
    }
  };

  const handleDismiss = () => {
    setIsVisible(false);
  };

  if (!shouldRender) {
    return null;
  }

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 p-4 sm:bottom-4 sm:left-auto sm:right-4 sm:max-w-sm">
      <div className="rounded-2xl border border-slate-700 bg-slate-950/95 p-4 shadow-2xl shadow-black/30 backdrop-blur">
        <div className="flex items-start gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-emerald-500/15 text-emerald-300">
            <span className="text-lg font-bold">T</span>
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold text-white">
              Instalar TatameStats
            </p>
            <p className="mt-1 text-sm leading-5 text-slate-300">
              Adicione o app à tela inicial para acessar treinos e estatísticas
              offline.
            </p>
          </div>
        </div>

        <div className="mt-4 flex gap-2">
          <button
            type="button"
            onClick={handleDismiss}
            className="flex-1 rounded-xl border border-slate-700 px-4 py-2.5 text-sm font-medium text-slate-200 transition hover:border-slate-500 hover:bg-slate-900"
          >
            Agora não
          </button>
          <button
            type="button"
            onClick={handleInstall}
            disabled={isInstalling}
            className="flex-1 rounded-xl bg-emerald-500 px-4 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isInstalling ? "Abrindo..." : "Instalar"}
          </button>
        </div>
      </div>
    </div>
  );
}
