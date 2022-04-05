/* TODO : 필름로그 페이지 만들기. */
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "./FilmLogPage.css";
import styled, { css } from "styled-components";
import FilmLogWriting from "../components/filmlog/FilmLogWriting";
import SimpleSlider from "../components/filmlog/SimpleSlider";
import filmdummydata from "../components/dummydata/filmdummydata";
import FilmType from "../components/filmlog/FilmType";
import Loader from "../components/Loader";
import Guide from "../components/Guide";

export default function FilmLogPage({ userInfo, isLogin }) {
  // 작성창 띄우기
  const [isOpen, setIsOpen] = useState(false);
  // 이미지 스크롤시 로딩 표시 보이게 하기
  const [isLoaded, setIsLoaded] = useState(false);

  // 스크롤 타겟 설정
  const [target, setTarget] = useState(null);

  // 이미지 상태 설정
  const [itemLists, setItemLists] = useState([]);

  // 무한스크롤 마지막
  const [isClose, setIsClose] = useState(true);

  // * 모달 창 상태 저장
  const [modalClose, setModalClose] = useState(false);

  const dummydata = [...filmdummydata];

  const getMoreItem = async () => {
    // 8장씩 스크롤 되도록 하기
    let curlist = dummydata.splice(0, 8);
    setIsLoaded(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setItemLists((itemLists) => itemLists.concat(curlist));
    setIsLoaded(false);
    if (dummydata.length === 0) {
      CloseScroll();
    }
  };

  // 타겟 찾기
  const onIntersect = async ([entry], observer) => {
    if (entry.isIntersecting && !isLoaded) {
      observer.unobserve(entry.target);
      await getMoreItem();
      observer.observe(entry.target);
    }
  };

  useEffect(() => {
    const option = {
      root: null,
      rootMargin: "0px",
      threshold: 1,
    };
    let observer;
    if (target) {
      observer = new IntersectionObserver(onIntersect, option);
      observer.observe(target);
    }
    return () => observer && observer.disconnect();
  }, [target]);

  const CloseScroll = () => {
    setIsClose(false);
  };

  // 사진 등록 페이지 핸들러
  const handleWriteRegister = () => {
    setIsOpen(!isOpen);
  };

  const history = useHistory();

  const handlePictureDetail = () => {
    return history.push("/filmlogdetail/");
  };

  // * 글쓰기
  const handleUpdate = () => {
    if (!isLogin) {
      setModalClose(true);
    } else {
      handleWriteRegister();
    }
  };

  // * 모달 창 닫기
  const handleModalClose = () => {
    setModalClose(false);
  };

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
              {modalClose ? (
                <Guide handleModalClose={handleModalClose} />
              ) : null}
              <Button onClick={handleUpdate}>사진등록</Button>
              {isOpen ? (
                <FilmLogWriting userInfo={userInfo} setIsOpen={setIsOpen} />
              ) : null}
            </div>
          </nav>
          <div className="filmlog-second-content">
            {itemLists.map((el, key) => (
              <FilmLogImg
                key={key}
                src={el}
                onClick={() => {
                  handlePictureDetail();
                }}
              />
            ))}
          </div>
          {isClose ? (
            <div ref={setTarget} className="Target-Element">
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
  cursor: pointer;
  &:hover {
    opacity: 0.8;
    background: tomato;
    transition: 0.3s;
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
