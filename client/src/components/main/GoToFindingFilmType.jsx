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
    flex-direction: column;
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
    /* border: 3px solid green; */
    align-items: center;
    padding: 30px 0;
  }
`;

const Title = styled.h1`
  font-size: 40px;
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
    /* border: 3px solid green; */
    text-align: center;
  }
  @media screen and (max-width: 412px) {
    /* border: 1px solid red; */
    font-size: 20px;
  }
`;
const Img = styled.img`
  width: 200px;
  padding: 50px 100px;
  animation-fill-mode: forwards;
  @media screen and (max-width: 412px) {
    /* border: 1px solid red; */
    width: 150px;
    padding: 0;
  }
`;
const Button = styled.button`
  width: 90%;
  text-align: left;
  padding: 20px 3px;
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
  .icon {
    /* margin-left: 200px; */
  }
  @media screen and (max-width: 768px) {
    /* border: 3px solid green; */
    width: 100%;
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
          <SubTitle>간단한 테스트로 알아보는</SubTitle>
          <Title>내 취향 저격 필름</Title>
          <Link to="filmtype">
            <Button>
              필름 취향 테스트 해보기
              <FontAwesomeIcon icon={faArrowRight} className="icon" />
            </Button>
          </Link>
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
