import axios from "axios";


// Constants
export const API_URL = 'http://localhost:8443/rest/intern';

// Types
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

export interface SearchFormParams {
  nachname: string;
  vorname: string;
  iban: string;
  email: string;
  ort: string;
}

// Utility Functions
export const fetchData = async (searchParams: SearchFormParams): Promise<Person[]> => {
  try {
    const response = await axios.get(`${API_URL}/personen`, { params: searchParams });

    // Transform response data as needed
    const transformedResults = response.data.map((result: SearchResult) => ({
      id: result.id,
      vorname: result.vorname,
      nachname: result.nachname,
      geschlecht: result.geschlecht,
      ort: result.anschriften[0]?.ort || 'N/A',
      email: result.kommunikationsadressen[0]?.email || 'N/A',
      iban: result.bankverbindungen[0]?.iban || 'N/A',
      anschriften: result.anschriften, 
      kommunikationsadressen: result.kommunikationsadressen, 
      bankverbindungen: result.bankverbindungen,
    }));

    return transformedResults;
  } catch (err) {
    throw err;
  }
};
