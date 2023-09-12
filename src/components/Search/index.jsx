import React, { useContext } from 'react';
import context from '../../context';

function Search() {
  const { state: { search }, handleSearch } = useContext(context);
  return (
    <div style={ { textAlign: 'center' } }>
      <p className="fs-1">Projeto Star Wars -  Trybe</p>
      <input
        type="text"
        data-testid="name-filter"
        color="error"
        value={ search }
        onChange={ handleSearch }
      />
    </div>
  );
}

export default Search;
