import React from "react";
import styled from "styled-components";

export default function ProfileUpdate() {
  return (
    <InfoUpdate>
      <InfoType>
        <InputType>닉네임</InputType>
        <Input placeholder="유저닉네임" />
      </InfoType>
      <InfoType>
        <InputType>아이디</InputType>
        <InputType>[유저아이디]</InputType>
      </InfoType>
      <Button>정보 수정하기</Button>
    </InfoUpdate>
  );
}

const InfoUpdate = styled.form`
  /* border: 1px solid red; */
  width: 390px;
  padding: 10px 40px;
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
