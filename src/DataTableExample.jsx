import React, { useState } from 'react';
import DataTable from 'react-data-table-component';

const initialData = [
  { id: 1, name: 'Ana', surname: 'Smith', phone: '1234567890' },
  { id: 2, name: 'John', surname: 'Doe', phone: '9876543210' },
  { id: 3, name: 'Maria', surname: 'Johnson', phone: '5555555555' },
];

function DataTableExample() {
  const [data, setData] = useState(initialData);

  const handleEdit = (row) => {
    alert(`Edit row with id: ${row.id}`);
  };

  const handleDelete = (row) => {
    if (window.confirm(`Are you sure you want to delete ${row.name} ${row.surname}?`)) {
      setData(data.filter(item => item.id !== row.id));
    }
  };

  const columns = [
    { name: 'ID', selector: row => row.id, sortable: true },
    { name: 'Name', selector: row => row.name, sortable: true },
    { name: 'Surname', selector: row => row.surname, sortable: true },
    { name: 'Phone', selector: row => row.phone, sortable: true },
    {
      name: 'Actions',
      cell: row => (
        <>
          <button className="text-btn" onClick={() => handleEdit(row)}>Edit</button>{' '}
          <button className="text-btn" onClick={() => handleDelete(row)}>Delete</button>
        </>
      )
    }
  ];

  return (
    <div className="container mt-4">
      {/* Inline CSS injected in the component */}
      <style>{`
        .text-btn {
          background: none;
          border: none;
          color: inherit;
          cursor: pointer;
          padding: 4px 8px;
          transition: background-color 0.2s ease;
        }
        .text-btn:active {
          background-color: #e0e0e0;
          border-radius: 4px;
        }
      `}</style>

      <h2>User Data Table</h2>
      <DataTable
        columns={columns}
        data={data}
        pagination
        highlightOnHover
        striped
      />
    </div>
  );
}

export default DataTableExample;
