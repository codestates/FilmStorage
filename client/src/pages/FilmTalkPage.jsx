/* TODO : 필름토크 페이지 만들기. */
import React, { useCallback, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import FilmTalkTotal from "../components/filmtalk/FilmTalkTotalList";
import Pagination from "../components/filmtalk/Pagination";
import axios from "axios";
import Swal from "sweetalert2";

const Container = styled.section`
  width: 100%;
  height: 90vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 50px 0;
  position: relative;
  @media screen and (max-width: 412px) {
    /* width: 90%; */
  }
`;

const Article = styled.article`
  /* border: 1px solid green; */
  width: 60%;
  position: absolute;
  top: 100px;
  @media screen and (max-width: 412px) {
    width: 90%;
  }
`;

const Table = styled.table`
  width: 100%;
  /* border: 1px solid blue; */
  border-collapse: collapse;
`;

const Thead = styled.thead`
  @media screen and (max-width: 412px) {
    display: none;
  }
`;
const Tbody = styled.tbody`
  border-bottom: 1px solid #444;
  /* border: 1px solid red; */
`;
const Tr = styled.tr`
  /* border: 1px solid red; */
`;
const Th = styled.th`
  /* border: 1px solid red; */
  padding: 20px 0;
  border-bottom: 2px solid #222;
  font-size: 14px;

  @media screen and (max-width: 768px) {
    padding: 10px;
  }
  @media screen and (max-width: 412px) {
    /* border: 1px solid red; */
    padding: 10px;
    font-size: 10px;
    white-space: pre;
  }

  /* border: 1px solid red; */
`;

const Button = styled.button`
  position: absolute;
  right: 0px;
  top: -50px;
  padding: 10px 30px;
  border: 1px solid tomato;
  background: none;
  color: tomato;
  border-radius: 5px;
  font-family: "SCoreDream";
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  &:hover {
    color: white;
    background: tomato;
    transition: 0.3s;
  }
  @media screen and (max-width: 412px) {
    font-size: 10px;
    /* padding: 10px 20px; */
    /* margin-right: -240px; */
    /* margin-bottom: 10px; */
  }
`;

function FilmTalkPage({ isLogin }) {
  // * 필름토크 페이지 게시글 데이터
  const [posts, setPosts] = useState([]);
  // * 페이지네이션 기능 *//
  const [page, setPage] = useState(1);
  const [totalLength, setTotalLength] = useState(10);
  const offset = (page - 1) * 10;

  // * 필름토크 게시글 페이지 이동
  const history = useHistory();

  const getAllFilmTalkData = useCallback(() => {
    axios
      .get(
        `${process.env.REACT_APP_API_URL}/filmtalks/total?offset=${offset}`,
        {
          headers: {
            Accept: "application/json",
          },
        }
      )
      .then((res) => {
        setPosts(res.data.data);
      })
      .catch((err) => console.log(err));
  }, [offset]);

  useEffect(() => {
    getAllFilmTalkData();
  }, [page, getAllFilmTalkData]);

  const getTotalLength = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/filmtalks/total`, {
        headers: {
          Accept: "application/json",
        },
      })
      .then((res) => {
        setTotalLength(res.data.data.length);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getTotalLength();
  }, []);

  const handleClickView = (id) => {
    history.push(`/filmtalks/view/${id}`);
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
      history.push("/filmtalks/register");
    }
  };

  return (
    <>
      <Container>
        <Article>
          <Button onClick={handleUpdate}>글쓰기</Button>
          <Table>
            <Thead>
              <Tr>
                <Th>글번호</Th>
                <Th>카테고리</Th>
                <Th>제목</Th>
                <Th>작성자</Th>
                <Th>날짜</Th>
                <Th>조회수</Th>
              </Tr>
            </Thead>
            <Tbody>
              {posts.slice(0, 10).map((post) => (
                <FilmTalkTotal
                  post={post}
                  key={post.id}
                  handleClickView={handleClickView}
                />
              ))}
            </Tbody>
          </Table>
          <Pagination totalLength={totalLength} page={page} setPage={setPage} />
        </Article>
      </Container>
    </>
  );
}

export default FilmTalkPage;
