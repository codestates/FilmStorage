import React from "react";
import styled from "styled-components";

export default function PasswordUpdate () {
  return (
    <>
      <InfoUpdate>
        <InfoType>
          <InputType>현재 비밀번호</InputType>
          <Input placeholder="현재 비밀번호" />
        </InfoType>
        <InfoType>
          <InputType>변경 비밀번호</InputType>
          <Input placeholder="변경 비밀번호" />
        </InfoType>
        <InfoType>
          <InputType>비밀번호 확인</InputType>
          <Input placeholder="비밀번호 확인" />
        </InfoType>
        <Button>정보 수정하기</Button>
      </InfoUpdate>
    </>
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
  align-items: center;
`;
const InputType = styled.div`
  /* border: 1px solid green; */
  padding: 10px 10px;
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
