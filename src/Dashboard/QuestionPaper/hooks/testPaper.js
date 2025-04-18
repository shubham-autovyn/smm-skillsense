import { useCallback, useRef } from "react";
import { create } from "zustand";
import apiService from "../../../utils/apiService";
import cachedFetch from "../../../utils/cachedFetch";
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

const useFetchTestPaper = () => {
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

  const fetchTestPaper = useCallback(
    async (body) => {
      setLoading(true);
      setError(null);
      abortControllerRef.current = new AbortController();
      const { signal } = abortControllerRef.current;
      const params = {
        url: `smm/ojt/l4/test/paper?supervisor_id=${body?.supervisor_id}&staffId=${body?.staffId}`,
        config: { signal },
      };
      try {
        const cacheKey = JSON.stringify(params);
        setCacheKey(cacheKey);
        const response = await cachedFetch(cacheKey, () =>
          apiService.get(params.url, params.body, params.config)
        );
        setData(response);
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
    dataTestDetails: cachedData,
    loading,
    error,
    fetchTestPaper,
    removeCache,
    cancelRequest,
  };
};
export default useFetchTestPaper;
