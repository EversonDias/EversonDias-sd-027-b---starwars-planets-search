import React from 'react';
import './App.css';
import Search from './components/Search';
import ComponentTable from './components/Table';
import Provider from './context/provider';

export default function App() {
  return (
    <Provider>
      <Search />
      <ComponentTable />
    </Provider>
  );
}
