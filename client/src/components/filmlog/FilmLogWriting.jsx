import React, { useState } from "react";
import styled from "styled-components";
import FilmLogDetail from "../../pages/FilmLogDetail";

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

const ModalBox = styled.div.attrs((props) => ({
  role: "dialog",
}))`
  width: 70vw;
  height: 80vh;
  background: white;
  border-radius: 1rem;
  margin: 0;
`;

const ModalNav = styled.nav`
  width: 70vw;
  height: 10vh;
  border: 1px solid black;
  display: flex;
  font-size: 2rem;
  padding: 30px 0px 0px px;
`;

const NavBox = styled.div`
  flex-grow: 3;
`;

const ModalImageBox = styled.div`
  display: flex;
  width: 70vw;
  height: 70vh;
  border: 1px solid black;
  `;

  const ImageBox = styled.div`
    width: 40vw;
    border: 1px solid red;
  `;

function FilmLogWriting() {
  const [isOpen, setIsOpen] = useState(true);


  const openModalHandler = () => {
    setIsOpen(!isOpen);
  };
  




  return (
    <>
      {isOpen ? (
        <ModalBG onClick={() => openModalHandler()}>
          <ModalBox onClick={(e) => e.stopPropagation()}>
            <ModalNav>
              <NavBox></NavBox>
              <div>사진등록 하기</div>
              <NavBox></NavBox>
              <div>
                <button>돌아가기</button>
                <button>등록</button>
              </div>
            </ModalNav>
            <ModalImageBox>
              <ImageBox>사진과 동영상을 드래그해서 넣어주세요.</ImageBox>
              <div>유저정보</div>
            </ModalImageBox>
          </ModalBox>
        </ModalBG>
      ) : null}
    </>
  );
}

export default FilmLogWriting;
