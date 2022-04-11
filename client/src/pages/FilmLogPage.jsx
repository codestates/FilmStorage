/* TODO : 필름로그 페이지 만들기. */
import React, { useState, useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
import "./FilmLogPage.css";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronCircleUp } from "@fortawesome/free-solid-svg-icons";
import FilmLogWriting from "../components/filmlog/FilmLogWriting";
import SimpleSlider from "../components/filmlog/SimpleSlider";
import FilmType from "../components/filmlog/FilmType";
import Loader from "../components/Loader";
import Swal from "sweetalert2";
import axios from "axios";

export default function FilmLogPage({ userInfo, isLogin }) {
  // 이미지 스크롤시 로딩 표시 보이게 하기
  const [isLoaded, setIsLoaded] = useState(false);
  // 무한스크롤 이미지리스트
  const [filmLogItemLists, setFilmLogItemLists] = useState([]);
  // 무한스크롤 마지막
  const [isClose, setIsClose] = useState(true);
  // 무한스크롤 페이지 및 참조 지정
  const [page, setPage] = useState(1);
  const observer = useRef();
  // Top3
  const [topThree, setTopThree] = useState([]);
  // 작성창 띄우기
  const [isOpen, setIsOpen] = useState(false);

  const [filmLogFilter, setFilmLogFilter] = useState("");

  const url = {
    id: 999,
    photo:
      "https://user-images.githubusercontent.com/87605663/162465009-b068bf83-8a9a-4322-8bb6-7af06afe3cf1.jpg",
  };
  const getTopThree = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/filmlogs/topthree`, {
        headers: {
          accept: "application/json",
        },
      })
      .then((res) => {
        setTopThree(() => [url, ...res.data.data]);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getTopThree();
  }, []);

  useEffect(() => {
    if (filmLogFilter !== "") {
      setIsLoaded(true);
      new Promise((resolve) => setTimeout(resolve, 1000));
      axios
        .get(
          `${process.env.REACT_APP_API_URL}/filmlogs/total?filmtype=${filmLogFilter}`,
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
              return window.location.assign("/filmlog");
            });
          }
          setFilmLogItemLists(() => [...res.data.data]);
          setIsLoaded(false);
          setIsClose(false);
        })
        .catch((err) => console.log(err));
    }
  }, [filmLogFilter]);

  const getFilmlogData = async (page) => {
    const offset = page * 8 - 8;
    setIsLoaded(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    axios
      .get(
        `${process.env.REACT_APP_API_URL}/filmlogs/total?offset=${offset}&limit=8`,
        {
          headers: {
            accept: "application/json",
          },
        }
      )
      .then((res) => {
        setFilmLogItemLists((prev) => [...prev, ...res.data.data]);
        setIsLoaded(false);
        if (res.data.message === "end") {
          setIsClose(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => page !== 0 && getFilmlogData(page), [page]);

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

  const history = useHistory();

  const handlePictureDetail = (id) => {
    return history.push(`/filmlogdetail/${id}`);
  };

  // * 글쓰기
  const handleUpdate = () => {
    if (!isLogin) {
      Swal.fire({
        text: "로그인 후 사용하실 수 있습니다",
        icon: "warning",
        iconColor: "#ff6347",
        showConfirmButton: true,
        showCancelButton: true,
        confirmButtonText: "로그인 하러 가기",
        cancelButtonText: "취소",
        confirmButtonColor: "#189cc4",
        cancelButtonColor: "#ff6347",
      }).then((result) => {
        if (result.isConfirmed) {
          history.push("/signin");
        }
      });
    } else {
      handleWriteRegister();
    }
  };

  const handleScroll = () => {
    window.scrollTo({ left: 0, top: 0, behavior: "smooth" });
  };

  return (
    <>
      <Container>
        <section className="filmlog-first">
          <div className="filmlog-first-img">
            <SimpleSlider topThree={topThree} />
          </div>
        </section>
        <article className="filmlog-second">
          <div className="filmlog-second-container">
            <nav className="filmlog-second-nav">
              <div className="nav-flex">
                <div className="filmlog-second-nav-title">필름 종류</div>
                <div className="filmlog-second-nav-title">
                  <FilmType
                    filmLogItemLists={filmLogItemLists}
                    setFilmLogFilter={setFilmLogFilter}
                  />
                </div>
              </div>
              <div className="nav-flex">
                <div>
                  <Button onClick={handleUpdate}>사진등록</Button>
                  {isOpen ? (
                    <FilmLogWriting userInfo={userInfo} setIsOpen={setIsOpen} />
                  ) : null}
                </div>
              </div>
            </nav>
            <div className="filmlog-second-content">
              {filmLogItemLists.map((el, key) => (
                <FilmLogImg
                  key={el.id}
                  src={el.photo}
                  onClick={() => {
                    handlePictureDetail(el.id);
                  }}
                />
              ))}
            </div>
            {isClose ? (
              <div ref={observer} className="Target-Element">
                {isLoaded && <Loader />}
              </div>
            ) : null}
          </div>
        </article>
        <ScrollToTop type="button" onClick={handleScroll}>
          <FontAwesomeIcon icon={faChevronCircleUp} />
        </ScrollToTop>
      </Container>
    </>
  );
}
const Container = styled.section`
  display: flex;
  flex-direction: column;
  justify-self: center;
  align-items: center;
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
  @media screen and (max-width: 412px) {
    height: 18rem;
  }
`;

const Button = styled.button`
  padding: 10px 30px;
  border: 1px solid tomato;
  background: none;
  color: tomato;
  border-radius: 20px;
  font-family: "SCoreDream";
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  &:hover {
    color: white;
    background: tomato;
    transition: 0.3s;
  }
`;

const ScrollToTop = styled.button`
  font-size: 40px;
  color: #ffffff88;
  position: fixed;
  right: 30px;
  bottom: 30px;
  z-index: 1;
  cursor: pointer;
  transition: 0.3s;
  background: none;
  border: 20px;
  &:hover {
    color: #ff6347;
  }
  @media screen and (max-width: 1024px) {
    color: #eee;
  }
`;
