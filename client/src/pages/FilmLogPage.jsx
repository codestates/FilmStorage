/* TODO : 필름로그 페이지 만들기. */
import React,{useState} from "react";
import { Link } from "react-router-dom";
import "./FilmLogPage.css";
import styled from "styled-components";
import FilmLogWriting from "../components/filmlog/FilmLogWriting";
import SimpleSlider from "../components/filmlog/SimpleSlider"

// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


const NavBtn = styled.button`
  font-size: 1rem;
  font-weight: bold;
  border-radius: 10px;
  background-color: #fff;
  width: 6rem ;
  height: 2rem ;
`;

const RegisterBtn = styled.button`
  font-size: 1.3rem;
  font-weight: bold;
  border-radius: 10px;
  background-color: #fff;
  width: 8rem;
  height: 2.5rem;
`;

const FilmLogImg = styled.img`
  width:20rem;
  height:20rem;
  border: 1px solid black;
  margin: 11px
`;

function FilmLogPage() {

  const [isOpen, setIsOpen] = useState(false)
  
  const handleWriteRegister = () =>{
    setIsOpen(!isOpen)
  }

  return (
    <>
      <section className="filmlog-first">
        <div className="filmlog-first-img"><SimpleSlider /></div>
      </section>
      {/*  */}
      <article className="filmlog-second">
        <div className="filmlog-second-container">
          <nav className="filmlog-second-nav">
            <div className="filmlog-second-nav-title">필름 종류</div>
            <ul>
              <li>
                <NavBtn>코닥</NavBtn>
              </li>
              <li>
                <NavBtn>코닥</NavBtn>
              </li>
              <li>
                <NavBtn>코닥</NavBtn>
              </li>
              <li>
                <NavBtn>코닥</NavBtn>
              </li>
              <li>
                <NavBtn>코닥</NavBtn>
              </li>
            </ul>
            <div className="nav-flex"></div>
            <div>
              <RegisterBtn onClick={handleWriteRegister}>사진등록</RegisterBtn>
              {isOpen ? <FilmLogWriting /> : null}
            </div>
          </nav>
          <div className="filmlog-second-content">
            <Link to="/filmlogdetail">
            <FilmLogImg />
            </Link>
            <FilmLogImg></FilmLogImg>
            <FilmLogImg></FilmLogImg>
            <FilmLogImg></FilmLogImg>
            <FilmLogImg></FilmLogImg>
            <FilmLogImg></FilmLogImg>
            <FilmLogImg></FilmLogImg>
            <FilmLogImg></FilmLogImg>
            <FilmLogImg></FilmLogImg>
            <FilmLogImg></FilmLogImg>
          </div>
        </div>
      </article>
    </>
  );
}

export default FilmLogPage;
