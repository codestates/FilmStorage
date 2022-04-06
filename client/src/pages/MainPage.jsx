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
`;
const MainBox = styled.section`
  display: flex;
  height: 80vh;
  justify-content: center;
  align-items: center;
`;

const TextBox = styled.div`
  /* border: 1px solid red; */
  width: 700px;
  position: relative;
`;

const Title = styled.h1`
  text-align: left;
  font-size: 80px;
  margin: 0px;
  color: #444;
`;

const SubTitle = styled.h1`
  /* border: 1px solid red; */
  color: #444;
  font-size: 40px;
  padding: 100px;
`;
const Description = styled.p`
  text-align: left;
  font-size: 12px;
  font-weight: 500;
  margin: 10px 0 0 0;
  line-height: 1.4em;
  letter-spacing: 0.1em;
  color: #999;
`;

const Img = styled.img`
  width: 250px;
  position: absolute;
  ${(props) => {
    if (props.kodak) {
      return css`
        /* border: 1px solid red; */
        /* top: -140px; */
        /* right: 190px; */
        top: -30px;
        right: 30px;
      `;
    }
    if (props.fuji) {
      return css`
        /* border: 1px solid blue; */
        bottom: 60px;
        left: -10px;
      `;
    }
  }}
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
            <Img
              kodak
              src="https://user-images.githubusercontent.com/87605663/161895956-5df919ff-f62f-4b30-8181-ba89d52a8072.png"
            ></Img>
            <Description>
              필름카메라 사용자들을 위한 필름 정보 공유
              플랫폼 <b>FILM SOTORAGE</b>
            </Description>
          </TextBox>
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
