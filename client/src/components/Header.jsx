import React from "react";
import styled from "styled-components";

const HeaderBox = styled.header`
  display: flex;
  width: 100%;
  height: 80px;
  justify-content: space-around;
  align-items: center;
  border-bottom: 1px solid Gainsboro;
  position: fixed;
  background: #ffffffea;
  z-index: 999;
`;
const LogoImg = styled.img`
  height: 25%;
`;
const NavList = styled.ul`
  display: flex;
  list-style: none;
`;
const NavListItem = styled.li`
  padding: 20px;
  font-weight: bold;
  color: #444;
  cursor: pointer;
  &:hover {
    /* border-bottom: 3px solid tomato; */
    color: white;
    background: tomato;
    border-radius: 20px;
    transition: 1.2s;
  }
  /* border: 1px solid red; */
`;

function Header() {
  return (
    <>
      <HeaderBox>
        <LogoImg src="https://user-images.githubusercontent.com/87605663/159270833-8f5397dc-9f5b-4fab-86a6-b245d08eeaa8.png" />
        <NavList>
          <NavListItem>오늘의 필름</NavListItem>
          <NavListItem>필름 취향 찾기</NavListItem>
          <NavListItem>필름 로그</NavListItem>
          <NavListItem>필름 토크</NavListItem>
          <NavListItem sign>로그인</NavListItem>
          <NavListItem sign>회원가입</NavListItem>
        </NavList>
      </HeaderBox>
    </>
  );
};

export default Header;