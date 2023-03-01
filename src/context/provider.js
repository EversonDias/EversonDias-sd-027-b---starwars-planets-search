import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import context from './index';
import { getPlanets, newRequest } from '../utils/getAPI';
import createFilter from '../utils/filter';

function Provider({ children }) {
  const [state, setState] = useState({});
  useEffect(() => {
    async function getListPlanets() {
      const planets = await getPlanets();
      setState({
        listPlanets: planets,
        oldList: planets,
        titleTable: Object.keys(planets[0]),
        search: '',
        column: 'population',
        comparison: 'maior que',
        number: '0',
        listOfFilter: [],
      });
    }
    getListPlanets();
  }, []);

  const handleSearch = ({ target: { value } }) => {
    const { listPlanets, search, oldList } = state;
    const planets = newRequest(oldList, listPlanets, search, value);
    const listPlanetsFilter = planets
      .filter(
        ({ name }) => name
          .toLowerCase()
          .includes(
            value
              .toLowerCase(),
          ),
      );
    setState({
      ...state,
      listPlanets: listPlanetsFilter,
      search: value,
    });
  };

  const handleSelect = ({ target: { value, name } }) => {
    setState({
      ...state,
      [name]: value,
    });
  };

  const handleFilter = () => {
    const { column, comparison, number, listOfFilter, listPlanets } = state;
    const filter = {
      column,
      comparison,
      number,
    };
    const newListOfFilter = [...listOfFilter, filter];
    console.log(newListOfFilter);
    setState({
      ...state,
      listOfFilter: newListOfFilter,
      listPlanets: createFilter(listPlanets, newListOfFilter),
    });
  };

  return (
    <context.Provider value={ { state, handleSearch, handleSelect, handleFilter } }>
      {children}
    </context.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.arrayOf(PropTypes.shape({
    $$typeof: PropTypes.symbol,
  })).isRequired,
};

export default Provider;
