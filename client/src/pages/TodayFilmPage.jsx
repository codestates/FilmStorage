/* TODO : 오늘의 필름 페이지 입니다. */
import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

export default function TodayFilmPage() {
  return (
    <>
      <Container>
        <h2>현재 위치의 날씨에 따라 적합한 필름을 추천해 드려요!</h2>
        <FontAwesomeIcon icon={faSearch} className="search" />
        <h3>
          오늘의 날씨는 흐림
          <br />
          어두운 환경에서는 감도가 높은 필름을 추천해드려요.
        </h3>
        <Section>
          <FilmBox>
            <img className="filmimg" src="https://user-images.githubusercontent.com/87605663/159632005-c03708e7-9d27-411e-b0c3-b0d32f68f186.png" alt='film'/>
            <h3 className="filmtitle">코닥400</h3>
            <p className="filminfo">필름설명이 필요한곳 입니다.</p>
          </FilmBox>
          <FilmBox>
            <img className="filmimg" src="https://user-images.githubusercontent.com/87605663/159729602-0c58d5c1-48ab-4477-a9c2-e5495758906f.png" alt='film'/>
            <h3 className="filmtitle">후지400</h3>
            <p className="filminfo">필름설명이 필요한곳 입니다.</p>
          </FilmBox>
          <FilmBox>
            <img className="filmimg" src="https://user-images.githubusercontent.com/87605663/159730302-7e8be631-9192-4c3e-8986-ef3f1dc76cd1.png" alt='film'/>
            <h3 className="filmtitle">흑백필름</h3>
            <p className="filminfo">필름설명이 필요한곳 입니다.</p>
          </FilmBox>
        </Section>
      </Container>
    </>
  );
}

const Container = styled.div`
  border: 1px solid red;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  align-items: center;
`;

const Section = styled.section`
  width: 60vw;
  height: 100%;
  /* border: 1px solid blue; */
  display: flex;
  justify-content: space-around;
  margin-top: 5rem;
`;



const FilmBox = styled.div`
  width: 20vw;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  > h3.filmtitle {
    margin-top: 10px;
  }
  > img.filmimg {
    height: 15vh;
    width: 10vw;
  }
  > p.filminfo {
    font-size: 13px;
  }
`;
