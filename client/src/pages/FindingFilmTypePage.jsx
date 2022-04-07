/* TODO : 필름 취향 찾기 페이지 만들기. */
import React, { useState } from "react";
import styled from "styled-components";
import FilmDataResult from "../components/findingfilmtype/FilmDataResult";
import Loader from "../components/Loader";

export default function FindingFilmTypePage() {
  const firstTest = [
    [
      "흑백",
      "https://user-images.githubusercontent.com/89363048/161432068-1fef271b-8e31-4e53-b6d8-20f6fd82b57a.jpeg",
    ],

    [
      "칼러",
      "https://user-images.githubusercontent.com/87605663/160955300-7963c2f2-ff03-4d7d-8bdb-f132c5aabf35.JPG",
    ],

    [
      "기타",
      "https://user-images.githubusercontent.com/87605663/160956248-734d6fd4-7631-471e-b5b3-a66ca2e25143.JPG",
    ],
  ];

  const blackFilm1 = [
    [
      "흑백인물",
      "https://user-images.githubusercontent.com/87605663/160955665-178f0031-5b00-4d18-987c-0cc71455c629.JPG",
    ],
    [
      "흑백풍경",
      "https://user-images.githubusercontent.com/87605663/160955958-30c00cd1-a2e5-49ba-b3a1-a643682fa0fd.JPG",
    ],
  ];

  const blackFilm2 = [
    [
      "흑백인물실내",
      "https://user-images.githubusercontent.com/87605663/160956219-de688f20-bffb-4e77-957d-5c6ea690bbdb.JPG",
    ],
    [
      "흑백인물실외",
      "https://user-images.githubusercontent.com/87605663/160956648-5d06eadf-5c8b-455a-8cf6-487965f372a8.JPG",
    ],
  ];

  const blackFilm3 = [
    [
      "흑백인물실내밝음",
      "https://user-images.githubusercontent.com/87605663/160957215-574748e1-2693-4659-85b0-2816da24a856.JPG",
    ],
    [
      "흑백인물실내어둠",
      "https://user-images.githubusercontent.com/87605663/160956749-7dbd2485-95fe-490f-8d2c-169c906e529c.JPG",
    ],
  ];
  // 진행바 상태 관리
  const [count, setCount] = useState(0);

  const [isLoaded, setIsLoaded] = useState(true);

  //
  const [filmResult, setFilmResult] = useState(true);

  const [resultCommet, setResultCommet] = useState(FilmDataResult);

  const [testName, setTestName] = useState([...firstTest]);

  // 테스틑진행 핸들러
  const handleCounter = () => {
    if (count === 4) {
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

  const handleTest = (e) => {
    console.log(e.target.alt);
    // alt값에 따라서 상태변경
    let choiceImg = e.target.alt;
    if (choiceImg === "흑백") {
      setTestName([...blackFilm1]);
      handleCounter();
    }
    if (choiceImg === "흑백인물") {
      setTestName([...blackFilm2]);
      handleCounter();
    }
    if (choiceImg === "흑백인물실내") {
      setTestName([...blackFilm3]);
      handleCounter();
    }
    if (choiceImg === "흑백인물실내어둠") {
      handleCounter();
      setIsLoaded(false);
      handleFilmResult();
    }
  };

  return (
    <>
      <Container>
        <ProceedContainer>
          <Progress width={(count / 4) * 100 + "%"} />
          <Dot />
        </ProceedContainer>
        <ChoiceBox>
          {isLoaded ? (
            <>
              <ImgContainer>
                {testName.map((el, idx) => {
                  return (
                    <ImgBox
                      src={el[1]}
                      alt={el[0]}
                      key={idx}
                      onClick={(e) => {
                        handleTest(e);
                      }}
                    />
                  );
                })}
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
  display: flex;
  justify-content: center;
  width: 30rem;
`;

const ImgBox = styled.img`
  margin: 2rem;
  width: 100%;
  height: 300px;
  object-fit: cover;
  border-radius: 20px;
  border: 1px solid lightgrey;
  box-shadow: 5px 5px 10px Gainsboro;
  cursor: pointer;
  &:hover {
    opacity: 0.8;
    transition: 0.3s;
  }
`;
