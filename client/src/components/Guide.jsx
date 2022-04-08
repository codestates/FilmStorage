import React from "react";
import styled, { css } from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function Guide({ handleModalClose }) {
  const [text, setText] = useState("로그인 후 사용하실 수 있는 기능입니다");
  const [button, setButton] = useState(true);
  return (
    <>
      <ModalBG>
        <Modal>
          <FontAwesomeIcon
            icon={faXmark}
            className="icon"
            onClick={handleModalClose}
          />
          {text}
          <Link to="/signin">
            {button ? <Button type="button">로그인 하러 가기</Button> : null}
          </Link>
        </Modal>
      </ModalBG>
    </>
  );
}

const ModalBG = styled.div`
  position: fixed;
  z-index: 999;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.6);
`;

const Modal = styled.div`
  /* border: 3px solid red; */
  width: 400px;
  height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  border-radius: 20px;
  /* box-shadow: 5px 5px 10px Gainsboro; */
  position: fixed;
  background: #fff;

  .icon {
    /* border: 1px solid red; */
    font-size: 18px;
    position: absolute;
    top: 20px;
    right: 20px;
    cursor: pointer;
  }
`;

const Button = styled.button`
  padding: 10px 30px;
  margin-top: 20px;
  border: none;
  border-radius: 20px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  &:hover {
    color: white;
    background: tomato;
    transition: 0.3s;
  }
`;
