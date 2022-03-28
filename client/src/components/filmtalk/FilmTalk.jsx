import React from "react";
import styled from "styled-components";

const Tr = styled.tr`
  /* border: 3px solid red; */
  transition: 0.3s;
  cursor: pointer;
  &:hover {
    background: Gainsboro;
  }
`;
const Td = styled.td`
  border-bottom: 1px solid Gainsboro;
  padding: 15px 10px;
  font-size: 14px;
  color: #444;
  text-align: ${(props) => (props.left ? "left" : "center")};
`;

function FilmTalk({ post }) {

  return (
    <>
      <Tr key={post.id}>
        <Td>{post.id}</Td>
        <Td>{post.category}</Td>
        <Td left>{post.title}</Td>
        <Td>{post.writer}</Td>
        <Td>{post.date}</Td>
        <Td>{post.views}</Td>
      </Tr>
    </>
  );
}

export default FilmTalk;
