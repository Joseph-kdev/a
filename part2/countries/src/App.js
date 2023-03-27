import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Countries from './components/Countries'

const App = () => {
  const [countries, setCountries] = useState([])
  const [inputValue, setInputValue] = useState('')

  // useEffect hook to fetch country data from restcountries API
  useEffect(() => {
    axios.get('https://restcountries.com/v2/all').then(response => {
      setCountries(response.data)
    })
  }, [])

  // handle changes to the filter input field
  const handleInputChange = event => {
    setInputValue(event.target.value)
  }

  // filter the countries by name based on the filter value
  const countriesToShow =
    inputValue === ''
      ? []
      : countries.filter(country =>
          country.name.toLowerCase().includes(inputValue.toLowerCase())
        )

  // handle clicks on the "show" button in the list of countries
  const handleClick = country => {
    setInputValue(country.name)
  }

  // display the search field and the list of countries (or country information)
  return (
    <div>
      <div>
        find countries <input value={inputValue} onChange={handleInputChange} />
      </div>
      <Countries countriesToShow={countriesToShow} handleClick={handleClick} />
    </div>
  )
}

export default App
