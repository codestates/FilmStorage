/* TODO : 로그인 페이지 만들기. */
import React from "react";
import { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2";

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
      setErrorMessage("이메일 형식에 맞지 않습니다");
    } else if (!validateFuntion.PW(password)) {
      setErrorMessage(
        "비밀번호는 문자, 숫자, 특수문자 포함 8자리 이상이어야 합니다"
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
          handleResponseSuccess();
          history.push("/");
        })
        .catch((err) => {
          setErrorMessage("이메일 혹은 비밀번호가 일치하지 않습니다");
        });
    }
  };
  // * 게스트 로그인 핸들러 함수
  const handleGuestLogin = () => {
    axios
      .post(
        `${process.env.REACT_APP_API_URL}/users/signin`,
        {
          email: "GUSET@guset.com",
          password: "1q2w3e4r%T",
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      )
      .then((res) => {
        handleResponseSuccess();
        history.push("/");
      });
  };

  const findEmail = () => {
    Swal.fire({
      title: "아이디 찾기",
      html:
        "<div>닉네임</div>" +
        '<input id="nickname" class="swal2-input">' +
        "<div>휴대전화</div>" +
        '<input id="mobile" class="swal2-input">',
      focusConfirm: false,
      confirmButtonColor: "#ff6347",
      confirmButtonText: "입력",
      showCancelButton: true,
      cancelButtonText: "취소",
      preConfirm: () => {
        const nickname = document.getElementById("nickname").value;
        const mobile = document.getElementById("mobile").value;
        return {
          nickname,
          mobile,
        };
      },
    }).then((result) => {
      if (result.isConfirmed) {
        const { nickname, mobile } = result.value;
        axios
          .get(
            `${process.env.REACT_APP_API_URL}/users/find_email?nickname=${nickname}&mobile=${mobile}`,
            {
              headers: {
                accept: "application/json",
              },
            }
          )
          .then((res) => {
            Swal.fire({
              html:
                "<div>이메일 주소는 다음과 같습니다</div>" +
                `<div style="font-weight: bold">${res.data.data.email}</div>`,
              icon: "info",
              iconColor: "#ff6347",
              confirmButtonColor: "#ff6347",
              confirmButtonText: "확인",
            });
          })
          .catch((err) => {
            if (err.response.status === 404) {
              Swal.fire({
                text: "입력하신 정보와 일치하는 이메일이 존재하지 않습니다",
                icon: "info",
                iconColor: "#ff6347",
                timer: 1500,
              });
            } else {
              console.log(err);
            }
          });
      }
    });
  };

  const findPassword = () => {
    Swal.fire({
      title: "비밀번호 찾기",
      html:
        "<div>이메일을 입력해주세요</div>" +
        '<input id="email" class="swal2-input">',
      preConfirm: () => {
        return {
          email: document.getElementById("email").value,
        };
      },
      focusConfirm: false,
      confirmButtonColor: "#ff6347",
      confirmButtonText: "입력",
      showCancelButton: true,
      cancelButtonText: "취소",
    }).then((result) => {
      const { email } = result.value;
      axios
        .get(
          `${process.env.REACT_APP_API_URL}/users/find_password?email=${email}`,
          {
            headers: {
              accept: "application/json",
            },
          }
        )
        .then(() => {
          Swal.fire({
            text: "입력하신 주소로 이메일이 전송되었습니다. 확인바랍니다",
            icon: "info",
            iconColor: "#ff6347",
            confirmButtonColor: "#ff6347",
            confirmButtonText: "확인",
          });
        })
        .catch((err) => {
          if (err.response.status === 404) {
            Swal.fire({
              text: "입력하신 정보와 일치하는 이메일이 존재하지 않습니다",
              icon: "info",
              iconColor: "#ff6347",
              timer: 1500,
            });
          }
        });
    });
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
            <div>
              <Account onClick={findEmail}>아이디 / </Account>
              <Account onClick={findPassword}>비밀번호 찾기</Account>
            </div>
            <Account onClick={handleSignUp}>회원가입</Account>
          </AccountBox>
          <SocialAccountBox>
            <img
              onClick={() => kakaoSignIn()}
              src="https://user-images.githubusercontent.com/87605663/162007911-72b49851-4a30-421c-9633-7db1f888d405.png"
              alt="kakao"
            />
          </SocialAccountBox>
          <Button type="submit" onClick={handleGuestLogin}>
            게스트 로그인
          </Button>
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

const Button = styled.button`
  width: 100%;
  padding: 10px 30px;
  margin: 10px 0;
  border: 1px solid tomato;
  border-radius: 5px;
  right: 0px;
  font-size: 16px;
  font-weight: 600;
  color: tomato;
  cursor: pointer;
  background: white;
  font-weight: 600;
  &:hover {
    color: white;
    background: tomato;
    transition: 0.3s;
  }
`;
const AccountBox = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 5px 0;
`;
const Account = styled.span`
  font-size: 12px;
  cursor: pointer;
  &:hover {
    font-weight: bold;
  }
  /* border: 1px solid tomato; */
`;
const SocialAccountBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px 0;
  cursor: pointer;
  img {
    width: 300px;
  }
`;
