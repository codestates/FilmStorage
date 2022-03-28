import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const HeaderBox = styled.header`
  display: flex;
  width: 100%;
  height: 80px;
  justify-content: space-around;
  align-items: center;
  border-bottom: 1px solid Gainsboro;
  position: sticky;
  background: #ffffffea;
  top: 0;
  z-index:999;
`;
const LogoImg = styled.img`
  height: 1.2rem;
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
        <Link to="/">
          <LogoImg src="https://user-images.githubusercontent.com/87605663/159270833-8f5397dc-9f5b-4fab-86a6-b245d08eeaa8.png" />
        </Link>
        <NavList>
          <Link to="/todayfilm">
            <NavListItem>오늘의 필름</NavListItem>
          </Link>
          <Link to="/filmtype">
            <NavListItem>필름 취향 찾기</NavListItem>
          </Link>
          <Link to="/filmlog">
            <NavListItem>필름 로그</NavListItem>
          </Link>
          <Link to="/filmtalk">
          <NavListItem>필름 토크</NavListItem>
          </Link>
          <Link to="/signin">
          <NavListItem sign>로그인</NavListItem>
          </Link>
          <Link to="/signup">
          <NavListItem sign>회원가입</NavListItem>
          </Link>
        </NavList>
      </HeaderBox>
    </>
  );
}

export default Header;
