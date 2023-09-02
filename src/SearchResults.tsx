import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, TableContainer, TableHead, TableRow, TableCell, TableBody, Paper, CircularProgress } from '@mui/material'; 
import { SearchFormParams } from './SearchForm';

export interface SearchResult {
  id: number;
  vorname: string;
  nachname: string;
  geschlecht: string;
  anschriften: { ort: string }[];
  kommunikationsadressen: { email: string }[];
  bankverbindungen: { iban: string }[];
}
export interface Person {
  id: number;
  vorname: string;
  nachname: string;
  geschlecht: string;
  ort: string;
  email: string;
  iban: string;
  anschriften: { ort: string }[];
  kommunikationsadressen: { email: string }[];
  bankverbindungen: { iban: string }[];
}
const API_URL = 'http://localhost:8443/rest/intern/personen';
export const fetchData = (searchParams: SearchFormParams) => {
    return axios.get(API_URL, { params: searchParams });
  };
interface SearchResultsProps {
  searchParams: SearchFormParams;
}

export const SearchResults: React.FC<SearchResultsProps> = ({ searchParams }) => {
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<SearchResult[]>([]);
  
  


//   useEffect(() => {
//     setLoading(true);

//     fetchData(searchParams)
//     .then((response) => {
//       setResults(response.data);
//       setLoading(false);
//     })
//     .catch((error) => {
//       console.error('Error fetching data:', error);
//       setLoading(false);
//     });
// }, [searchParams]);

return (
  <div>
    <h2>Search Results</h2>
    {loading ? (
      <CircularProgress />
    ) : (
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              {/* ... Add more table headers based on your data */}
            </TableRow>
          </TableHead>
          <TableBody>
            {results.map((result) => (
              <TableRow key={result.id}>
                <TableCell>{result.id}</TableCell>
                <TableCell>{result.vorname}</TableCell>
                <TableCell>{result.nachname}</TableCell>
                <TableCell>{result.kommunikationsadressen[0]?.email || 'N/A'}</TableCell>
                <TableCell>{result.bankverbindungen[0]?.iban || 'N/A'}</TableCell>
                <TableCell>{result.anschriften[0]?.ort || 'N/A'}</TableCell>
                {/* ... Add more table cells based on your data */}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    )}
  </div>
);
};
export default SearchResult;
