import axios from "axios";
import React, { useState } from "react";
import styled from "styled-components";

export default function ProfileUpdate({ userInfo }) {
  const [updatedUserInfo, setUpdatedUserInfo] = useState({
    nickname: "",
    mobile: "",
  });

  const handleUpdate = (e) => {
    const { nickname, mobile } = updatedUserInfo;
    if (!nickname || !mobile) {
      alert("정보를 입력해주세요");
    } else {
      axios
        .patch(
          `${process.env.REACT_APP_API_URL}/users/update`,
          updatedUserInfo,
          {
            headers: {
              "Content-type": "application/json",
            },
          }
        )
        .catch((err) => console.log(err));
    }
  };

  const placeholderMSG = userInfo.mobile || "번호를 등록해주세요";

  return (
    <InfoUpdate>
      <InfoType>
        <InputType>아이디</InputType>
        <InputType>{userInfo.email}</InputType>
      </InfoType>
      <InfoType>
        <InputType>닉네임</InputType>
        <Input
          placeholder={`${userInfo.nickname}`}
          onChange={(e) =>
            setUpdatedUserInfo({ ...updatedUserInfo, nickname: e.target.value })
          }
        />
      </InfoType>
      <InfoType>
        <InputType>휴대폰</InputType>
        <Input
          placeholder={placeholderMSG}
          onChange={(e) =>
            setUpdatedUserInfo({ ...updatedUserInfo, mobile: e.target.value })
          }
        />
      </InfoType>
      <Button onClick={handleUpdate}>정보 수정하기</Button>
    </InfoUpdate>
  );
}

const InfoUpdate = styled.form`
  /* border: 1px solid red; */
  width: 390px;
  padding: 10px 3 0px;
  box-sizing: border-box;
`;
const InfoType = styled.div`
  display: flex;
`;
const InputType = styled.div`
  /* border: 1px solid green; */
  padding: 20px;
  font-size: 14px;
  /* margin-top: 5px; */
`;
const Input = styled.input`
  /* padding: 10px; */
  width: 70%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid Gainsboro;
  outline: none;
  margin-left: 11px;
  /* border-radius: 10px; */
  box-sizing: border-box;
  &:focus {
    border: none;
    border: 1px solid Gainsboro;
    box-shadow: 5px 5px 10px Gainsboro;
    transition: 0.3s;
  }
`;
const ErrorMessage = styled.p`
  /* border: 1px solid tomato; */
  color: tomato;
  font-size: 12px;
`;

const Button = styled.button`
  width: 100%;
  margin-top: 30px;
  padding: 10px 30px;
  border: none;
  border-radius: 20px;
  right: 0px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  &:hover {
    color: white;
    background: tomato;
    transition: 0.3s;
  }
`;
