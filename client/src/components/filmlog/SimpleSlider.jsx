import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styled from "styled-components";



export default function SimpleSlider() {
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 1000,
    autoplaySpeed: 3000,
    cssEase: "linear",
  };
  return (
    <Slider {...settings}>
      <div>
        <SlideImg src="https://user-images.githubusercontent.com/87605663/160064358-093593d6-0cef-4153-94d5-ab443b9e5b90.jpeg"></SlideImg>
      </div>
      <div>
        <SlideImg src="https://user-images.githubusercontent.com/87605663/160064391-93a8233c-e2ce-4f5d-959a-a11976e1d700.jpeg"></SlideImg>
      </div>
      <div>
        <SlideImg src="https://user-images.githubusercontent.com/87605663/160064397-9f51dd58-8edc-4cc0-adc9-db0c3b3baecc.jpeg"></SlideImg>
      </div>
    </Slider>
  );
}

const SlideImg = styled.img`
  width: 100vw;
  height: 80vh;
  object-fit: cover;
`;