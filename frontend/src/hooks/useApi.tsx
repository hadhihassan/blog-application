import { useState } from 'react';

export const useApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const callApi = async (apiCall: () => Promise<any>) => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiCall();
      return response.data;
    } catch (err: any) {
      const message = err.response?.data?.message || 'Something went wrong';
      setError(message);
      throw new Error(message);
    } finally {
      setLoading(false);
    }
  };

  return { callApi, loading, error };
};