import { useCallback, useRef } from "react";
import { create } from "zustand";
import apiService from "../../../utils/apiService";
import { cacheStore } from "../../../utils/cacheService";

export const useDataStore = create((set) => ({
  data: null,
  loading: false,
  error: null,
  cacheKey: "",
  setCacheKey: (cacheKey) => set({ cacheKey }),
  removeCacheKey: () => set({ cacheKey: "" }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
  setData: (data) => set({ data }),
}));

const useFetchAllOperators = () => {
  const abortControllerRef = useRef;
  const {
    data: cachedData,
    loading,
    error,
    cacheKey: storeCacheKey,
    setLoading,
    removeCacheKey,
    setError,
    setData,
    setCacheKey,
  } = useDataStore();

  const fetchAllOperators = useCallback(
    async (body) => {
      setLoading(true);
      setError(null);
      abortControllerRef.current = new AbortController();
      const { signal } = abortControllerRef.current;
      const params = {
        url: `smm/supervisor/fetchAllOperators?${body}`,
        config: { signal },
        body,
      };
      try {
        // const cacheKey = JSON.stringify(params);
        // setCacheKey(cacheKey);
        // const response = await cachedFetch(cacheKey, () =>
        //   apiService.get(params.url, params.body, params.config)
        // );
        const response = await apiService.get(
          params.url,
          params.body,
          params.config
        );
        setData(response?.data);
        return response;
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    },
    [cachedData, setData]
  );

  const removeCache = () => {
    if (storeCacheKey) {
      const { remove } = cacheStore();
      removeCacheKey();
      remove(storeCacheKey);
    }
  };
  const cancelRequest = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      removeCacheKey();
      abortControllerRef.current = null;
    }
  };
  return {
    dataAllOperators: cachedData,
    loading,
    error,
    fetchAllOperators,
    removeCache,
    cancelRequest,
  };
};
export default useFetchAllOperators;
