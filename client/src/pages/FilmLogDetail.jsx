import React from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const Section = styled.div`
  width: 75vw;
  height: 100vh;
  border: 1px solid black;
  text-align: center;
`;

const Nav = styled.nav`
  width: 100%;
  height: 8rem;
  border: 1px solid red;
  display: flex;
`

const NavDiv = styled.div`
  margin-top: 5rem;
`

const RegisterBtn = styled.button`
  font-size: 1.3rem;
  font-weight: bold;
  border-radius: 10px;
  background-color: #fff;
  width: 8rem;
  height: 2.5rem;
`;


const Navflex = styled.div`
    flex-grow: 1;
  `

function FilmLogDetail() {
  return (
    <Container>
      <Section>
        <Nav>
          <NavDiv>뒤로가기</NavDiv>
          <Navflex></Navflex>
          <NavDiv><RegisterBtn>수정하기</RegisterBtn></NavDiv>
          <NavDiv><RegisterBtn>삭제하기</RegisterBtn></NavDiv>
        </Nav>
        {/* 클릭한 이미지 클릭 */}
        <div></div>
      </Section>
    </Container>
  );
}

export default FilmLogDetail;
