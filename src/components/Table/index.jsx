import React, { useContext } from 'react';
import context from '../../context';

function ComponentTable() {
  const { state: { titleTable, listPlanets } } = useContext(context);
  return (
    <div>
      {listPlanets && (
        <table className="table table-striped-columns">
          <thead>
            <tr>
              {titleTable.map((data) => (
                <th
                  key={ data }
                  className="w-25"
                >
                  {data}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {listPlanets.map((planet) => (
              <tr key={ planet.name }>
                {Object.values(planet).map((info) => (
                  <td
                    key={ info }
                    className="text-truncate columm"
                  >
                    {info}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ComponentTable;
