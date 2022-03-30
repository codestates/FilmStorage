/* TODO : 오늘의 필름 페이지 입니다. */
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloud } from "@fortawesome/free-solid-svg-icons";
import { faSun } from "@fortawesome/free-solid-svg-icons";
import { faBolt } from "@fortawesome/free-solid-svg-icons";
import { faWater } from "@fortawesome/free-solid-svg-icons";
import { faUmbrella } from "@fortawesome/free-solid-svg-icons";
import { faSnowflake } from "@fortawesome/free-solid-svg-icons";
import { faSmog } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import Loader from "../components/Loader";
import TodayFilmResult from "../components/todayfilm/TodayFilmResult";

export default function TodayFilmPage() {
  // 날씨정보 상태 관리
  const [curWeather, setCurWeather] = useState({});
  // 날씨아이콘 상태 관리
  const [weatherIcon, setWeatherIcon] = useState(faCloud);
  // 로딩 관리
  const [isLoaded, setIsLoaded] = useState(true);
  // 필름 결과 관리
  const { Clouds, Clear, Rain, Snow } = TodayFilmResult;
  const [filmResult, setFilmResult] = useState(Clouds);

  // console.log(Clouds);

  const successAndGetWeather = (position) => {
    const lat = position.coords.latitude;
    const lng = position.coords.longitude;
    const apiKey = "3ec77581799218a8534c31f41598f3f4";
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&units=metric&appid=${apiKey}`;

    axios
      .get(url, {
        withCredentials: false,
      })
      .then((res) => {
        // console.log(res.data);
        // console.log("지역", res.data.name);

        const { clouds, main, sys, weather, name } = res.data;

        const timeConvert = (time) => {
          return `${time.split(" ")[0]} ${time.split(" ")[1].split(":")[0]}시 ${
            time.split(" ")[1].split(":")[1]
          }분`;
        };

        const sunriseTime = new Date(sys.sunrise * 1000).toLocaleTimeString();
        const sunsetTime = new Date(sys.sunset * 1000).toLocaleTimeString();

        let weatherInfo = {
          clouds: clouds.all, // %
          temp: main.temp,
          sunrise: timeConvert(sunriseTime), // 시간
          sunset: timeConvert(sunsetTime),
          weatherIcon: weather[0].icon,
          weatherDesc: weather[0].description,
          name: name,
          main: weather[0].main,
        };

        console.log(curWeather.weatherDesc);

        setCurWeather(weatherInfo);
        handleIcon(curWeather.main);
      });
  };

  const error = (err) => {
    alert("위치 정보를 가져오는데 실패했습니다");
  };

  const getWeatherOfCurLocation = () => {
    navigator.geolocation.getCurrentPosition(successAndGetWeather, error, {
      enableHighAccuracy: true,
    });
  };

  useEffect(() => {
    getWeatherOfCurLocation();
  }, []);

  // 날씨에 따른 아이콘 변경 함수
  const handleIcon = (info) => {
    if (info === "Clouds") {
      setWeatherIcon(faCloud);
      setFilmResult(Clouds);
    } else if (info === "Clear") {
      setWeatherIcon(faSun);
      setFilmResult(Clear);
    } else if (info === "Thunderstorm") {
      setWeatherIcon(faBolt);
      setFilmResult(Rain);
    } else if (info === "Drizzle") {
      setWeatherIcon(faWater);
      setFilmResult(Rain);
    } else if (info === "Rain") {
      setWeatherIcon(faUmbrella);
      setFilmResult(Rain);
    } else if (info === "Snow") {
      setWeatherIcon(faSnowflake);
      setFilmResult(Snow);
    } else if (info === "Atmosphere") {
      setWeatherIcon(faSmog);
      setFilmResult(Clouds);
    } else {
      setWeatherIcon(faCloud);
      setFilmResult(Clouds);
    }
  };

  // 로딩 페이지 구현
  const handleLoading = () => {
    let secondTimer = setTimeout(() => setIsLoaded(false), 1000);
    return () => {
      clearTimeout(secondTimer);
    };
  };

  useEffect(() => {
    handleLoading();
  }, []);

  return (
    <>
      {isLoaded ? (
        <LoadingContainer>
          <Loader />
        </LoadingContainer>
      ) : (
        <Container>
          <h2>현재 위치의 날씨에 따라 적합한 필름을 추천해 드려요!</h2>
          <WeatherBox>
            <FontAwesomeIcon icon={weatherIcon} />
          </WeatherBox>
          <h3>
            오늘의 {curWeather.name}의 날씨는 {curWeather.main}
            <br />
            {curWeather.weatherDesc} 환경에서는 감도가 높은 필름을 추천해드려요.
          </h3>
          {/* <h3 className="filmtitle">일출사진 : {curWeather.sunrise}</h3>
          <h3 className="filmtitle">일몰사진 : {curWeather.sunset}</h3> */}
          <Section>
            {filmResult.map((el, idx) => {
              // console.log("이거 봐보", el);
              return (
                <>
                  <FilmBox>
                    <img
                      className="filmimg"
                      src={el.imglink}
                      alt="film"
                      key={idx}
                    />
                    <h3 className="filmtitle">{el.filmname}</h3>
                    <p className="filminfo">필름설명이 필요한곳 입니다.</p>
                  </FilmBox>
                </>
              );
            })}
          </Section>
        </Container>
      )}
    </>
  );
}

const Container = styled.div`
  /* border: 1px solid red; */
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  align-items: center;
`;

const Section = styled.section`
  width: 60vw;
  height: 100%;
  /* border: 1px solid blue; */
  display: flex;
  justify-content: space-around;
  margin-top: 3rem;
  margin-bottom: 10rem;
  flex-wrap: wrap;
`;

const FilmBox = styled.div`
  width: 20vw;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  > h3.filmtitle {
    margin-top: 10px;
  }
  > img.filmimg {
    height: 15vh;
    /* width: 10vw; */
    object-fit: cover;
  }
  > p.filminfo {
    font-size: 13px;
  }
`;

const WeatherBox = styled.div`
  font-size: 13rem;
  color: tomato;
`;

const LoadingContainer = styled.div`
  width: 100%;
  height: 100vh;
  text-align: center;
`;
