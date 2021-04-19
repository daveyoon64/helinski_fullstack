import {v4 as uuidv4} from 'uuid'

const CountryList = ({countries, linkHandler}) => {
  return(
    <div>
      {countries.map(country => 
        <div key={uuidv4()}>{country.name}
          <button onClick={linkHandler}>Show</button>
        </div>
      )}
    </div>
  )
}

export default CountryList