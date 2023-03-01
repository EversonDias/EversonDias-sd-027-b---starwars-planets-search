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
      const listColumnFilter = [
        'population',
        'orbital_period',
        'diameter',
        'rotation_period',
        'surface_water',
      ];
      setState({
        listPlanets: planets,
        oldList: planets,
        titleTable: Object.keys(planets[0]),
        listOfFilter: [],
        listColumnFilter,
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
    const {
      listOfFilter,
      listPlanets,
      listColumnFilter,
    } = state;
    const {
      column = listColumnFilter[0],
      comparison = 'maior que',
      number = '0',
    } = state;
    console.log(comparison);
    const id = column + comparison + number;
    const verifyFilter = listOfFilter.map((data) => data.id === id);
    const isTrue = verifyFilter.includes(true);
    if (!isTrue) {
      const filter = {
        id,
        column,
        comparison,
        number,
      };
      const newListOfFilter = [...listOfFilter, filter];
      const newListColumnFilter = listColumnFilter.filter((data) => data !== column);
      setState({
        ...state,
        listOfFilter: newListOfFilter,
        listPlanets: createFilter(listPlanets, newListOfFilter),
        listColumnFilter: newListColumnFilter,
      });
    }
  };

  const handleDelete = ({ target: { id } }) => {
    const { listOfFilter, listColumnFilter } = state;
    const newListOfFilter = listOfFilter.filter((filter) => filter.id !== id);
    let newListColumnFilter;
    listOfFilter.forEach((filter) => {
      if (filter.id === id) {
        newListColumnFilter = filter.column;
      }
    });
    console.log(newListColumnFilter);
    setState({
      ...state,
      listOfFilter: newListOfFilter,
      listColumnFilter: [...listColumnFilter, newListColumnFilter],
    });
  };

  const handleDeleteAllFilter = () => {
    const listColumnFilter = [
      'population',
      'orbital_period',
      'diameter',
      'rotation_period',
      'surface_water',
    ];
    setState({
      ...state,
      listOfFilter: [],
      listColumnFilter,
    });
  };

  return (
    <context.Provider
      value={ {
        state,
        handleSearch,
        handleSelect,
        handleFilter,
        handleDelete,
        handleDeleteAllFilter,
      } }
    >
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
