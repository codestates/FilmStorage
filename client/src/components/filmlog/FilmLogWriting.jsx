import React, { useState, useEffect } from "react";
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
  text-align: center;
  justify-content: center;
  > div.navtitle {
    margin-top: 1.3rem;
    margin-right: 2rem;
  }
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
  text-align: center;
  > div.imginsert {
    margin-top: 15rem;
  }
`;

function FilmLogWriting() {
  const [isOpen, setIsOpen] = useState(true);

  const openModalHandler = () => {
    setIsOpen(!isOpen);
  };

  // 이미지 미리보는 상태
  const [files, setFiles] = useState("");
  
 
  
   // 이미지 미리보기 삽입
  const encodeFileTobase64 = (fileBlob) => {
    const reader = new FileReader();
    reader.readAsDataURL(fileBlob);
    return new Promise((resolve) => {
      reader.onload = () => {
        setFiles(reader.result);
        resolve();
      };
    });
  };

  return (
    <>
      {isOpen ? (
        <ModalBG onClick={() => openModalHandler()}>
          <ModalBox onClick={(e) => e.stopPropagation()}>
            <ModalNav>
              <NavBox></NavBox>
              <div className="navtitle">사진등록 하기</div>
              <NavBox></NavBox>
              <div className="navtitle">
                <button onClick={() => openModalHandler()}>돌아가기</button>
                <button>등록</button>
              </div>
            </ModalNav>
            <ModalImageBox>
              <ImageBox>
                {files && <img src={files} alt="preview-img" width="100%" height="100%"/>}
                <div className="imginsert">
                  사진과 동영상을 <br />
                  드래그해서 넣어주세요.
                </div>
                <input
                  type="file"
                  id="picture"
                  accept="img/*"
                  onChange={(e) => {
                    encodeFileTobase64(e.target.files[0]);
                  }}
                ></input>
              </ImageBox>
              <div></div>
            </ModalImageBox>
          </ModalBox>
        </ModalBG>
      ) : null}
    </>
  );
}

export default FilmLogWriting;
