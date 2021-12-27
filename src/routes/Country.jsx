import { useQuery } from 'react-query';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Loader from '../components/Loader';
import { getCountry } from '../services/countriesService';
import './Country.css';

const Country = () => {
  const { name } = useParams();
  const navigate = useNavigate();
  const { state } = useLocation();
  const { data, isLoading } = useQuery(['country', name], () => getCountry(name), {
    initialData: state?.country,
  });

  console.log(data);

  const handleBackButton = () => navigate(-1);

  return (
    <main>
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
      {isLoading ? (
        <Loader />
      ) : (
        data && (
          <article className="detail-country">
            <img
              src={data.flags.svg}
              alt={`${data.name.common} flag`}
              className="detail-country__img"
            ></img>
            <div className="detail-country__info-wrapper">
              <h2 className="detail-country__name">{data.name.common}</h2>
              <div className="detail-country__lists">
                <ul className="detail-country__info">
                  <li>
                    <strong>Native Name: </strong>
                    {data.name.nativeName[Object.keys(data.name.nativeName)[0]].common}
                  </li>
                  <li>
                    <strong>Population: </strong>
                    {data.population.toLocaleString()}
                  </li>
                  <li>
                    <strong>Region: </strong>
                    {data.region}
                  </li>
                  <li>
                    <strong>Capital: </strong>
                    {data.capital}
                  </li>
                </ul>
                <ul className="detail-country__info">
                  <li>
                    <strong>Top Level Domain: </strong>
                    {data.tld.join(', ')}
                  </li>
                  <li>
                    <strong>Currencies: </strong>
                    {Object.keys(data.currencies)
                      .map((currency) => data.currencies[currency].name)
                      .join(', ')}
                  </li>
                  <li>
                    <strong>Languages: </strong>
                    {Object.keys(data.languages)
                      .map((language) => data.languages[language])
                      .join(', ')}
                  </li>
                </ul>
              </div>
              <div className="border-countries">
                <strong className="border-countries__text">Border Countries:</strong>
                <div className="border-countries__list">
                  {data.borders?.map((borderCountry) => (
                    <span className="border-countries__item">{borderCountry}</span>
                  ))}
                </div>
              </div>
            </div>
          </article>
        )
      )}
    </main>
  );
};

export default Country;
