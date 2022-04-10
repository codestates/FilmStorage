import React from "react";
import styled from "styled-components";
import Loader from "../Loader";

const Tr = styled.tr`
  /* border: 3px solid red; */
  transition: 0.3s;
  &:hover {
    background: Gainsboro;
  }
`;
const Td = styled.td`
  border-bottom: 1px solid Gainsboro;
  padding: 15px 10px;
  font-size: 14px;
  color: #222;
  text-align: ${(props) => (props.left ? "left" : "center")};
  cursor: ${(props) => (props.pointer ? "pointer" : null)};
  @media screen and (max-width: 412px) {
    /* border: 1px solid red; */
    display: ${props => props.none ? "none" : null};
    padding: 10px;
    font-size: 10px;
    white-space: pre;
  }
`;

function FilmTalkTotalList({ post, handleClickView }) {
  const { id, category, title, nickname, createdAt, views } = post;

  const convertDate = () => {
    if (createdAt) {
      return createdAt.split(" ")[0];
    }
  };
  return (
    <>
      {post ? (
        <Tr key={id}>
          <Td none>{id}</Td>
          <Td none>{category}</Td>
          <Td pointer left onClick={() => handleClickView(id)}>
            {title}
          </Td>
          <Td>{nickname}</Td>
          <Td none>{convertDate()}</Td>
          <Td none>{views}</Td>
        </Tr>
      ) : (
        <Loader />
      )}
    </>
  );
}

export default FilmTalkTotalList;
