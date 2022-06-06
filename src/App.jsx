import axios from 'axios'
import { useEffect, useState } from 'react'
import './App.css'

function App() {

  const [lat, setLat] = useState()
  const [long, setLong] = useState()
  const [obj, setObj] = useState({})

  
  
  
  const myKey = "7f8bf535e81e947e5791ecb05984a3af";


  navigator.geolocation.getCurrentPosition((position) => {
    setLat(position.coords.latitude);
    setLong(position.coords.longitude)
  })
  
  useEffect(() => {

    if(lat !== undefined && long !== undefined){
      axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${myKey}&units=metric`)
      .then(res => setObj(res.data))
      .catch((error) => console.log( error.response.request._response ) )

    }
    
  }, [lat, long])
  
  console.log(obj);
  const [change, setChange] = useState(true)
  

  const changeTemp =()=>{
    setChange(!change)
  }

  return (
    <>
    <div className="App">
      <h1>Wheather App</h1>
      <h2>{obj.name}, {obj.sys?.country}</h2>
      <div className='flex'>

      <div className='section-2'>
        {
          obj.main?.temp >= 26 ? <img src="https://static.vecteezy.com/system/resources/previews/002/779/758/non_2x/cartoon-illustration-of-sun-sunny-weather-free-vector.jpg" alt="sunny" /> :
          <img src='https://twotics.files.wordpress.com/2014/04/capture_04132014_212340.png' alt='foggy'></img>
        }
        <p>Temp: {change ? obj.main?.temp + " °C" : Number(obj.main?.temp * 1.8 + 32).toFixed(2)  + " °F"}</p>
      </div>
      <div className='section-3'>
        
        {/* <p>{obj.weather.description}</p> */}
        <p>Wind speed: {obj.wind?.speed} m/s</p>
        <p>Clouds: {obj.clouds?.all}</p>
        <p>Pressure: {obj.main?.pressure} hPa</p>
      </div> 
      </div>
      <button onClick={changeTemp}>{change ? "Change °F":"Change °C" }</button>
    </div>

    </>
  )
}

export default App
