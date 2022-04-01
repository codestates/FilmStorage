import React, { useMemo, useRef } from "react";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import ImageResize from "quill-image-resize";
import axios from "axios";
Quill.register("modules/ImageResize", ImageResize);

export default function FilmTalkRegister({ post, setPost, userInfo }) {
  const quillRef = useRef();

  const imageHandler = () => {
    const input = document.createElement("input");

    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    input.onchange = async () => {
      console.log(input);
      if (input.files) {
        const file = input.files[0];
        const formData = new FormData();
        formData.append("image", file);

        axios
          .post(
            `${process.env.REACT_APP_API_URL}/filmtalks/register/image/${userInfo.id}`,
            formData,
            {
              headers: {
                "Content-type": "multipart/form-data",
              },
            }
          )
          .then((res) => {
            const { url } = res.data;
            const range = quillRef.current.getEditor().getSelection().index;
            if (range !== null && range !== undefined){
              let quill = quillRef.current.getEditor();

              quill.setSelection(range, 1);

              quill.clipboard.dangerouslyPasteHTML(range, `<img src=${url} alt="미리보기" />`)
            }
          })
          .catch((err) => console.log(err));
      }
    };
  };
  //* Quill Toolbar modules
  const modules = useMemo(() => {
    return {
      toolbar: {
        container: [
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
        // * 이미지 태그 변환
        handlers: {
          image: imageHandler,
        },
      },
      // * 이미지 크기 조절 모듈
      ImageResize: {
        parchment: Quill.import("parchment"),
      },
    };
  }, []);

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

  return (
    <>
      <ReactQuill
        ref={(ele) => (quillRef.current = ele)}
        style={{ width: "100%", height: "350px" }}
        theme="snow"
        placeholder={"내용을 입력해주세요"}
        name="content"
        value={post.content}
        onChange={(content) => setPost({ ...post, content: content })}
        modules={modules}
        formats={formats}
      />
    </>
  );
}
