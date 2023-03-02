/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import context from './index';
import { getPlanets, newRequest } from '../utils/getAPI';
import { actionButtonFilter, createFilter } from '../utils/filter';

function Provider({ children }) {
  const [state, setState] = useState({});
  useEffect(() => {
    async function getListPlanets() {
      const planets = await getPlanets();
      const defaultListOfColumns = [
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
        search: '',
        comparison: 'maior que',
        number: '0',
        listOfFilter: [],
        defaultListOfColumns,
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
    setState({
      ...state,
      ...actionButtonFilter(state),
      column: undefined,
    });
  };

  const handleDeleteAllFilter = () => {
    const { oldList } = state;
    setState({
      ...state,
      listPlanets: oldList,
      listOfFilter: [],
    });
  };

  const handleDeleteFilter = ({ target: { id } }) => {
    const {
      listOfFilter,
      oldList,
    } = state;
    const newListOfFiler = listOfFilter.filter((filter) => filter.id !== id);
    setState({
      ...state,
      listOfFilter: newListOfFiler,
      listPlanets: createFilter(oldList, newListOfFiler),
    });
  };

  const values = useMemo(() => ({
    state,
    handleFilter,
    handleSelect,
    handleSearch,
    handleDeleteFilter,
    handleDeleteAllFilter,
  }), [
    state,
    handleFilter,
    handleSelect,
    handleSearch,
    handleDeleteFilter,
    handleDeleteAllFilter,
  ]);

  return (
    <context.Provider value={ values }>
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
