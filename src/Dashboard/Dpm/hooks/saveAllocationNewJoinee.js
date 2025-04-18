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

const useFetchSaveAllocationNewJoinee = () => {
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

  const fetchSaveAllocationNewJoineeData = useCallback(
    async (body) => {
      setLoading(true);
      setError(null);
      abortControllerRef.current = new AbortController();
      const { signal } = abortControllerRef.current;
      //REACT_APP_BASE_API_PATH= 'https://jsonplaceholder.typicode.com/' add this in .env to test
      const params = {
        url: `smm/dept/saveAllocationNewJoinee`,
        config: { signal },
        body,
      };
      try {
        const cacheKey = JSON.stringify(params);
        setCacheKey(cacheKey);
        const response = await cachedFetch(cacheKey, () =>
          apiService.post(params.url, params.body, params.config)
        );
        setData(response?.data?.response);
        return response;
      } catch (err) {
        console.log("err", err);
        setError(err);
        return err;
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
    dataGraph: cachedData,
    loading,
    error,
    fetchSaveAllocationNewJoineeData,
    removeCache,
    cancelRequest,
  };
};
export default useFetchSaveAllocationNewJoinee;
