const getPlanets = async () => {
  const dataApi = await fetch('https://swapi.dev/api/planets');
  const dataJson = await dataApi.json();
  return dataJson.results;
};

export default getPlanets;
