import { fetcher } from "@/lib/util";
import useSWR from "swr";

const useBreedImage = (breed: string, subBreed: string | null) => {
  const { data, error, isLoading } = useSWR(
    `https://dog.ceo/api/breed/${breed}${
      subBreed ? `/${subBreed}` : ""
    }/images/random`,
    fetcher,
    { refreshInterval: 600000 }
  );

  return {
    breedImage: data,
    isLoading,
    isError: error,
  };
};

export default useBreedImage;
