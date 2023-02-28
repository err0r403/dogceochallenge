const filterBreeds = (jsonObj: any, searchText: string) => {
  const breeds = jsonObj;

  const filteredBreeds = {};

  for (const breed in breeds) {
    if (breed.toLowerCase().includes(searchText.toLowerCase())) {
      filteredBreeds[breed] = breeds[breed];
    } else {
      const subBreeds = breeds[breed];

      const filteredSubBreeds = [];

      for (let i = 0; i < subBreeds.length; i++) {
        if (subBreeds[i].toLowerCase().includes(searchText.toLowerCase())) {
          filteredSubBreeds.push(subBreeds[i]);
        }
      }

      if (filteredSubBreeds.length > 0) {
        filteredBreeds[breed] = filteredSubBreeds;
      }
    }
  }
  const filteredJsonObj = {
    message: filteredBreeds,
    status: jsonObj.status,
  };
  console.log(filteredBreeds);
  return filteredBreeds;
};

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export { fetcher, filterBreeds };
