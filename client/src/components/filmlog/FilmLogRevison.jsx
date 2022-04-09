import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import FilmType from "./FilmType";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import FilmLogLocation from "./FilmLogLocation";

export default function FilmLogRevison({
  userInfo,
  setIsOpen,
  photoInfo,
  filmlog_id,
}) {
  // 수정하는 페이지
  const [myPhotoInfo, setMyPhotoInfo] = useState({
    filmtype: "",
    contents: photoInfo.contents,
  });
  // 위치 정보 상태 관리
  const [inputText, setInputText] = useState("");
  const [place, setPlace] = useState("");

  // 선택된 장소
  const [clickLocation, setClickLocation] = useState({});
  const [locationClose, setLocationClose] = useState(false);

  useEffect(() => {
    if (photoInfo.location !== "") {
      setPlace(photoInfo.location);
    }
  }, []);

  const onChange = (e) => {
    setInputText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setPlace(inputText);
    setInputText("");
  };

  // 내용 상태 관리 함수
  const handleContents = (e) => {
    setMyPhotoInfo({ ...myPhotoInfo, contents: e.target.value });
  };

  const filmlogRevision = () => {
    if (!myPhotoInfo.filmtype) {
      alert("필름타입을 설정해주세요");
    } else {
      const patchData = {
        filmtype: myPhotoInfo.filmtype,
        contents: myPhotoInfo.contents,
        location: clickLocation.Location,
        lat: clickLocation.Lat,
        log: clickLocation.Log,
      };
      axios
        .patch(
          `${process.env.REACT_APP_API_URL}/filmlogs/revision/${userInfo.id}/${filmlog_id}`,
          patchData,
          {
            headers: {
              "Content-type": "application/json",
            },
          }
        )
        .then(() => {
          alert("수정이 완료되었습니다");
          setIsOpen(false);
          window.location.assign(`/filmlogdetail/${filmlog_id}`);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <>
      <ModalBG onClick={() => setIsOpen()}>
        <ModalBox onClick={(e) => e.stopPropagation()}>
          <ModalNav>
            <div className="nav-flex">
              <FontAwesomeIcon
                icon={faAngleLeft}
                className="icon"
                onClick={() => setIsOpen()}
              />
            </div>
            <div className="nav-title">사진 수정 하기</div>
            <div className="nav-flex">
              <Button onClick={() => filmlogRevision()}>수정 완료</Button>
            </div>
          </ModalNav>
          <ModalImageBox>
            <ImageBox>
              {photoInfo.photo && (
                <img
                  src={photoInfo.photo}
                  alt="preview-img"
                  width="100%"
                  height="100%"
                  border-bottom-left-radius="1rem"
                  object-fit="cover"
                />
              )}
              <div className="imginsert">
                사진을 <br />
                등록 해주세요.
              </div>
            </ImageBox>
            <Content>
              <UserInfo>
                <div className="userinfo">
                  <UserImg src={userInfo.profile} />
                </div>
                <div className="userinfo">{userInfo.nickname}</div>
              </UserInfo>
              <Tagarea>
                <Title>필름 선택</Title>
                <FilmType setPhotoInfo={setMyPhotoInfo} photoInfo={photoInfo} />
              </Tagarea>
              <Textarea>
                <Title>내용 입력</Title>
                <textarea
                  className="filmcontent"
                  placeholder="내용을 입력해 주세요"
                  value={myPhotoInfo.contents}
                  onChange={handleContents}
                ></textarea>
              </Textarea>
              <LocationSearch>
                <Title>장소선택</Title>
                <Search>
                  <form onSubmit={handleSubmit}>
                    <input
                      placeholder="Search Place..."
                      onChange={onChange}
                      value={inputText}
                    />
                  </form>
                </Search>
                <ChoiceBox>{clickLocation.Location}</ChoiceBox>
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
  /* border: 2px solid red; */
  width: 1200px;
  height: 650px;
  background: white;
  border-radius: 1rem;
  margin: 0;
  overflow: hidden;
`;

// * Nav bar * //
const ModalNav = styled.nav`
  padding: 15px;
  border-bottom: 1px solid gainsboro;
  display: flex;
  font-size: 22px;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
  > div.nav-flex {
  }
  .nav-title {
    /* border: 3px solid green; */
    margin-left: 90px;
  }
  .icon {
    margin-left: 10px;
    cursor: pointer;
  }
`;

// * 전체 입력 부분 *//
const ModalImageBox = styled.div`
  display: flex;
  height: 100%;
  box-sizing: border-box;
  /* border: 1px solid black; */
`;

// * 이미지 업로드(왼쪽)
const ImageBox = styled.div`
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

// * 내용 입력(오른쪽)
const Content = styled.div`
  flex: 1 500px;
  height: 570px;
  display: flex;
  padding: 20px;
  flex-direction: column;
  box-sizing: border-box;
  overflow: overlay;
  z-index: 1;
`;

const Title = styled.div`
  font-size: 14px;
  color: #666;
  padding: 10px 0;
`;

// * 유저 정보
const UserInfo = styled.div`
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
  padding-top: 20px;
  z-index: 2;
`;

// * 본문 입력
const Textarea = styled.div`
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
  /* border: 1px solid blue; */
`;


const Search = styled.div`
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
  /* width: 30vw;
  height: 100%;
  margin: 1rem;
  margin-top: 0; */
`;

