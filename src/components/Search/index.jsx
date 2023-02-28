import { TextField } from '@mui/material';
import React, { useContext } from 'react';
import context from '../../context';

export default function Search() {
  const { state: { search }, handleSearch } = useContext(context);
  return (
    <div style={ { textAlign: 'center' } }>
      <p>Projeto Star Wars -  Trybe</p>
      <TextField
        data-testid="name-filter"
        label="Planet"
        variant="outlined"
        color="error"
        value={ search }
        onChange={ handleSearch }
      />
    </div>
  );
}
