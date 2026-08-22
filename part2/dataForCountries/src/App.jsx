import { useEffect, useState } from 'react'
import countryService from './services/country'
import weatherService from './services/weather'
import axios from 'axios'

  const FilteredCountries = ({country, handleShowingCountry}) =>{

    return(
      <>
        <li> {country.name.common}
          <button onClick = {() => handleShowingCountry(country)}>Show</button>
        </li>
      </>
    )
  }

  const CapitalsWeather = ({capital,lat,lng}) => {
    const [weatherData,setWeatherData] = useState('')

    const handleWeather = () =>{
      weatherService.getCapitalWeather({lat: lat, lng: lng}).then(response => setWeatherData(response))
    } 

    if(weatherData !== ''){
      const iconAddress = `https://openweathermap.org/payload/api/media/file/${weatherData.weather[0].icon}.png`
      console.log(iconAddress)
      return(
        <>
          <h2>Weather in {capital.toString()} </h2>
          <li>Temperature: {weatherData.main.temp} Celsius</li>
          <img src ={iconAddress}/>
          <li>Wind: {weatherData.wind.speed} m/s</li>
        </>
      )
    }else{
      handleWeather()
    }
  }

  const ShowCountry = ({country}) => {
    const languages = Object.values(country.languages)
    const capitals = Object.values(country.capital)

    return(
      <>
        <h1> {country.name.common} </h1>
        <li>Capital: {capitals.toString()}</li>
        <li> Area: {country.area}</li>
        <h2>Languages</h2>
        <ul>
          {languages.map(lang => <li key={lang}>{lang}</li>)
          }
        </ul>
        <img src={country.flags['png']}/>
        <CapitalsWeather capital={capitals[0]} lat={country.capitalInfo.latlng[0]} lng={country.capitalInfo.latlng[1]}/>
      </>
    )    
  }

  const DisplayCountries = ({ countries, findName, showingCountry, handleShowingCountry}) => {
    const countriesToDisplay = countries.filter(country => country.name.common.toLowerCase().includes(findName.toLowerCase()))
    //const countriesToDisplay = countries.filter(country => country.name.common.includes(findName))
    if(countriesToDisplay.length === 1){

      console.log(countriesToDisplay[0].flags['svg'])
      return(
        <ShowCountry country = {countriesToDisplay[0]}/>
      )
    }else if(countriesToDisplay.length <= 10){      
      if(showingCountry !== ''){
        return(
          <ShowCountry country = {showingCountry}/>
        )
      }

      return(
        <p>
        {countriesToDisplay.map(country => <FilteredCountries key={country.cca3} country={country} handleShowingCountry = {handleShowingCountry}  />)}        
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
  const [showingCountry, setShowingCountry] = useState('')


  const countriesHook = () => {
    countryService.getAll().then( countryData => { setCountries(countryData)})
  }

  useEffect(countriesHook,[])
  
  const handleFindChange = (event) =>{
    //console.log(event.target.value)
    setFindName(event.target.value)
    setShowingCountry('')
  }

  const handleShowingCountry = (country) =>{
    setShowingCountry(country)
  }

  return (
    <div>
      find countries:
      <input value = {findName} onChange = {handleFindChange}/>
      <DisplayCountries countries = {countries} findName = {findName} showingCountry = {showingCountry} handleShowingCountry ={handleShowingCountry}/>
    </div>

  )
}

export default App
