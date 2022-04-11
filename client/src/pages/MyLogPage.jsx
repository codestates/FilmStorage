/* TODO : 필름로그 페이지 만들기. */
import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "./FilmLogPage.css";
import styled, { css } from "styled-components";
import FilmLogWriting from "../components/filmlog/FilmLogWriting";
import FilmType from "../components/filmlog/FilmType";
import Loader from "../components/Loader";
import axios from "axios";
import Swal from "sweetalert2";

export default function MyLogPage({ userInfo }) {
  // 작성창 띄우기
  const [isOpen, setIsOpen] = useState(false);
  // 이미지 스크롤시 로딩 표시 보이게 하기
  const [isLoaded, setIsLoaded] = useState(false);
  // 로딩상태
  const [isClose, setIsClose] = useState(true);
  // 이미지 상태 설정
  const [myLogItemLists, setMyLogItemLists] = useState([]);

  const [page, setPage] = useState(1);

  const [myLogFilter, setMyLogFilter] = useState("");

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
          setMyLogItemLists((prev) => [...prev, ...res.data.data]);
          setIsLoaded(false);
        })
        .catch((err) => {
          setIsClose(false);
          console.log(err);
        });
    }
  };

  useEffect(() => page !== 0 && getMylogData(page), [page]);

  useEffect(() => {
    if (myLogFilter !== "") {
      setIsLoaded(true);
      new Promise((resolve) => setTimeout(resolve, 1000));
      axios
        .get(
          `${process.env.REACT_APP_API_URL}/filmlogs/mylog/${userInfo.id}?filmtype=${myLogFilter}`,
          {
            headers: {
              accept: "application/json",
            },
          }
        )
        .then((res) => {
          if (!res.data.data.length) {
            return Swal.fire({
              text: "선택하신 필름으로 등록된 사진이 없습니다",
              icon: "info",
              iconColor: "#ff6347",
              showConfirmButton: false,
              timer: 1200,
            }).then(() => {
              return window.location.assign("/mylog");
            });
          }
          setMyLogItemLists(() => [...res.data.data]);
          setIsLoaded(false);
          setIsClose(false);
        })
        .catch((err) => console.log(err));
    }
  }, [myLogFilter]);

  const onIntersect = (entries) => {
    const target = entries[0];
    if (target.isIntersecting) {
      setPage((prev) => prev + 1);
    }
  };

  useEffect(() => {
    if (!observer.current) return;

    // TODO: rootMargin 혹은 threshold 설정으로 트리거가 최대한 밑에서 적용되게 코드 수정 필요
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
      <Container>
        <article className="filmlog-second">
          <div className="filmlog-second-container">
            <nav className="filmlog-second-nav">
              <div className="nav-flex">
                <div className="filmlog-second-nav-title">필름 종류</div>
                <FilmType
                  setMyLogFilter={setMyLogFilter}
                  myLogItemLists={myLogItemLists}
                />
              </div>
              <div className="nav-flex">
                <div>
                  <Button onClick={handleWriteRegister}>사진등록</Button>
                  {isOpen ? (
                    <FilmLogWriting userInfo={userInfo} setIsOpen={setIsOpen} />
                  ) : null}
                </div>
              </div>
            </nav>
            <div className="filmlog-second-content">
              {myLogItemLists.map((el, key) => (
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
      </Container>
    </>
  );
}

const Container = styled.section`
  /* border: 2px solid red; */
  width: 100%;
  min-height: 90vh;
  display: flex;
  justify-content: center;
  align-items: left;
  padding: 50px 0;
`;

const FilmLogImg = styled.img`
  /* border: 1px solid black; */
  width: 20rem;
  height: 20rem;
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
  background: none;
  padding: 10px 30px;
  border: 1px solid tomato;
  color: tomato;
  border-radius: 5px;
  font-weight: 600;
  cursor: pointer;
  &:hover {
    color: white;
    background: tomato;
    transition: 0.3s;
  }
`;
