import useSWR from "swr";

export const useAgents = () => {
  const { data, error, isLoading, mutate } = useSWR(`/api/agents`, {
    refreshInterval: 0,
  });

  return {
    data,
    error,
    isLoading,
    mutate,
  };
};
