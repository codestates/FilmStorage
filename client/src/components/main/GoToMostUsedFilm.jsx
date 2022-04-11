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
  display: flex;
  justify-content: center;
  align-items: center;
  // 태블릿
  @media screen and (max-width: 1024px) {
    /* border: 1px solid red; */
    padding: 100px 0;
  }
  // 모바일
  @media screen and (max-width: 412px) {
    flex-direction: column;
    padding: 20px 0;
  }
`;

const Content = styled.div`
  /* border: 3px solid blue; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  /* align-items: ${(props) => (props.center ? "center" : "left")}; */
  align-items: center;
  width: 500px;
  height: 500px;
  @media screen and (max-width: 1024px) {
    /* border: 3px solid blue; */
    flex: ${(props) => props.flex || 0};
    align-items: center;
  }
  @media screen and (max-width: 412px) {
    /* border: 3px solid blue; */
    align-items: center;
    height: 250px;
    width: 380px;
  }
`;

const Title = styled.h1`
  /* border: 1px solid red; */
  font-size: 70px;
  margin: 0;
  padding: 20px 0;
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
  text-align: center;
  /* border: 3px solid blue; */
  @media screen and (max-width: 1024px) {
    /* border: 3px solid blue; */
  }
  @media screen and (max-width: 412px) {
    /* border: 1px solid red; */
    font-size: 20px;
  }
`;

const Img = styled.img`
  width: 200px;
  animation-fill-mode: forwards;
  @media screen and (max-width: 1024px) {
    /* border: 1px solid red; */
  }
  @media screen and (max-width: 412px) {
    /* border: 1px solid red; */
    width: 150px;
  }
`;
const Button = styled.button`
  width: 100%;
  text-align: left;
  padding: 10px 3px;
  border: none;
  /* border: 1px solid red; */
  /* border-radius: 30px; */
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
`;

function GoToMostUsedFilm() {
  return (
    <>
      <Container>
        <Content
          flex="3"
          data-aos="fade-right"
          // data-aos-offset="300"
          data-aos-duration="700"
          data-aos-easing="ease-in-sine"
        >
          <SubTitle>
            필름 로그에 가장 많이 <br />
            업로드된 필름
          </SubTitle>
          <Title>코닥 컬러 200</Title>
          {/* <Description>
            컷수 : 36컷 | 필름크기 : 135 | 용도 : 주광용 | 감도(필름) : ISO200 |
            <br />
            품목 : 컬러필름 | 필름종류 : 35mm필름 | 매수 : 36장
          </Description> */}
          <Link to="/filmlog">
            <Button>
              필름로그로 가기
              <FontAwesomeIcon icon={faArrowRight} className="icon" />
            </Button>
          </Link>
        </Content>
        <Content
          flex="2"
          center
          data-aos="fade-right"
          // data-aos-offset="300"
          data-aos-duration="700"
          data-aos-easing="ease-in-sine"
        >
          <Img src="https://user-images.githubusercontent.com/87605663/159632005-c03708e7-9d27-411e-b0c3-b0d32f68f186.png" />
        </Content>
      </Container>
    </>
  );
}

export default GoToMostUsedFilm;
