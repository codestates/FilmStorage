import React from "react";
import styled, { css } from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

export default function Guide({ handleModalClose }) {
  return (
    <>
      <Modal>
        <FontAwesomeIcon
          icon={faXmark}
          className="icon"
          onClick={handleModalClose}
        />
        로그인 후 이용하실 수 있습니다
        <Link to="/signin">
          <Button type="button">로그인 하러 가기</Button>
        </Link>
      </Modal>
    </>
  );
}

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
  box-shadow: 5px 5px 10px Gainsboro;
  position: absolute;
  top: 300px;
  position: fixed;
  background: #fff;
  z-index: 1;

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
