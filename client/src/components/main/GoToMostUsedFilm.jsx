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
  align-items: ${(props) => (props.center ? "center" : "left")};
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
const Description = styled.p`
  font-size: 14px;
  margin: 10px 0 0 0;
  line-height: 1.5em;
  color: #666;
  /* border: 3px solid blue; */
`;
const Img = styled.img`
  width: 200px;
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

function GoToMostUsedFilm() {

  return (
    <>
      <Container>
        <Content
          data-aos="fade-right"
          data-aos-offset="300"
          data-aos-duration="700"
          data-aos-easing="ease-in-sine"
        >
          <SubTitle>
            필름 로그에 가장 많이 <br />
            업로드된 필름
          </SubTitle>
          <Title>코닥 컬러 200</Title>
          <Description>
            컷수 : 36컷 | 필름크기 : 135 | 용도 : 주광용 | 감도(필름) : ISO200 |
            <br />
            품목 : 컬러필름 | 필름종류 : 35mm필름 | 매수 : 36장 | 수량 : 3롤
          </Description>
          <Button>
            필름로그로 가기
            <FontAwesomeIcon icon={faArrowRight} className="icon" />
          </Button>
        </Content>
        <Content
          center
          data-aos="fade-left"
          data-aos-offset="300"
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
