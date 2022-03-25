import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const Section = styled.div`
  width: 75vw;
  height: 200vh;
  border: 1px solid black;
  text-align: center;
`;

const Nav = styled.nav`
  width: 100%;
  height: 8rem;
  border: 1px solid red;
  display: flex;
`;

const NavDiv = styled.div`
  margin-top: 5rem;
`;

const RegisterBtn = styled.button`
  font-size: 1.3rem;
  font-weight: bold;
  border-radius: 10px;
  background-color: #fff;
  width: 8rem;
  height: 2.5rem;
`;

const Navflex = styled.div`
  flex-grow: 1;
`;

const DetailImg = styled.div`
  width: 100%;
  height: 75vh;
  border: 1px solid Gainsboro;
  > img.detailImg {
    width: 100%;
    height: 75vh;
    object-fit: fill;
  }
`;

const HeaderBox = styled.header`
  display: flex;
  width: 100%;
  height: 80px;
  justify-content: space-around;
  align-items: center;
  border: 1px solid Gainsboro;
  > div.navbox {
    display: flex;
  }
`;

const ContentBox = styled.div`
  width: 100%;
  height: 100vh;
  border: 1px solid red;
  > div.content {
    width: 100%;
    height: 30vh;
    border: 1px solid blue;
  }
  > input.reply {
    width: 100%;
    height: 8vh;
  }
`;

function FilmLogDetailPage() {

  const history = useHistory();


  return (
    <Container>
      <Section>
        <Nav>
          <NavDiv onClick={()=> history.goBack()}>뒤로가기</NavDiv>
          <Navflex></Navflex>
          <NavDiv>
            <RegisterBtn>수정하기</RegisterBtn>
          </NavDiv>
          <NavDiv>
            <RegisterBtn>삭제하기</RegisterBtn>
          </NavDiv>
        </Nav>
        {/* 클릭한 이미지 클릭 랜던링 */}
        <DetailImg>
          <img
            className="detailImg"
            src="https://user-images.githubusercontent.com/89363048/159869612-9afbf915-e26d-42de-9bd0-f33270b346f7.jpeg"
            alt="demo"
          />
        </DetailImg>
        <HeaderBox>
          <div className="navbox">
            <div>이미지</div>
            <div>유저정보</div>
            <div>필름정보</div>
          </div>
          <div className="navbox">
            <div>좋아요</div>
            <div>조회수</div>
          </div>
        </HeaderBox>
        <ContentBox>
          <div className="content">내용</div>
          <div className="content">댓글</div>
          <input className="reply" placeholder="댓글입력"></input>
        </ContentBox>
      </Section>
    </Container>
  );
}

export default FilmLogDetailPage;
