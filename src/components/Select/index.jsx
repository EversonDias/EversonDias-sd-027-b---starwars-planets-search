import React, { useContext } from 'react';
import context from '../../context';

function ComponentSelect() {
  const {
    handleDeleteAllFilter,
    handleDeleteFilter,
    handleSelect,
    handleFilter,
    state,
  } = useContext(context);
  const { listOfFilter, defaultListOfColumns } = state;
  return (
    <div>
      {defaultListOfColumns
      && (
        <select
          data-testid="column-filter"
          onChange={ handleSelect }
          name="column"
          defaultValue={ defaultListOfColumns[0] }
        >
          {defaultListOfColumns.map((column) => (
            <option key={ column } value={ column }>{column}</option>
          ))}
        </select>
      )}
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
      <button
        data-testid="button-remove-filters"
        type="button"
        onClick={ handleDeleteAllFilter }
      >
        Remover Todos Filtros
      </button>
      {listOfFilter && listOfFilter.map(({
        column,
        comparison,
        number,
        id,
      }) => (
        <div
          key={ id }
          data-testid="filter"
        >
          <span>{column + comparison + number }</span>
          <button
            id={ id }
            type="button"
            onClick={ handleDeleteFilter }
          >
            X
          </button>
        </div>
      ))}
    </div>
  );
}

export default ComponentSelect;
