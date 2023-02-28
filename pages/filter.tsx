import BreedsFilter from "@/components/BreedsFilter";
import { useEffect, useState } from "react";

const DogBreeds = () => {
  const [breeds, setBreeds] = useState({});

  useEffect(() => {
    const fetchBreeds = async () => {
      const response = await fetch("https://dog.ceo/api/breeds/list/all");
      const json = await response.json();
      setBreeds(json.message);
    };

    fetchBreeds();
  }, []);

  return (
    <div>
      <h1>Dog Breeds</h1>
      {Object.keys(breeds).length === 0 ? (
        <p>Loading...</p>
      ) : (
        <BreedsFilter initialBreeds={breeds} />
      )}
    </div>
  );
};

export default DogBreeds;
