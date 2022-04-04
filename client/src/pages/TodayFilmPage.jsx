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
import WeekendFilmPage from "./weekendFilmPage";
import { faBluetooth } from "@fortawesome/free-brands-svg-icons";

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
  
  // * React Select * //
  // select를 두개 만들고, 첫번째 값이 변경될때마다 useEffect 실행해서
  // 두번째 셀렉트 목록을 다르게 출력하도록 구현
  const dayOptions = [
    { value: "오늘의 날씨", label: "오늘의 날씨" },
    { value: "주말의 날씨", label: "주말의 날씨" },
  ];
  const cityOptions = [
    { value: "서울", label: "서울" },
    { value: "춘천", label: "춘천" },
    { value: "강릉", label: "강릉" },
    { value: "대전", label: "대전" },
    { value: "청주", label: "청주" },
    { value: "대구", label: "대구" },
    { value: "전주", label: "전주" },
    { value: "광주", label: "광주" },
    { value: "부산", label: "부산" },
    { value: "제주", label: "제주" },
    { value: "백령", label: "백령" },
    { value: "울릉/독도", label: "울릉/독도" },
  ];

  // const customStyles = {
  //   option: (provided, state) => ({
  //     ...provided,
  //     borderBottom: "1px dooted pink",
  //     color: state.isSelected ? "#fff" : "#444",
  //     backgroundColor: state.isSelected ? "tomato" : "white",
  //     // padding: 20,
  //     width: 300,
  //   }),
  //   control: () => ({
  //     // none of react-select's styles are passed to <Control />
  //     // width: 300,
  //   }),
  //   singleValue: (provided, state) => {
  //     const opacity = state.isDisabled ? 0.5 : 2;
  //     const transition = "opacity 300ms";

  //     return { ...provided, opacity, transition };
  //   },
  // };

  const successAndGetWeather = (position) => {
    const lat = position.coords.latitude;
    const lng = position.coords.longitude;
    const apiKey = process.env.REACT_APP_WEATHER_KEY;
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&units=metric&lang=kr&appid=${apiKey}`;

    axios
      .get(url, {
        withCredentials: false,
      })
      .then((res) => {
        const { clouds, main, sys, weather, name } = res.data;

        const timeConvert = (time) => {
          return `${time.split(" ")[0]} ${time.split(" ")[1].split(":")[0]}시 ${
            time.split(" ")[1].split(":")[1]
          }분`;
        };

        const sunriseTime = new Date(sys.sunrise * 1000).toLocaleTimeString();
        const sunsetTime = new Date(sys.sunset * 1000).toLocaleTimeString();
        // console.log(timeConvert(sunriseTime))
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
              // styles={customStyles}
              defaultValue={dayOptions[0]}
            />
            <SelectOption
              options={cityOptions}
              // styles={customStyles}
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
            <WeekendFilmPage curName={curWeather} />
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
