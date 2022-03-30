import React, { useState } from "react";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import ImageResize from "quill-image-resize";
Quill.register("modules/ImageResize", ImageResize);

//* Quill Toolbar modules
const modules = {
  toolbar: [
    [{ font: [] }],
    // [{ header: [1, 2, false] }],
    [{ size: ["small", false, "large", "huge"] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link", "image"],
    [{ align: [] }, { color: [] }, { background: [] }],
    ["clean"],
  ],
  // * 이미지 크기 조절 모듈
  ImageResize: {
    parchment: Quill.import("parchment"),
  },
  // * 이미지 태그 변환
  // handlers: {
  //   image: imageHandler,
  // },
};

// const imageHandler = () => {
//   const input = document.createElement("input");

//   input.setAttribute("type", "file");
//   input.setAttribute("accept", "image/*");
//   input.click();

//   input.onchange = async = () =>{
//     if(input.files) {
//       const formData = new FormData();
//       formData.append("img", files[0]);
//     }
//   }
// }

const formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "link",
  "image",
  "video",
  "align",
  "color",
  "background",
  "clean",
];

export default function FilmTalkRegister({ post, handleContentChange }) {
  // const [state, setState] = useState({ value: null });
  // const handleChange = (value) => {
  //   setState({ value });
  // };

  return (
    <>
      <ReactQuill
        style={{ width: "100%", height: "350px" }}
        theme="snow"
        placeholder={"내용을 입력해주세요"}
        name="content"
        // value={post.content}
        // onChange={handleContentChange}
        modules={modules}
        formats={formats}
      />
    </>
  );
}
