export const API_KEY = "507fa2b7";
export const OMDB_URL = "http://www.omdbapi.com";
export const OMDB_IMAGE_URL = "http://img.omdbapi.com";

export type ShowType = "movie" | "series" | "episode";

export interface BySearchParams {
  s: string;
  page: number;
  apikey: string;
  type?: ShowType;
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
