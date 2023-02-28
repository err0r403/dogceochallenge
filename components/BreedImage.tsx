import useBreedImage from "@/hooks/useBreedImage";
import Image from "next/image";

const BreedImage = ({
  breed,
  id,
  subBreed,
  subBreeds,
}: {
  breed: string;
  id: string;
  subBreed: string | null;
  subBreeds: string[] | null;
}) => {
  const { breedImage, isLoading, isError } = useBreedImage(breed, subBreed);

  if (isLoading) return <>Loading...</>;
  if (isError) return <>Error...</>;
  return (
    <>
      <a key={id} href={"#"} className="group">
        <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-w-7 xl:aspect-h-8">
          <Image
            src={breedImage.message}
            width="0"
            height="0"
            sizes="33vw"
            priority
            alt="Breed Alt"
            className="h-full w-full object-cover object-center group-hover:opacity-75"
          />
        </div>
        <h3 className="mt-4 text-lg text-gray-700">
          {breed}
          {subBreed ? ` - ${subBreed}` : ""}
        </h3>
      </a>
    </>
  );
};

export default BreedImage;
