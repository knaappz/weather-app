import { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer'

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
        console.log(result);
      });
  };

  function getWindDirection(degrees) {
    const directions = [
      'Północ',                // 0° - 22.5°
      'Północny wschód',       // 22.5° - 67.5°
      'Wschód',                // 67.5° - 112.5°
      'Południowy wschód',     // 112.5° - 157.5°
      'Południe',              // 157.5° - 202.5°
      'Południowy zachód',     // 202.5° - 247.5°
      'Zachód',                // 247.5° - 292.5°
      'Północny zachód'        // 292.5° - 337.5°
    ];
  
    const index = Math.floor((degrees + 22.5) / 45);
    return directions[index % 8];
  }
  

  return (
    <section id='weather-app'>
      {/* header */}
      <Header onSearchChange={handleSearchChange} onSearchSubmit={searchPressed} />

      <section id='maincontent' className='flex h-screen justify-start mx-5'>
        {typeof weather.main !== 'undefined' ? (
          <div id='city-card' className='w-full h-3/4 p-5 ml-2 flex flex-col gap-5 rounded-2xl'>
            <h3 className='text-2xl uppercase'>{weather.name}</h3>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">

              <div className='w-block bg-orange-300 rounded-tl-3xl border-orange-400 border-b-8'>
                <p className='uppercase'>Aktualna temperatura</p>
                <p className='w-full h-40 flex items-center justify-center text-4xl'>                
                  {Math.round(weather.main.temp)}&deg;C
                </p>
              </div>

              <div className='w-block bg-orange-400 border-orange-500 border-b-8'>
                <p className='uppercase'>Maksymalna temperatura</p>
                <p className='w-full h-40 flex items-center justify-center text-4xl'>
                  {Math.round(weather.main.temp_max)}&deg;C
                </p>
              </div>
              
              <div className='w-block bg-orange-100 border-orange-300 border-b-8'>
                <p className='uppercase'>Minimalna temperatura</p>
                <p className='w-full h-40 flex items-center justify-center text-4xl'>
                  {Math.floor(weather.main.temp_min)}&deg;C
                </p>
              </div>
              
              <div className='w-block bg-blue-200'>
                <p className='uppercase'>Pogoda</p>
                <p className='w-full h-40 flex items-center justify-center text-4xl'>
                  <img 
                    src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} 
                    alt={weather.weather[0].description} 
                    className="w-32"
                  /></p>
              </div>

              <div className='w-block bg-blue-200'>
                <p className='uppercase'>Opis</p>
                <p className='w-full h-40 flex items-center justify-center text-2xl'>
                  {weather.weather[0].description}
                </p>
              </div>

              <div className='w-block bg-blue-200'>
                <p className='uppercase'>Prędkość wiatru</p>
                <p className='w-full h-40 flex items-center justify-center text-4xl'>
                  {Math.round(weather.wind.speed)} m/s
                </p>
              </div>
            </div>

            <div className='w-block p-8 bg-blue-300 rounded-br-3xl'>
              <p className='uppercase'>Kierunek wiatru: </p>
              {getWindDirection(weather.wind.deg)}
            </div>

            {/* <div className='flex flex-col gap-2'>
              <button className='rounded-lg uppercase p-2 w-full bg-white hover:bg-gray-100 transition ease-in-out delay-0 duration-200'>Więcej szczegółów</button>
              <button className='rounded-lg uppercase p-2 w-full bg-red-400 hover:bg-red-300 transition ease-in-out delay-0 duration-200'>Usuń</button>
            </div> */}
          </div>
        ) : (
          <div className='w-full h-screen flex flex-col items-center justify-center text-2xl'>
            <p className='uppercase italic shadow-xl px-6 py-2 rounded-xl bg-slate-100 text-blue-950'>jeszcze nie wybrałeś miasta</p>
          </div>
        )}
      </section>

      <Footer/>
    </section>
  );
}

export default App;
