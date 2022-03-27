/* TODO : 오늘의 필름 페이지 입니다. */
import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import {  faCloudHail } from '@fortawesome/free-solid-svg-icons'

export default function TodayFilmPage() {
  return (
    <>
      <Container>
        
        <h3>오늘의 필름 페이지 입니다.</h3>
        <FontAwesomeIcon icon="fa-light fa-cloud-hail" />
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
  text-align: center;

`;

const Section = styled.section`

`
