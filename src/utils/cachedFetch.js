// cachedFetch.ts
import { cacheStore } from "./cacheService";

const cachedFetch = async (key, fetchFunction) => {
  const { get, set } = cacheStore.getState();

  if (!key) return undefined; // Return early if key is null or undefined

  // Check for cached data
  const cachedData = get(key);

  if (cachedData) {
    return cachedData; // Return cached data if available
  }

  // Fetch new data, cache it, and return
  try {
    const response = await fetchFunction(); // Call the fetch function
    set(key, response); // Cache the response

    return response; // Return the fetched data
  } catch (error) {
    // Handle Axios error specifically
    if (error.response) {
      // Extract and return the error response
      return {
        data: {
          error: true,
          responseCode: error?.response?.status,
          message:
            error?.response?.data?.message ||
            error?.response?.data ||
            "An error occurred",
        },
      };
    }

    // Return a generic error if there's no response
    return {
      data: {
        error: true,
        responseCode: 500,
        message: error.message || "An unknown error occurred",
      },
    };
  }
};

export default cachedFetch;
