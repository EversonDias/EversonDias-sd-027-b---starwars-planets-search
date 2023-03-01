import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import context from './index';
import { getPlanets, newRequest } from '../utils/getAPI';
import createFilter from '../utils/filter';

function Provider({ children }) {
  const [state, setState] = useState({
    search: '',
  });
  useEffect(() => {
    async function getListPlanets() {
      const planets = await getPlanets();
      setState({
        listPlanets: planets,
        oldList: planets,
        titleTable: Object.keys(planets[0]),
        listOfFilter: [],
        search: '',
        column: 'population',
        comparison: 'maior que',
        number: '0',
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
      column,
      comparison,
      number,
      listOfFilter,
      listPlanets,
    } = state;
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
      setState({
        ...state,
        listOfFilter: newListOfFilter,
        listPlanets: createFilter(listPlanets, newListOfFilter),
      });
    }
  };

  const handleDelete = ({ target: { id } }) => {
    const { listOfFilter, oldList } = state;
    const newListOfFilter = listOfFilter.filter((filter) => filter.id !== id);
    setState({
      ...state,
      listOfFilter: newListOfFilter,
      listPlanets: createFilter(oldList, newListOfFilter),
    });
  };

  const handleDeleteAllFilter = () => {
    const {
      oldList,
    } = state;
    setState({
      ...state,
      listOfFilter: [],
      listPlanets: oldList,
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
