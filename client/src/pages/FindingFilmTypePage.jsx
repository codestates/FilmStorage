/* TODO : 필름 취향 찾기 페이지 만들기. */
import React from "react";
import styled from "styled-components";

export default function FindingFilmTypePage() {
  return (
    <>
      <Container>
        <Bar>현재 상태 나타나는 bar</Bar>
        <ChoiceBox></ChoiceBox>
        <ChoiceBox></ChoiceBox>
      </Container>
    </>
  );
}

const Container = styled.div`
  /* border: 1px solid red; */
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Bar = styled.div`
  text-align: center;
  width: 60vw;
  height: 20vh;
`;

const ChoiceBox = styled.div`
  width: 60vw;
  height: 60vh;
  display: flex;
  justify-content: space-around;
  > div.imgbox {
    border: 1px solid black;
    border-radius: 1rem;
    width: 30rem;
    height: 30rem;
    box-shadow: 5px 5px 10px Gainsboro;
  }
`;
