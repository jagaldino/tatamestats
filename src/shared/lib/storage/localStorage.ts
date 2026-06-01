import type { StateStorage } from "zustand/middleware";

function createMemoryStorage(): StateStorage {
  const store = new Map<string, string>();

  return {
    getItem: (name) => store.get(name) ?? null,
    setItem: (name, value) => {
      store.set(name, value);
    },
    removeItem: (name) => {
      store.delete(name);
    },
  };
}

export const safeStorage: StateStorage =
  typeof window !== "undefined" ? window.localStorage : createMemoryStorage();
