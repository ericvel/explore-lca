import React, { useEffect } from 'react';
//import './App.css';
import TableSelect from '../TableSelect'
import DataTable from '../DataTable';

function App() {
  const [tableName, setTableName] = React.useState('buildings');

  function handleTableChange(tableName: string) {
    setTableName(tableName);
  }

  return (
    <div className="container mt-4">
      <div className="row mb-5">
        <div className="col">
          <h1>LCA Tool - GUI</h1>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <TableSelect tableName={tableName} onChange={handleTableChange} />
          <p>Click on a row to see the building elements related to it.</p>
        </div>
        <div className="col-10">
          <DataTable tableName={tableName} />
        </div>
      </div>
    </div>
  );
}

export default App;