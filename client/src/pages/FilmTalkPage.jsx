/* TODO : 필름토크 페이지 만들기. */
import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";
import FilmTalkTotal from "../components/filmtalk/FilmTalkTatal";
import { initialState } from "../assets/state";
import Pagination from "../components/filmtalk/Pagination";

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

function FilmTalkPage() {

  // * 필름토크 페이지 게시글 데이터
  const [posts, setPosts] = useState(initialState.post);
  // * 페이지네이션 기능 *//
  const [page, setPage] = useState(1);
  const offset = (page - 1) * 10;

  // * 필름토크 게시글 페이지 이동
  const [viewInx, setViewIdx] = useState(0)
  const history = useHistory();
  const handleClickView = (id) => {
    setViewIdx(id);
    history.push(`/filmtalks/view/${id}`);
  }
  return (
    <>
      <Container>
        <Article>
          <Link to="/filmtalks/register">
            <Button>글쓰기</Button>
          </Link>
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
              {posts.slice(offset, offset + 10).map((post) => (
                <FilmTalkTotal
                  post={post}
                  key={post.id}
                  handleFilmTalkView={handleClickView}
                />
              ))}
            </Tbody>
          </Table>
          <Pagination total={posts.length} page={page} setPage={setPage} />
        </Article>
      </Container>
    </>
  );
}

export default FilmTalkPage;
