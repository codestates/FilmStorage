import React from "react";
import { useState } from "react";
import styled, { css } from "styled-components";
import ProfileUpdate from "../components/userpage/ProfileUpdate";
import PasswordUpdate from "../components/userpage/PasswordUpdate";
import { useHistory } from "react-router-dom";
import axios from "axios";

axios.defaults.withCredentials = true;

export default function UserInfoUpdatePage({
  userInfo,
  setIsLogin,
  setUserInfo,
}) {
  const history = useHistory();
  const [currentTab, setCurrentTab] = useState(0);
  // const [profile, setProfile] = useState({});
  const menuArr = ["프로필 편집", "비밀번호 변경"];

  const postProfile = async (e) => {
    // console.log(e.target.files[0]);
    const imgFile = e.target.files[0];
    if (imgFile && userInfo.id) {
      // setProfile(imgFile);
      const formData = new FormData();
      formData.set("profile", imgFile);
      axios
        .patch(
          `${process.env.REACT_APP_API_URL}/users/update/profile/${userInfo.id}`,
          formData,
          {
            headers: {
              "Content-type": "multipart/form-data",
            },
          }
        )
        .then((res) => {
          setUserInfo({ ...userInfo, profile: res.data.data.profile });
        })
        .catch((err) => console.log(err));
    }
  };

  const handleDelete = () => {
    if (window.confirm("정말로 탈퇴하실건가요..?")) {
      axios
        .delete(`${process.env.REACT_APP_API_URL}/users/withdrawal`)
        .then(() => {
          alert("탈퇴가 완료되었습니다. 다시 찾아오시길 기다릴게요");
          setIsLogin(false);
          history.push("/");
        })
        .catch((err) => console.log(err));
    }
  };

  const selectMenuHandler = (idx) => {
    setCurrentTab(idx);
  };
  return (
    <>
      <Container>
        <Article>
          <ImgUpdate>
            <Img src={`${userInfo.profile}`} />
            <UpdateButton>
              사진 수정
              <input
                className="profile"
                type="file"
                required="true"
                accept="image/*"
                onChange={(e) => postProfile(e)}
              />
            </UpdateButton>
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
          {currentTab === 0 ? (
            <ProfileUpdate userInfo={userInfo} />
          ) : (
            <PasswordUpdate
              userInfo={userInfo}
              setIsLogin={setIsLogin}
              setUserInfo={setUserInfo}
            />
          )}
          <Withdraw onClick={() => handleDelete()}>탈퇴하기</Withdraw>
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
  top: 15vh;
`;

const ImgUpdate = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const Img = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 50px;
`;
const UpdateButton = styled.label`
  border: none;
  background: none;
  margin: 10px;
  font-weight: 700;
  cursor: pointer;
  &:hover {
    color: tomato;
  }
  > input.profile {
    display: none;
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
