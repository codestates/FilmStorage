import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styled from "styled-components";

const SlideImg = styled.img`
  width: 100%;
  height: 400px;
  object-fit: none;
`;

export default function SimpleSlider() {
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 3000,
    cssEase: "linear",
  };
  return (
    <Slider {...settings}>
      <div>
        <SlideImg src="https://user-images.githubusercontent.com/89363048/159869612-9afbf915-e26d-42de-9bd0-f33270b346f7.jpeg"></SlideImg>
      </div>
      <div>
        <SlideImg src="https://user-images.githubusercontent.com/89363048/159873638-1e87c603-afe1-45f6-822a-ba840dd9430f.jpeg"></SlideImg>
      </div>
      <div>
        <SlideImg src="https://user-images.githubusercontent.com/89363048/159873800-b4f990c7-6485-4f41-8e30-637cec285ba3.jpeg"></SlideImg>
      </div>
    </Slider>
  );
}
