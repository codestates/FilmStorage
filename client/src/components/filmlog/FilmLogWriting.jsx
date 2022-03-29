import React, { useState } from "react";
import styled, { css } from "styled-components";
import FilmType from "./FilmType";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";

export default function FilmLogWriting() {
  const [isOpen, setIsOpen] = useState(true);

  const openModalHandler = () => {
    setIsOpen(!isOpen);
  };
  // 이미지 미리보는 상태
  const [files, setFiles] = useState("");

  // 이미지 미리보기 삽입 기능
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

  //
  return (
    <>
      {isOpen ? (
        <ModalBG onClick={() => openModalHandler()}>
          <ModalBox onClick={(e) => e.stopPropagation()}>
            <ModalNav>
              <div className="navtitle">
                <Button onClick={() => openModalHandler()}>
                  <FontAwesomeIcon icon={faAngleLeft} />
                </Button>
              </div>
              <div className="navtitle">사진 등록 하기</div>
              <div className="navtitle">
                <Button>등록</Button>
              </div>
            </ModalNav>
            <ModalImageBox>
              <ImageBox>
                {files && (
                  <img
                    src={files}
                    alt="preview-img"
                    width="100%"
                    height="100%"
                    border-bottom-left-radius="1rem"
                  />
                )}
                <div className="imginsert">
                  사진과 동영상을 <br />
                  드래그해서 넣어주세요.
                </div>
                <Input
                  type="file"
                  placeholder="picture"
                  // accept="img/*"
                  onChange={(e) => {
                    encodeFileTobase64(e.target.files[0]);
                  }}
                ></Input>
              </ImageBox>
              <Content>
                <UserInfo>
                  <div className="userinfo">이미지</div>
                  <div className="userinfo">유저닉네임</div>
                </UserInfo>
                <Textarea>
                  <textarea
                    className="filmcontent"
                    placeholder="내용입력"
                  ></textarea>
                </Textarea>
                <Tagarea>
                  필름선택
                  <FilmType />
                </Tagarea>
              </Content>
            </ModalImageBox>
          </ModalBox>
        </ModalBG>
      ) : null}
    </>
  );
}

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
  border-bottom: 1px solid black;
  display: flex;
  font-size: 2rem;
  text-align: center;
  justify-content: space-between;
  > div.navtitle {
    margin-top: 1.3rem;
    margin-right: 2rem;
    margin-left: 2rem;
  }
`;

const ModalImageBox = styled.div`
  display: flex;
  width: 70vw;
  height: 70vh;
  /* border: 1px solid black; */
`;

const ImageBox = styled.div`
  width: 40vw;
  border-right: 1px solid black;
  text-align: center;
  > div.imginsert {
    margin-top: 15rem;
  }
`;

const Button = styled.button`
  padding: 10px 30px;
  border: none;
  border-radius: 20px;
  right: ${(props) => props.rigth || 0};
  ${(props) => {
    if (props.top) {
      return css`
        top: -50px;
      `;
    } else if (props.bottom) {
      return css`
        bottom: -50px;
      `;
    }
  }}
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  &:hover {
    color: white;
    background: tomato;
    transition: 0.3s;
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  padding: 10px 30px;
  border: none;
  border-radius: 20px;
  right: ${(props) => props.rigth || 0};
  ${(props) => {
    if (props.top) {
      return css`
        top: -50px;
      `;
    } else if (props.bottom) {
      return css`
        bottom: -50px;
      `;
    }
  }}
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  &:hover {
    color: white;
    background: tomato;
    transition: 0.3s;
  }
`;

const UserInfo = styled.div`
  /* border: 1px solid red; */
  width: 30vw;
  height: 10vh;
  display: flex;
  > div.userinfo {
    margin-top: 1.7rem;
    margin-left: 1rem;
    margin-bottom: 1.7rem;
    /* border: 1px solid blue; */
    font-size: 1.5rem;
  }
`;

const Textarea = styled.div`
  width: 30vw;
  height: 30vh;
  margin-left: 1rem;
  margin-right: 1rem;
  /* border: 1px solid blue; */
  > textarea.filmcontent {
    width: 29.5vw;
    height: 29.5vh;
    rows: "5";
    cols: "30";
    placeholder: "내용 입력";
  }
`;

const Tagarea = styled.div`
  width: 30vw;
  height: 30vh;
  margin-top: 1rem;
  margin-left: 1rem;
  /* border: 1px solid green; */
`;
