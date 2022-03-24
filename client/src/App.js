import "./App.css";
import styled from "styled-components";
import MainPage from "./pages/MainPage";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {

  const API_KEY = '75bcf05d245a71759451d741aeec0d3c';

  function onGeoOk(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    // console.log(`You live in ${latitude} and ${longitude}`);

    fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`,
    )
      .then(response => response.json())
      .then(data => console.log(`온도 : ${data.main.temp}, 날씨 : ${data.weather[0].main}, 위도:${data.coord.lat},경도:${data.coord.lon}`));
    // .then(data => console.log(data))
  }

  function onGeoError() {
    alert("Can't find you. No weather for you.");
  }

  navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError);

  return (
    <div className="App">
      <Header />
      <MainPage />
      <Footer />
    </div>
  );
}

export default App;
