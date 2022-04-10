import React from "react";
import styled, { keyframes } from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
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
  @media screen and (max-width: 768px) {
    flex-direction: column-Reverse;
    padding: 100px 0;
  }
  @media screen and (max-width: 412px) {
    padding: 20px 0;
  }
`;

const Content = styled.div`
  /* border: 3px solid blue; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: ${(props) => (props.center ? "center" : "left")};
  width: 500px;
  height: 500px;
  @media screen and (max-width: 768px) {
    /* border: 3px solid blue; */
    align-items: center;
    padding: 30px 0;
  }
`;

const Title = styled.h1`
  font-size: 70px;
  margin: 10px 0px;
  color: #444;
  @media screen and (max-width: 412px) {
    /* border: 1px solid red; */
    font-size: 40px;
  }
`;
const SubTitle = styled.p`
  font-size: 30px;
  line-height: 1.6em;
  margin: 0 0 0 3px;
  color: #444;
  /* border: 3px solid blue; */
  @media screen and (max-width: 768px) {
    /* border: 3px solid blue; */
    text-align: center;
  }
  @media screen and (max-width: 412px) {
    /* border: 1px solid red; */
    font-size: 20px;
  }
`;
const Img = styled.img`
  width: 230px;
  padding: 50px 100px;
  animation-fill-mode: forwards;
  @media screen and (max-width: 412px) {
    /* border: 1px solid red; */
    font-size: 20px;
    width: 180px;
    padding: 0;
  }
`;
const Button = styled.button`
  /* border: 1px solid red; */
  width: 90%;
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

function GoToTodayFilm() {
  return (
    <>
      <Container
        data-aos="fade-up"
        data-aos-duration="700"
        data-aos-anchor-placement="top-center"
      >
        <Content>
          <Img src="https://user-images.githubusercontent.com/87605663/159730302-7e8be631-9192-4c3e-8986-ef3f1dc76cd1.png" />
        </Content>
        <Content>
          <SubTitle>
            오늘의 날씨는 맑음 ☀️
            <br />
            청량한 분위기의
          </SubTitle>
          <Title>후지 c200</Title>
          <Link to="todayfilm">
            <Button>
              오늘의 필름 추천 받기
              <FontAwesomeIcon icon={faArrowRight} className="icon" />
            </Button>
          </Link>
        </Content>
      </Container>
    </>
  );
}

export default GoToTodayFilm;
