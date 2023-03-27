import Country from './Country'

const Countries = ({ countriesToShow, handleClick }) => {
    // if only one country matches the filter, show its information
    if (countriesToShow.length === 1) {
      return <Country country={countriesToShow[0]} />
    // if 2-10 countries match the filter, show a list with a button to show each country's information
    } else if (countriesToShow.length <= 10) {
      return (
        <div>
          {countriesToShow.map(country => (
            <div key={country.name}>
              {country.name}
              <button onClick={() => handleClick(country)}>show</button>
            </div>
          ))}
        </div>
      )
    // if more than 10 countries match the filter, show an error message
    } else {
      return <div>Too many matches, specify another filter</div>
    }
  }

export default Countries