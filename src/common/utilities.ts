
import axios from 'axios';
import { SearchFormParams, Person } from './types';
import { API_URL } from './constants';

export const fetchData = async (searchParams: SearchFormParams): Promise<Person[]> => {
  const { nachname, vorname, iban, email, ort } = searchParams;
  try {
    const response = await axios.get(`${API_URL}/personen`, { params: searchParams });

    // Transform response data as needed
    const transformedResults = response.data
      .map((result: Person) => ({
        vorname: result.vorname,
        nachname: result.nachname,
        geschlecht: result.geschlecht,
        ort: result.anschriften[0]?.ort || 'N/A',
        email: result.kommunikationsadressen[0]?.email || 'N/A',
        iban: result.bankverbindungen[0]?.iban || 'N/A',
      }))
      .filter(
        (result: Person) =>
          (!nachname || result.nachname.toLowerCase().includes(nachname.toLowerCase())) &&
          (!vorname || result.vorname.toLowerCase().includes(vorname.toLowerCase())) &&
          (!iban || result.iban.includes(iban)) &&
          (!email || result.email.toLowerCase().includes(email.toLowerCase())) &&
          (!ort || result.ort.toLowerCase().includes(ort.toLowerCase()))
      );

    return transformedResults;
  } catch (err) {
    throw err;
  }
};
