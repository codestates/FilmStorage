import React from "react";
import { useState } from "react";
import styled, { css } from "styled-components";
import ProfileUpdate from "../components/userpage/ProfileUpdate";
import PasswordUpdate from "../components/userpage/PasswordUpdate";

export default function UserInfoUpdatePage() {
  const [currentTab, setCurrentTab] = useState(0);
  const menuArr = ["프로필 편집", "비밀번호 변경"];

  const selectMenuHandler = (idx) => {
    setCurrentTab(idx);
  };
  return (
    <>
      <Container>
        <Article>
          <ImgUpdate>
            <Img src="https://i.pinimg.com/474x/28/5a/a1/285aa1150c5ff68ca00083c2db587807.jpg" />
            <UpdateButton>사진 수정</UpdateButton>
          </ImgUpdate>
          <TabMenu>
            {menuArr.map((menu, idx) => {
              return (
                <Tab key={idx} onClick={() => selectMenuHandler(idx)}>
                  {menu}
                </Tab>
              );
            })}
          </TabMenu>
          {currentTab === 0 ? <ProfileUpdate /> : <PasswordUpdate />}
          <Withdraw>탈퇴하기</Withdraw>
        </Article>
      </Container>
    </>
  );
}

const Container = styled.section`
  /* border: 1px solid red; */
  width: 100%;
  height: 90vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const Article = styled.article`
  /* border: 1px solid green; */
  position: absolute;
  top: 100px;
`;

const ImgUpdate = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const Img = styled.img`
  width: 100px;
  border-radius: 50px;
`;
const UpdateButton = styled.button`
  border: none;
  background: none;
  margin: 10px;
  font-weight: 700;
  cursor: pointer;
  &:hover {
    color: tomato;
  }
`;
const TabMenu = styled.div`
  /* border: 1px solid blue; */
  width: 390px;
  margin: 20px 0;
`;

const Tab = styled.button`
  /* border: 1px solid green; */
  width: 195px;
  color: #444;
  padding: 10px 0px;
  border: 1px solid transparent;
  background: #fff;
  border-bottom: 1px solid Gainsboro;
  cursor: pointer;
  &:focus {
    font-weight: 600;
    border: 1px solid Gainsboro;
    border-bottom: 1px solid transparent;
  }
`;

const Withdraw = styled.button`
  font-size: 12px;
  color: Gray;
  border: none;
  background: none;
  cursor: pointer;
  width: 100%;
`;
