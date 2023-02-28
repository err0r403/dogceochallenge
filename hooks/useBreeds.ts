import { fetcher } from "@/lib/util";
import useSWR from "swr";

const useBreeds = () => {
  const { data, error, isLoading } = useSWR(
    `https://dog.ceo/api/breeds/list/all`,
    fetcher,
    { refreshInterval: 600000 }
  );

  return {
    breeds: data,
    isLoading,
    isError: error,
  };
};

export default useBreeds;
