import React from 'react';
import { CircularProgress, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { Person } from './SearchResults';
import { MaterialReactTable, type MRT_ColumnDef } from 'material-react-table';
import { useLocation } from 'react-router-dom';

// interface ResultsDisplayProps {
//   transformedResults: Person[];
//   loading: boolean;
//   searchParamsProp: {
//     nachname: string;
//     vorname: string;
//     iban: string;
//     email: string;
//     ort: string;
//   };
// }

// const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ transformedResults, loading, searchParamsProp }) => {
//   const matchingResults = transformedResults.filter(result => {
//     const { nachname, vorname, iban, email, ort } = searchParamsProp;

//     return (
//       (!nachname || result.nachname.toLowerCase().includes(nachname.toLowerCase())) &&
//       (!vorname || result.vorname.toLowerCase().includes(vorname.toLowerCase())) &&
//       (!iban || result.iban.includes(iban)) &&
//       (!email || result.email.toLowerCase().includes(email.toLowerCase())) &&
//       (!ort || result.ort.toLowerCase().includes(ort.toLowerCase()))
//     );
//   });

const ResultsDisplay: React.FC = () => {
  const location = useLocation();
  const transformedResults: Person[] = location.state?.transformedResults || [];

  if (transformedResults.length === 0) {
    return <p>No matching results found.</p>;
  }
console.log('transformedResults from REsult',transformedResults);

return (
  <TableContainer component={Paper}>
  {transformedResults.length > 0 && (
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Vorname</TableCell>
            <TableCell>Nachname</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Ort</TableCell>
            <TableCell>IBAN</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {transformedResults.map((result: Person, index: number) => (
            <TableRow key={index}>
              <TableCell>{result.vorname}</TableCell>
              <TableCell>{result.nachname}</TableCell>
              <TableCell>{result.email}</TableCell>
              <TableCell>{result.ort}</TableCell>
              <TableCell>{result.iban}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
  )}
    </TableContainer>
);
};

export default ResultsDisplay;







