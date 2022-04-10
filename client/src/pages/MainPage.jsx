import React from "react";
import styled, { css } from "styled-components";
import GoToMostUsedFilm from "../components/main/GoToMostUsedFilm";
import GoToTodayFilm from "../components/main/GoToTodayFilm";
import GoToFindingFilmType from "../components/main/GoToFindingFilmType";
import GoToFilmSpot from "../components/main/GoToFilmSpot";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

/* styled-components */
const Container = styled.div`
  /* border: 1px solid red; */
  width: 100%;
  height: 90vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  align-items: center;
  /* background-color: #f4f2e8; */
  @media screen and (max-width: 412px) {
    /* border: 1px solid red; */
    height: 60vh;
  }
`;
const MainBox = styled.section`
  display: flex;
  height: 80vh;
  justify-content: center;
  align-items: center;
  @media screen and (max-width: 768px) {
    /* border: 1px solid red; */
    width: 100%;
    flex-direction: column-reverse;
  }
  
`;

const TextBox = styled.div`
  /* border: 1px solid red; */
  /* width: 70%; */
  /* position: relative; */
  @media screen and (max-width: 768px) {
    /* border: 1px solid red; */
  }
`;

const Title = styled.h1`
  /* border: 1px solid red; */
  text-align: left;
  font-size: 80px;
  margin: 0px;
  color: #444;
  @media screen and (max-width: 768px) {
    /* border: 3px solid blue; */
  }
  @media screen and (max-width: 412px) {
    /* border: 1px solid red; */
    font-size: 55px;
  }
`;

const SubTitle = styled.h1`
  /* border: 1px solid red; */
  width: 100%;
  color: #444;
  text-align: center;
  font-size: 40px;
  padding: 100px 0;
  @media screen and (max-width: 768px) {
    /* border: 3px solid blue; */
  }
  @media screen and (max-width: 412px) {
    /* border: 1px solid red; */
    font-size: 18px;
  }
`;
const Description = styled.p`
  text-align: left;
  font-size: 12px;
  font-weight: 500;
  margin: 10px 0 0 0;
  line-height: 1.4em;
  letter-spacing: 0.1em;
  color: #999;
  @media screen and (max-width: 412px) {
    /* border: 1px solid red; */
    font-size: 2px;
  }
`;

const Img = styled.img`
/* border: 1px solid red; */
  width: 300px;
  /* position: absolute; */
  /* top: -30px; */
  /* right: 0px; */
`;

const ContentBox = styled.section`
  /* border: 1px solid red; */
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 50px;
`;

/* 메인페이지 */
function MainPage() {
  useEffect(() => {
    AOS.init();
  });
  return (
    <>
      <Container>
        <MainBox
          data-aos="fade-up"
          data-aos-duration="1000"
          data-aos-easing="ease-in-sine"
        >
          <TextBox>
            <Title>
              난 코닥을 때<br />
              후지를 써..
            </Title>
            <Description>
              필름카메라 사용자들을 위한 필름 정보 공유
              플랫폼 <b>FILM STORAGE</b>
            </Description>
          </TextBox>
          <Img
            kodak
            src="https://user-images.githubusercontent.com/87605663/161895956-5df919ff-f62f-4b30-8181-ba89d52a8072.png"
          ></Img>
        </MainBox>
      </Container>
      <ContentBox>
        <SubTitle
          data-aos="fade-in"
          data-aos-duration="1000"
          data-aos-easing="ease-in-sine"
        >
          어떤 필름을 써야 할지 모르겠다면?
        </SubTitle>
        <GoToMostUsedFilm />
        <GoToTodayFilm />
        <GoToFindingFilmType />
        <GoToFilmSpot />
      </ContentBox>
    </>
  );
}

export default MainPage;
