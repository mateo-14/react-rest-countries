import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './Country.css';

const Country = () => {
  const { name } = useParams();
  const navigate = useNavigate();
  const [country, setCountry] = useState();

  useEffect(() => {
    console.log(country, name);
    if (!country && name) {
      const fetchCountry = async () => {
        try {
          const { data } = await axios.get(`https://restcountries.eu/rest/v2/name/${name}`);
          if (data.length > 0) {
            setCountry(data[0]);
          }
        } catch {}
      };
      fetchCountry();
    }
  }, [country, name, setCountry]);

  const handleBackButton = () => navigate(-1);

  return (
    <main className="detail-country-main">
      <button onClick={handleBackButton} className="detail-country__back-btn">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          version="1.1"
          height="16"
          width="16"
          viewBox="0 0 31.494 31.494"
        >
          <path d="M10.273,5.009c0.444-0.444,1.143-0.444,1.587,0c0.429,0.429,0.429,1.143,0,1.571l-8.047,8.047h26.554  c0.619,0,1.127,0.492,1.127,1.111c0,0.619-0.508,1.127-1.127,1.127H3.813l8.047,8.032c0.429,0.444,0.429,1.159,0,1.587  c-0.444,0.444-1.143,0.444-1.587,0l-9.952-9.952c-0.429-0.429-0.429-1.143,0-1.571L10.273,5.009z" />
        </svg>
        Back
      </button>
      {country && (
        <article className="detail-country">
          <div className="detail-country__img-container">
            <img
              src={country.flag}
              alt={`${country.name} flag`}
              width="100%"
              className="detail-country__img"
            ></img>
          </div>
          <div className="detail-country__info-wrapper">
            <h2 className="detail-country__name">{country.name}</h2>
            <p className="detail-country__info">
              <strong>Native Name: </strong>
              {country.nativeName}
              <br></br>
              <strong>Population: </strong>
              {country.population.toLocaleString()}
              <br></br>
              <strong>Region: </strong>
              {country.region}
              <br></br>
              <strong>Capital: </strong>
              {country.capital}
            </p>
            <p className="detail-country__info">
              <strong>Top Level Domain: </strong>
              {country.topLevelDomain.join(', ')}
              <br></br>
              <strong>Currencies: </strong>
              {country.currencies.map((currency) => currency.name).join(', ')}
              <br></br>
              <strong>Languages: </strong>
              {country.languages.map((language) => language.name).join(', ')}
            </p>
            <div className="border-countries">
              <strong className="border-countries__text">Border Countries:</strong>
              <div className="border-countries__list">
                {country.borders.map((borderCountry) => (
                  <span className="border-countries__item">{borderCountry}</span>
                ))}
              </div>
            </div>
          </div>
        </article>
      )}
    </main>
  );
};

export default Country;
