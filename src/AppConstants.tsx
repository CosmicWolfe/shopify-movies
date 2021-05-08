export const API_KEY = '507fa2b7';
export const OMDB_URL = 'http://www.omdbapi.com';

export interface SearchFilter {
    s: string,
    page: number,
    apikey: string,
    y?: number,
}