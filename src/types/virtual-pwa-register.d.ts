declare module "virtual:pwa-register" {
  export type RegisterSWOptions = {
    immediate?: boolean;
    onNeedRefresh?: (arg: { updateServiceWorker: () => void }) => void;
    onOfflineReady?: () => void;
  };

  export function registerSW(options?: RegisterSWOptions): () => void;

  const _default: typeof registerSW;
  export default _default;
}
