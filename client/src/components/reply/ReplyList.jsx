import React from "react";
import styled from "styled-components";

export default function ReplyList({ replyList }) {
  return (
    <>
      <ReplyBox>
        {replyList.map((reply, idx) => {
          return (
            <Reply key={idx}>
              <Writer>{reply.writer}</Writer>
              <Text>{reply.text}</Text>
              <Date>{reply.date}</Date>
            </Reply>
          );
        })}
      </ReplyBox>
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