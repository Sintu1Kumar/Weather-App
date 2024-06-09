import { useState } from "react";
import { Button } from "react-bootstrap";
import { FaSearch, FaSun, FaMoon, FaWind } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { WiHumidity } from "react-icons/wi";
import dateFormat from "dateformat";
import axios from "axios";

const Weather = () => {
  const [searchCity, setSearchCity] = useState();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [weather, setWeather] = useState({
    name: "Delhi",
    celcius: 34,
    imageicon: "01d",
    discription: "Sky is clear",
    humidity: 21,
    wind: 3,
  });

  const handleClick = () => {
    if (searchCity !== "") {
      const URL = `https://api.openweathermap.org/data/2.5/weather?appid=ffc1189c1cbf80472e03d2421efe38e9&units=metric&q=${searchCity}`;
      axios
        .get(URL)
        .then((res) => {
          setWeather({
            ...weather,
            name: res.data.name,
            celcius: res.data.main.temp,
            imageicon: res.data.weather[0].icon,
            discription: res.data.weather[0].description,
            humidity: res.data.main.humidity,
            wind: res.data.wind.speed,
          });
          console.log(res.data);
        })
        .catch((err) => {
          if (err.status == 404) {
            alert("Invalid City Name");
            console.log(err.status);
          }
        });
    }
  };

  let currentDate = () => {
    const now = new Date();
    return dateFormat(now, "dddd, mmmm dS, h:MM TT");
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className={isDarkMode ? "dark-mode" : "light-mode"}>
      <div className="container">
        <div
          className="p-3 d-flex justify-content-center align-items-center"
          style={{ height: "100vh" }}
        >
          <div className="col-md-4 border p-3 shadow rounded-4">
            <div className="d-flex flex-column justify-content-center align-items-center gap-2">
              <h3>Weather App</h3>
              <form>
                <div className="p-relative d-flex justify-content-center align-items-center">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter City Name/Zip Code"
                    onChange={(e) => setSearchCity(e.target.value)}
                  />
                  <Button onClick={handleClick}>
                    <FaSearch size={20} />
                  </Button>
                </div>
              </form>
              <h6>{currentDate()}</h6>
              <h4>
                <FaLocationDot /> {weather.name}
              </h4>
              <h2>{weather.celcius}°C</h2>
              <img
                src={`https://openweathermap.org/img/wn/${weather.imageicon}@2x.png`}
                alt="cloud img"
              />
              <p>{weather.discription}</p>
              <div className="d-flex gap-5">
                <div className="d-flex flex-column justify-content-center align-items-center">
                  <FaWind size={25} />
                  <span>{weather.wind}Km/h</span>
                  <span>Wind</span>
                </div>
                <div className="d-flex flex-column justify-content-center align-items-center">
                  <WiHumidity size={25} />
                  <span>{weather.humidity}%</span>
                  <span>Humidity</span>
                </div>
                <Button onClick={toggleDarkMode}>
                  {isDarkMode ? (
                    <div className="d-flex flex-column justify-content-center align-items-center gap-2">
                      <span>Light</span>
                      <FaSun />
                    </div>
                  ) : (
                    <div className="d-flex flex-column justify-content-center align-items-center gap-2">
                      <span>Dark</span>
                      <FaMoon />
                    </div>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Weather;
