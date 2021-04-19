import {v4 as uuidv4} from 'uuid'
import Weather from './Weather'

const Country = ({country}) => {
  const width = {width: '10vw'}

  return (
    <div>
      <h1>{country.name}</h1>
      <div>
        <div>capital {country.capital}</div>
        <div>population {country.population}</div>
      </div>
      <p></p>
      <h2>languages</h2>
      <ul>
        {country.languages.map(language => <li key={uuidv4()}>{language.name}</li>)}
      </ul>
      <div className="flag">
        <img src={country.flag} alt='' style={width} />
      </div>
      <div>
        <Weather country={country}/>
      </div>
    </div>
  )
}

export default Country;

