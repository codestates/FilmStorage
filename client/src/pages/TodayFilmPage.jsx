/* TODO : 오늘의 필름 페이지 입니다. */
import React, { useState, useEffect } from "react";
import Select from "react-select";
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
import WeekendFilm from "../components/todayfilm/WeekendFilm";

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

  // Day Option 저장
  const [dayOption, setDayOption] = useState("오늘의 날씨");
  // City Option 저장
  const [cityOption, setCityOption] = useState("현재 위치");

  const [selectLat, setSelectLat] = useState(""); // 위도 저장
  const [selectLng, setSelectLng] = useState(""); // 경도 저장

  console.log(
    "데이옵션 : ",
    dayOption,
    "시티옵션 : ",
    cityOption,
    "위도 :",
    selectLat,
    "경도 :",
    selectLng
  );
  // * React Select Option
  // select를 두개 만들고, 첫번째 값이 변경될때마다 useEffect 실행해서
  // 두번째 셀렉트 목록을 다르게 출력하도록 구현
  const dayOptions = [
    { value: "오늘의 날씨", label: "오늘의 날씨" },
    { value: "주말의 날씨", label: "주말의 날씨" },
  ];
  const cityOptions = [
    { value: "현재 위치", label: "현재 위치" },
    { value: "서울", label: "서울", lat: "37.56667", lng: "126.97806" },
    { value: "인천", label: "인천", lat: "37.45639", lng: "126.70528" },
    { value: "강릉", label: "강릉", lat: "37.75000", lng: "128.88333" },
    { value: "대전", label: "대전", lat: "36.35111", lng: "127.38500" },
    { value: "청주", label: "청주", lat: "36.64389", lng: "127.48944" },
    { value: "대구", label: "대구", lat: "35.87222", lng: "128.60250" },
    { value: "전주", label: "전주", lat: "35.82500", lng: "127.15000" },
    { value: "광주", label: "광주", lat: "35.15972", lng: "126.85306" },
    { value: "울산", label: "울산", lat: "35.53889", lng: "129.31667" },
    { value: "부산", label: "부산", lat: "35.17944", lng: "129.07556" },
    { value: "제주", label: "제주", lat: "33.50000", lng: "126.51667" },
    { value: "거제", label: "거제", lat: "34.88333", lng: "128.62500" },
  ];

  // * 현재 위치를 기준으로 날씨 정보 호출
  const successAndGetWeather = (position) => {
    // 셀렉 정보가 오늘 + 현재 위치 일 경우
    let url;
    const apiKey = process.env.REACT_APP_WEATHER_KEY;

    if(cityOption === "현재 위치"){
      const lat = position.coords.latitude;
      const log = position.coords.longitude;
      url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${log}&units=metric&lang=kr&appid=${apiKey}`;
    } else {
      // 현재 위치가 아닐 때
      url = `https://api.openweathermap.org/data/2.5/weather?lat=${selectLat}&lon=${selectLng}&units=metric&lang=kr&appid=${apiKey}`;
    }
    // console.log("위도오오오오오오!!!!", selectLat);
    // console.log("경동경도경도경도오오오!!!!", selectLng);
    axios
      .get(url, {
        withCredentials: false,
      })
      .then((res) => {
        const { clouds, main, sys, weather, name } = res.data;

        // split를 이용해서 시간(숫자만) 출력
        const timeConvert = (time) => {
          return `${time.split(" ")[0]} ${time.split(" ")[1].split(":")[0]}시 ${
            time.split(" ")[1].split(":")[1]
          }분`;
        };

        // 일몰,일출 시간 저장
        const sunriseTime = new Date(sys.sunrise * 1000).toLocaleTimeString();
        const sunsetTime = new Date(sys.sunset * 1000).toLocaleTimeString();
        // console.log(timeConvert(sunriseTime))
        // 날씨 전체 정보 저장
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

        setCurWeather(weatherInfo);
        // console.log("현ㄹ재 위치이이이이", curWeather);
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
    handleLoading();
  }, [selectLat, selectLng]);

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
    let secondTimer = setTimeout(() => setIsLoaded(false), 1200);
    return () => {
      clearTimeout(secondTimer);
    };
  };

  useEffect(() => {
    handleIcon(curWeather.main);
  }, [curWeather.main]);

  return (
    <>
      {isLoaded ? (
        <LoadingContainer>
          <Loader />
        </LoadingContainer>
      ) : (
        <Container>
          <SelectOptionWrap>
            <SelectOption
              options={dayOptions}
              onChange={(e) => setDayOption(e.value)}
              defaultValue={dayOptions[0]}
            />
            <SelectOption
              options={cityOptions}
              onChange={(e) => {
                setCityOption(e.value);
                setSelectLat(e.lat);
                setSelectLng(e.lng);
              }}
              defaultValue={cityOptions[0]}
            />
          </SelectOptionWrap>
          <WeatherBox>
            <FontAwesomeIcon icon={weatherIcon} />
          </WeatherBox>
          <div className="text-box">
            <p>현재 위치의 날씨에 따라 적합한 필름을 추천해 드려요!</p>
            <h3>
              오늘의 {curWeather.name}의 날씨는 {curWeather.main}
              <br />
              {curWeather.weatherDesc} 환경에서는 감도가 높은 필름을
              추천해드려요.
            </h3>
          </div>
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
          <HideBox>
            <WeekendFilm curName={curWeather} />
          </HideBox>
        </Container>
      )}
    </>
  );
}
const HideBox = styled.div`
  display: none;
`;

const Container = styled.div`
  /* border: 1px solid red; */
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  align-items: center;

  p {
    padding: 5px 10px;
    font-size: 14px;
    font-weight: 600;
    color: #fff;
    background-color: tomato;
    border-radius: 20px;
  }
  div.text-box {
    /* border: 1px solid red; */
    /* padding: 50px 200px; */
    /* margin: 10px;
    border-radius: 10px;
    box-shadow: 5px 5px 20px Gainsboro; */
  }
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

const SelectOptionWrap = styled.form`
  /* border: 1px solid red; */
  display: flex;
`;

const SelectOption = styled(Select)`
  /* border: 1px solid red; */
  /* padding: 10px; */
  margin: 50px 5px 10px 5px;
  width: 250px;
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
