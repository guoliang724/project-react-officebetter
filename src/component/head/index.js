import React, { useState, useEffect } from "react";
import { reqWeather } from "../../api/index";
import LinkButton from "../../pages/linkbutton";
import "./index.css";

export default function Head() {
  const [date, setCurrendate] = useState();
  const [city, setCity] = useState("Calgary");
  const [icon, setIcon] = useState(`http://openweathermap.org/img/w/10d.png`);
  const [main, setMain] = useState();
  const timer = setInterval(() => {
    if (timer) clearInterval(timer);
    const date = new Date(Date.now());
    const dateFormat = `${date.getFullYear()}/${
      date.getMonth() + 1
    }/${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
    setCurrendate(dateFormat);
  }, 1000);

  useEffect(() => {
    async function getWeather() {
      const weather = await reqWeather(city);
      if (weather) {
        const { icon, main } = weather.data.weather[0];
        setIcon(icon);
        setMain(main);
      }
      //   const { icon, main } = weather[0];

      //   console.log(weather);
    }
    getWeather();
  }, [city]);
  return (
    <>
      <div className="logo"></div>
      <div className="dashboard">
        <div className="upper">
          <div>
            <span>Welcome</span>
            <span>admin</span>
            <LinkButton>Exit</LinkButton>
          </div>
        </div>
        <div className="lower">
          <div>
            <span>{city}</span>
            <span>{date}</span>
            <span>{main}</span>
            <span>
              <img alt="" src={`http://openweathermap.org/img/w/${icon}.png`} />
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
