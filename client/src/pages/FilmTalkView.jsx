import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import styled, { css } from "styled-components";
import ReplyList from "../components/reply/ReplyList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";

export default function FilmTalkView({ userInfo, isLogin }) {
  const history = useHistory();
  // * 임시 댓글 정보 저장
  const [replyCount, setReplyCount] = useState(0);
  const [filmTalkInfo, setFilmTalkInfo] = useState({
    user_id: "",
    category: "",
    contents: "",
    title: "",
    createdAt: "",
    nickname: "",
    views: 0,
  });

  // * 작성한 댓글 서버에 저장
  const [comment, setComment] = useState("");
  // * 서버에서 불러와서 저장하고 댓글 목록에 출력
  const [filmTalkComments, setFilmTalkComments] = useState([]);
  const url = window.location.href;
  const filmtalk_id = url.split("view/")[1];

  // missing dependency 해결을 위해 useCallback 사용
  const getFilmtalkDetail = useCallback(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/filmtalks/view/${filmtalk_id}`, {
        headers: {
          Accept: "application/json",
        },
      })
      .then((res) => {
        const {
          user_id,
          category,
          contents,
          createdAt,
          title,
          nickname,
          views,
        } = res.data.data;
        setFilmTalkInfo({
          user_id,
          category,
          contents,
          createdAt,
          title,
          nickname,
          views,
        });
      })
      .catch((err) => console.log(err));
  }, [filmtalk_id]);

  const getFTCommentsInfo = useCallback(() => {
    axios
      .get(
        `${process.env.REACT_APP_API_URL}/filmtalk_comments/total/${filmtalk_id}`,
        {
          headers: {
            Accept: "application/json",
          },
        }
      )
      .then((res) => {
        setFilmTalkComments(res.data.data);
      })
      .catch((err) => console.log(err));
  }, [filmtalk_id]);

  useEffect(() => {
    getFilmtalkDetail();
    getFTCommentsInfo();
  }, [getFilmtalkDetail, getFTCommentsInfo, replyCount]);

  const handleDelete = () => {
    Swal.fire({
      text: "삭제하시겠습니까?",
      icon: "question",
      iconColor: "#ff6347",
      showCancelButton: true,
      confirmButtonColor: "#189cc4",
      cancelButtonColor: "#ff6347",
      cancelButtonText: "취소",
      confirmButtonText: "삭제",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(
            `${process.env.REACT_APP_API_URL}/filmtalks/deletion/${filmtalk_id}`
          )
          .then(() => {
            Swal.fire({
              text: "삭제가 완료되었습니다",
              icon: "success",
              iconColor: "#ff6347",
              showConfirmButton: false,
              timer: 1200,
            }).then(() => {
              history.push("/filmtalks/total");
            });
          })
          .catch((err) => console.log(err));
      }
    });
  };

  const postComment = () => {
    if (comment === "") {
      Swal.fire({
        text: "댓글을 작성해주세요",
        icon: "warning",
        iconColor: "#ff6347",
        showConfirmButton: false,
        timer: 1200,
      });
    } else if (!isLogin) {
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
      axios
        .post(
          `${process.env.REACT_APP_API_URL}/filmtalk_comments/register/${userInfo.id}/${filmtalk_id}`,
          {
            contents: comment,
          },
          {
            headers: {
              "Content-type": "application/json",
            },
          }
        )
        .then((res) => {
          setComment("");
          setReplyCount(replyCount + 1);
        })
        .catch((err) => console.log(err));
    }
  };

  const convertDate = (date) => {
    return date.split(" ")[0];
  };

  return (
    <>
      <Container>
        <Article>
          <FontAwesomeIcon
            icon={faChevronLeft}
            className="icon"
            onClick={() => history.push("/filmtalks/total")}
          />
          {userInfo.id === filmTalkInfo.user_id ? (
            <>
              <Button
                top
                right={"120px"}
                onClick={() =>
                  history.push({
                    pathname: `/filmtalks/register/${filmtalk_id}`,
                    state: { filmTalkInfo: filmTalkInfo },
                  })
                }
              >
                수정하기
              </Button>
              <Button top onClick={handleDelete}>
                삭제하기
              </Button>
            </>
          ) : null}
          <InfoBox>
            <Info fontsize="18px" fontweight orange>
              {filmTalkInfo.category}
            </Info>
            <Info fontsize="18px" flex="9" fontweight>
              {filmTalkInfo.title}
            </Info>
          </InfoBox>
          <InfoBox>
            <Info fontsize="18px" flex="9">
              {filmTalkInfo.nickname}
            </Info>
            <Info right>날짜 {convertDate(filmTalkInfo.createdAt)}</Info>
            <Info right>조회수 {filmTalkInfo.views}</Info>
          </InfoBox>
          <ContentBox
            dangerouslySetInnerHTML={{
              __html: filmTalkInfo.contents,
            }}
          ></ContentBox>
          <ReplyForm onSubmit={(e) => e.preventDefault()}>
            <ReplyList
              filmTalkComments={filmTalkComments}
              getFTCommentsInfo={getFTCommentsInfo}
              convertDate={convertDate}
              userFTInfo={userInfo}
            />
            <ReplyInput
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            ></ReplyInput>
            <Button bottom onClick={postComment}>
              댓글 쓰기
            </Button>
          </ReplyForm>
        </Article>
      </Container>
    </>
  );
}

//***** 컴포넌트 디자인 *****//
const Container = styled.section`
  width: 100%;
  /* height: 90vh; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 100px 0 150px 0;
  /* position: relative; */
  @media screen and (max-width: 412px) {
    font-size: 10px;
  }
`;
const Article = styled.article`
  /* border: 1px solid green; */
  width: 80%;
  position: relative;

  > .icon {
    /* border: 1px solid green; */
    padding: 10px;
    font-size: 28px;
    cursor: pointer;
    @media screen and (max-width: 412px) {
      padding: 0;
      margin-bottom: 15px;
    }
  }
  @media screen and (max-width: 1024px) {
    width: 90%;
  }
  @media screen and (max-width: 412px) {
    width: 90%;
  }
`;
const InfoBox = styled.div`
  /* border-top: 1px solid Gainsboro; */
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

  @media screen and (max-width: 1024px) {
    margin-left: 0px;
    white-space: pre;
    font-size: 16px;
  }
  @media screen and (max-width: 412px) {
    font-size: 12px;
    white-space: pre;
    overflow: hidden;
    /* margin-left:-200px */
  }
`;
const ContentBox = styled.div`
  /* border: 1px solid red; */
  border-top: 2px solid #444;
  border-bottom: 2px solid #444;
  padding: 20px 2px 100px;
  font-size: 14px;

  img {
    /* border: 3px solid yellow; */
    max-width: 100%;
  }
`;
const ReplyForm = styled.form`
  /* border: 1px solid blue; */
  /* height: 30vh; */
`;
const ReplyInput = styled.input`
  border: 1px solid #000;
  border-radius: 5px;
  width: 94%;
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
const Button = styled.button`
  padding: 10px 30px;
  border: 1px tomato solid;
  border-radius: 5px;
  background-color: white;
  color: tomato;
  margin-top: 20px;
  position: absolute;
  right: ${(props) => props.right || 0};
  ${(props) => {
    if (props.bottom) {
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
  @media screen and (max-width: 768px) {
    padding: 10px 30px;
    font-size: 16px;
    /* right: 80px; */
    /* margin-right: -15px; */
  }
  @media screen and (max-width: 412px) {
    padding: 10px 20px;
    font-size: 12px;
    /* right: 20px */
    /* right: 30px; */
    /* margin-right: -15px; */
  }
`;
