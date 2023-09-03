import { Container, Snackbar, Typography } from "@mui/material";
import React, { useState } from "react";
import { Router, Routes, Route, Link } from "react-router-dom";
import SearchForm from "./SearchForm";
import { Person, fetchData, SearchResult,SearchFormParams } from "./Shared";


const App: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [results, setResults] = useState<Person[]>([]);
 

  const handleSearch = async (searchParams: SearchFormParams) => {
    setLoading(true);
    setError('');

    try {
      const response = await fetchData(searchParams); // Your data fetching function

      await new Promise<void>((resolve) => setTimeout(resolve, 2000));
      console.log('Search parameters:', searchParams);

      // Transform SearchResult into Person format
      const transformedResults = response.map((result: SearchResult) => ({
        id: result.id,
        vorname: result.vorname,
        nachname: result.nachname,
        geschlecht: result.geschlecht,
        ort: result.anschriften[0]?.ort,
        email: result.kommunikationsadressen[0]?.email,
        iban: result.bankverbindungen[0]?.iban,
        anschriften: result.anschriften, 
        kommunikationsadressen: result.kommunikationsadressen, 
        bankverbindungen: result.bankverbindungen,
      }));

      setLoading(false);
      setResults(transformedResults);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred during the search.';
      setError(errorMessage);
      setLoading(false);
    }
  };
  
    return (
      <Container maxWidth="md">
      <Typography
      variant="h4"
      align="center"
      sx={{
    color: 'darkblue', // Change to the color you prefer
    padding: '16px',
    border: '1px solid darkblue', // Add a border
    borderRadius: '4px', // Add some border radius for a card-like appearance
    marginBottom: '50px',
    marginTop: '20px', // Adjust margin as needed
  }}
  gutterBottom
>
  Search Form
</Typography>
          <Routes>
            <Route
              path="/"
              element={(
                <SearchForm
              onSearch={handleSearch} 
              onSearchComplete={() => {
              setLoading(false);
              }}
              onError={(errMsg) => {
               setError(errMsg);
               setLoading(false);
              }}
              />
              )}
              />
          </Routes>
      </Container>
    );
  };
  
  export default App;
  
  
