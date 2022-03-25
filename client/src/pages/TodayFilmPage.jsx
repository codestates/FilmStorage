/* TODO : 오늘의 필름 페이지 입니다. */
import React from "react";
import styled from "styled-components";

const Imgs = styled.img`
  width : 200px;
  height : 200px;
`

const profiles = [
  "https://localhost:4000/users/profile/1352356_1_profile.jpg",
  "https://localhost:4000/users/profile/781581_1_profile.jpg",
  "https://localhost:4000/users/profile/1248688_1_profile.jpg"
]

function TodayFilmPage() {

  // const API_KEY = '75bcf05d245a71759451d741aeec0d3c';

  // function onGeoOk(position) {
  //   const latitude = position.coords.latitude;
  //   const longitude = position.coords.longitude;

  //   // console.log(`You live in ${latitude} and ${longitude}`);

  //   fetch(
  //     `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`,
  //   )
  //     .then(response => response.json())
  //     .then(data => console.log(`온도 : ${data.main.temp}, 날씨 : ${data.weather[0].main}, 위도:${data.coord.lat},경도:${data.coord.lon}`));
  //   // .then(data => console.log(data))
  // }

  // function onGeoError() {
  //   alert("Can't find you. No weather for you.");
  // }

  // navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError);

  return (
    <>
      <section>
        <h3>오늘의 필름 페이지 입니다.</h3>
        {profiles ? profiles.map((profile,idx) => {
          return <Imgs key={idx} src={profile} />
        }) : null}
      </section>
    </>
  );
}

export default TodayFilmPage;