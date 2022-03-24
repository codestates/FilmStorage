import React from "react";
import styled from "styled-components";


const Container = styled.div`
  width: 100vw;
  overflow: hidden; 
`;
const Button = styled.button`
  all: unset;
  border: 1px solid coral;
  padding: 0.5em 2em;
  color: coral;
  border-radius: 10px;
  &:hover {
    transition: all 0.3s ease-in-out;
    background-color: coral;
    color: #fff;
  }
`;
const SliderContainer = styled.div`
  width: 100%;
  display: flex; 
`;

function FilmLogSlide() {


  return (
    <>
      <Container src="https://user-images.githubusercontent.com/89363048/159704821-648ee24d-7f9c-4d6f-b863-ba90aeb2fb26.jpeg" alt="demo" />
    </>
  );
}

export default FilmLogSlide;
