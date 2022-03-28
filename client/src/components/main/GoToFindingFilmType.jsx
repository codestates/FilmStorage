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
  font-size: 40px;
  margin: ${(props) => props.morginBottom || "0px"};
  color: #444;
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
    transition: 0.4s
  }
`;

function GoToFindingFilmType() {
  return (
    <>
      <Container>
        <Content
          data-aos="fade-right"
          data-aos-offset="300"
          data-aos-duration="700"
          data-aos-easing="ease-in-sine"
        >
          <Title>
            내 취향에 맞는
            <br />
            필름을 제대로 찾아보자!
          </Title>
          <Button>
            필름 취향 테스트 해보기
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
          <Img src="https://user-images.githubusercontent.com/87605663/159729602-0c58d5c1-48ab-4477-a9c2-e5495758906f.png" />
        </Content>
      </Container>
    </>
  );
}

export default GoToFindingFilmType;
