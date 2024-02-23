import useSWR from "swr";

export const useFiles = (type: string = "") => {
  const { data, error, isLoading, mutate } = useSWR(
    `/api/files?${new URLSearchParams({ type })}`,
    {
      refreshInterval: 0,
    }
  );

  return {
    data,
    error,
    isLoading,
    mutate,
  };
};
