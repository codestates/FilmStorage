/* TODO : 필름 취향 찾기 페이지 만들기. */
import React, { useState } from "react";
import styled from "styled-components";
import FilmDataTest from "../components/findingfilmtype/FilmDataTest";
import FilmDataResult from "../components/findingfilmtype/FilmDataResult";
import Loader from "../components/Loader";

export default function FindingFilmTypePage() {
  // 진행바 상태 관리
  const [count, setCount] = useState(0);

  const dummydata = [...FilmDataTest];
  const [testData, setTestData] = useState(dummydata);

  const [isLoaded, setIsLoaded] = useState(true);

  //
  const [filmResult, setFilmResult] = useState(true);

  const [resultCommet, setResultCommet] = useState(FilmDataResult);

  // 테스틑진행 핸들러
  const handleCounter = () => {
    //배열의 길이가 2일때 테스트가 끝났을때
    if (testData.length === 2) {
      setIsLoaded(false);
      handleFilmResult();
    }
    handleDataChange();
    if (count === 5) {
      setCount(0);
    } else {
      setCount(count + 1);
    }
  };

  const handleFilmResult = () => {
    let secondTimer = setTimeout(() => setFilmResult(false), 2000);
    return () => {
      clearTimeout(secondTimer);
    };
  };

  // 사진 배열 바꾸기 슬라이스 함수
  const handleDataChange = () => {
    const testDataCopy = [...testData];
    testDataCopy.splice(0, 2);
    setTestData(testDataCopy);
  };

  return (
    <>
      <Container>
        <ProceedContainer>
          <Progress width={(count / 5) * 100 + "%"} />
          <Dot />
        </ProceedContainer>
        <ChoiceBox>
          {isLoaded ? (
            <>
              <ImgContainer>
                <ImgBox
                  src={testData[0].src}
                  onClick={() => {
                    handleCounter();
                  }}
                />
              </ImgContainer>
              <ImgContainer>
                <ImgBox
                  src={testData[1].src}
                  onClick={() => {
                    handleCounter();
                  }}
                />
              </ImgContainer>
            </>
          ) : (
            <>
              <ImgContainer>
                {filmResult ? <Loader /> : <ImgBox src={resultCommet[0].src} />}
              </ImgContainer>
            </>
          )}
        </ChoiceBox>
      </Container>
    </>
  );
}

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ChoiceBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  /* display: none; */
`;

const ProceedContainer = styled.div`
  margin: 50px auto;
  background-color: #eee;
  width: 500px;
  height: 20px;
  display: flex;
  align-items: center;
  border-radius: 20px;
  box-shadow: 5px 5px 10px Gainsboro;
`;
// 진행바
const Progress = styled.div`
  background-color: tomato;
  width: ${(props) => props.width};
  height: 100%;
  /* transition: width 0.5s; */
  border-radius: 20px;
  box-shadow: 5px 5px 10px Gainsboro;
`;

// 진행바 원형
const Dot = styled.div`
  width: 30px;
  height: 30px;
  box-sizing: border-box;
  border: 5px solid tomato;
  border-radius: 35px;
  background: white;
  margin-left: -20px;
`;

const ImgContainer = styled.div`
  width: 30rem;
    margin: 2rem;
    /* box-shadow: 5px 5px 10px Gainsboro; */
    cursor: pointer;
  }

`;

const ImgBox = styled.img`
  width: 100%;
  height: 300px;
  object-fit: cover;
  border-radius: 20px;
  border: 1px solid lightgrey;
  box-shadow: 5px 5px 10px Gainsboro;
  cursor: pointer;
`;
