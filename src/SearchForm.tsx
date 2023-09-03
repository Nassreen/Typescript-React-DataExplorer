
//  src/SearchForm.tsx
import React, { useState } from 'react';
import { TextField, Button, Grid, Stack, Alert, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, CircularProgress } from '@mui/material';
import axios from 'axios';
import { Person, SearchFormParams } from './Shared';


interface SearchFormProps {
  // onSearch: (searchParams: SearchFormParams) => Promise<void>;
  // onSearchComplete: () => void; 
  // onError: (errMsg: any) => void;
}

const API_URL = 'http://localhost:8443/rest/intern'; //  backend API base URL


const SearchForm: React.FC<SearchFormProps> = () => {
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
 

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    if (name === 'ort' && value) {
      if (!searchParams.nachname && !searchParams.vorname) {
        setError('Entweder der Nachname oder der Vorname muss auch bei der Suche nach der Stadt eingegeben werden.');
        return;
      } else {
        setError('');
      }
    } else {
      // Clear the error message for other fields when they are clicked
      setError('');
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
        setError('Mindestens ein Feld muss ausgefüllt werden.');
        return;
      }
  
      setLoading(true);
      setError('');

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
    }
  };

  const handleNewSearch = () => {
    // Reset the transformedResults state to clear the previous results
    setTransformedResults([]);
    // Show the search form
    setShowSearchForm(true);
  };
  
  return (
    <div>
    {loading ? (
        <CircularProgress />
      ) : (
     showSearchForm ? (
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
        </Grid>
      </Grid>
      {error && <Alert severity="error">{error}</Alert>}
      </form>
    ) : (
      <div>
        {transformedResults.length > 0 ? (
         <>
         <h2 style={{ margin: '40px 0', color: 'darkblue' }}> RESULTS : </h2>

      <TableContainer
       component={Paper}
       sx={{
        boxShadow: '5px 5px 14px 8px #DAE2FF', // Add a box shadow to the table container
      }}
    >
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{backgroundColor: '#D7E4FF',fontWeight: 'bold', }}>
              Vorname
              </TableCell>
              <TableCell sx={{backgroundColor: '#EAE4FF',fontWeight: 'bold', }}>
              Nachname
              </TableCell>
              <TableCell sx={{backgroundColor: '#E7EDFF',fontWeight: 'bold', }}>
              Geschlecht
            </TableCell>
            <TableCell sx={{backgroundColor: '#FBFCFF',fontWeight: 'bold', }}>
              Email
            </TableCell>
            <TableCell sx={{backgroundColor: '5px 5px 15px 5px #D7E4FF',fontWeight: 'bold', }}>
              Ort
            </TableCell>
            <TableCell sx={{backgroundColor: '5px 5px 15px 5px #D7E4FF',fontWeight: 'bold', }}>
            IBAN
            </TableCell>
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
    </>
    ) : (
      
        <Stack sx={{ width: '100%' }} spacing={2}>
          <Alert severity="error"><p>No matching results found.</p></Alert>
        </Stack>
      
    )}

<div style={{ display: 'flex', justifyContent: 'center', marginTop: '30px' }}>
  <Button variant="contained" color="primary" onClick={handleNewSearch}>
    New Search
  </Button>
</div>
</div>
  )
  )}
  </div>
  );
};

export default SearchForm;


