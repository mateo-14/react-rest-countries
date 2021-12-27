import axios from 'axios';

const API = process.env.REACT_APP_REST_COUNTRIES_URL;

export async function getCountries({ region, name }) {
  const { data } = await axios.get(
    region ? `${API}/region/${region}` : name ? `${API}/name/${name}` : `${API}/all`
  );
  return data;
}

export async function getCountry(name) {
  const { data } = await axios.get(`${API}/name/${name}`);
  return data;
}
