import axios from 'axios';

const OPEN_WEATHER_MAP_URL = 'http://api.openweathermap.org/data/2.5/weather?appid=bfb7c0cffaecdcfc41e7b3bb42725e97&units=metric';

export default function(location) {
  var encodedLocation = encodeURIComponent(location);
  var requestUrl = `${OPEN_WEATHER_MAP_URL}&q=${encodedLocation}`;

  return axios.get(requestUrl).then((response)=>{
    if(response.data.cod && response.data.message) {
      throw new Error(response.data.message);
    } else {
      return response.data.main.temp;
    }
  }, (error)=>{
    throw new Error(error.data.message);
  });
}