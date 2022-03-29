import React from "react";
import styled from "styled-components";
import FilmTalkRegister from "../components/filmtalk/FilmTalkRegister";

export default function FilmTalkRegisterPage() {
  return (
    <>
      <Container><FilmTalkRegister /></Container>
    </>
  );
}

const Container = styled.section`
  width: 100%;
  height: 90vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

// const Article = styled.form`
//   /* border: 1px solid green; */
//   width: 60%;
//   position: relative;
// `;
