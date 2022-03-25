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
  text-align: ${(props) => (props.left ? "left" : "center")};
`;

function FilmTalk({ item }) {

  return (
    <>
      <Tr key={item.id}>
        <Td>{item.id}</Td>
        <Td>{item.category}</Td>
        <Td left>{item.title}</Td>
        <Td>{item.writer}</Td>
        <Td>{item.date}</Td>
        <Td>{item.views}</Td>
      </Tr>
    </>
  );
}

export default FilmTalk;
