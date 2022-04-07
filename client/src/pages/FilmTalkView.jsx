import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import styled, { css } from "styled-components";
import ReplyList from "../components/reply/ReplyList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import Guide from "../components/Guide";

export default function FilmTalkView({ userInfo, isLogin }) {

  const history = useHistory();
  // * 로그인 여부 확인 상태 관리
  const [modalClose, setModalClose] = useState(false);
  // * 임시 댓글 정보 저장
  const [replyCount, setReplyCount] = useState(0)
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
    if (window.confirm("삭제하시겠습니까?")) {
      axios
        .delete(
          `${process.env.REACT_APP_API_URL}/filmtalks/deletion/${filmtalk_id}`
        )
        .then(() => {
          alert("삭제가 완료되었습니다");
          history.push("/filmtalks/total");
        })
        .catch((err) => console.log(err));
    }
  };

  const postComment = () => {
    if (comment === "") {
      alert("댓글을 입력해주세요");
    } else if (!isLogin) {
      setModalClose(true);
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

  // * 모달 창 닫기
  const handleModalClose = () => {
    setModalClose(false);
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
                rigth={"120px"}
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
            <Info fontsize="14px" flex="9">
              {filmTalkInfo.nickname}
            </Info>
            <Info rigth>날짜 {convertDate(filmTalkInfo.createdAt)}</Info>
            <Info rigth>조회수 {filmTalkInfo.views}</Info>
          </InfoBox>
          <ContentBox
            dangerouslySetInnerHTML={{ __html: filmTalkInfo.contents }}
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
            {modalClose ? <Guide handleModalClose={handleModalClose} /> : null}
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
`;
const Article = styled.article`
  /* border: 1px solid green; */
  width: 60%;
  position: relative;

  .icon {
    /* border: 1px solid green; */
    padding: 10px;
    font-size: 28px;
    cursor: pointer;
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
const Button = styled.button`
  padding: 10px 30px;
  border: none;
  border-radius: 20px;
  position: absolute;
  right: ${(props) => props.rigth || 0};
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
`;
