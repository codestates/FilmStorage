import React, { useState } from "react";
import styled, { css } from "styled-components";
import FilmType from "./FilmType";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import FilmLogLocation from "./FilmLogLocation";

export default function FilmLogWriting({ userInfo, setIsOpen }) {
  // 유저 정보 상태 관리
  const [photoInfo, setPhotoInfo] = useState({
    photo: {},
    filmtype: "",
    contents: "",
  });
  // 위치 정보 상태 관리
  const [inputText, setInputText] = useState("");
  const [place, setPlace] = useState("");

  // 선택된 장소
  const [clickLocation, setClickLocation] = useState({});

  // 선택한 장소 삭제 버튼 관리
  const [locationClose, setLocationClose] = useState(false);
  const onChange = (e) => {
    setInputText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setPlace(inputText);
    setInputText("");
  };

  // 이미지 미리보는 상태
  const [files, setFiles] = useState("");

  // 이미지 미리보기 삽입 기능
  const encodeFileTobase64 = (fileBlob) => {
    const reader = new FileReader();
    reader.readAsDataURL(fileBlob);
    return new Promise((resolve) => {
      reader.onload = () => {
        setFiles(reader.result);
        setPhotoInfo({ ...photoInfo, photo: fileBlob });
        resolve();
      };
    });
  };
  // 이미지 수정 버튼
  const handleRevison = () => {
    setFiles("");
    setPhotoInfo({ ...photoInfo, photo: "" });
  };

  // 내용 상태 관리 함수
  const handleContents = (e) => {
    setPhotoInfo({ ...photoInfo, contents: e.target.value });
  };

  // 선택한 위치 삭제 함수
  const handleClickLocation = () => {
    setClickLocation({});
    setLocationClose(false);
  };
  const filmlogRegister = () => {
    if (!photoInfo.filmtype) {
      alert("필름타입을 설정해주세요");
    } else if (!photoInfo.photo.name) {
      alert("사진을 등록해주세요");
    } else {
      const postData = {
        filmtype: photoInfo.filmtype,
        contents: photoInfo.contents,
        location: clickLocation.Location,
        lat: clickLocation.Lat,
        log: clickLocation.Log,
      };
      axios
        .post(
          `${process.env.REACT_APP_API_URL}/filmlogs/register/${userInfo.id}`,
          postData,
          {
            headers: {
              "Content-type": "application/json",
            },
          }
        )
        .then((res) => {
          const { id } = res.data.data;
          const formData = new FormData();
          formData.set("photo", photoInfo.photo);
          axios
            .patch(
              `${process.env.REACT_APP_API_URL}/filmlogs/revision/photo/${userInfo.id}/${id}`,
              formData,
              {
                headers: {
                  "Content-type": "multipart/form-data",
                },
              }
            )
            .then((res) => {
              alert("등록이 완료되었습니다");
              setIsOpen(false);
            })
            .catch((err) => console.log(err));
        })
        .catch((err) => {
          console.log(err);
          alert("서버 연결이 불안정 합니다.");
        });
    }
  };

  return (
    <>
      <ModalBG onClick={() => setIsOpen()}>
        <ModalBox onClick={(e) => e.stopPropagation()}>
          <ModalNav>
            <div className="nav-flex">
              <div>
                <FontAwesomeIcon
                  icon={faAngleLeft}
                  className="icon"
                  onClick={() => setIsOpen()}
                />
              </div>
            </div>
            <div className="nav-title">사진 등록 하기</div>
            <div className="nav-flex">
              <div>
                <Button onClick={() => filmlogRegister()}>등록</Button>
              </div>
            </div>
          </ModalNav>
          <ModalImageBox>
            <ImageBox>
              {files && (
                <>
                  <FontAwesomeIcon
                    icon={faXmark}
                    onClick={() => handleRevison()}
                    className="icon"
                  />
                  <img src={files} alt="preview-img" />
                </>
              )}
              <div className="imginsert">사진을 등록 해주세요</div>
              <Label>
                업로드
                <input
                  className="upload"
                  type="file"
                  accept="image/*"
                  required="true"
                  onChange={(e) => {
                    encodeFileTobase64(e.target.files[0]);
                  }}
                ></input>
              </Label>
            </ImageBox>
            <Content>
              <UserInfo>
                <div className="userinfo">
                  <UserImg src={userInfo.profile} />
                </div>
                <div className="userinfo">{userInfo.nickname}</div>
              </UserInfo>
              <Tagarea>
                <span className="tag-title">필름 선택</span>
                <FilmType setPhotoInfo={setPhotoInfo} photoInfo={photoInfo} />
              </Tagarea>
              <Textarea>
                <span className="text-title">내용 입력</span>
                <textarea
                  className="filmcontent"
                  placeholder="내용을 입력해 주세요"
                  onChange={handleContents}
                ></textarea>
              </Textarea>
              <LocationSearch>
                <div className="search-title">장소 선택</div>
                <Search>
                  <form onSubmit={handleSubmit}>
                    <input
                      placeholder="Search Place..."
                      onChange={onChange}
                      value={inputText}
                    />
                  </form>
                </Search>
                <ChoiceBox>
                  {clickLocation.Location}
                  {locationClose ? (
                    <FontAwesomeIcon
                      icon={faXmark}
                      className="icon"
                      onClick={handleClickLocation}
                    />
                  ) : null}
                </ChoiceBox>
              </LocationSearch>
              <LocationArea>
                <FilmLogLocation
                  place={place}
                  setClickLocation={setClickLocation}
                  setLocationClose={setLocationClose}
                />
              </LocationArea>
            </Content>
          </ModalImageBox>
        </ModalBox>
      </ModalBG>
    </>
  );
}

