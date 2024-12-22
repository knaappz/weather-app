import { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import { plWeatherDescription } from './components/DescTranslatorPL';

function App() {
  const openWeatherApi = {
    key: '99c48368b50dd2a9f959af7df7d70c52',
    base: 'https://api.openweathermap.org/data/2.5/',
  };

  const [search, setSearch] = useState('');
  const [cities, setCities] = useState([]);

  const handleSearchChange = (value) => {
    setSearch(value);
  };

  const searchPressed = () => {
    if (!search) {
      alert("Proszę wpisać nazwę miasta!");
      return;
    }
  
    if (cities.length >= 3) {
      alert("Maksymalna liczba miast to 3");
      return;
    }
  
    fetch(`${openWeatherApi.base}weather?q=${search}&units=metric&APPID=${openWeatherApi.key}`)
      .then((res) => res.json())
      .then((result) => {
        if (result.cod !== "404") {
          setCities((prevCities) => [
            ...prevCities,
            { data: result, timestamp: new Date().getTime() },
          ]);
        } else {
          alert("Nie znaleziono miasta o podanej nazwie.");
        }
      });
  };
  
  const deleteCity = (index) => {
    setCities((prevCities) => {
      const updatedCities = prevCities.filter((_, i) => i !== index);
      localStorage.setItem('weatherData', JSON.stringify({ cities: updatedCities })); 
      return updatedCities;
    });
  };
  

  function getWindDirection(degrees) {
    const directions = [
      'Północ',
      'Północny wschód',
      'Wschód',
      'Południowy wschód',
      'Południe',
      'Południowy zachód',
      'Zachód',
      'Północny zachód',
    ];

    const index = Math.floor((degrees + 22.5) / 45);
    return directions[index % 8];
  }

  useEffect(() => {
    if (cities.length > 0) {
      const weatherData = { cities };
      localStorage.setItem('weatherData', JSON.stringify(weatherData));
    }
  }, [cities]);

  useEffect(() => {
    const savedWeather = localStorage.getItem('weatherData');
    if (savedWeather) {
      const { cities } = JSON.parse(savedWeather);
      setCities(cities);
    }
  }, []);

  return (
    <section id='weather-app'>
      {/* header */}
      <Header onSearchChange={handleSearchChange} onSearchSubmit={searchPressed} />

      <section id='maincontent' className='flex flex-row justify-center flex-wrap gap-5 mt-5 mb-10'>
        {cities.length > 0 ? (
          cities.map((city, index) => (
            // CITY CARD
            <div key={index} className='city-card h-3/4 flex flex-col gap-5 border-2 border-zinc-200 shadow-lg p-3 rounded-2xl'>
              <h3 className='text-2xl uppercase'>{city.data.name}</h3>

              <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-2'>
                <div className='w-block bg-orange-300 rounded-tl-3xl border-orange-400 border-b-8'>
                  <p className='card-title '>Aktualna temperatura</p>
                  <p className='w-full p-2 flex items-center justify-center text-3xl'>
                    {Math.round(city.data.main.temp)}&deg;C
                  </p>
                </div>
                <div className='w-block bg-orange-400 border-orange-500 border-b-8'>
                  <p className='card-title '>Maksymalna temperatura</p>
                  <p className='w-full p-2 flex items-center justify-center text-3xl'>
                    {Math.round(city.data.main.temp_max)}&deg;C
                  </p>
                </div>
                <div className='w-block bg-orange-100 border-orange-300 border-b-8'>
                  <p className='card-title '>Minimalna temperatura</p>
                  <p className='w-full p-2 flex items-center justify-center text-3xl'>
                    {Math.floor(city.data.main.temp_min)}&deg;C
                  </p>
                </div>
                <div className='w-block bg-blue-200 flex flex-row justify-between'>
                  <p className='card-title '>Pogoda</p>
                  <div className=''>
                    <img
                      src={`http://openweathermap.org/img/wn/${city.data.weather[0].icon}@2x.png`}
                      alt={city.data.weather[0].description}
                    />
                  </div>
    
                      {city.data.weather[0].icon.includes('n')
                        ? <p className='flex items-center p-2 bg-blue-950 rounded-xl uppercase text-white'>Noc</p>
                        : <p className='flex items-center p-2 bg-yellow-200 rounded-xl uppercase text-black'>Dzień</p>
                        }
                </div>
                <div className='w-block bg-blue-200'>
                  <p className='card-title '>Opis</p>
                  <p className='w-full p-2 flex items-center justify-center text-3xl'>
                    {plWeatherDescription(
                      city.data.weather[0].description,
                      city.data.weather[0].id
                    )}           
                  </p>
                </div>
                <div className='w-block bg-blue-200'>
                  <p className='card-title '>Prędkość wiatru</p>
                  <p className='w-full p-2 flex items-center justify-center text-3xl'>
                    {Math.round(city.data.wind.speed)} m/s
                  </p>
                </div>
              </div>

              <div className='w-block p-8 bg-blue-300 rounded-br-3xl'>
                <p className='card-title '>Kierunek wiatru: </p>
                <p className='flex items-center justify-center text-3xl'>
                  {getWindDirection(city.data.wind.deg)}
                </p>
              </div>

              {/* Button to remove city */}
              <button
                className='mt-4 px-6 py-2 bg-red-500 text-white rounded-xl'
                onClick={() => deleteCity(index)}
              >
                Usuń
              </button>
            </div>
          ))
        ) : (
          <div className='w-full h-screen flex flex-col items-center justify-center text-2xl'>
            <p className='card-title italic shadow-xl px-6 py-2 rounded-xl bg-slate-100 text-blue-950'>
              jeszcze nie wybrałeś miasta
            </p>
          </div>
        )}
      </section>

      <Footer />
    </section>
  );
}

export default App;
