import BreedImage from "@/components/BreedImage";
import Nav from "@/components/Nav";
import useBreeds from "@/hooks/useBreeds";
import { filterBreeds } from "@/lib/util";
import MagnifyingGlassIcon from "@heroicons/react/20/solid/MagnifyingGlassIcon";
import type { NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";

const Home: NextPage = () => {
  const { breeds, isLoading, isError } = useBreeds();
  const [searchText, setSearchText] = useState("");
  const [showBread, setShowBread] = useState(true);
  const [showSubBread, setShowSubBread] = useState(true);
  const [filteredBreeds, setFilteredBreeds] = useState(breeds?.message || {});

  useEffect(() => {
    setFilteredBreeds(breeds?.message);
  }, [breeds]);

  const handleSearchChange = (event) => {
    console.log(event.target.value, filteredBreeds);
    setSearchText(event.target.value);
    setFilteredBreeds(filterBreeds(breeds?.message, event.target.value));
  };

  return (
    <div className="">
      <Head>
        <title>Dog-CEO Challenge</title>
        <link rel="icon" href="/favicon.png" />
      </Head>
      <Nav>
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <MagnifyingGlassIcon
              className="h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
          </div>
          <input
            id="search"
            name="search"
            className="block w-full rounded-md border border-gray-300 bg-white py-2 pl-10 pr-3 leading-5 placeholder-gray-500 focus:border-indigo-500 focus:placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
            type="search"
            placeholder="Search for a breed"
            value={searchText}
            onChange={handleSearchChange}
          />
        </div>
      </Nav>
      <>
        {isLoading && <p>Loading...</p>}
        {isError && <p>Error</p>}
        {/* {!isLoading && !isError && <p> {JSON.stringify(breeds)}</p>} */}
        {!isLoading && !isError && (
          <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
            <>
              <fieldset className="space-y-5 mb-5">
                <legend className="sr-only">Filters</legend>
                <div className="relative flex items-start">
                  <div className="flex h-5 items-center">
                    <input
                      id="breeds"
                      defaultChecked={showBread}
                      onChange={() => setShowBread(!showBread)}
                      aria-describedby="breeds-description"
                      name="breeds"
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label
                      htmlFor="breeds"
                      className="font-medium text-gray-700"
                    >
                      Breeds
                    </label>
                  </div>
                </div>
                <div className="relative flex items-start">
                  <div className="flex h-5 items-center">
                    <input
                      id="subbreeds"
                      defaultChecked={showSubBread}
                      onChange={() => setShowSubBread(!showSubBread)}
                      aria-describedby="subbreeds-description"
                      name="subbreeds"
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label
                      htmlFor="subbreeds"
                      className="font-medium text-gray-700"
                    >
                      Sub Breeds
                    </label>
                  </div>
                </div>
              </fieldset>
            </>
            <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
              {filteredBreeds &&
                Object.keys(filteredBreeds).map((breed) => (
                  <>
                    {showBread && <BreedImage breed={breed} id={breed} />}
                    {Object.values(filteredBreeds[breed]).map((subBreed) => (
                      <>
                        {(subBreed as string).length > 0 ? (
                          <>
                            {showSubBread && (
                              <BreedImage
                                breed={breed}
                                subBreed={subBreed}
                                subBreeds={filteredBreeds[breed]}
                                id={subBreed}
                              />
                            )}
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
