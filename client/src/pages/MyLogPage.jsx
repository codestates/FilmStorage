/* TODO : 필름로그 페이지 만들기. */
import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "./FilmLogPage.css";
import styled, { css } from "styled-components";
import FilmLogWriting from "../components/filmlog/FilmLogWriting";
import FilmType from "../components/filmlog/FilmType";
import Loader from "../components/Loader";
import axios from "axios";

export default function FilmLogPage({ userInfo }) {
  // 작성창 띄우기
  const [isOpen, setIsOpen] = useState(false);
  // 이미지 스크롤시 로딩 표시 보이게 하기
  const [isLoaded, setIsLoaded] = useState(false);
  // 로딩상태
  const [isClose, setIsClose] = useState(true);
  // 이미지 상태 설정
  const [itemLists, setItemLists] = useState([]);

  const [page, setPage] = useState(1);

  const observer = useRef();

  const getMylogData = async (page) => {
    const offset = page * 8 - 8;
    if (userInfo.id) {
      setIsLoaded(true);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      axios
        .get(
          `${process.env.REACT_APP_API_URL}/filmlogs/mylog/${userInfo.id}?offset=${offset}&limit=8`,
          {
            headers: {
              accept: "application/json",
            },
          }
        )
        .then((res) => {
          if (res.data.message === "end") {
            setIsClose(false);
          }
          setItemLists((prev) => [...prev, ...res.data.data]);
          setIsLoaded(false);
        })
        .catch((err) => {
          setIsClose(false);
          console.log(err);
        });
    }
  };

  useEffect(() => page !== 0 && getMylogData(page), [page]);

  const onIntersect = (entries) => {
    const target = entries[0];
    if (target.isIntersecting) {
      setPage((prev) => prev + 1);
    }
  };

  useEffect(() => {
    if (!observer.current) return;

    const io = new IntersectionObserver(onIntersect, { threshold: 0.5 });
    io.observe(observer.current);

    return () => io && io.disconnect();
  }, [observer]);

  // 사진 등록 페이지 핸들러
  const handleWriteRegister = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <article className="filmlog-second">
        <div className="filmlog-second-container">
          <nav className="filmlog-second-nav">
            <div className="filmlog-second-nav-title">필름 종류</div>
            <FilmType />
            <div className="nav-flex"></div>
            <div>
              <Button onClick={handleWriteRegister}>사진등록</Button>
              {isOpen ? (
                <FilmLogWriting userInfo={userInfo} setIsOpen={setIsOpen} />
              ) : null}
            </div>
          </nav>
          <div className="filmlog-second-content">
            {itemLists.map((el, key) => (
              <Link to={`/filmlogdetail/${el.id}`}>
                <FilmLogImg key={key} src={el.photo} />
              </Link>
            ))}
          </div>
          {isClose ? (
            <div ref={observer} className="Target-Element">
              {isLoaded && <Loader />}
            </div>
          ) : null}
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
  object-fit: cover;
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
