import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import context from './index';
import { getPlanets, newRequest } from '../utils/getAPI';

function Provider({ children }) {
  const [state, setState] = useState({
    listPlanets: [],
    ondList: [],
    titleTable: [],
    search: '',
  });
  useEffect(() => {
    async function getListPlanets() {
      const planets = await getPlanets();
      setState({
        listPlanets: planets,
        ondList: planets,
        titleTable: Object.keys(planets[0]),
        search: '',
      });
    }
    getListPlanets();
  }, []);

  const handleSearch = async ({ target: { value } }) => {
    const { listPlanets, search, ondList } = state;
    const planets = await newRequest(ondList, listPlanets, search, value);
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

  return (
    <context.Provider value={ { state, handleSearch } }>
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
