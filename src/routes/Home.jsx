import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import HomeCountry from '../components/HomeCountry';
import './Home.css';

const Home = () => {
  const [countries, setCountries] = useState([]);
  const [isSelectVisible, setIsSelectVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const timeoutRef = useRef(null);

  const fetchCountries = async (region, searchQuery) => {
    try {
      console.log(region, searchQuery);
      setIsLoading(true);
      const { data } = await axios.get(
        region
          ? `https://restcountries.eu/rest/v2/region/${region}`
          : searchQuery
          ? `https://restcountries.eu/rest/v2/name/${searchQuery}`
          : 'https://restcountries.eu/rest/v2/all'
      );
      setCountries(data);
    } catch {
      setCountries([]);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchCountries();
  }, [setCountries]);

  const handleSelectClick = () => {
    setIsSelectVisible(!isSelectVisible);
  };

  const handleSelectItemClick = (region) => {
    if (isLoading) return;
    fetchCountries(region);
    setIsSelectVisible(false);
  };

  const handleSearchInputChange = ({ currentTarget }) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    if (currentTarget.value.trim().length > 0) {
      timeoutRef.current = setTimeout(() => {
        fetchCountries(null, currentTarget.value.trim());
      }, 500);
    } else if (currentTarget.value.length === 0) {
      fetchCountries();
    }
  };

  return (
    <main>
      <div className="search-form">
        <div className="search-form__input-container">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            version="1.1"
            viewBox="0 0 512.005 512.005"
            width="14"
            height="14"
          >
            <path d="M505.749,475.587l-145.6-145.6c28.203-34.837,45.184-79.104,45.184-127.317c0-111.744-90.923-202.667-202.667-202.667    S0,90.925,0,202.669s90.923,202.667,202.667,202.667c48.213,0,92.48-16.981,127.317-45.184l145.6,145.6    c4.16,4.16,9.621,6.251,15.083,6.251s10.923-2.091,15.083-6.251C514.091,497.411,514.091,483.928,505.749,475.587z     M202.667,362.669c-88.235,0-160-71.765-160-160s71.765-160,160-160s160,71.765,160,160S290.901,362.669,202.667,362.669z" />
          </svg>
          <input
            className="search-form__input"
            placeholder="Search for a country"
            onChange={handleSearchInputChange}
            defaultValue=""
          ></input>
        </div>
        <div className="search-form__select-container">
          <button className="search-form__select" onClick={handleSelectClick}>
            Filter by Region{' '}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              version="1.1"
              viewBox="0 0 451.847 451.847"
              width="10"
              height="10"
            >
              <path d="M225.923,354.706c-8.098,0-16.195-3.092-22.369-9.263L9.27,151.157c-12.359-12.359-12.359-32.397,0-44.751   c12.354-12.354,32.388-12.354,44.748,0l171.905,171.915l171.906-171.909c12.359-12.354,32.391-12.354,44.744,0   c12.365,12.354,12.365,32.392,0,44.751L248.292,345.449C242.115,351.621,234.018,354.706,225.923,354.706z" />
            </svg>
          </button>
          {isSelectVisible && (
            <ul className="search-form__select-list">
              <li className="search-form__select-item">
                <button onClick={() => handleSelectItemClick()}>All</button>
              </li>
              <li className="search-form__select-item">
                <button onClick={() => handleSelectItemClick('africa')}>Africa</button>
              </li>
              <li className="search-form__select-item">
                <button onClick={() => handleSelectItemClick('americas')}>America</button>
              </li>
              <li className="search-form__select-item">
                <button onClick={() => handleSelectItemClick('asia')}>Asia</button>
              </li>
              <li className="search-form__select-item">
                <button onClick={() => handleSelectItemClick('europe')}>Europe</button>
              </li>
              <li className="search-form__select-item">
                <button onClick={() => handleSelectItemClick('oceania')}>Oceania</button>
              </li>
            </ul>
          )}
        </div>
      </div>
      {isLoading ? (
        <div className="loader"></div>
      ) : (
        <section className="countries-list">
          {countries && countries.map((country, i) => <HomeCountry key={i} country={country} />)}
        </section>
      )}
    </main>
  );
};

export default Home;