const ModalBG = styled.div`
  position: fixed;
  z-index: 999;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.6);
`;

const ModalBox = styled.div.attrs((props) => ({
  role: "dialog",
}))`
  /* border: 1px solid red; */
  width: 1200px;
  height: 650px;
  background: white;
  border-radius: 1rem;
  margin: 0;
  overflow: hidden;
`;

// * Nav bar * //
const ModalNav = styled.nav`
  /* border: 3px solid green; */
  padding: 15px;
  border-bottom: 1px solid gainsboro;
  display: flex;
  font-size: 22px;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
  > div.nav-flex {
    /* margin-top: 1.3rem;
    margin-right: 2rem;
    margin-left: 2rem; */
  }
  .nav-title {
    /* border: 3px solid green; */
    margin-left: 60px;
  }
  .icon {
    margin-left: 10px;
    cursor: pointer;
  }
`;

const Button = styled.button`
  padding: 10px 30px;
  margin: 5px;
  border: 1px solid #444;
  background: none;
  color: #444;
  border-radius: 20px;
  font-family: "SCoreDream";
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  &:hover {
    color: white;
    background: tomato;
    border: 1px solid tomato;
    transition: 0.3s;
  }
`;

// * 전체 입력 부분 *//
const ModalImageBox = styled.div`
  display: flex;
  height: 100%;
  box-sizing: border-box;
  /* border: 3px solid red; */
`;

// * 이미지 업로드(왼쪽)
const ImageBox = styled.div`
  /* border: 3px solid red; */
  flex: 1 500px;
  height: 570px;
  border-right: 1px solid gainsboro;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  position: relative;
  > img {
    /* border: 1px solid green; */
    width: 100%;
    height: 100%;
    border-bottom-left-radius: 1rem;
    object-fit: cover;
    position: absolute;
    overflow: hidden;
    z-index: 1;
  }
  > div.imginsert {
    margin-bottom: 1rem;
  }
  > .icon {
    transition: 0.3s;
    position: absolute;
    right: 20px;
    top: 20px;
    font-size: 32px;
    z-index: 2;
    color: #ffffffab;
    cursor: pointer;
    &:hover {
      color: #222;
    }
  }
`;

const Label = styled.label`
  background: #eee;
  padding: 10px 30px;
  border: none;
  border-radius: 20px;
  font-weight: 600;
  cursor: pointer;
  &:hover {
    color: white;
    background: tomato;
    transition: 0.3s;
  }
  > input.upload {
    display: none;
  }
`;

// * 내용 입력(오른쪽)
const Content = styled.div`
  /* border: 3px solid red; */
  flex: 1 500px;
  height: 570px;
  display: flex;
  padding: 20px;
  flex-direction: column;
  box-sizing: border-box;
  overflow: overlay;
  z-index: 1;
`;

// * 유저 정보
const UserInfo = styled.div`
  /* border: 1px solid red; */
  display: flex;
  align-items: center;
  padding-bottom: 10px;
  margin-bottom: 5px;
  border-bottom: 1px solid gainsboro;
`;

const UserImg = styled.img`
  width: 30px;
  height: 30px;
  margin-right: 10px;
  border-radius: 20px;
  border: 2px solid #eee;
  object-fit: cover;
`;

// * 필름 선택
const Tagarea = styled.div`
  /* border: 1px solid red; */
  padding-top: 20px;
  z-index: 2;
  > span.tag-title {
    font-size: 14px;
    color: #666;
    /* border: 1px solid green; */
  }
`;

// * 본문 입력
const Textarea = styled.div`
  /* border: 1px solid blue; */
  > .text-title {
    font-size: 14px;
    color: #666;
    display: block;
    padding: 10px 0;
    /* border: 1px solid blue; */
  }
  > textarea.filmcontent {
    box-sizing: border-box;
    width: 100%;
    height: 100px;
    padding: 10px;
    outline: none;
    border: 1px solid gainsboro;
    border-radius: 5px;
    font-size: 14px;
    line-height: 1.5em;
    &::placeholder {
      font-size: 14px;
    }
    &:focus {
      box-shadow: 5px 5px 10px gainsboro;
    }
  }
`;

// * 장소 검색
const LocationSearch = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 5px 0;
  > div.search-title {
    font-size: 14px;
    color: #666;
    /* border: 1px solid blue; */
    padding-top: 10px;
  }
  /* border: 1px solid blue; */
`;

const Search = styled.div`
  /* border: 1px solid green; */
  padding: 5px 0 10px 0;
  input {
    /* border: 1px solid green; */
    width: 95%;
    border: none;
    border-bottom: 1px solid gainsboro;
    outline: none;
    transition: 0.2s;
    padding: 10px;
    font-size: 16px;
    &:focus {
      border-bottom: 1px solid #222;
    }
  }
`;

const ChoiceBox = styled.div`
  width: 95%;
  padding: 5px;
  transition: 0.2s;
  > .icon {
    padding-left: 20px;
    color: #999;
    &:hover {
      color: #444;
    }
  }
`;

const LocationArea = styled.div`
  /* width: 30vw; */
  /* height: 300px; */
  /* display: block; */
  /* margin: 1rem; */
  /* margin-top: 0; */
  /* border: 1px solid blue; */
`;
