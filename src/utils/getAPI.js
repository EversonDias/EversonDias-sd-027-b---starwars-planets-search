const getPlanets = async () => {
  const dataApi = await fetch('https://swapi.dev/api/planets');
  const dataJson = await dataApi.json();
  const removedResidents = dataJson.results.map((planet) => {
    delete planet.residents;
    return planet;
  });
  return removedResidents;
};

const newRequest = (oldList, listPlanets, search, value) => {
  if (search.length > value.length) {
    const planets = oldList;
    return planets;
  }
  return listPlanets;
};

export { getPlanets, newRequest };
