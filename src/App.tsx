import { Container, Snackbar, Typography } from "@mui/material";
import React, { useState } from "react";
import { Router, Routes, Route, Link } from "react-router-dom";
import ResultsDisplay from "./ResultsDisplay";
import SearchForm, { SearchFormParams } from "./SearchForm";
import SearchResult, { Person, fetchData } from "./SearchResults";

const App: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [results, setResults] = useState<Person[]>([]);
  const [searchParams, setSearchParams] = useState<SearchFormParams>({
    nachname: "",
    vorname: "",
    iban: "",
    email: "",
    ort: ""
  });

  const handleSearch = async (searchParams: SearchFormParams) => {
    setLoading(true);
    setError('');

    try {
      const response = await fetchData(searchParams); // Your data fetching function

      await new Promise<void>((resolve) => setTimeout(resolve, 2000));
      console.log('Search parameters:', searchParams);

      // Transform SearchResult into Person format
      const transformedResults = response.data.map((result: SearchResult) => ({
        id: result.id,
        vorname: result.vorname,
        nachname: result.nachname,
        geschlecht: result.geschlecht,
        ort: result.anschriften[0]?.ort,
        email: result.kommunikationsadressen[0]?.email,
        iban: result.bankverbindungen[0]?.iban 
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
      <Typography variant="h4" align="center" margin='45px'gutterBottom>
         <Link to="/" color="inherit">
          Search Form
        </Link>
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
    
            <Route path="/result" element={<ResultsDisplay />} />
          </Routes>
      </Container>
    );
  };
  
  export default App;
  
  
