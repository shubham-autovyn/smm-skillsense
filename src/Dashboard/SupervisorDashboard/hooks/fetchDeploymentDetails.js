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

const useDeploymentDetails = () => {
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

  const fetchDeploymentDetails = useCallback(
    async (body) => {
      setLoading(true);
      setError(null);
      abortControllerRef.current = new AbortController();
      const { signal } = abortControllerRef.current;
      const params = {
        url: `smm/fetch/deployment?${body}`,
        config: { signal },
        body,
      };
      try {
        // const cacheKey = JSON.stringify(params);
        // setCacheKey(cacheKey);
        // const response = await cachedFetch(cacheKey, () =>
        const response = await apiService.get(
          params.url,
          params.body,
          params.config
        );
        // );
        setData(response?.data);
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
    dataDeploymentDetails: cachedData,
    loading,
    error,
    fetchDeploymentDetails,
    removeCache,
    cancelRequest,
  };
};
export default useDeploymentDetails;
