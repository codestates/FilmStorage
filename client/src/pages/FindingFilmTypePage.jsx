/* TODO : 필름 취향 찾기 페이지 만들기. */
import React, { useState } from "react";
import styled from "styled-components";
import FilmTest from "../components/findingfilmtype/FilmTest";

export default function FindingFilmTypePage() {
  // 진행바 상태 관리
  const [count, setCount] = useState(0);

  // 진행바 핸들러 함수
  const handleCounter = () => {
    if (count === 5) {
      setCount(0);
    } else {
      setCount(count + 1);
    }
  };
  return (
    <>
      <Container>
        <ProceedContainer>
          <Progress width={(count / 5) * 100 + "%"} />
          <Dot />
        </ProceedContainer>
        <ChoiceBox>
          <FilmTest handleCounter={handleCounter}></FilmTest>
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
`;

const ProceedContainer = styled.div`
  margin: 50px auto;
  background-color: #eee;
  width: 500px;
  height: 40px;
  display: flex;
  align-items: center;
  border-radius: 20px;
  box-shadow: 5px 5px 10px Gainsboro;
`;
const Progress = styled.div`
  background-color: tomato;
  width: ${(props) => props.width};
  height: 100%;
  /* transition: width 0.5s; */
  border-radius: 20px;
  box-shadow: 5px 5px 10px Gainsboro;
`;

//프로그레스 바 앞 원형
const Dot = styled.div`
  width: 70px;
  height: 70px;
  box-sizing: border-box;
  border: 10px solid tomato;
  border-radius: 35px;
  background: #eee;
  margin-left: -35px;
`;
