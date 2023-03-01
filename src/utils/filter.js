const createFilter = (listPlanets, listOfFilter) => {
  if (listOfFilter.length > 0) {
    let listFilter;
    listOfFilter.forEach(({ comparison, column, number }) => {
      switch (comparison) {
      case 'maior que':
        listFilter = listPlanets
          .filter(
            (
              planets,
            ) => planets[column] > Number(number),
          );
        break;
      case 'menor que':
        listFilter = listPlanets
          .filter(
            (
              planets,
            ) => planets[column] < Number(number),
          );
        break;
      case 'igual a':
        listFilter = listPlanets
          .filter(
            (
              planets,
            ) => planets[column] === number,
          );
        break;
      default:
        break;
      }
    });
    return listFilter;
  }
};

export default createFilter;
