import React from "react";
import styled, { keyframes } from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { faMapLocationDot } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

/* styled-components */
const Container = styled.div`
  /* border: 1px solid red; */
  /* background: Gainsboro; */
  width: 100%;
  height: 500px;
  margin: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Content = styled.div`
  /* border: 3px solid blue; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 500px;
  @media screen and (max-width: 768px) {
    /* border: 3px solid blue; */
    flex-direction: column;
    padding: 30px 0;
  }
`;

const Title = styled.h1`
  font-size: 40px;
  text-align: center;
  /* margin: ${(props) => props.morginBottom || "0px"}; */
  color: #444;
  @media screen and (max-width: 412px) {
    /* border: 1px solid red; */
    font-size:40px;
  }
`;
const MapIcon = styled(FontAwesomeIcon)`
  /* border: 3px solid blue; */
  font-size: 150px;
  padding: 20px;
  color: tomato;
`;
const Button = styled.button`
  width: 100%;
  text-align: left;
  padding: 20px 3px;
  border: none;
  font-size: 18px;
  font-weight: 700;
  background: none;
  color: tomato;
  cursor: pointer;
  &:hover {
    /* background: tomato; */
    color: #666;
    transition: 0.2s;
  }
  .icon {
    /* margin-left: 200px; */
  }
  @media screen and (max-width: 768px) {
    /* border: 3px solid blue; */
    width: 100%;
  }
`;

function GoToFilmSpot() {
  return (
    <>
      <Container>
        <Content
          data-aos="fade-up"
          data-aos-duration="700"
          data-aos-anchor-placement="top-center"
        >
          <Title>어디서 찍어야 될지 모르겠다면?</Title>
          <MapIcon icon={faMapLocationDot} />
          <Link to="map">
            <Button>
              필름 스팟 보러가기
              <FontAwesomeIcon icon={faArrowRight} className="icon" />
            </Button>
          </Link>
        </Content>
      </Container>
    </>
  );
}

export default GoToFilmSpot;
