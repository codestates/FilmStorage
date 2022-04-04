/* TODO : 로그인 페이지 만들기. */
import React from "react";
import { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useHistory } from "react-router-dom";

axios.defaults.withCredentials = true;

export default function SignInPage({ handleResponseSuccess }) {
  const history = useHistory();

  const handleSignUp = () => {
    history.push("/signup");
  };
  // * 카카오 로그인 *//
  useEffect(() => {
    kakaoInit();
  }, []);

  const kakao = window.Kakao;
  const kakaoInit = () => {
    if (kakao.isInitialized() === false) {
      kakao.init(process.env.REACT_APP_KAKAO_INIT_KEY);
    }
  };

  const kakaoSignIn = () => {
    kakao.Auth.authorize({
      redirectUri: `${process.env.REACT_APP_KAKAO_REDIRECT_URI}`,
    });
  };

  // * 일반 로그인 * //
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });
  // * 에러메세지
  const [errorMessage, setErrorMessage] = useState("");
  // * 유효성 검사
  const validateFuntion = {
    Email: (email) => {
      const regExp =
        /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
      return regExp.test(email);
    },
    PW: (password) => {
      // 비밀번호 구성(8자리 이상 문자, 숫자, 특수문자)
      const pattern1 = /[0-9]/; // 숫자
      const pattern2 = /[a-zA-Z]/; // 문자
      const pattern3 = /[~!@#$%^&*()_+|<>?:{}]/; // 특수문자
      if (
        !pattern1.test(password) ||
        !pattern2.test(password) ||
        !pattern3.test(password) ||
        password.length < 8
      ) {
        return false;
      } else return true;
    },
  };

  // * 유저 로그인 입력값 저장
  const handleInputValue = (key) => (e) => {
    setLoginInfo({ ...loginInfo, [key]: e.target.value });
  };

  // * 유저 로그인 입력값 확인 후 서버 전송
  const handleLogin = () => {
    const { email, password } = loginInfo;
    if (!email || !password) {
      setErrorMessage("이메일과 비밀번호를 입력하세요");
    } else if (!validateFuntion.Email(email)) {
      setErrorMessage("이메일 형식에 맞지 않습니다.");
    } else if (!validateFuntion.PW(password)) {
      setErrorMessage(
        "비밀번호를 문자,숫자,특수문자를 포함한 8자리 이상이여야 합니다."
      );
    } else {
      axios
        .post(
          `${process.env.REACT_APP_API_URL}/users/signin`,
          {
            email: loginInfo.email,
            password: loginInfo.password,
          },
          {
            headers: { "Content-Type": "application/json" },
          }
        )
        .then((res) => {
          alert("로그인이 완료되었습니다");
          handleResponseSuccess();
          history.push("/");
        })
        .catch((err) => {
          setErrorMessage("이메일 혹은 비밀번호가 일치하지 않습니다.");
        });
    }
  };

  return (
    <>
      <Container>
        <Article>
          <SigninForm onSubmit={(e) => e.preventDefault()}>
            <InputType>이메일</InputType>
            <Input type="text" onChange={handleInputValue("email")} />
            <InputType>비밀번호</InputType>
            <Input type="password" onChange={handleInputValue("password")} />
            <ErrorMessage>{errorMessage}</ErrorMessage>
            <Button type="submit" onClick={handleLogin}>
              로그인
            </Button>
          </SigninForm>
          <AccountBox>
            <Account>아이디/비밀번호 찾기</Account>
            <Account onClick={handleSignUp}>회원가입</Account>
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
  cursor: pointer;
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
