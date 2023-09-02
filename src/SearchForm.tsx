
//  src/SearchForm.tsx
import React, { useState } from 'react';
import { TextField, Button, Grid, Snackbar, Alert, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, CircularProgress } from '@mui/material';
import axios from 'axios';
import { Person } from './SearchResults';


export interface SearchFormParams {
  nachname: string;
  vorname: string;
  iban: string;
  email: string;
  ort: string;
}   

interface SearchFormProps {
  onSearch: (searchParams: SearchFormParams) => Promise<void>;
  onSearchComplete: () => void; 
  onError: (errMsg: any) => void;
}

const API_URL = 'http://localhost:8443/rest/intern'; //  backend API base URL


const SearchForm: React.FC<SearchFormProps> = ({ onSearch, onSearchComplete, onError }) => {
  const [showSearchForm, setShowSearchForm] = useState(true);

  const [loading, setLoading] = useState(false);
  const [searchParams, setSearchParams] = useState<SearchFormParams>({
    nachname: '',
    vorname: '',
    iban: '',
    email: '',
    ort: '',
  });

  const [error, setError] = useState('');
  const [transformedResults, setTransformedResults] = useState<Person[]>([]);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    if (name === 'ort' && value) {
      if (!searchParams.nachname && !searchParams.vorname) {
        setSnackbarMessage('When searching by city, either Nachname or Vorname must also be filled.');
        setSnackbarOpen(true);
        return;
      }
    }

    // Update the searchParams with the new value
    setSearchParams((prevParams) => ({
      ...prevParams,
      [name]: value,
    }));
  };
   
    const handleSubmit = async () => {
      const { nachname, vorname, iban, email, ort } = searchParams;
  
      if (!nachname && !vorname && !iban && !email && !ort) {
        onError('At least one field must be filled.');
        return;
      }
      setLoading(true);
      setError('');
      setSnackbarOpen(false);

    try {
      const response = await axios.get(`${API_URL}/personen`, { params: searchParams });
      // Transform response data as needed
      const transformedResults = response.data.map((result: Person) => ({
        vorname: result.vorname,
        nachname: result.nachname,
        geschlecht: result.geschlecht,
        ort: result.anschriften[0]?.ort || 'N/A',
        email: result.kommunikationsadressen[0]?.email || 'N/A',
        iban: result.bankverbindungen[0]?.iban || 'N/A',
      })).filter(((result: Person) => 
        (!nachname || result.nachname.toLowerCase().includes(nachname.toLowerCase())) &&
        (!vorname || result.vorname.toLowerCase().includes(vorname.toLowerCase())) &&
        (!iban || result.iban.includes(iban)) &&
        (!email || result.email.toLowerCase().includes(email.toLowerCase())) &&
        (!ort || result.ort.toLowerCase().includes(ort.toLowerCase()))
      ));

      setTransformedResults(transformedResults); 
      setLoading(false); 
      
       // Clear input fields
      setSearchParams({
        nachname: '',
        vorname: '',
        iban: '',
        email: '',
        ort: '',
      });
       // Hide the search form and show the "New Search" button
      setShowSearchForm(false);

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred during the search.';
      setError(errorMessage);
      setLoading(false);
      setSnackbarOpen(true);
    }
  };

  const handleNewSearch = () => {
    // Reset the transformedResults state to clear the previous results
    setTransformedResults([]);
    // Show the search form
    setShowSearchForm(true);
  };
  console.log('transformedResults from searchForm', transformedResults);
  return (
    <div>
    {showSearchForm ? (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Nachname"
            name="nachname"
            value={searchParams.nachname}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Vorname"
            name="vorname"
            value={searchParams.vorname}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="IBAN"
            name="iban"
            value={searchParams.iban}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="E-Mail"
            name="email"
            value={searchParams.email}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Ort"
            name="ort"
            value={searchParams.ort}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12}>
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '30px' }}>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Search
          </Button>
          </div>
          <Snackbar
            open={snackbarOpen}
            autoHideDuration={5000}
            onClose={() => setSnackbarOpen(false)}
            message={snackbarMessage}
          />
        </Grid>
      </Grid>
      {error && <Alert severity="error">{error}</Alert>}
      </form>
    ) : (
      <div>
        {transformedResults.length > 0 ? (
         <>
         <h2 style={{ margin: '40px 0' }}> RESULTS : </h2>
    
      {loading ? (
      <CircularProgress />
       ) : (
      <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Vorname</TableCell>
            <TableCell>Nachname</TableCell>
            <TableCell>Geschlecht</TableCell>
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
              <TableCell>{result.geschlecht}</TableCell>
              <TableCell>{result.email}</TableCell>
              <TableCell>{result.ort}</TableCell>
              <TableCell>{result.iban.replace(/(.{4})/g, '$1-')}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    )}
    </>
    ) : (
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <p>No matching results found.</p>
          </div>
    )}

<div style={{ display: 'flex', justifyContent: 'center', marginTop: '30px' }}>
  <Button variant="contained" color="primary" onClick={handleNewSearch}>
    New Search
  </Button>
</div>
     </div>
  )}
  </div>
  );
};

export default SearchForm;


