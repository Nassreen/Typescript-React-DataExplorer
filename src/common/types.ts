

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
  