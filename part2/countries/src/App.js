import React, {useState, useEffect} from 'react'
import Country from './components/Country'
import CountryForm from './components/CountryForm'
import CountryList from './components/CountryList'

import axios from 'axios'

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

  const handleCountryShow = (evt) => { 
    setNewCountry(evt.target.parentElement.childNodes[0].data)
  }

  return (
    <div className="App">
      <CountryForm value={newCountry} linkHandler={handleCountryInput}/>
      <div className="country-list">
        {displayCountries.length > 10 
          ? <div>Too many matches, specify another filter</div>
          : displayCountries.length === 1
            ? <Country country={displayCountries[0]}/>
            : <CountryList countries={displayCountries} linkHandler={handleCountryShow}/>}
      </div>
    </div>
  );
}

export default App;