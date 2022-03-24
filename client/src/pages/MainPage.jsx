import React from "react";
import styled, { keyframes } from "styled-components";
import GoToMostUsedFilm from "../components/main/GoToMostUsedFilm";
import GoToTodayFilm from "../components/main/GoToTodayFilm";
import GoToFindingFilmType from "../components/main/GoToFindingFilmType";

/* 애니메이션 */
const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;
const slideLeft = keyframes`
  0% {
    -webkit-transform: translateX(100px);
            transform: translateX(100px);
  }
  100% {
    -webkit-transform: translateX(0px);
            transform: translateX(0px);
  }
`;

/* styled-components */
const MainBox = styled.section`
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;
`;

const TextBox = styled.div`
  width: 400px;
  padding: 30px 50px;
`;

const Title = styled.h1`
  font-size: ${(props) => props.fontSize || "70px"};
  margin: ${(props) => props.morginBottom || "0px"};
  color: #444;
  animation: ${fadeIn} 1s linear;
`;
const Description = styled.p`
  font-size: 16px;
  margin: 10px 0 0 0;
  line-height: 1.4em;
  color: #666;
  animation: ${fadeIn} 1s linear;
`;

const Img = styled.img`
  width: 200px;
  padding: 50px 100px;
  animation: ${slideLeft} 1s linear;
  animation-fill-mode: forwards;
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
  return (
    <>
      <MainBox>
        <TextBox>
          <Title>난 코닥을 때 후지를 써..</Title>
          <Description>
            필름 카메라 사용자들을 위한
            <br /> 필름 정보 공유 서비스 Film Storage
          </Description>
        </TextBox>
        <Img src="https://user-images.githubusercontent.com/87605663/159632005-c03708e7-9d27-411e-b0c3-b0d32f68f186.png" />
      </MainBox>
      <ContentBox>
        <Title fontSize="40px" morginBottom="0 0 100px 0" center>
          어떤 필름을 써야 할지 모르겠다면?
        </Title>
        <GoToMostUsedFilm />
        <GoToTodayFilm />
        <GoToFindingFilmType />
      </ContentBox>
    </>
  );
}

export default MainPage;
