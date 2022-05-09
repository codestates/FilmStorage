import React from "react";
import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";

export default function Header({ isLogin, userInfo, setIsLogin, setUserInfo }) {
  const [isToggled, setIsToggled] = useState(false);

  const history = useHistory();
  const handleSignOut = () => {
    axios
      .post(`${process.env.REACT_APP_API_URL}/users/signout`)
      .then((res) => {
        setUserInfo({});
        setIsLogin(false);
        history.push("/");
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <HeaderBox>
        <LogoImg
          onClick={() => history.push("/")}
          src="https://user-images.githubusercontent.com/87605663/162744553-50450406-8a6c-4668-bd90-ab93d7491ba4.png"
        />
        <ToggleButton onClick={() => setIsToggled(!isToggled)}>
          <FontAwesomeIcon icon={isToggled ? faTimes : faBars} />
        </ToggleButton>
        <NavList isToggled={isToggled} onClick={() => setIsToggled(!isToggled)}>
          <Link to="/filmtype">
            <NavListItem>필름 취향 찾기</NavListItem>
          </Link>
          <Link to="/todayfilm">
            <NavListItem>오늘의 필름</NavListItem>
          </Link>
          <Link to="/map">
            <NavListItem>필름 스팟</NavListItem>
          </Link>
          <Link to="/filmlog">
            <NavListItem>필름 로그</NavListItem>
          </Link>
          <Link to="/filmtalks/total">
            <NavListItem>필름 토크</NavListItem>
          </Link>
          {isLogin === true ? (
            <>
              <DropDown>
                <NavListItemUser>
                  <b>{userInfo.nickname}</b> 님
                </NavListItemUser>
                <UserMenu>
                  <Link to="/mylog">
                    <UserMenuContent>마이 로그</UserMenuContent>
                  </Link>
                  <Link to="/users/update">
                    <UserMenuContent>계정 관리</UserMenuContent>
                  </Link>
                  <Link to="/signout">
                    <UserMenuContent onClick={handleSignOut}>
                      로그아웃
                    </UserMenuContent>
                  </Link>
                </UserMenu>
              </DropDown>
            </>
          ) : (
            <>
              <Link to="/signin">
                <NavListItem sign>로그인</NavListItem>
              </Link>
              <Link to="/signup">
                <NavListItem sign>회원가입</NavListItem>
              </Link>
            </>
          )}
        </NavList>
      </HeaderBox>
    </>
  );
}
// 헤더 부분 스타일 변경 예정
// * 헤더
const HeaderBox = styled.header`
  display: flex;
  width: 100%;
  height: 70px;
  justify-content: space-between;
  padding: 0 30px;
  align-items: center;
  border-bottom: 1px solid Gainsboro;
  position: sticky;
  background: #fffffff0;
  top: 0;
  z-index: 2;
  box-sizing: border-box;
  @media screen and (max-width: 1160px) {
    padding-left: 30px;
    padding-right: 60px;
    background: #fff;
  }
  @media screen and (max-width: 412px) {
    padding: 0 30px;
  }
`;

// * 로고(왼쪽)
const LogoImg = styled.img`
  /* height: 1.2rem; */
  width: 200px;
  cursor: pointer;
`;

// * 토글 버튼
const ToggleButton = styled.div`
  display: none;
  font-size: 22px;
  // 태블릿
  @media screen and (max-width: 1160px) {
    display: block;
  }
  // 모바일
  @media screen and (max-width: 412px) {
    display: block;
  }
`;

// * 메뉴(오른쪽)
const NavList = styled.ul`
  /* list-style: none */
  /* border: 1px solid red; */
  align-items: center;
  display: flex;
  padding: 20px;
  z-index: 999;
  // 태블릿
  @media screen and (max-width: 1160px) {
    /* border: 1px solid red; */
    display: ${(props) => (props.isToggled ? "flex" : "none")};
    text-align: center;
    width: 100%;
    padding: 0px;
    position: absolute;
    top: 70px;
    right: 0px;
    flex-direction: column;
    background: snow;
  }
`;

// * 메뉴 아이템들
const NavListItem = styled.li`
  /* border: 1px solid red; */
  padding: 20px;
  font-size: 14px;
  font-weight: 500;
  color: #444;
  cursor: pointer;
  transition: 0.2s;
  &:hover {
    color: tomato;
    font-weight: 700;
    /* color: white;
    background: tomato; */
  }
  @media screen and (max-width: 1160px) {
    /* border: 1px solid blue; */
    display: block;
    padding: 30px 0;
    margin: 0;
    /* border-bottom: 1px solid #eee; */
  }
  @media screen and (max-width: 412px) {
    margin: 0;
    padding: 15px 0;
  }
`;

// * 드롭 메뉴바
const DropDown = styled.li`
  /* border: 1px solid red; */
  position: relative;
  padding: 20px 0 20px 20px;
  @media screen and (max-width: 1160px) {
    width: 100%;
    /* border: 1px solid red; */
    padding: 0px;
    margin: 0;
  }
`;

// * 유저 닉네임
const NavListItemUser = styled.div`
  /* border: 1px solid green; */
  font-size: 14px;
  font-weight: 400;
  color: #444;
  cursor: pointer;
  transition: 0.3s;
  display: inline-block;
  @media screen and (max-width: 1160px) {
    padding: 20px 0;
    width: 100%;
    border-bottom: 1px solid #eee;
  }
  @media screen and (max-width: 412px) {
    padding: 10px 0;
  }
`;

// * 유저 메뉴
const UserMenu = styled.div`
  /* border: 1px solid red; */

  background: white;
  display: none;
  ${DropDown}:hover & {
    display: block;
  }
  position: absolute;
  right: -10px;
  width: 100px;
  margin: 10px;
  padding: 10px;
  border-radius: 10px;
  box-shadow: 5px 5px 10px Gainsboro;
  @media screen and (max-width: 1160px) {
    display: block;
    width: 100%;
    box-shadow: none;
    border-radius: 0;
    right: 0px;
    margin: 0;
    padding: 0;
    background: snow;
  }
  @media screen and (max-width: 412px) {
    padding: 10px 0;
  }
`;

// * 유저 메뉴 아이템
const UserMenuContent = styled.li`
  /* border: 1px solid red; */
  margin: 0;
  display: block;
  padding: 10px 15px;
  color: #444;
  font-size: 14px;
  font-weight: 500;
  text-align: center;
  &:hover {
    color: white;
    background: tomato;
  }
  @media screen and (max-width: 1160px) {
    width: 100%;
    padding: 30px 0;
    font-weight: 600;
  }
  @media screen and (max-width: 412px) {
    padding: 15px 0;
    margin: 0;
  }
`;
