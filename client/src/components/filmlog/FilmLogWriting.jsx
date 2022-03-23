import React, { useState } from "react";
import styled from "styled-components";

const ModalBG = styled.div`
  position: fixed;
  z-index: 999;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.5);
`;

const ModalWrting = styled.div`
  background-color: white;
  width: 800px;
  height: 600px;
  border-radius: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  line-height: 30px;
  padding: 20px 5px;
  box-shadow: 5px 10px 20px rgba(0, 0, 0, 0.205);
`;

function FilmLogWriting() {
  return (
    <>
      <ModalBG>
        <ModalWrting />
      </ModalBG>
    </>
  );
}

export default FilmLogWriting;
