/* TODO : 로그인 페이지 만들기. */
import React from "react";
import { useState, useRef } from "react";
import styled from "styled-components";
import { initialState } from "../assets/state";

export default function SignUpPage() {

  /*** 모달창 핸들링 ***/
  const [termCheck, setTermCheck] = useState(false);
  const outsideModal = useRef();
  const OpenTermModal = (e) => {
    if(outsideModal.current === e.target){
      setTermCheck(false);
    }
  };

  /*** 이용약관 임시 텍스트 ***/
  const termText = initialState.body;


  return (
    <>
      <Container ref={outsideModal} onClick={OpenTermModal}>
        {termCheck === true ? (
          <TermModal>
            <TermTitle>이용약관</TermTitle>
            <TermText>{termText.repeat(5)}</TermText>
          </TermModal>
        ) : null}
        <Article>
          <SigninForm>
            <InputType>이메일</InputType>
            <Input />
            <InputType>닉네임</InputType>
            <Input />
            <InputType>비밀번호</InputType>
            <Input />
            <InputType>비밀번호 확인</InputType>
            <Input />
            <InputType>휴대폰 번호</InputType>
            <Input />
            <ErrorMessage>
              아이디 또는 비밀번호가 일치하지 않습니다
            </ErrorMessage>
            <Term>
              <input
                type="checkbox"
                id="term"
                checked={termCheck}
                onClick={() => setTermCheck(true)}
              />
              <Label for="term">이용약관에 동의해주세요</Label>
            </Term>
            <Button>회원가입</Button>
          </SigninForm>
          <SocialAccountBox>
            <SocialAccount>카카오로 로그인하기</SocialAccount>
          </SocialAccountBox>
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
  /* border: 1px solid blue; */
`;

const SigninForm = styled.form`
  /* border: 1px solid green; */
  width: 390px;
  padding: 10px 40px;
  box-sizing: border-box;
`;

const InputType = styled.div`
  font-size: 14px;
  margin-top: 5px;
`;
const Input = styled.input`
  /* padding: 10px; */
  width: 100%;
  padding: 10px;
  margin: 5px 0;
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
const Term = styled.div`
  /* border: 1px solid tomato; */
  margin-bottom: 5px;
  display: flex;
`;
const Label = styled.label`
  font-size: 12px;
`;

const Button = styled.button`
  width: 100%;
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
const SocialAccountBox = styled.div`
  display: flex;
  margin: 10px 40px;
  padding: 15px;
  border-radius: 12px;
  background: #fee500;
  text-align: center;
  cursor: pointer;
  &:hover {
    color: white;
    background: #000;
    transition: 0.3s;
  }
`;
const SocialAccount = styled.span`
  flex: 1;
  flex-wrap: wrap;
`;

//* 이용약관 모달 *//
const TermModal = styled.div`
  /* border: 1px solid red; */
  border-radius: 12px;
  background: white;
  padding: 20px;
  width: 500px;
  height: 300px;
  box-shadow: 5px 5px 20px Gainsboro;
  position: absolute;
`;

const TermTitle = styled.h3`
  padding: 0px 30px;
`;
const TermText = styled.div`
  font-size: 13px;
  line-height: 2.5em;
  height: 200px;
  padding: 0px 30px;
  overflow: auto;
`;
