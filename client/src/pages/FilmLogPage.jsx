/* TODO : 필름로그 페이지 만들기. */
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "./FilmLogPage.css";
import styled, { css } from "styled-components";
import FilmLogWriting from "../components/filmlog/FilmLogWriting";
import SimpleSlider from "../components/filmlog/SimpleSlider";
import filmdummydata from "../components/dummydata/filmdummydata";
import FilmType from "../components/filmlog/FilmType";



export default function FilmLogPage() {
  const [isOpen, setIsOpen] = useState(false);
  // 필름종류 더미데이터


  const handleWriteRegister = () => {
    setIsOpen(!isOpen);
  };

  const history = useHistory()

  const handlePictureDetail = () => {
    return history.push("/filmlogdetail")
  }

  return (
    <>
      <section className="filmlog-first">
        <div className="filmlog-first-img">
          <SimpleSlider />
        </div>
      </section>
      <article className="filmlog-second">
        <div className="filmlog-second-container">
          <nav className="filmlog-second-nav">
            <div className="filmlog-second-nav-title">필름 종류</div>
            <FilmType />
            <div className="nav-flex"></div>
            <div>
              <Button onClick={handleWriteRegister}>사진등록</Button>
              {isOpen ? <FilmLogWriting /> : null}
            </div>
          </nav>
          <div className="filmlog-second-content">
           {
            filmdummydata.map((el, key) => <FilmLogImg key={key} src={el} onClick={() =>{handlePictureDetail()}} />)
           }
          </div>
        </div>
      </article>
    </>
  );
}


const FilmLogImg = styled.img`
  width: 20rem;
  height: 20rem;
  border: 1px solid black;
  margin: 11px;
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
