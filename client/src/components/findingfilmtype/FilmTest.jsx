import React, { useState } from "react";
import styled from "styled-components";
import FilmDataTest from "./FilmDataTest";

export default function FilmTest({ handleCounter }) {
  const dummydata = [...FilmDataTest];
  const [testData, setTestData] = useState(dummydata);

  const choiceFilm = () => {
    handleCounter();
  };

  return (
    <>
      <ImgContainer>
        <ImgBox
          src={testData[0].src}
          onClick={() => {
            choiceFilm();
          }}
        />
      </ImgContainer>
      <ImgContainer>
        <ImgBox
          src={testData[1].src}
          onClick={() => {
            choiceFilm();
          }}
        />
      </ImgContainer>
    </>
  );
}

const ImgContainer = styled.div`
  width: 30rem;
    margin: 2rem;
    /* box-shadow: 5px 5px 10px Gainsboro; */
    cursor: pointer;
  }

`;

const ImgBox = styled.img`
  width: 100%;
  object-fit: cover;
  border-radius: 20px;
  border: 1px solid lightgrey;
  box-shadow: 5px 5px 10px Gainsboro;
  cursor: pointer;
`;
