/* TODO : 필름토크 페이지 만들기. */
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import FilmTalkTotal from "../components/filmtalk/FilmTalkTatal";
import { initialState } from "../assets/state";
import Pagination from "../components/filmtalk/Pagination";
import axios from "axios";
import Guide from "../components/Guide";

const Container = styled.section`
  width: 100%;
  height: 90vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 50px 0;
  position: relative;
`;

const Article = styled.article`
  /* border: 1px solid green; */
  width: 60%;
  position: absolute;
  top: 100px;
`;

const Table = styled.table`
  width: 100%;
  /* border: 1px solid blue; */
  border-collapse: collapse;
`;

const Thead = styled.thead`
  /* border: 3px solid red; */
`;
const Tbody = styled.tbody`
  border-bottom: 2px solid #444;
`;
const Tr = styled.tr`
  /* border: 1px solid red; */
`;
const Th = styled.th`
  padding: 20px 0;
  border-bottom: 2px solid #222;
  font-size: 14px;
  /* border: 1px solid red; */
`;

const Button = styled.button`
  padding: 10px 30px;
  border: none;
  border-radius: 20px;
  position: absolute;
  right: 0px;
  top: -50px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  &:hover {
    color: white;
    background: tomato;
    transition: 0.3s;
  }
`;

function FilmTalkPage({ isLogin }) {
  // * 모달 창 상태 저장
  const [modalClose, setModalClose] = useState(false);
  // * 필름토크 페이지 게시글 데이터
  const [posts, setPosts] = useState(initialState.post);
  // * 페이지네이션 기능 *//
  const [page, setPage] = useState(1);
  const [totalLength, setTotalLength] = useState(10);
  const offset = (page - 1) * 10;

  // * 필름토크 게시글 페이지 이동
  const history = useHistory();

  useEffect(() => {
    getTotalLength();
  }, []);

  useEffect(() => {
    getAllFilmTalkData();
  }, [page]);

  const handleClickView = (id) => {
    history.push(`/filmtalks/view/${id}`);
  };

  const getTotalLength = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/filmtalks/total`, {
        headers: {
          Accept: "application/json",
        },
      })
      .then((res) => {
        // console.log(res)
        setTotalLength(res.data.data.length);
      })
      .catch((err) => console.log(err));
  };

  const getAllFilmTalkData = () => {
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
  };

  // * 글쓰기
  const handleUpdate = () => {
    if (!isLogin) {
      setModalClose(true);
    } else {
      history.push("/filmtalks/register");
    }
  };

  // * 모달 창 닫기
  const handleModalClose = () => {
    setModalClose(false);
  };

  return (
    <>
      <Container>
        {modalClose ? <Guide handleModalClose={handleModalClose} /> : null}
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
