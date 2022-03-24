import React from "react";
import styled, { keyframes } from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

/* styled-components */
const Container = styled.div`
  /* border: 1px solid red; */
  /* background: Gainsboro; */
  width: 1000px;
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
  /* align-items: ${(props) => (props.center ? "center" : "left")}; */
  width: 500px;
  height: 500px;
`;

const Title = styled.h1`
  font-size: 70px;
  margin: ${(props) => props.morginBottom || "0px"};
  color: #444;
`;
const SubTitle = styled.p`
  font-size: 30px;
  margin: ${(props) => props.morginBottom || "0px"};
  color: #444;
  /* border: 3px solid blue; */
`;
const Img = styled.img`
  width: 230px;
  padding: 50px 100px;
  animation-fill-mode: forwards;
`;
const Button = styled.button`
  width: 250px;
  padding: 20px;
  margin: 30px 0;
  border: none;
  border-radius: 30px;
  font-size: 18px;
  font-weight: 700;
  color: #444;
  cursor: pointer;
  &:hover {
    background: tomato;
    color: white;
    transition: 0.4s;
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
          <SubTitle>를 사용해 보세요</SubTitle>
          <Button>
            오늘의 필름 추천 받기
            <FontAwesomeIcon icon={faArrowRight} className="icon" />
          </Button>
        </Content>
      </Container>
    </>
  );
}

export default GoToTodayFilm;
