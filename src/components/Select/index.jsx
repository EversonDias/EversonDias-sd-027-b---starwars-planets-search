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
  const { listOfFilter, listColumnFilter } = state;
  return (
    <div>
      { listColumnFilter
        && (
          <select
            data-testid="column-filter"
            onClick={ handleSelect }
            name="column"
            defaultValue={ listColumnFilter[0] }
            value={ listColumnFilter[0] }
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
      {listOfFilter && listOfFilter.map((data) => {
        const {
          column,
          comparison,
          number,
          id,
        } = data;
        console.log(number);
        return (
          <div key={ id }>
            <span key={ id }>
              {
                `${column} ${comparison} ${number} `
              }
            </span>
            <button
              data-testid="filter"
              key={ id }
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
