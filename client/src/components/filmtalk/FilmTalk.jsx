import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

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
  cursor: ${props => props.cursor ? "pointer" : null}
`;

function FilmTalk({ post, idx }) {

  return (
    <>
      <Tr key={post.id}>
        <Td>{post.id}</Td>
        <Td>{post.category}</Td>
        <Td cursor left post={post} key={idx}>
          <Link to={`/filmtalks/view/${post.id}`}>
            {post.title}
          </Link>
        </Td>
        <Td>{post.writer}</Td>
        <Td>{post.date}</Td>
        <Td>{post.views}</Td>
      </Tr>
    </>
  );
}

export default FilmTalk;
