import React from "react";
import styled from "styled-components";
import filmData from "../dummydata/filmtypedummydata";

export default function FilmType() {
  return (
    <>
      <ul>
        <li>
          <Select name="kodak" id="kodak-select">
            <Option value="">코닥</Option>
            {filmData.kodak.map((el, key) => (
              <Option key={key} value={el}>
                {el}
              </Option>
            ))}
          </Select>
        </li>
        <li>
          <Select name="kodak" id="kodak-select">
            <Option value="">후지</Option>
            {filmData.fuji.map((el, key) => (
              <Option key={key} value={el}>
                {el}
              </Option>
            ))}
          </Select>
        </li>
        <li>
          <Select name="kodak" id="kodak-select">
            <Option value="">아그파</Option>
            {filmData.agfa.map((el, key) => (
              <Option key={key} value={el}>
                {el}
              </Option>
            ))}
          </Select>
        </li>
        <li>
          <Select name="kodak" id="kodak-select">
            <Option value="">일포드</Option>
            {filmData.ilford.map((el, key) => (
              <Option key={key} value={el}>
                {el}
              </Option>
            ))}
          </Select>
        </li>
        <li>
          <Select name="kodak" id="kodak-select">
            <Option value="">롤라이</Option>
            {filmData.rollei.map((el, key) => (
              <Option key={key} value={el}>
                {el}
              </Option>
            ))}
          </Select>
        </li>
        <li>
          <Select name="kodak" id="kodak-select">
            <Option value="">기타</Option>
            {filmData.etc.map((el, key) => (
              <Option key={key} value={el}>
                {el}
              </Option>
            ))}
          </Select>
        </li>
      </ul>
    </>
  );
}

const Select = styled.select`
  padding: 10px 30px;
  border: 1px solid #black;
  border-radius: 20px;
  font-size: 12px;
  width: 6rem;
  font-weight: 600;
  cursor: pointer;
  margin-top: 10px;
  &:hover {
    color: white;
    background: tomato;
    transition: 0.3s;
  }
`;

const Option = styled.option`
  background: grey;
`;
