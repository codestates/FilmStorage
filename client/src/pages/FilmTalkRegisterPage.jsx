import React from "react";
import styled from "styled-components";
import FilmTalkRegister from "../components/filmtalk/FilmTalkRegister";

export default function FilmTalkRegisterPage() {

  /* 카테고리 종류 */
  const filmCategory = ["카메라", "필름", "현상", "출사", "기타"];
  
  return (
    <>
      <Container>
        <Article>
          {filmCategory.map((film) => {
            return <FimlCategory>{film}</FimlCategory>;
          })}
          <TitleInput
            type="text"
            placeholder="제목을 작성해주세요"
            name="title"
          />
          <FilmTalkRegister />
          <Button right>돌아가기</Button>
          <Button>작성완료</Button>
        </Article>
      </Container>
    </>
  );
}

const Container = styled.section`
  width: 100%;
  height: 90vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const Article = styled.form`
  /* border: 1px solid green; */
  width: 800px;
  position: absolute;
  top: 100px;
`;

// * 필름 카테고리 컴포넌트
const FimlCategory = styled.button`
  background: none;
  margin: 0 5px;
  padding: 10px 30px;
  font-size: 14px;
  border: 1px solid Gainsboro;
  border-radius: 20px;
  transition: 0.3s;
  cursor: pointer;
  &:hover {
    color: tomato;
    border: 1px solid tomato;
    box-shadow: 2px 2px 5px Gainsboro;
  }
  &:active,
  &:focus {
    color: white;
    background: tomato;
  }
`;

// * 제목 작성 컴포넌트
const TitleInput = styled.input`
  outline: none;
  width: 100%;
  padding: 15px;
  margin: 20px 0;
  margin-bottom: 20px;
  font-size: 14px;
  box-sizing: border-box;
  border: 1px solid Gainsboro;
  &:focus {
    border: none;
    border: 1px solid Gainsboro;
    box-shadow: 5px 5px 10px Gainsboro;
    transition: 0.3s;
  }
`;

// * 버튼 컴포넌트
const Button = styled.button`
  padding: 10px 30px;
  border: none;
  border-radius: 20px;
  position: absolute;
  right: ${(props) => (props.right ? "120px" : 0)};
  bottom: -100px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  &:hover {
    color: white;
    background: tomato;
    transition: 0.3s;
  }
`;