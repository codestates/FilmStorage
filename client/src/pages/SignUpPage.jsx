/* TODO : 로그인 페이지 만들기. */
import React, { useEffect } from "react";
import { useState, useRef } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import TermsOfService from "../assets/TermsOfService";

axios.defaults.withCredentials = true;

export default function SignUpPage() {
  // * 에러메세지
  const [errorMessage, setErrorMessage] = useState("");
  // * 회원가입을 위한 유저 정보
  const [userInfo, setUserInfo] = useState({
    email: "",
    nickname: "",
    password: "",
    repassword: "",
    mobile: "",
  });
  const history = useHistory();

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

  //* 유효성 검사
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
    Phone: (phone_number) => {
      const regPhone = /(01[0|1|6|9|7])[-](\d{3}|\d{4})[-](\d{4}$)/g;
      return regPhone.test(phone_number);
    },
    DoubleCheck: (password, repassword) => {
      if (String(password) !== String(repassword)) return false;
      else return true;
    },
  };

  // * 유저 회원가입 입력값 저장
  const handleInputValue = (key) => (e) => {
    setUserInfo({ ...userInfo, [key]: e.target.value });
  };

  // * 유저 회원가입 입력값 확인 후 서버 전송
  const handleSignup = () => {
    const { email, nickname, password, repassword, mobile } = userInfo;
    if (!email || !nickname || !password || !repassword || !mobile) {
      setErrorMessage("모든 항목은 필수입니다");
      // let minutTimer = setTimeout(() => setErrorMessage(""), 3000);
      // return () => {
      //   clearTimeout(minutTimer);
      // };
    } else if (!validateFuntion.Email(email)) {
      setErrorMessage("이메일 형식과 맞지 않습니다");
    } else if (!validateFuntion.PW(password)) {
      setErrorMessage(
        "비밀번호는 문자, 숫자, 특수문자 포함 8자리 이상이어야 합니다"
      );
    } else if (!validateFuntion.Phone(mobile)) {
      setErrorMessage("유효하지 않는 핸드폰번호 입니다");
    } else if (!validateFuntion.DoubleCheck(password, repassword)) {
      setErrorMessage("비밀번호가 일치 하지 않습니다");
    } else if (!termCheck) {
      setErrorMessage("이용약관에 동의해주세요");
    } else {
      axios
        .post(`${process.env.REACT_APP_API_URL}/users/signup`, userInfo, {
          "Content-Type": "application/json",
        })
        .then(() => {
          Swal.fire({
            text: "회원가입이 완료되었습니다",
            icon: "success",
            iconColor: "#ff6347",
            showConfirmButton: false,
            timer: 1200,
          }).then(() => {
            history.push("/signin");
          });
        })
        .catch((err) => {
          const type = err.response.data.message.split(" ")[0];
          if (type === "email") {
            setErrorMessage("이미 사용중인 이메일 주소가 존재합니다");
          } else if (type === "nickname") {
            setErrorMessage("이미 사용중인 닉네임이 존재합니다");
          } else {
            console.log(err);
          }
        });
    }
  };

  // * 이용약관 모달창 핸들링
  const [termCheck, setTermCheck] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const outsideModal = useRef();
  const handleTermModal = (e) => {
    if (outsideModal.current === e.target) {
      setOpenModal(false);
    }
  };

  const handleTermCheck = () => {
    if (termCheck) {
      setTermCheck(false);
    } else {
      setOpenModal(true);
      setTermCheck(true);
    }
  };

  return (
    <>
      <Container ref={outsideModal} onClick={handleTermModal}>
        {openModal === true ? (
          <>
            <ModalBG
              onClick={() => {
                setOpenModal(false);
              }}
            >
              <TermModal>
                <TermsOfService />
              </TermModal>
            </ModalBG>
          </>
        ) : null}
        <Article>
          <SigninForm onSubmit={(e) => e.preventDefault()}>
            <InputType>이메일</InputType>
            <Input type="text" onChange={handleInputValue("email")} />
            <InputType>닉네임</InputType>
            <Input type="text" onChange={handleInputValue("nickname")} />
            <InputType>비밀번호</InputType>
            <Input type="password" onChange={handleInputValue("password")} />
            <InputType>비밀번호 확인</InputType>
            <Input type="password" onChange={handleInputValue("repassword")} />
            <InputType>휴대폰 번호</InputType>
            <Input type="tel" onChange={handleInputValue("mobile")} />
            <ErrorMessage>{errorMessage}</ErrorMessage>
            <Term>
              <input
                type="checkbox"
                id="term"
                checked={termCheck}
                onClick={handleTermCheck}
              />
              <Label for="term">이용약관에 동의해주세요</Label>
            </Term>
            <Button type="submit" onClick={handleSignup}>
              회원가입
            </Button>
          </SigninForm>
          <SocialAccountBox>
            <img
              onClick={() => kakaoSignIn()}
              src="https://user-images.githubusercontent.com/87605663/162007911-72b49851-4a30-421c-9633-7db1f888d405.png"
              alt="kakao"
            />
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
  @media screen and (max-width: 1024px) {
    height: 80vh;
  }
  @media screen and (max-width: 412px) {
    margin-bottom: 100px;
  }
`;
const Article = styled.article`
  /* border: 1px solid blue; */
`;

const SigninForm = styled.form`
  /* border: 1px solid green; */
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  /* align-items: center; */
  /* padding: 10px 40px; */
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
  align-items: center;
`;
const Label = styled.label`
  margin-left: 5px;
  font-size: 12px;
`;

const Button = styled.button`
  width: 100%;
  padding: 10px 30px;
  border: 1px solid tomato;
  border-radius: 5px;
  right: 0px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  background: white;
  color: tomato;
  &:hover {
    color: white;
    background: tomato;
    transition: 0.3s;
  }
`;
const SocialAccountBox = styled.div`
  /* border: 1px solid red; */
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px 0;
  cursor: pointer;
  img {
    width: 300px;
  }
`;

//* 이용약관 모달 *//
const TermModal = styled.div`
  /* border: 1px solid red; */
  border-radius: 12px;
  background: white;
  padding: 20px;
  width: 600px;
  height: 700px;
  position: absolute;
  overflow: auto;
  @media screen and (max-width: 412px) {
    height: 400px;
    width: 300px;
    margin: 10px;
    padding-bottom: 10%;
  }
`;

const ModalBG = styled.div`
  position: fixed;
  z-index: 999;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.6);
`;
