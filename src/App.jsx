import { useState } from 'react';
import Header from './components/Header';

function App() {
  const openWeatherApi = {
    key: '99c48368b50dd2a9f959af7df7d70c52',
    base: 'https://api.openweathermap.org/data/2.5/',
  };

  const [search, setSearch] = useState('');
  const [weather, setWeather] = useState({});

  const handleSearchChange = (value) => {
    setSearch(value);
  };

  const searchPressed = () => {
    fetch(`${openWeatherApi.base}weather?q=${search}&units=metric&APPID=${openWeatherApi.key}`)
      .then((res) => res.json())
      .then((result) => {
        setWeather(result);
        console.log(result)
      });
  };

  return (
    <section id='weather-app'>
      {/* header */}
      <Header onSearchChange={handleSearchChange} onSearchSubmit={searchPressed} />

      <section id='maincontent' className='flex h-screen justify-start p-5'>
        {typeof weather.main !== 'undefined' ? (
           <div id='city-card' className='w-full h-3/4  p-5 ml-2 flex flex-col gap-5 rounded-2xl'>
            <h3 className='text-2xl uppercase'>{weather.name}</h3>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              <p className="">Aktualna temperatura: {weather.main.temp}&deg;C</p>
              <p className="">Maksymalna temperatura: {weather.main.temp_max}&deg;C</p>
              <p className="">Minimalna temperatura: {weather.main.temp_min}&deg;C</p>
              <p className="">Pogoda: {weather.weather[0].main}</p>
              <p className="">Opis: {weather.weather[0].description}</p>
              <p className="">Prędkość wiatru: {weather.wind.speed} m/s</p>
            </div>

           <div className='flex flex-col gap-2'>
             <button className='rounded-lg uppercase p-2 w-full bg-white hover:bg-gray-100 transision ease-in-out delay-0 duration-200'>Więcej szczegółów</button>
             <button className='rounded-lg uppercase p-2 w-full bg-red-400 hover:bg-red-300 transision ease-in-out delay-0 duration-200'>Usuń</button>
           </div>

         </div>
        ) : (
            <div>
              <p>Znajdz interesujące cię miasto...</p>
            </div>              
        )}

             
      </section>

    </section>
  );
}

export default App;
