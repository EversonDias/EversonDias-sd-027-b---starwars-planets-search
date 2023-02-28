import React, { useContext } from 'react';
import {
  Table, TableCell, TableHead, TableRow,
} from '@mui/material';
import context from '../../context';

export default function ComponentTable() {
  const { state: { titleTable, listPlanets } } = useContext(context);
  return (
    <div>
      {listPlanets && (
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
