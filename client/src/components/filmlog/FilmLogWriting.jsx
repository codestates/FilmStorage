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
  background: rgba(0, 0, 0, 0.6);
`;

const ModalWrting = styled.div.attrs((props) => ({
  role: "dialog",
}))`
  width: 70vw;
  height: 70vh;
  padding: 1.5rem;
  background: white;
  border-radius: 2px;
  margin: 0;
  > span.close_btn {
    margin-top: 5px;
    cursor: pointer;
  }
  > div.desc {
    margin-top: 25px;
    color: #4000c7;
  }
`;

function FilmLogWriting() {
  const [isOpen, setIsOpen] = useState(true);

  const openModalHandler = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {isOpen ? (
        <ModalBG onClick={()=>openModalHandler()}>
          <ModalWrting onClick={(e) => e.stopPropagation()}>
            <span className="close-btn" onClick={openModalHandler}>
              &times;
            </span>
            <div className="desc">내용이 들어가면 되겠지?</div>
          </ModalWrting>
        </ModalBG>
      ) : null}
    </>
  );
}

export default FilmLogWriting;
