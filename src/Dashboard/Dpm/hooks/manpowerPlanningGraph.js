import { useCallback, useRef } from 'react';
import { create } from 'zustand';
import apiService from '../../../utils/apiService';
import { cacheStore } from '../../../utils/cacheService';

export const useDataStore = create((set) => ({
  data: null,
  loading: false,
  error: null,
  cacheKey: '',
  setCacheKey: (cacheKey) => set({ cacheKey }),
  removeCacheKey: () => set({ cacheKey: '' }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
  setData: (data) => set({ data }),
}));

const useManpowerPlanningGraph = () => {
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

  const fetchData = useCallback(
    async (body) => {
      setLoading(true);
      setError(null);
      abortControllerRef.current = new AbortController();
      const { signal } = abortControllerRef.current;
      //REACT_APP_BASE_API_PATH= 'https://jsonplaceholder.typicode.com/' add this in .env to test
      const params = {
        url: `smm/dept/manpowerPlanningGraph`,
        config: { signal },
        body,
      };
      try {
        const cacheKey = JSON.stringify(params);
        setCacheKey(cacheKey);
        const response = await apiService.post(
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
    dataGraph: cachedData,
    loading,
    error,
    fetchData,
    removeCache,
    cancelRequest,
  };
};
export default useManpowerPlanningGraph;
