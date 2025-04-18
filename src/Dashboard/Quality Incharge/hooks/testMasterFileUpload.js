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

const useTestMasterFileUpload = () => {
  const abortControllerRef = useRef(null);
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

  const fetchFileUpload = useCallback(
    async (body, qualityInchargeId = {}) => {
      setLoading(true);
      setError(null);
      abortControllerRef.current = new AbortController();
      const { signal } = abortControllerRef.current;

      try {
        const file = body.file;
        const base64File = await new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result.split(",")[1]);
          reader.onerror = (error) => reject(error);
          reader.readAsDataURL(file);
        });

        const params = {
          url: "smm/qc/testMasterFileUpload",
          config: {
            signal,
          },
          body: JSON.stringify({
            file: base64File,
            qualityInchargeId: qualityInchargeId,
          }),
        };

        const cacheKey = JSON.stringify(params);
        setCacheKey(cacheKey);

        const response = await cachedFetch(cacheKey, () =>
          apiService.post(params.url, params.body, params.config)
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
    datafileUpload: cachedData,
    loading,
    error,
    fetchFileUpload,
    removeCache,
    cancelRequest,
  };
};

export default useTestMasterFileUpload;
