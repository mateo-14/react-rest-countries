import { Link } from 'react-router-dom';
import './CountryCard.css';

function CountryCard({ country }) {
  return (
    <Link
      to={{
        pathname: `/country/${country.name.common.toLowerCase()}`,
      }}
      state={{country}}
    >
      <article className="country">
        <div className="country__img-container">
          <img src={country.flags.svg} alt={`${country.name.common} flag`} width="100%" className="country__img"></img>
        </div>
        <div className="country__info-wrapper">
          <h2 className="country__name">{country.name.common}</h2>
          <p className="country__info">
            <strong>Population: </strong>
            {country.population.toLocaleString()}
            <br></br>
            <strong>Region: </strong>
            {country.region}
            <br></br>
            <strong>Capital: </strong>
            {country.capital}
          </p>
        </div>
      </article>
    </Link>
  );
};

export default CountryCard;
