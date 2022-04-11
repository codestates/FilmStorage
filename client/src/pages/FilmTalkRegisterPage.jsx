import React, { useEffect } from "react";
import { useState } from "react";
import styled from "styled-components";
import FilmTalkRegister from "../components/filmtalk/FilmTalkRegister";
import axios from "axios";
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2";

export default function FilmTalkRegisterPage({ userInfo }) {
  /* 카테고리 종류 */
  const filmCategory = ["카테고리", "카메라", "필름", "현상", "출사", "기타"];
  const history = useHistory();
  const filmtalk_id = window.location.href.split("register/")[1];

  const [post, setPost] = useState({
    title: "",
    category: "",
    content: "",
  });

  useEffect(() => {
    const getPrevContents = (id) => {
      axios
        .get(`${process.env.REACT_APP_API_URL}/filmtalks/view/${id}`, {
          headers: {
            Accept: "application/json",
          },
        })
        .then((res) => {
          const { category, contents, title } = res.data.data;
          setPost({ ...post, title, category, content: contents });
        })
        .catch((err) => console.log(err));
    };
    if (filmtalk_id) {
      getPrevContents(filmtalk_id);
    }
  }, [filmtalk_id]);

  useEffect(() => {
    setPost({ ...post });
  }, [post.title]);
  const handlePostCategory = (e) => {
    if (e.target.value !== "카테고리") {
      setPost({ ...post, category: e.target.value });
    }
  };
  const handleTitleChange = (e) => {
    e.preventDefault();
    setPost({ ...post, title: e.target.value });
  };

  const postRegister = () => {
    const alConfig = {
      icon: "warning",
      iconColor: "#ff6347",
      showConfirmButton: false,
      timer: 1200,
    };
    if (!filmtalk_id) {
      if (post.title === "") {
        alConfig.text = "제목을 작성해주세요";
        Swal.fire(alConfig);
      } else if (post.category === "") {
        alConfig.text = "카테고리를 선택해주세요";
        Swal.fire(alConfig);
      } else if (post.content === "") {
        alConfig.text = "내용을 작성해주세요";
        Swal.fire(alConfig);
      } else {
        axios
          .post(
            `${process.env.REACT_APP_API_URL}/filmtalks/register/${userInfo.id}`,
            {
              category: post.category,
              title: post.title,
              contents: post.content,
            },
            {
              headers: {
                "Content-type": "application/json",
              },
            }
          )
          .then((res) => {
            alConfig.text = "등록이 완료되었습니다";
            alConfig.icon = "success";
            Swal.fire(alConfig).then(() => {
              history.push(`/filmtalks/view/${res.data.data.id}`);
            });
          })
          .catch((err) => console.log(err));
      }
    } else {
      if (post.title === "") {
        alConfig.text = "제목을 작성해주세요";
        Swal.fire(alConfig);
      } else if (post.category === "") {
        alConfig.text = "카테고리를 선택해주세요";
        Swal.fire(alConfig);
      } else if (post.content === "") {
        alConfig.text = "내용을 작성해주세요";
        Swal.fire(alConfig);
      } else {
        axios
          .patch(
            `${process.env.REACT_APP_API_URL}/filmtalks/revision/${filmtalk_id}`,
            {
              category: post.category,
              title: post.title,
              contents: post.content,
            }
          )
          .then((res) => {
            alConfig.text = "수정이 완료되었습니다";
            alConfig.icon = "success";
            Swal.fire(alConfig).then(() => {
              history.push(`/filmtalks/view/${res.data.id}`);
            });
          })
          .catch((err) => console.log(err));
      }
    }
  };

  return (
    <>
      <Container>
        <Article onSubmit={(e) => e.preventDefault()}>
          <div for="post-category" className="category">
            <CategorySelect
              name="category"
              id="post-category"
              onChange={handlePostCategory}
              value={post.category}
            >
              {filmCategory.map((film) => {
                return (
                  <CategoryOption type="button" value={film}>
                    {film}
                  </CategoryOption>
                );
              })}
            </CategorySelect>
            <TitleInput
              type="text"
              placeholder="제목을 작성해주세요"
              name="title"
              value={post.title}
              onChange={handleTitleChange}
            />
          </div>
          <FilmTalkRegister
            className="react-quill"
            post={post}
            setPost={setPost}
            userInfo={userInfo}
          />
          <div className="button-box">
            <Button right onClick={() => history.goBack()}>
              돌아가기
            </Button>
            <Button type="button" onClick={postRegister}>
              작성완료
            </Button>
          </div>
        </Article>
      </Container>
    </>
  );
}
const Container = styled.section`
  width: 100%;
  /* height: 90vh; */
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 80px 0;
  /* position: relative; */
  /* border: 1px solid green; */
`;

const Article = styled.form`
  /* border: 1px solid green; */
  width: 60%;
  margin: 0px;
  top: 150px;
  div.category {
    /* border: 1px solid red; */
    display: flex;
  }
  div.button-box {
    /* border: 1px solid red; */
    display: flex;
    justify-content: space-between;
    /* padding: 10px; */
  }
  @media screen and (max-width: 1024px) {
    width: 80%;
  }
`;

// * 필름 카테고리 컴포넌트
const CategorySelect = styled.select`
  border: 1px solid Gainsboro;
  padding: 10px 20px;
  margin-right: 5px;
  outline: none;
  cursor: pointer;
`;
const CategoryOption = styled.option`
  background: none;
  margin: 0 5px;
  padding: 10px 30px;
  font-size: 14px;
  border: 1px solid Gainsboro;
  border-radius: 20px;
  transition: 0.3s;
  outline: none;
  cursor: pointer;
  &:hover {
    color: tomato;
    /* border: 1px solid tomato; */
  }
`;
// * 제목 작성 컴포넌트
const TitleInput = styled.input`
  outline: none;
  width: 100%;
  padding: 15px;
  /* margin: 20px 0; */
  /* margin-bottom: 20px; */
  font-size: 14px;
  box-sizing: border-box;
  border: 1px solid Gainsboro;
  &:focus {
    border: none;
    border: 1px solid Gainsboro;
    box-shadow: 5px 5px 10px Gainsboro;
    transition: 0.3s;
  }
`;

// * 버튼 컴포넌트
const Button = styled.button`
  padding: 10px 30px;
  border: 1px tomato solid;
  border-radius: 5px;
  color: tomato;
  background: white;
  margin-top: 20px;
  /* position: absolute; */
  /* right: ${(props) => (props.right ? "120px" : "120px")}; */

  /* bottom: -100px; */
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  &:hover {
    color: white;
    background: tomato;
    transition: 0.3s;
  }
  @media screen and (max-width: 768px) {
    margin-top: 20px;
  }
  @media screen and (max-width: 412px) {
    margin-top: 40px;
    right: 90px;
  }
`;
