import React from "react";
import styled from "styled-components";

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
  cursor: ${props => props.cursor ? "pointer" : null};
`;

function FilmTalkTatal({ post, handleClickView }) {
  const { id, category, title, writer, date, views } = post;
  return (
    <>
      <Tr key={id}>
        <Td>{id}</Td>
        <Td>{category}</Td>
        <Td cursor left onClick={() => handleClickView(id)}>
          {title}
        </Td>
        <Td>{writer}</Td>
        <Td>{date}</Td>
        <Td>{views}</Td>
      </Tr>
    </>
  );
}

export default FilmTalkTatal;
