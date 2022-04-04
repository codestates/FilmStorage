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

export default function WeekendFilmPage() {
  // 날씨정보 상태 관리
  const [curWeather, setCurWeather] = useState({});

  console.log(curWeather);
  // 날씨아이콘 상태 관리
  const [weatherIcon, setWeatherIcon] = useState(faCloud);
  // 로딩 관리
  const [isLoaded, setIsLoaded] = useState(true);
  // 필름 결과 관리
  const { Clouds, Clear, Rain, Snow } = TodayFilmResult;
  const [filmResult, setFilmResult] = useState(Clouds);

  // console.log(Clouds);

  //주말 날짜 구현 함수
  //현재 유저 접속 날짜

  let userDate = new Date().getDay();
  let dayNum;

  function Saturday(userDate) {
    // 날씨 api에 사용될 숫자

    //반복문으로 정리
    for (let i = 1; i <= 5; i++) {
      //오늘이 토요일인 경우 그대로 리턴
      if (userDate === 6) {
        dayNum = 0;
      }
      //오늘이 일요일인 경우 그대로 리턴
      if (userDate === 0) {
        dayNum = 0;
      }
      //평일인 경우 토요일로 설정
      if (userDate === i) {
        dayNum = 6 - i;
      }
    }
    return dayNum;
  }

  const successAndGetWeather = (position) => {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    const apiKey = process.env.REACT_APP_WEATHER_KEY;

    //주말날씨 api 요청
    const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&lang=kr&appid=${apiKey}`;
    const url2 = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&lang=kr&appid=${apiKey}`;

    axios
      .get(url, {
        withCredentials: false,
      })
      .then((res) => {
        //7일치 날씨
        //daily[var] 들어갈 var 선언
        //
        console.log("현재요일정보", dayNum);
        // console.log('7일 날씨정보',res.data)

        const weatherMain = res.data.daily[dayNum].weather[0].main;
        const weatherDescription =
          res.data.daily[dayNum].weather[0].description;

        // setCurWeather({weatherMain,weatherDescription})
        // console.log('주말날씨',weatherMain,'주말날씨묘사',weatherDescription)

        axios
          .get(url2, {
            withCredentials: false,
          })
          .then((res) => {
            console.log("현재지역명", res.data.name);
            const weatherName = res.data.name;
            setCurWeather({ weatherMain, weatherDescription, weatherName });
            console.log("현재날씨정보", curWeather);
          });
      });
  };

  const error = (err) => {
    alert("위치 정보를 가져오는데 실패했습니다");
  };

  // console.log(curWeather.main);

  const getWeatherOfCurLocation = () => {
    navigator.geolocation.getCurrentPosition(successAndGetWeather, error, {
      enableHighAccuracy: true,
    });
  };

  useEffect(() => {
    Saturday(userDate);
    getWeatherOfCurLocation();
    handleLoading();
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
    } else if (info === "Fog") {
      setWeatherIcon(faSmog);
      setFilmResult(Clouds);
    } else {
      setWeatherIcon(faSmog);
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
    handleIcon(curWeather.weatherMain);
  }, [curWeather]);

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
            토요일의 {curWeather.weatherName}의 날씨는 {curWeather.weatherMain}
            <br />
            {curWeather.weatherDescription} 환경에서는 감도가 높은 필름을
            추천해드려요.
          </h3>
          {/* <h3 className="filmtitle">일출사진 : {curWeather.sunrise}</h3>
          <h3 className="filmtitle">일몰사진 : {curWeather.sunset}</h3> */}
          <Section>
            {filmResult.map((el, idx) => {
              return (
                <div key={idx}>
                  <FilmBox>
                    <img className="filmimg" src={el.imglink} alt="film" />
                    <h3 className="filmtitle">{el.filmname}</h3>
                    <p className="filminfo">필름설명이 필요한곳 입니다.</p>
                  </FilmBox>
                </div>
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
