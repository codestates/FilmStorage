/* TODO : 필름 취향 찾기 페이지 만들기. */
import React, { useRef, useState } from "react";
import styled from "styled-components";
import FilmDataResult from "../components/findingfilmtype/FilmDataResult";
import FirstFilmTypeData from "../components/findingfilmtype/FirstFilmTypeTest";

import Loader from "../components/Loader";

// 더미데이터 랜덤 배열
const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

export default function FindingFilmTypePage() {
  // 1.토글기능 만들어서 이미지 선택 여부 확인

  // 2.스플릿해서 선택된 값 분류 하기

  // 3. 분류가 된 배열을 통계 내기

  // 4. 통계결과에 따른 필름결과 보여주기

  // 5. 더미데이터 랜덤하게 9장씩 3번씩 보여주기

  const [count, setCount] = useState(0);

  // 결과창 로딩구현
  const [isLoaded, setIsLoaded] = useState(true);

  // 결과창 조건부 랜더링
  const [isLoadResult, setIsLoadResult] = useState(true);

  const [filmResult, setFilmResult] = useState([]);

  const [resultCommet, setResultCommet] = useState(FilmDataResult);

  const [filmTypeTest, setFilmTypeTest] = useState(
    shuffleArray(FirstFilmTypeData)
  );

  const [filmTypeList, setFilmTypeList] = useState([]);

  // 테스트 시작 버튼
  const [isStart, setIsStart] = useState(true);

  const handleStart = () => {
    setIsStart(false);
    setFilmTypeList(filmTypeTest.splice(0, 9));
  };

  const handleCounter = () => {
    if (count === 2) {
      setCount(count + 1);
      setIsLoaded(false);
      handleFilmResult();
    } else {
      setCount(count + 1);
    }
  };

  const testRef = useRef({});

  testRef.current = { type: [], company: [], iso: [] };

  // 사진 배열 바꾸기 슬라이스 함수
  const handleNextPageTest = (e) => {
    // 통계 데이터 수집
    const { type, iso, company } = testRef.current;
    const choiceValue = e.target.alt.split("&");

    iso.push(choiceValue[0]);
    type.push(choiceValue[1]);
    company.push(choiceValue[2]);

    if (type.length === 3) {
      setFilmResult(filmResult.concat(testRef.current));
      setFilmTypeList(filmTypeTest.splice(0, 9));
      handleCounter();
    }

    console.log("타입랭스==========>", type.length);
  };

  console.log("============>결과", filmResult);

  // const onToggle = (id) => {
  //   setUsers(
  //     users.map((user) =>
  //       user.id === id ? { ...user, active: !user.active } : user
  //     )
  //   );
  // };

  //  결과 로딩 함수
  const handleFilmResult = () => {
    let secondTimer = setTimeout(() => setIsLoadResult(false), 2000);
    return () => {
      clearTimeout(secondTimer);
    };
  };

  return (
    <>
      <Container>
        <ProceedContainer>
          <Progress width={(count / 3) * 100 + "%"} />
          <Dot />
        </ProceedContainer>
        {isStart ? (
          <>
            <ImgContainer>마음에 드는 사진 3장씩 선택해주세요.</ImgContainer>
            <StartButtonBox>
              <button
                onClick={() => {
                  handleStart();
                }}
              >
                시작
              </button>
            </StartButtonBox>
          </>
        ) : (
          <>
            {isLoaded ? (
              <GridContainer>
                {filmTypeList.map((test, idx) => {
                  return (
                    <ImgBox
                      key={idx}
                      src={test.src}
                      alt={`${test.iso}&${test.type}&${test.company}`}
                      onClick={(e) => {
                        handleNextPageTest(e);
                      }}
                    />
                  );
                })}
              </GridContainer>
            ) : (
              <>
                <ImgContainer>
                  {isLoadResult ? (
                    <Loader />
                  ) : (
                    <ImgBox src={resultCommet[0].src} />
                  )}
                </ImgContainer>
              </>
            )}
          </>
        )}
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
  display: flex;
  justify-content: ;
`;

const ImgBox = styled.img`
  display: block;
  width: 100%;
  object-fit: cover;
  border-radius: 20px;
  border: 1px solid lightgrey;
  box-shadow: 2px 2px 2px 2px #000;
  cursor: pointer;
  opacity: ${(props) => props || 1};
  &:hover {
    opacity: 0.6;
    transition: 0.3s;
  }
`;

const StartButtonBox = styled.div`
  width: 30rem;
  height: 10rem;
  border: 1px solid lightgrey;
  margin-top: 80px;
  text-align: center;
`;

const GridContainer = styled.div`
  display: grid;
  width: 100%;
  max-width: 900px;
  grid-gap: 20px;
  grid-template-columns: 1.2fr 1.2fr 1.2fr;
`;
