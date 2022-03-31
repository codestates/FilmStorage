import React, { useState, useEffect } from "react";
import styled, { css } from "styled-components";
import { useHistory } from "react-router-dom";
import ReplyList from "../components/reply/ReplyList";
import FilmLogRevison from "../components/filmlog/FilmLogRevison";
import { initialState } from "../assets/state";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

export default function FilmLogDetailPage({ userInfo }) {
  const history = useHistory();

  const { views } = initialState.post[13];

  const [isOpen, setIsOpen] = useState(false);

  // 사진 정보 상태 관리
  const [photoInfo, setPhotoInfo] = useState({});

  // 삭제 버튼 상태 관리
  const [isDeleteButton, setIsDeleteButton] = useState(false);

  useEffect(() => {
    getDetailInfo();
  }, []);

  useEffect(() => {
    if (userInfo.id === photoInfo.user_id) {
      setIsDeleteButton(true);
    } else {
      setIsDeleteButton(false);
    }
  }, [photoInfo]);

  // 상세페이지 해당 파람스
  const url = window.location.href;
  const filmlog_id = url.split("filmlogdetail/")[1];

  const getDetailInfo = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/filmlogs/view/${filmlog_id}`, {
        headers: {
          accept: "application/json",
        },
      })
      .then((res) => {
        setPhotoInfo(res.data.data);
      });
  };

  console.log(photoInfo);

  const handleWriteRegister = () => {
    setIsOpen(!isOpen);
  };

  // 삭제요청 핸들러 함수
  const handleDeleteData = () => {
    if (window.confirm("진짜로 삭제 고고?")) {
      axios
        .delete(
          `${process.env.REACT_APP_API_URL}/filmlogs/deletion/${filmlog_id}`
        )
        .then((res) => {
          history.goBack();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  // 유저정보에 따른 삭제버튼 조건부 랜더링
  // const handleDeleteButton = () => {};

  return (
    <Container>
      <Article>
        <Nav>
          <NavDiv>
            <Button onClick={() => history.goBack()}>
              <FontAwesomeIcon icon={faAngleLeft} />
            </Button>
          </NavDiv>
          <Navflex />
          {isDeleteButton ? (
            <>
              <NavDiv>
                <Button onClick={handleWriteRegister}>수정하기</Button>
                {isOpen ? (
                  <FilmLogRevison
                    userInfo={userInfo}
                    setIsOpen={setIsOpen}
                    photoInfo={photoInfo}
                  />
                ) : null}
              </NavDiv>
              <NavDiv>
                <Button onClick={() => handleDeleteData()}>삭제하기</Button>
              </NavDiv>
            </>
          ) : (
            <NavDiv></NavDiv>
          )}
        </Nav>
        <DetailImg>
          <img className="detailImg" src={photoInfo.photo} alt="demo" />
        </DetailImg>
        <InfoBox>
          <Info fontsize="16px" fontweight orange>
            {photoInfo.nickname}
          </Info>
          <Info fontsize="16px" flex="9">
            {photoInfo.filmtype}
          </Info>
          <Info rigth>좋아요 {photoInfo.likesCount}</Info>
          <Info rigth>조회수 {photoInfo.views}</Info>
        </InfoBox>
        <TextBox>{photoInfo.contents}</TextBox>
        <ReplyForm>
          <ReplyList replyList={initialState.reply} />
          <ReplyInput></ReplyInput>
          <Button rigth>댓글 쓰기</Button>
        </ReplyForm>
      </Article>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  /* height: 90vh; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem 0 150px 0;
`;

const Article = styled.article`
  /* border: 1px solid green; */
  width: 60%;
  position: relative;
`;

const Nav = styled.nav`
  width: 100%;
  height: 8rem;
  /* border: 1px solid red; */
  display: flex;
`;

const NavDiv = styled.div`
  margin-top: 4rem;
`;

const Navflex = styled.div`
  flex-grow: 1;
`;

const DetailImg = styled.div`
  width: 100%;
  height: 75vh;
  /* border: 1px solid Gainsboro; */
  > img.detailImg {
    width: 100%;
    height: 75vh;
    object-fit: fill;
  }
`;

const Button = styled.button`
  margin-right: 10px;
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
    } else if (props.rigth) {
      return css`
        rigth: -50px;
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

const ReplyInput = styled.input`
  border: 1px solid Gainsboro;
  border-radius: 10px;
  width: 97%;
  font-size: 14px;
  padding: 15px 10px;
  margin-top: 5px;
  outline: none;
  &:focus {
    border: none;
    border: 1px solid Gainsboro;
    box-shadow: 5px 5px 10px Gainsboro;
    transition: 0.3s;
  }
`;

const TextBox = styled.div`
  border-top: 2px solid #444;
  border-bottom: 2px solid #444;
  /* width: 100%; */
  padding: 20px 2px 100px;
  font-size: 14px;
  line-height: 2em;
`;
const ReplyForm = styled.form`
  /* border: 1px solid blue; */
  /* height: 30vh; */
`;

const InfoBox = styled.div`
  /* border: 1px solid red; */
  /* width: 100%; */
  /* height: 10vh; */
  display: flex;
`;
const Info = styled.span`
  /* border: 1px solid red; */
  padding: 5px;
  margin: 5px;
  color: ${(props) => (props.orange ? "Chocolate" : "none")};
  flex: ${(props) => props.flex || "1 30px"};
  font-size: ${(props) => props.fontsize || "12px"};
  font-weight: ${(props) => (props.fontweight ? 500 : 400)};
  text-align: ${(props) => (props.rigth ? "center" : "none")};
`;
