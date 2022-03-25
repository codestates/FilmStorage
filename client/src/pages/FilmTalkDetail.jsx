import React from "react";
import styled, { css } from "styled-components";
import { initialState } from "../assets/state";

const Container = styled.section`
  width: 100%;
  /* height: 90vh; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 100px 0 150px 0;
`;
const Article = styled.article`
  /* border: 1px solid green; */
  width: 60%;
  position: relative;
`;
const InfoBox = styled.div`
  /* border: 1px solid red; */
  /* width: 100%; */
  /* height: 10vh; */
  display: flex;
`;
const Info = styled.span`
  /* border: 1px solid red; */
  padding: 10px 2px;
  flex: ${props => props.flex || 1};
  font-size : ${props => props.fontsize || "12px"};
  font-weight : ${props => props.fontweight ? 500 : 400};

`;
const TextBox = styled.div`
  border-top: 2px solid #444;
  border-bottom: 2px solid #444;
  /* width: 100%; */
  padding: 20px 2px 100px;
`;
const Comments = styled.div`
  /* border: 1px solid blue; */
  height: 30vh;
`;
const CommentsInput = styled.input`
  /* padding: 10px 300px; */
  width: 97%;
  font-size: 14px;
  padding: 10px 10px;
  margin-top: 5px;
  outline: none;
`;
const Button = styled.button`
  padding: 10px 30px;
  border: none;
  border-radius: 20px;
  position: absolute;
  right: ${(props) => props.rigth || 0};
  ${(props) => {
    if (props.top) {
      return css`
        top: -50px;
      `;
    } else if (props.bottom) {
      return css`
        bottom: -50px;
      `;
    }
  }}
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  &:hover {
    color: white;
    background: tomato;
    transition: 0.3s;
  }
`;

function FilmTalkDetail() {

  const { category, title, writer, date, views } = initialState.post[13];


  return (
    <>
      <Container>
        <Article>
          <Button top rigth={"120px"}>
            수정하기
          </Button>
          <Button top>삭제하기</Button>
          <InfoBox>
            <Info fontsize="18px" fontweight>
              {category}
            </Info>
            <Info fontsize="18px" flex="9" fontweight>
              {title}
            </Info>
          </InfoBox>
          <InfoBox>
            <Info fontsize="14px" flex="9">
              {writer}
            </Info>
            <Info>{date}</Info>
            <Info>조회수 {views}</Info>
          </InfoBox>
          <TextBox>{initialState.body}</TextBox>
          <Comments></Comments>
          <CommentsInput></CommentsInput>
          <Button bottom>댓글 쓰기</Button>
        </Article>
      </Container>
    </>
  );
}

export default FilmTalkDetail;
