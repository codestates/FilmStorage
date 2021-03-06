import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styled from "styled-components";
import Loader from "../Loader";
import { useHistory } from "react-router-dom";

export default function SimpleSlider({ topThree }) {
  const history = useHistory();

  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 1000,
    autoplaySpeed: 3000,
    cssEase: "linear",
    arrows: false,
  };

  const handlePictureDetail = (id) => {
    return history.push(`/filmlogdetail/${id}`);
  };

  if (!topThree.length) {
    return <Loader />;
  } else {
    return (
      <Slider {...settings}>
        {topThree.map((info) => {
          return (
            <div key={info.id}>
              <SlideImg
                src={info.photo}
                onDoubleClick={() => handlePictureDetail(info.id)}
              ></SlideImg>
            </div>
          );
        })}
      </Slider>
    );
  }
}

const SlideImg = styled.img`
  width: 100vw;
  height: 85vh;
  object-fit: cover;
  &:hover {
    cursor: pointer;
  }
  @media screen and (max-width: 1024px) {
    object-fit: fill;
    height: 50vh;
  }

  @media screen and (max-width: 412px) {
    object-fit: fill;
    height: 30vh;
  }
`;
