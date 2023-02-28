import React, { useContext } from 'react';
import context from '../../context';

function ComponentSelect() {
  const { handleSelect, handleFilter } = useContext(context);
  return (
    <div>
      <select
        data-testid="column-filter"
        onChange={ handleSelect }
        name="column"
      >
        <option value="population" selected>population</option>
        <option value="orbital_period">orbital_period</option>
        <option value="diameter">diameter</option>
        <option value="rotation_period">rotation_period</option>
        <option value="surface_water">surface_water</option>
      </select>
      <select
        data-testid="comparison-filter"
        onChange={ handleSelect }
        name="comparison"
      >
        <option value="maior que" selected>maior que</option>
        <option value="menor que">menor que</option>
        <option value="igual a">igual a</option>
      </select>
      <input
        data-testid="value-filter"
        type="number"
        name="number"
        defaultValue="0"
        onChange={ handleSelect }
      />
      <button
        data-testid="button-filter"
        type="button"
        onClick={ handleFilter }
      >
        Filtra
      </button>
    </div>
  );
}

export default ComponentSelect;
