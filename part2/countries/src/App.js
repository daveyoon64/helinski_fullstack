import React, {useState, useEffect} from 'react'
import Country from './components/Country'
import CountryForm from './components/CountryForm'

import axios from 'axios'
import {v4 as uuidv4} from 'uuid'

function App() {
  const [countries, setCountries] = useState([])
  const [newCountry, setNewCountry] = useState('')
  
  const displayCountries = countries.filter(country => 
    country.name.toUpperCase().includes(newCountry.toUpperCase())
  )

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const handleCountryInput = (evt) => {
    setNewCountry(evt.target.value)
  }

  return (
    <div className="App">
      <CountryForm value={newCountry} linkHandler={handleCountryInput}/>
      <div className="country-list">
        {displayCountries.length > 10 
          ? <div>Too many matches, specify another filter</div>
          : displayCountries.length === 1
            ? <Country country={displayCountries[0]}/>
            : displayCountries.map(country => <div key={uuidv4()}>{country.name}</div>)}
      </div>
    </div>
  );
}

export default App;
