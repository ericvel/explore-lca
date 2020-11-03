import React, { useEffect, useState, ReactText } from 'react';
//import './App.css';
import TableSelect from '../TableSelect'
import DataTable from '../DataTable';
import BuildingElementPane from '../BuildingElementPane';
import CloseIcon from '@material-ui/icons/Close';

function App() {
  const [tableName, setTableName] = useState('buildings');
  const [selectedRowId, setSelectedRowId] = useState<number>();

  function handleTableChange(tableName: string) {
    setTableName(tableName);
  }

  function handleSelectRow(rowId: number) {
    setSelectedRowId(rowId);
  }

  return (
    <div className="container mt-4">
      <div className="row mb-5">
        <div className="col">
          <h1>LCA Tool - GUI</h1>
        </div>
        <BuildingElementPane selectedRowId={selectedRowId} />
      </div>
      <div className="row">
        <div className="col">
          <TableSelect tableName={tableName} onChange={handleTableChange} />
          <p>Click on a row to see the building elements related to it.</p>
        </div>
        <div className="col-10">
          <DataTable tableName={tableName} onSelectRow={handleSelectRow} />
        </div>
      </div>
    </div>
  );
}

export default App;