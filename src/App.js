import React from 'react';
import Search from './components/Search';
import ComponentSelect from './components/Select';
import ComponentTable from './components/Table';
import Provider from './context/provider';
import './App.css';

function App() {
  return (
    <Provider>
      <Search />
      <ComponentSelect />
      <ComponentTable />
    </Provider>
  );
}

export default App;
