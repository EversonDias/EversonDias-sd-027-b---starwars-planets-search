import React, { useEffect, useState } from 'react';
import {
  Table, TableCell, TableHead, TableRow,
} from '@mui/material';
import getPlanets from '../../utils/getAPI';

export default function ComponentTable() {
  const [listPlanets, setListPlanets] = useState([]);
  const [titleTable, setTitleTable] = useState([]);
  useEffect(() => {
    async function getListPlanets() {
      const planets = await getPlanets();
      const removedResidents = planets.map((planet) => {
        delete planet.residents;
        return planet;
      });
      setListPlanets(removedResidents);
      setTitleTable(Object.keys(removedResidents[0]));
    }
    getListPlanets();
  }, []);
  return (
    <div>
      {listPlanets.length > 0 && (
        <Table
          stickyHeader
          padding="normal"
          size="medium"
          sx={ { textAlign: 'center' } }
        >
          <TableHead>
            <TableRow>
              {titleTable.map((data) => (
                <TableCell
                  sx={
                    {
                      backgroundColor: 'rgb(18, 18, 18)',
                      color: 'white' }
                  }
                  key={ data }
                >
                  {data}

                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <tbody>
            {listPlanets.map((planet) => (
              <TableRow key={ planet.name }>
                {Object.values(planet).map((info) => (
                  <TableCell
                    sx={
                      {
                        backgroundColor: 'rgb(30, 30, 30)',
                        color: 'white' }
                    }
                    key={ info }
                  >
                    {info}

                  </TableCell>
                ))}
              </TableRow>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
}
