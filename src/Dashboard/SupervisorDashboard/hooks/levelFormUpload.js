import { useCallback, useRef } from "react";
import { create } from "zustand";
import { getBearerToken } from "../../../../../services/Authorization/AuthorizationService";
import { baseClient } from "../../../Repository/BaseRepository";
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

const useLevelFormUpload = () => {
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

  const fetchLevelFromUpload = useCallback(
    async (body) => {
      const file = body.file;
      if (!(file instanceof Blob)) {
        throw new Error("The provided file is not a valid Blob.");
      }

      const base64File = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result.split(",")[1]);
        reader.onerror = (error) => reject(error);
        reader.readAsDataURL(file);
      });

      setLoading(true);
      setError(null);

      var path = `smm/ojt/level/form/upload`;
      const token = getBearerToken();
      let options = {
        headers: {
          Authorization: token,
          shopId: body?.shopId,
          groupName: body?.group,
          lineName: body?.line,
          areaName: body?.area,
          levelType: body?.levelType,
          "Content-Type": file?.type,
        },
      };

      const data = {
        file: base64File,
      };
      const response = await baseClient?.post(path, data, options);
      setData(response?.data);
      return response;
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
    dataLevelFormUpload: cachedData,
    loading,
    error,
    fetchLevelFromUpload,
    removeCache,
    cancelRequest,
  };
};
export default useLevelFormUpload;
