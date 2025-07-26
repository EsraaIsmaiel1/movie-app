import axios from 'axios';
import { apiKey } from '../constants';
const BaseUrl = 'https://api.themoviedb.org/3';
const trendingMoviesEndpoint = `${BaseUrl}/trending/movie/day?api_key=${apiKey}`;
const upcomingMoviesEndpoint = `${BaseUrl}/movie/upcoming?api_key=${apiKey}`;

const topRatedMoviesEndpoint = `${BaseUrl}/movie/top_rated?api_key=${apiKey}`;

const movieDetailsEndpoint = (id: number) => `${BaseUrl}/movie/${id}?api_key=${apiKey}`;
const movieCastEndpoint = (id: number) => `${BaseUrl}/movie/${id}/credits?api_key=${apiKey}`;
const similarMoviesEndpoint = (id: number) => `${BaseUrl}/movie/${id}/similar?api_key=${apiKey}`;

const personDetailsEndpoint = (id: number) => `${BaseUrl}/person/${id}?api_key=${apiKey}`;

const personMoviesEndpoint = (id: number) =>
  `${BaseUrl}/person/${id}/movie_credits?api_key=${apiKey}`;

const searchEndpoint = `${BaseUrl}/search/movie?api_key=${apiKey}`;

export const fetchImages500 = (path: string) =>
  path ? 'https://image.tmdb.org/t/p/w500/' + path : '';
export const fetchImages342 = (path: string) =>
  path ? 'https://image.tmdb.org/t/p/w342/' + path : '';
export const fetchImages185 = (path: string) =>
  path ? 'https://image.tmdb.org/t/p/w185/' + path : '';

export const placeholder = 'https://via.placeholder.com/300x450.png?text=No+Image';

const apiCall = async (endpoint: string, params?: any) => {
  const options = {
    method: 'GET',
    url: endpoint,
    params: params ? params : {},
  };
  try {
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    console.error(error);
    return {};
  }
};

export const fetchingTrendingMovies = () => {
  return apiCall(trendingMoviesEndpoint);
};

export const fetchingUpcomingMovies = () => {
  return apiCall(upcomingMoviesEndpoint);
};

export const fetchingTopRatedMovies = () => {
  return apiCall(topRatedMoviesEndpoint);
};

export const fetchingMovieDetails = (id: number) => {
  return apiCall(movieDetailsEndpoint(id));
};
export const fetchingMovieCast = (id: number) => {
  return apiCall(movieCastEndpoint(id));
};
export const fetchingSimilarMovies = (id: number) => {
  return apiCall(similarMoviesEndpoint(id));
};

export const fetchingPersonDetails = (id: number) => {
  return apiCall(personDetailsEndpoint(id));
};

export const fetchingPersonMovies = (id: number) => {
  return apiCall(personMoviesEndpoint(id));
};

export const fetchingSearchResult = (params: any) => {
  return apiCall(searchEndpoint, params);
};
