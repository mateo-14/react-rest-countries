import { useQuery } from 'react-query';
import Select from '../components/Select';
import './Home.css';
import { getCountries, getCountriesRegion, REGIONS } from '../services/countriesService';
import CountryCard from '../components/home/CountryCard';
import { useDebounce } from '../hooks/useDebounce';
import { useState } from 'react';
import Loader from '../components/Loader';

const ALL_REGIONS = { value: 'All', id: 'all' };
function Home() {
  const [region, setRegion] = useState(ALL_REGIONS);
  const [searchValue, setSearchValue] = useState('');
  const debouncedSearchValue = useDebounce(searchValue, 300);

  const { isLoading, data } = useQuery(['countries', { region: region?.id }], () =>
    region && region.id !== ALL_REGIONS.id ? getCountriesRegion(region.value) : getCountries()
  );

  const handleSelectItem = (item) => setRegion(item);

  const handleChange = ({ currentTarget }) => setSearchValue(currentTarget.value);

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
            value={searchValue}
            onChange={handleChange}
          ></input>
        </div>
        <Select
          items={[ALL_REGIONS, ...REGIONS]}
          placeholder="Filter by region"
          selectedItem={region}
          onItemSelect={handleSelectItem}
        />
      </div>
      {isLoading ? (
        <Loader />
      ) : (
        <section className="countries-list">
          {data &&
            data
              .filter(({ name }) => name.common.match(new RegExp(debouncedSearchValue, 'i')))
              .map((country, i) => <CountryCard key={i} country={country} />)}
        </section>
      )}
    </main>
  );
}

export default Home;
