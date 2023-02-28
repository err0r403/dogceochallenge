import { filterBreeds } from "@/lib/util";
import { useState } from "react";

const BreedsFilter = ({ initialBreeds }) => {
  const [searchText, setSearchText] = useState("");
  const [filteredBreeds, setFilteredBreeds] = useState(initialBreeds);

  const handleSearchChange = (event) => {
    console.log(event.target.value, filteredBreeds);
    setSearchText(event.target.value);
    setFilteredBreeds(filterBreeds(initialBreeds, event.target.value));
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search for a breed"
        value={searchText}
        onChange={handleSearchChange}
      />
      <ul>
        {Object.keys(filteredBreeds).map((breed) => (
          <li key={breed}>
            {breed}
            {Object.values(filteredBreeds[breed])?.length > 0 && (
              <ul>
                {Object.values(filteredBreeds[breed]).map((subBreed) => (
                  <li key={`${breed}-${subBreed}`}>
                    {breed} - {subBreed}
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BreedsFilter;
