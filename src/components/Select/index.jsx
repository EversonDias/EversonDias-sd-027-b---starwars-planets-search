import React, { useContext } from 'react';
import context from '../../context';

function ComponentSelect() {
  const {
    handleDeleteAllFilter,
    handleDelete,
    handleSelect,
    handleFilter,
    state,
  } = useContext(context);
  const { listOfFilter } = state;
  const listColumnFilter = [
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ];
  return (
    <div>
      { listColumnFilter
        && (
          <select
            data-testid="column-filter"
            onClick={ handleSelect }
            name="column"
            defaultValue={ listColumnFilter[0] }
          >
            {listColumnFilter.map((filter) => (
              <option key={ filter } value={ filter }>{filter}</option>
            ))}
          </select>
        )}
      <select
        data-testid="comparison-filter"
        onClick={ handleSelect }
        name="comparison"
      >
        <option value="maior que">maior que</option>
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
      {listOfFilter && listOfFilter.map((data) => {
        const {
          column,
          comparison,
          number,
          id,
        } = data;
        return (
          <div key={ id } data-testid="filter">
            <span>
              {
                `${column} ${comparison} ${number} `
              }
            </span>
            <button
              id={ id }
              onClick={ handleDelete }
            >
              delete
            </button>
          </div>
        );
      })}
      <button
        data-testid="button-remove-filters"
        onClick={ handleDeleteAllFilter }
      >
        Deletar Todos Filtros
      </button>
    </div>
  );
}

export default ComponentSelect;
