import { Container, Typography } from "@mui/material";
import React from "react";
import { Routes, Route } from "react-router-dom";
import SearchForm from "./SearchForm";



const App: React.FC = () => {
  
    return (
      <Container maxWidth="md">
      <Typography
      variant="h4"
      align="center"
      sx={{
         color: 'darkblue', 
         padding: '16px',
         border: '1px solid darkblue', 
         borderRadius: '4px', 
         marginBottom: '50px',
         marginTop: '20px', 
  }}
  gutterBottom
>
  Search Form
</Typography>
          <Routes>
            <Route
              path="/"
              element={(
                <SearchForm/>
              )}
              />
          </Routes>
      </Container>
    );
  };
  
  export default App;
  
  
