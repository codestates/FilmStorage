import axios from "axios";
import React, { useState } from "react";
import styled from "styled-components";
import Swal from "sweetalert2";

export default function ProfileUpdate({ userInfo }) {
  const [updatedUserInfo, setUpdatedUserInfo] = useState({
    nickname: "",
    mobile: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  const validatePhone = (phone_number) => {
    const regPhone = /(01[0|1|6|9|7])[-](\d{3}|\d{4})[-](\d{4}$)/g;
    return regPhone.test(phone_number);
  };

  const handleUpdate = (e) => {
    const { nickname, mobile } = updatedUserInfo;
    if (!nickname || !mobile) {
      e.preventDefault();
      setErrorMessage("정보를 입력해주세요");
    } else if (!validatePhone(mobile)) {
      e.preventDefault();
      setErrorMessage("유효하지 않는 핸드폰번호 입니다");
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
        .then(() => {
          Swal.fire({
            text: "수정이 완료되었습니다",
            icon: "success",
            iconColor: "#ff6347",
            showConfirmButton: false,
            timer: 1200,
          });
        })
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
      <ErrorMessage>{errorMessage}</ErrorMessage>
      <Button onClick={handleUpdate}>수정하기</Button>
    </InfoUpdate>
  );
}

const InfoUpdate = styled.form`
  /* border: 1px solid red; */
  width: 390px;
  padding: 10px 30px;
  box-sizing: border-box;
`;
const InfoType = styled.div`
  display: flex;
`;
const InputType = styled.div`
  /* border: 1px solid green; */
  padding: 20px;
  font-size: 12px;
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
  text-align: center;
`;

const Button = styled.button`
  width: 100%;
  margin-top: 30px;
  margin-bottom: 15px;
  padding: 10px 30px;
  color: tomato;
  border: 1px tomato solid;
  border-radius: 5px;
  background-color: white;
  right: 0px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  &:hover {
    color: white;
    background: tomato;
    border: 1px tomato solid;
    transition: 0.3s;
  }
  @media screen and (max-width: 1024px) {
    margin: 20px;
    width: 90%;
  }
  @media screen and (max-width: 412px) {
    margin: 20px;
    width: 90%;
  }
`;
