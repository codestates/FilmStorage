import React from "react";
import styled from "styled-components";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { useState } from "react";

const PostBox = styled.div`
  /* border: 1px solid red; */
  position: absolute;
  top: 200px;
`;

const TitleInput = styled.input`
  outline: none;
  width: 100%;
  padding: 10px;
  margin: 20px 0;
  margin-bottom: 20px;
  box-sizing: border-box;
  border: 1px solid Gainsboro;
  &:focus {
    border: none;
    border: 1px solid Gainsboro;
    box-shadow: 5px 5px 10px Gainsboro;
    transition: 0.3s;
  }
`;

const FimlCategory = styled.button`
  background: none;
  margin: 0 5px;
  padding: 5px 20px;
  font-size: 12px;
  border: 1px solid Gainsboro;
  border-radius: 20px;
  transition: 0.3s;
  cursor: pointer;
  &:hover {
    color: tomato;
    border: 1px solid tomato;
    box-shadow: 2px 2px 5px Gainsboro;
  }
  &:active,
  &:focus {
    color: white;
    background: tomato;
  }
`;

const Button = styled.button`
  padding: 10px 30px;
  border: none;
  border-radius: 20px;
  position: absolute;
  right: ${(props) => (props.right ? "120px" : 0)};
  bottom: -50px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  &:hover {
    color: white;
    background: tomato;
    transition: 0.3s;
  }
`;

export default function FilmTalkRegister() {
  const [postContent, setPostContent] = useState({
    title: "",
    content: "",
  });

  const filmCategory = ["카메라", "필름", "현상", "출사", "기타"];

  const getPostValue = (e) => {
    const { name, value } = e.target;
    setPostContent({
      ...postContent,
      [name]: value,
    });
    console.log(postContent);
  };


  return (
    <>
      <PostBox>
        {filmCategory.map((film) => {
          return <FimlCategory>{film}</FimlCategory>;
        })}
        <TitleInput
          type="text"
          placeholder="제목을 작성해주세요"
          onChange={getPostValue}
          name="title"
        />
        <CKEditor
          editor={ClassicEditor}
          data="<p>내용을 작성해 주세요<p>"
          config={{resize: 'both'},{height:750},{width:900},{allowedContent:true}}
          onChange={(event, editor) => {
            const data = editor.getData();
            setPostContent({ ...postContent, content: data });
            console.log({ event, editor, data });
            console.log(postContent);
          }}
        />
        <Button right>돌아가기</Button>
        <Button >작성완료</Button>
      </PostBox>
    </>
  );
}
