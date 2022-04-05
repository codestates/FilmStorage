import React, { useState, useEffect, useCallback } from "react";
import styled, { css } from "styled-components";
import { useHistory } from "react-router-dom";
import ReplyList from "../components/reply/ReplyList";
import FilmLogRevison from "../components/filmlog/FilmLogRevison";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { faPhotoFilm } from "@fortawesome/free-solid-svg-icons";
import Guide from "../components/Guide";
import axios from "axios";

export default function FilmLogDetailPage({ userInfo, isLogin }) {
  const history = useHistory();
  const [isOpen, setIsOpen] = useState(false);
  // 사진 정보 상태 관리
  const [photoInfo, setPhotoInfo] = useState({});
  // 삭제 버튼 상태 관리
  const [comment, setComment] = useState("");
  const [filmLogComments, setFilmLogComments] = useState([]);

  // * 로그인 여부 확인 상태 관리
  const [modalClose, setModalClose] = useState(false);

  // * 좋아요 상태 관리
  const [isLike, setIsLike] = useState(false);

  // * 등록일 변환
  const [createdDate, setCreatedDate] = useState("");

  const url = window.location.href;
  const filmlog_id = url.split("filmlogdetail/")[1];

  const getDetailInfo = useCallback(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/filmlogs/view/${filmlog_id}`, {
        headers: {
          accept: "application/json",
        },
      })
      .then((res) => {
        console.log("포터인포 ========>", res.data.data);
        setPhotoInfo(res.data.data);
        setCreatedDate(res.data.data.createdAt.split(" ")[0]);
      });
  }, [filmlog_id]);

  const getFLCommentsInfo = useCallback(() => {
    axios
      .get(
        `${process.env.REACT_APP_API_URL}/filmlog_comments/total/${filmlog_id}`,
        {
          headers: {
            Accept: "application/json",
          },
        }
      )
      .then((res) => {
        setFilmLogComments(res.data.data);
      })
      .catch((err) => console.log(err));
  }, [filmlog_id]);

  useEffect(() => {
    getDetailInfo();
    getFLCommentsInfo();
  }, [getDetailInfo, getFLCommentsInfo]);

  const handleWriteRegister = () => {
    setIsOpen(!isOpen);
  };

  // 삭제요청 핸들러 함수
  const handleDeleteData = () => {
    if (window.confirm("삭제를 진행 하시겠습니까?")) {
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

  const postComment = () => {
    if (comment === "") {
      alert("댓글을 입력해주세요");
    } else {
      axios
        .post(
          `${process.env.REACT_APP_API_URL}/filmlog_comments/register/${userInfo.id}/${filmlog_id}`,
          {
            contents: comment,
          },
          {
            headers: {
              "Content-type": "application/json",
            },
          }
        )
        .then(() => setComment(""))
        .catch((err) => console.log(err));
    }
  };

  // * 댓글 쓰기 로그인 여부 확인
  const handleReplayUpdate = () => {
    if (!isLogin) {
      setModalClose(true);
    } else {
      postComment();
    }
  };

  const handleModalClose = () => {
    setModalClose(false);
  };

  const handleFilmLike = () => {
    handlePostLike();
  };

  const handlePostLike = () => {
    axios
      .post(
        `${process.env.REACT_APP_API_URL}/filmlogs/likes/${userInfo.id}/${filmlog_id}`,
        {
          headers: {
            "Content-type": "application/json",
          },
        }
      )
      .then((res) => {
        setIsLike(res.data.data.like);
      });
  };

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
          {userInfo.id === photoInfo.user_id ? (
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
        <div className="detailImageBox">
          <img
            className="detailImageBox_image"
            src={photoInfo.photo}
            alt="demo"
          />
          {/* 이미지 클릭시 좋아요 버튼 이벤트 기능 */}
          <div
            className="detailImageBox_textBox"
            onClick={() => handleFilmLike()}
          >
            <div className="detailImageBox_Like">
              {isLike ? (
                <FontAwesomeIcon icon={faPhotoFilm} color="tomato" />
              ) : (
                <FontAwesomeIcon icon={faPhotoFilm} />
              )}
            </div>
          </div>
        </div>
        <InfoBox>
          <Info fontsize="16px" fontweight orange>
            {photoInfo.nickname}
          </Info>
          <Info fontsize="16px" flex="9">
            {photoInfo.filmtype}
          </Info>
          <Info rigth>장소 {photoInfo.location}</Info>
          <Info rigth>등록일 {createdDate}</Info>
          <Info rigth>좋아요 {photoInfo.likesCount}</Info>
          <Info rigth>조회수 {photoInfo.views}</Info>
        </InfoBox>
        <TextBox>{photoInfo.contents}</TextBox>
        <ReplyForm>
          <ReplyList
            filmLogComments={filmLogComments}
            userFLInfo={userInfo}
            getFLCommentsInfo={getFLCommentsInfo}
          />
          <ReplyInput onChange={(e) => setComment(e.target.value)}></ReplyInput>
          {modalClose ? <Guide handleModalClose={handleModalClose} /> : null}
          <Button rigth onClick={handleReplayUpdate}>
            댓글 기능 구현중
          </Button>
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
