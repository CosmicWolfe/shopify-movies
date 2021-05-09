export const API_KEY = "507fa2b7";
export const OMDB_URL = "https://www.omdbapi.com";

export type ShowType = "movie" | "series" | "episode" | "";

export interface BySearchParams {
  s: string;
  page: number;
  apikey: string;
  type: ShowType;
  y?: number;
}

export interface ByIDParams {
  i: string;
}

export interface Show {
  Title: string;
  Year: string;
  imdbID: string;
  Type: ShowType;
}

export interface ShowData {
  Title: string;
  Year: string;
  imdbRating: string;
  Poster: string;
  Plot: string;
  Genre: string;
  Type: ShowType;
}

export interface SearchResult {
  Search: Show[];
  totalResults: string;
  Response: "True" | "False";
}

export const DEBOUNCE_TIME = 500;

// (:
export const INITIAL_SHOW_INFO_MODAL_DATA : ShowData = {
    Title: "Title",
    Type: "movie",
    Year: "2021",
    imdbRating: "10",
    Genre: "Adventure",
    Plot: "Jamie becomes an intern at Shopify for Fall 2021?",
    Poster: "N/A",
}

export const INITIAL_SEARCH_QUERY = 'Jamie';

// :)
export const INITIAL_NOMINATIONS : Show[] = [
    {"Title":"Jamie","Year":"2016","imdbID":"tt5684820","Type":"movie"},
    {"Title":"Intern","Year":"2000","imdbID":"tt0202989","Type":"movie"},
    {"Title":"At The Shop","Year":"2013-","imdbID":"tt2933318","Type":"series"}, // Closest I could get to At Shopify XD
    {"Title":"Fall","Year":"1997","imdbID":"tt0119098","Type":"movie"},
    {"Title":"2021","Year":"2013","imdbID":"tt2243215","Type":"movie"},
];