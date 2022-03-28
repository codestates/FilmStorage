/* TODO : 필름로그 페이지 만들기. */
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "./FilmLogPage.css";
import styled, { css } from "styled-components";
import FilmLogWriting from "../components/filmlog/FilmLogWriting";
import SimpleSlider from "../components/filmlog/SimpleSlider";
import filmdummydata from "../components/dummydata/filmdummydata";
import FilmType from "../components/filmlog/FilmType";
import Loader from "../components/filmlog/Loader";

export default function FilmLogPage() {
  // 작성창 띄우기
  const [isOpen, setIsOpen] = useState(false);
  // 이미지 스크롤시 로딩 표시 보이게 하기
  const [isLoaded, setIsLoaded] = useState(false);

  // 스크롤 타겟 설정
  const [target, setTarget] = useState(null);

  // 이미지 상태 설정
  const [itemLists, setItemLists] = useState([0, 1, 2]);

  const dummydata = [...filmdummydata];

  // 스크롤 페이지 나누는 함수
  const ScrollPages = (arr) => {
    let newArr = [...arr];
    let result = [];
    for (let i = 0; i < newArr.length; i += 10) {
      result.push(newArr.slice(i, i + 10));
    }
    return result;
  };

  useEffect(() => {
    console.log(itemLists);
  }, [itemLists]);

  const getMoreItem = async () => {
    setIsLoaded(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    let Items = [1, 2, 3];

    setItemLists((itemLists) => itemLists.concat(Items));
    setIsLoaded(false);
  };

  const onIntersect = async ([entry], observer) => {
    if (entry.isIntersecting && !isLoaded) {
      observer.unobserve(entry.target);
      await getMoreItem();
      observer.observe(entry.target);
    }
  };

  useEffect(() => {
    let observer;
    if (target) {
      observer = new IntersectionObserver(onIntersect, {
        threshold: 1,
      });
      observer.observe(target);
    }
    return () => observer && observer.disconnect();
  }, [target]);

  // 사진 등록 페이지 핸들러
  const handleWriteRegister = () => {
    setIsOpen(!isOpen);
  };

  const history = useHistory();

  const handlePictureDetail = () => {
    return history.push("/filmlogdetail/");
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
              <Button onClick={handleWriteRegister}>사진등록</Button>
              {isOpen ? <FilmLogWriting /> : null}
            </div>
          </nav>
          <div className="filmlog-second-content">
            {dummydata.map((el, key) => (
              <FilmLogImg
                key={key}
                src={el}
                onClick={() => {
                  handlePictureDetail();
                }}
              />
            ))}
          </div>
          <div ref={setTarget} className="Target-Element">
            {isLoaded && <Loader />}
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
