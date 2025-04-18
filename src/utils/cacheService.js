import { create } from "zustand";

export const cacheStore = create((set, get) => ({
  cache: new Map(),

  get: (key) => get().cache.get(key),

  getAll: () => get().cache,

  set: (key, value) => {
    set((state) => {
      const newCache = new Map(state.cache).set(key, value);
      return { cache: newCache };
    });
  },

  clear: () => set(() => ({ cache: new Map() })),

  remove: (key) => {
    set((state) => {
      const newCache = new Map(state.cache);
      newCache.delete(key);
      return { cache: newCache };
    });
  },

  removeEntriesByRegex: (pattern) => {
    set((state) => {
      const newCache = new Map(state.cache);
      Array.from(newCache.keys()).forEach((key) => {
        if (pattern.test(key)) {
          newCache.delete(key);
        }
      });
      return { cache: newCache };
    });
  },
}));
