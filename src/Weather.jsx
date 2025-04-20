import React, { useState  } from "react";
import axios from "axios";
import {
  Search,
  Sun,
  CloudRain,
  ThermometerSun,
  CloudSun,
} from "lucide-react";

const Weather = () => {

 const [city,setCity] = useState("")


function handleCity(event){
    setCity(event.target.value)
    
}

function getWeather(){
    var weatherData = axios(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=8beaba54dcc389966513435399ec3f3d`)

    weatherData.then(function(sucess){
        console.log(sucess.data);
        setTemp((sucess.data.main.temp - 273.15).toFixed(2) + " °C");
        setDesc(sucess.data.weather[0].description)

        const timezoneOffset = sucess.data.timezone;
        const currentTime = sucess.data.dt + timezoneOffset;
        const sunrise = sucess.data.sys.sunrise + timezoneOffset;
        const sunset = sucess.data.sys.sunset + timezoneOffset;

        if (currentTime >= sunrise && currentTime <= sunset) {
            setIsDay(true); // It's day
          } else {
            setIsDay(false); // It's night
          }
        
    })
}

const [temp,setTemp]=useState("")
const [desc,setDesc]=useState("")
const [isDay, setIsDay] = useState(true);

const getWeatherIcon = (description) => {
    const desc = description.toLowerCase();
  
    if (desc.includes("clear"))
      return <Sun className="text-yellow-400 w-8 h-8 animate-bounce" />;
    if (desc.includes("cloud"))
      return <CloudSun className="text-gray-400 w-8 h-8 animate-bounce" />;
    if (desc.includes("rain"))
      return <CloudRain className="text-blue-500 w-8 h-8 animate-bounce" />;
    if (desc.includes("snow"))
      return <CloudRain className="text-white w-8 h-8 animate-bounce" />;
    if (desc.includes("storm"))
      return <CloudRain className="text-purple-700 w-8 h-8 animate-bounce" />;
  
    // Default fallback
    return <Sun className="text-yellow-400 w-8 h-8 animate-pulse" />;
  };
  
  

return (
    <div className={`min-h-screen flex items-center justify-center px-4 py-10 transition-all duration-500 ${isDay ? "bg-gradient-to-br from-sky-500 to-blue-800" : "bg-gradient-to-br from-gray-900 via-indigo-900 to-black"}`}>
      <div className="w-full max-w-2xl bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl p-6 md:p-10 flex flex-col items-center text-white">
  
        {/* Title */}
        <h1 className="text-4xl font-extrabold mb-2 flex items-center gap-3">
          <Sun className="text-yellow-300 w-9 h-9 animate-pulse" />
          Weather Report
        </h1>

  
        {/* Subtitle */}
        <p className="text-center text-lg mb-8 text-white/90">
          I can give you a weather report about your city
        </p>
  
        {/* Search Bar */}
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full">
          <input
            type="text"
            placeholder="Enter your city"
            className="flex-1 p-3 rounded-xl text-gray-800 focus:outline-none shadow-inner"
            onChange={handleCity}
            value={city}
          />
          <button
            className="bg-white text-blue-600 px-5 py-3 rounded-xl hover:bg-blue-100 transition-all font-semibold flex items-center gap-2 shadow-lg"
            onClick={getWeather}
          >
            <Search className="w-5 h-5" />
            Get Report
          </button>
        </div>
  
        {/* Weather Report Card */}
        <div className="mt-10 bg-white text-gray-800 rounded-2xl w-full p-6 shadow-xl space-y-5">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">{city}</h2>
            {getWeatherIcon(desc)}
          </div>
          <div className="flex items-center gap-3">
            <ThermometerSun className="text-red-500 w-6 h-6" />
            <p className="text-lg">Temperature: {temp}</p>
          </div>
          <div className="flex items-center gap-3">
            <CloudRain className="text-blue-500 w-6 h-6" />
            <p className="text-lg capitalize">Description: {desc}</p>
          </div>
        </div>
      </div>
    </div>
  );
}  

export default Weather;
