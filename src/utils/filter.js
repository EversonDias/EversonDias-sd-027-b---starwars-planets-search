export const createFilter = (listPlanets, listOfFilter) => {
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
  return listPlanets;
};

export const actionButtonFilter = (state) => {
  const {
    defaultListOfColumns,
    column = defaultListOfColumns[0],
    comparison,
    number,
    listOfFilter,
    listPlanets,
  } = state;
  const id = column + comparison + number;
  const filter = {
    id,
    column,
    comparison,
    number,
  };
  const newListOfFilter = [...listOfFilter, filter];
  return {
    listOfFilter: newListOfFilter,
    listPlanets: createFilter(listPlanets, newListOfFilter),
    defaultListOfColumns: defaultListOfColumns.filter((data) => data !== column),
  };
};
