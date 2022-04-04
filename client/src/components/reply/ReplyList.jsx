import axios from "axios";
import React from "react";
import styled from "styled-components";
import Loader from "../Loader";

export default function ReplyList({
  getFTCommentsInfo,
  getFLCommentsInfo,
  filmLogComments,
  filmTalkComments,
  userFLInfo,
  userFTInfo,
}) {
  let commentsInfo, userInfo;

  if (filmTalkComments) {
    commentsInfo = filmTalkComments;
    userInfo = userFTInfo;
  } else if (filmLogComments) {
    commentsInfo = filmLogComments;
    userInfo = userFLInfo;
  }

  const handleDelete = (id) => {
    if (window.confirm("삭제하시겠습니까?")) {
      if (filmTalkComments) {
        axios
          .delete(
            `${process.env.REACT_APP_API_URL}/filmtalk_comments/deletion/${id}`
          )
          .then(() => getFTCommentsInfo())
          .catch((err) => console.log(err));
      } else if (filmLogComments) {
        axios
          .delete(
            `${process.env.REACT_APP_API_URL}/filmlog_comments/deletion/${id}`
          )
          .then(() => getFLCommentsInfo())
          .catch((err) => console.log(err));
      }
    }
  };

  const convertDate = (date) => {
    return date.split(" ")[0];
  };

  return (
    <>
      {commentsInfo === undefined ? (
        <Loader />
      ) : (
        <ReplyBox>
          {commentsInfo.map((comment, idx) => {
            return (
              <Reply key={idx}>
                <Writer>{comment.nickname}</Writer>
                <Text>{comment.contents}</Text>
                <Date>{convertDate(comment.createdAt)}</Date>
                {userInfo.id === comment.user_id ? (
                  <>
                    <Button
                      type="button"
                      onClick={() => handleDelete(comment.id)}
                    >
                      삭제
                    </Button>
                  </>
                ) : null}
              </Reply>
            );
          })}
        </ReplyBox>
      )}
    </>
  );
}

const ReplyBox = styled.ul`
  /* border: 1px solid red; */
  display: flex;
  flex-direction: column;
  padding: 10px 0;
  font-size: 14px;
`;
const Reply = styled.li`
  /* border-bottom: 1px solid Gainsboro; */
  background: #f8f8f8;
  margin: 5px 0px;
  display: flex;
  flex-wrap: wrap;
  padding: 5px;
`;
const Writer = styled.span`
  /* border: 1px solid green; */
  flex: 1 80px;
  padding: 5px 10px;
  font-weight: 500;
`;
const Text = styled.span`
  /* border: 1px solid green; */
  flex: 18 100px;
  padding: 5px;
`;
const Date = styled.span`
  /* border: 1px solid green; */
  flex: 1 80px;
  padding: 5px 10px;
  font-size: 13px;
  font-weight: 500;
  color: #999;
`;

const Button = styled.button`
  border: none;
  border-radius: 10px;
  padding: 5px 10px;
  margin-left: 5px;

  &:hover {
    color: white;
    background-color: tomato;
    cursor: pointer;
  }
`;
