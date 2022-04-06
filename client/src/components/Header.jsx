import React from "react";
import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";

const HeaderBox = styled.header`
  display: flex;
  width: 100%;
  height: 70px;
  justify-content: space-between;
  padding: 0 30px;
  align-items: center;
  border-bottom: 1px solid Gainsboro;
  /* border: 1px solid OrangeRed; */
  position: sticky;
  background: #ffffffc1;
  top: 0;
  z-index: 1;
  box-sizing: border-box;
`;
const LogoImg = styled.img`
  height: 1.2rem;
`;
const NavList = styled.ul`
  /* list-style: none */
`;
const NavListItem = styled.li`
  padding: 20px;
  font-size: 14px;
  font-weight: 400;
  color: #444;
  /* color: OrangeRed; */
  cursor: pointer;
  transition: 0.1s;
  &:hover {
    /* border-bottom: 3px solid OrangeRed; */
    color: OrangeRed;
    /* font-weight: 700; */
  }
`;

/* 드롭 메뉴바 */
const DropDown = styled.li`
  /* border: 1px solid red; */
  position: relative;
  padding: 20px 0 20px 20px;
`;
const NavListItemUser = styled.div`
font-size: 14px;
  font-weight: 400;
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
  right: -10px;
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
  padding: 10px 15px;
  color: #444;
  font-size: 14px;
  font-weight: 500;
  text-align: center;
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
          <LogoImg src="https://user-images.githubusercontent.com/87605663/161911543-24f2abb0-c4c6-48fe-b755-d582a20fb0d6.png" />
        </Link>
        <NavList>
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

export default Header;
