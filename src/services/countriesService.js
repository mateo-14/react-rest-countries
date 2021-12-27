import axios from 'axios';

const API = process.env.REACT_APP_REST_COUNTRIES_URL;

export const REGIONS = [
  { id: 'africa', value: 'Africa' },
  { id: 'americas', value: 'America' },
  { id: 'asia', value: 'Asia' },
  { id: 'europe', value: 'Europe' },
  { id: 'oceania', value: 'Oceania' },
];

export async function getCountries() {
  const { data } = await axios.get(`${API}/all`);
  return data;
}

export async function getCountriesRegion(region) {
  const { data } = await axios.get(`${API}/region/${region}`);
  return data;
}

export async function getCountry(name) {
  const { data } = await axios.get(`${API}/name/${name}?fullText=true`);
  if (data?.length > 0) return data[0];
}
