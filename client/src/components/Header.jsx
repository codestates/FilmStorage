import React from "react";
import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";

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
  z-index: 1;
`;
const LogoImg = styled.img`
  height: 1.2rem;
`;
const NavList = styled.ul`
  /* list-style: none */
`;
const NavListItem = styled.li`
  padding: 20px;
  font-weight: bold;
  color: #444;
  cursor: pointer;
  transition: 1.2s;
  &:hover {
    /* border-bottom: 3px solid tomato; */
    color: white;
    background: tomato;
    border-radius: 20px;
  }
`;

/* 드롭 메뉴바 */
const DropDown = styled.li`
  /* border: 1px solid red; */
  position: relative;
  padding: 20px;
`;
const NavListItemUser = styled.div`
  font-weight: bold;
  color: #444;
  cursor: pointer;
  transition: 0.3s;
  /* border: 1px solid red; */
  display: inline-block;
`;

const UserMenu = styled.div`
  /* border: 1px solid red; */
  display: none;
  ${DropDown}:hover & {
    display: block;
  }
  position: absolute;
  right: 0px;
  width: 100px;
  margin: 10px;
  padding: 10px;
  background: #fff;
  border-radius: 10px;
  box-shadow: 5px 5px 10px Gainsboro;
`;
const UserMenuContent = styled.li`
  margin: 0;
  display: block;
  padding: 5px 15px;
  color: #444;
  font-size: 14px;
  font-weight: 500;
  &:hover {
    color: white;
    background: tomato;
  }
`;

function Header({ isLogin, userInfo, setIsLogin, setUserInfo }) {
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
        <Link to="/">
          <LogoImg src="https://user-images.githubusercontent.com/87605663/159270833-8f5397dc-9f5b-4fab-86a6-b245d08eeaa8.png" />
        </Link>
        <NavList>
        <Link to="/map">
            <NavListItem>지도</NavListItem>
          </Link>
          <Link to="/todayfilm">
            <NavListItem>오늘의 필름</NavListItem>
          </Link>
          <Link to="/filmtype">
            <NavListItem>필름 취향 찾기</NavListItem>
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
                <NavListItemUser>{userInfo.nickname} 님</NavListItemUser>
                <UserMenu>
                  <Link to="/mylog">
                    <UserMenuContent>마이갤러리</UserMenuContent>
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

export default Header;
