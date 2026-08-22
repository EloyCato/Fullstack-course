import axios from 'axios'

const baseUrl = `https://api.openweathermap.org/data/2.5/weather?`

const api_key = import.meta.env.VITE_OPEN_WEATHER_KEY

const getCapitalWeather = ({lat,lng}) => {
    const request = axios.get(`${baseUrl}lat=${lat}&lon=${lng}&units=metric&appid=${api_key}`)
    return request.then(response => response.data)
}

export default { 
  getCapitalWeather: getCapitalWeather
}
