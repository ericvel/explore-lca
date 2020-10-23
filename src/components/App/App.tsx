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
    <div className="container">
      <h1>
        LCA Tool - GUI
      </h1>
      <br/>
      <TableSelect tableName={tableName} onChange={handleTableChange} />
      <br/>
      <DataTable tableName={tableName} />
    </div>
  );
}

export default App;