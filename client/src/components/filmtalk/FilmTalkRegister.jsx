import React, { useState } from "react";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import ImageResize from "quill-image-resize";
Quill.register("modules/ImageResize", ImageResize);

//* Quill Toolbar modules
const modules = {
  toolbar: [
    [{ font: [] }],
    [{ header: [1, 2, false] }],
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
  //* 이미지 크기 조절 모듈
  ImageResize: {
    parchment: Quill.import("parchment"),
  },
};

export default function FilmTalkRegister() {
  const [state, setState] = useState({ value: null });
  const handleChange = (value) => {
    setState({ value });
  };

  return (
    <>
      <ReactQuill
        style={{ width: "100%", height: "350px" }}
        theme="snow"
        value={state.value}
        onChange={handleChange}
        placeholder={"Write something awesome.."}
        modules={modules}
      />
    </>
  );
}
