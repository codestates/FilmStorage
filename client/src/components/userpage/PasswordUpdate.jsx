import axios from "axios";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

export default function PasswordUpdate({}) {
  const [errorMessage, setErrorMessage] = useState("");
  const [password, setPassword] = useState({
    current: "",
    change: "",
    check: "",
  });
  const history = useHistory();

  const setCheckPW = (e) => {
    setPassword({ ...password, check: e.target.value });
    if (password.change !== e.target.value) {
      setErrorMessage("비밀번호가 일치하지 않습니다");
    } else {
      setErrorMessage("");
    }
  };
  console.log(password);

  const handleUpdate = (e) => {
    const { current, change, check } = password;
    if (!current || !change || !check) {
      setErrorMessage("비밀번호를 입력해주세요");
    } else {
      axios
        .patch(
          `${process.env.REACT_APP_API_URL}/users/update/password`,
          {
            curPw: password.current,
            changePw: password.change,
          },
          {
            headers: {
              "Content-type": "application/json",
            },
          }
        )
        .then((res) => {
          alert("비밀번호가 수정되었습니다");
          setPassword({
            current: "",
            change: "",
            check: "",
          });
          //TODO: 로그아웃 요청 작성할 것
          // setIsLogin(false);
          // history.push("/signin");
        })
        .catch((err) => {
          if (err.response.status === 400) {
            setErrorMessage("현재 비밀번호가 일치하지 않습니다");
          } else {
            console.log(err);
          }
        });
    }
  };

  return (
    <>
      <InfoUpdate>
        <InfoType>
          <InputType>현재 비밀번호</InputType>
          <Input
            placeholder="현재 비밀번호"
            type="password"
            onChange={(e) =>
              setPassword({ ...password, current: e.target.value })
            }
          />
        </InfoType>
        <InfoType>
          <InputType>변경 비밀번호</InputType>
          <Input
            placeholder="변경 비밀번호"
            type="password"
            onChange={(e) =>
              setPassword({ ...password, change: e.target.value })
            }
          />
        </InfoType>
        <InfoType>
          <InputType>비밀번호 확인</InputType>
          <Input
            placeholder="비밀번호 확인"
            type="password"
            onChange={(e) => setCheckPW(e)}
          />
        </InfoType>
        <ErrorMessage>{errorMessage}</ErrorMessage>
        <Button onClick={(e) => handleUpdate(e)}>정보 수정하기</Button>
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
  margin-left: 9px;
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
