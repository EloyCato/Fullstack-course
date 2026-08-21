import { useEffect, useState } from 'react'
import countryService from './services/country'
import axios from 'axios'

  const FilteredCountries = ({country}) =>{

    return(
      <>
        <li> {country.name.common} </li>
      </>
    )
  }

  const DisplayCountries = ({ countries, findName }) => {
    //const countriesToDisplay = countries.filter(country => country.name.common.toLowerCase().includes(findName))
    const countriesToDisplay = countries.filter(country => country.name.common.includes(findName))
    if(countriesToDisplay.length === 1){
      //countriesToDisplay[0].languages.forEach(language => console.log(language))
      //console.log(countriesToDisplay[0].languages)
      const languages = Object.values(countriesToDisplay[0].languages)
      //languages.map(lang => console.log(lang))
      console.log(countriesToDisplay[0].flags['svg'])
      return(
        <>
        <h1> {countriesToDisplay[0].name.common} </h1>
        <li>Capital: {countriesToDisplay[0].capital[0]}</li>
        <li> Area: {countriesToDisplay[0].area}</li>
        <h2>Languages</h2>
        <ul>
          {languages.map(lang => <li key={lang}>{lang}</li>)
          }
        </ul>
        <img src={countriesToDisplay[0].flags['png']}/>
        </>
      )
    }else if(countriesToDisplay.length <= 10){
      return(
        <p>
        {countriesToDisplay.map(country => <FilteredCountries key ={country.cca3} country={country}/>)}
        </p>
      )
    }else{
      return(
        <p>
        Too many matches, specify another filter
        </p>
      )
    }
  }

function App() {
  const [count, setCount] = useState(0)
  const [countries, setCountries ] = useState([])
  const [findName, setFindName] = useState('')

  const countriesHook = () => {
    countryService.getAll().then( countryData => { setCountries(countryData)})
  }

  useEffect(countriesHook,[])
  console.log(countries)
  const handleFindChange = (event) =>{
    //console.log(event.target.value)
    setFindName(event.target.value)
  }

  

  return (
    <div>
      find countries:
      <input value = {findName} onChange = {handleFindChange}/>
      <DisplayCountries countries = {countries} findName = {findName}/>
    </div>

  )
}

export default App
