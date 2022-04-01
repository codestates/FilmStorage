import axios from "axios";
import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import { initialState } from "../assets/state";
import ReplyList from "../components/reply/ReplyList";

export default function FilmTalkView() {
  // const { category, title, writer, date, views } = initialState.post;

  const [filmTalkInfo, setFilmTalkInfo] = useState({
    category: "",
    contents: "",
    title: "",
    createdAt: "",
    nickname: "",
    views: 0,
  });

  useEffect(() => {
    getFilmtalkDetail();
  }, []);

  const getFilmtalkDetail = () => {

    const url = window.location.href;
    const filmtalk_id = url.split("view/")[1];

    axios
      .get(`${process.env.REACT_APP_API_URL}/filmtalks/view/${filmtalk_id}`, {
        headers: {
          Accept: "application/json",
        },
      })
      .then((res) => {
        console.log(res);
        const { category, contents, createdAt, title, nickname, views } =
          res.data.data;
        setFilmTalkInfo({
          category,
          contents,
          createdAt,
          title,
          nickname,
          views,
        });
      })
      .catch((err) => console.log(err));
  };

  const convertDate = (date) => {
    return date.split(" ")[0];
  };


  return (
    <>
      <Container>
        <Article>
          <Button top rigth={"120px"}>
            수정하기
          </Button>
          <Button top>삭제하기</Button>
          <InfoBox>
            <Info fontsize="18px" fontweight orange>
              {filmTalkInfo.category}
            </Info>
            <Info fontsize="18px" flex="9" fontweight>
              {filmTalkInfo.title}
            </Info>
          </InfoBox>
          <InfoBox>
            <Info fontsize="14px" flex="9">
              {filmTalkInfo.nickname}
            </Info>
            <Info rigth>날짜 {convertDate(filmTalkInfo.createdAt)}</Info>
            <Info rigth>조회수 {filmTalkInfo.views}</Info>
          </InfoBox>
          <TextBox dangerouslySetInnerHTML={{__html: filmTalkInfo.contents}}></TextBox>
          <ReplyForm>
            <ReplyList replyList={initialState.reply} />
            <ReplyInput></ReplyInput>
            <Button bottom>댓글 쓰기</Button>
          </ReplyForm>
        </Article>
      </Container>
    </>
  );
}

//***** 컴포넌트 디자인 *****//
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
  padding: 5px;
  margin: 5px;
  color: ${(props) => (props.orange ? "Chocolate" : "none")};
  flex: ${(props) => props.flex || "1 30px"};
  font-size: ${(props) => props.fontsize || "12px"};
  font-weight: ${(props) => (props.fontweight ? 500 : 400)};
  text-align: ${(props) => (props.rigth ? "center" : "none")};
`;
const TextBox = styled.div`
  border-top: 2px solid #444;
  border-bottom: 2px solid #444;
  /* width: 100%; */
  padding: 20px 2px 100px;
  font-size: 14px;
  line-height: 2em;
`;
const ReplyForm = styled.form`
  /* border: 1px solid blue; */
  /* height: 30vh; */
`;
const ReplyInput = styled.input`
  border: 1px solid Gainsboro;
  border-radius: 10px;
  width: 97%;
  font-size: 14px;
  padding: 15px 10px;
  margin-top: 5px;
  outline: none;
  &:focus {
    border: none;
    border: 1px solid Gainsboro;
    box-shadow: 5px 5px 10px Gainsboro;
    transition: 0.3s;
  }
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
