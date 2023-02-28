import BreedImage from "@/components/BreedImage";
import Nav from "@/components/Nav";
import useBreeds from "@/hooks/useBreeds";
import type { NextPage } from "next";
import Head from "next/head";

const Home: NextPage = () => {
  const { breeds, isLoading, isError } = useBreeds();
  return (
    <div className="">
      <Head>
        <title>Dog-CEO Challenge</title>
        <link rel="icon" href="/favicon.png" />
      </Head>
      <Nav />
      <>
        {isLoading && <p>Loading...</p>}
        {isError && <p>Error</p>}
        {/* {!isLoading && !isError && <p> {JSON.stringify(breeds)}</p>} */}
        {!isLoading && !isError && (
          <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
            <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
              {Object.keys(breeds.message).map((breed, i) => (
                <>
                  <BreedImage
                    breed={breed}
                    subBreeds={breeds.message[breed]}
                    id={i}
                  />
                  {Object.values(breeds.message[breed]).map((sb) => (
                    <>
                      {(sb as string).length > 0 ? (
                        <>
                          <BreedImage
                            breed={breed}
                            subBreed={sb}
                            subBreeds={breeds.message[breed]}
                            id={i + 100}
                          />
                        </>
                      ) : null}
                    </>
                  ))}{" "}
                </>
              ))}
            </div>
          </div>
        )}
      </>
    </div>
  );
};

export default Home;
