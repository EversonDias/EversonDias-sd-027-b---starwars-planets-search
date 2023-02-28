export const getPlanets = async () => {
  const dataApi = await fetch('https://swapi.dev/api/planets');
  const dataJson = await dataApi.json();
  const removedResidents = dataJson.results.map((planet) => {
    delete planet.residents;
    return planet;
  });
  return removedResidents;
};

export const newRequest = (ondList, listPlanets, search, value) => {
  if (search.length > value.length) {
    const planets = ondList;
    return planets;
  }
  return listPlanets;
};
