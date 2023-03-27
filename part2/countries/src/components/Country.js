import Weather from './Weather'

const Country = ({ country }) => {
     // the effect re-runs whenever the `country` prop changes
  
    // display country information and weather data if available
    return (
      <div>
        <h2>{country.name}</h2>
        <div>capital {country.capital}</div>
        <div>population {country.population}</div>
        <h3>languages</h3>
        <ul>
          {country.languages.map(language => (
            <li key={language.name}>{language.name}</li>
          ))}
        </ul>
        <img src={country.flag} alt={`Flag of ${country.name}`} width="200" />
        <Weather country = {country} />
      </div>
    )
  }
  
export default Country;