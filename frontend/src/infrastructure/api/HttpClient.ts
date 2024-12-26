import axios from 'axios';

export const HttpClient = axios.create({
  baseURL: 'https://dummyjson.com',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});
