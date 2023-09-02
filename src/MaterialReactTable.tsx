import { MRT_ColumnDef } from "material-react-table";
import React from "react";
import { Key, ReactElement, JSXElementConstructor, ReactNode, ReactPortal, useMemo } from "react";
import { Person } from "./SearchResults";

// Define the MaterialReactTable component
function MaterialReactTablesss({ data }: { data: Person[] }) {
    const columns = useMemo<MRT_ColumnDef<Person>[]>(
        () => [
        {
            accessorKey: 'nachname',
            header: 'Nachname',
        },
        {
            accessorKey: 'vorname',
            header: 'Vorname',
        },
        {
            accessorKey: 'email',
            header: 'Email',
        },
        {
            accessorKey: 'ort',
            header: 'Ort',
        },
        {
            accessorKey: 'iban',
            header: 'IBAN',
        },
    ],
    []
  );

    console.log('Received columns:', columns);
    console.log('Received data:', data);

   function MaterialReactList({ data }: { data: Person[] }) {
        return (
          <ul>
            {data.map((person) => (
              <li key={person.id}>
                {/* Render the person's information */}
                <div>Name: {person.nachname}</div>
                <div>Vorname: {person.vorname}</div>
                <div>Email: {person.email}</div>
                <div>Ort: {person.ort}</div>
                <div>IBAN: {person.iban}</div>
              </li>
            ))}
          </ul>
        );
      }
    }
//     // ... rest of the component code
//     // For example, you might return a table using the columns and data
//     return (
//         <table>
//             <thead>
//             <tr>
//                     {columns.map((column) => (
//                         <th key={column.accessorKey}>{column.header}</th>
//                     ))}
//                 </tr>
//             </thead>
//             <tbody>
//                 {data.map((person) => (
//                     <tr key={person.id}>
//                         <td>{person.nachname}</td>
//                         <td>{person.vorname}</td>
//                         <td>{person.email}</td>
//                         <td>{person.ort}</td>
//                         <td>{person.iban}</td>
//                     </tr>
//                 ))}
//             </tbody>
//         </table>
//     );
// }
  
export default MaterialReactTablesss;
  // Don't forget to export the component
  