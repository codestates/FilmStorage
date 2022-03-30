/* TODO : 로그인 페이지 만들기. */
import React from "react";
import { useEffect } from "react";
import styled from "styled-components";

export default function SignInPage() {
  const kakao = window.Kakao;

  useEffect(() => {
    kakao.init(process.env.REACT_APP_KAKAO_INIT_KEY);
  }, []);

  const kakaoSignIn = () => {
    kakao.Auth.authorize({
      redirectUri: `${process.env.REACT_APP_KAKAO_REDIRECT_URI}`,
    });
  };

  return (
    <>
      <Container>
        <Article>
          <SigninForm>
            <InputType>이메일</InputType>
            <Input></Input>
            <InputType>비밀번호</InputType>
            <Input></Input>
            <ErrorMessage>
              아이디 또는 비밀번호가 일치하지 않습니다
            </ErrorMessage>
            <Button>로그인</Button>
          </SigninForm>
          <AccountBox>
            <Account>아이디/비밀번호 찾기</Account>
            <Account>회원가입</Account>
          </AccountBox>
          <SocialAccountBox>
            <SocialAccount onClick={() => kakaoSignIn()}>
              카카오로 로그인하기
            </SocialAccount>
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
const AccountBox = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 40px;
`;
const Account = styled.span`
  font-size: 12px;
  /* border: 1px solid tomato; */
`;
const SocialAccountBox = styled.div`
  display: flex;
  margin: 40px;
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
