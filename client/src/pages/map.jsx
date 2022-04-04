import React, { useEffect, useState } from "react";
// import SearchPlace from "./SearchPlace";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightLong } from "@fortawesome/free-solid-svg-icons";
import { faChevronCircleUp } from "@fortawesome/free-solid-svg-icons";

const { kakao } = window;

const Container = styled.section`
  /* border: 1px solid red; */
  width: 100%;
`;
const Article = styled.article`
  /* border: 1px solid blue; */
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 30px;
`;

// * 검색 컴포넌트
const SearchForm = styled.form`
  border-bottom: 2px solid #444;
  width: 60%;
  box-sizing: border-box;
  display: flex;
  margin: 10px 0;
  input {
    /* border: 1px solid tomato; */
    color: #444;
    border: none;
    outline: none;
    padding: 10px;
    flex: 14;
    font-size: 24px;
  }
  button {
    padding: 0;
    border: none;
    background: none;
    flex: 1;
    cursor: pointer;
    .icon {
      /* border: 1px solid tomato; */
      font-size: 22px;
      color: #444;
      &:active,
      &:hover {
        color: tomato;
      }
    }
  }
`;

const SearchList = styled.ul`
  /* border: 1px solid red; */
  color: #666;
  font-size: 14px;
  margin-bottom: 20px;
  
  span {
    margin-right: 20px;
    font-weight: 600;
  }
  li {
    padding: 0 10px;
  }
`;

// * 지도 컴포넌트
const Map = styled.div`
  /* border: 1px solid green; */
  width: 100%;
  height: 90vh;
`;

const ScrollToTop = styled.div`
  font-size: 40px;
  color: #ffffff88;
  position: fixed;
  right: 30px;
  bottom: 30px;
  z-index: 1;
  cursor: pointer;
  transition: 0.3s;
  &:hover {
    color: #ff6347;
  }
`;

export default function FilmSpotPage() {
  const [inputText, setInputText] = useState("");
  const [place, setPlace] = useState("");

  // * 많이 검색한 지역 저장
  const [searchList, setSearchList] = useState([
    "제주도",
    "대구",
    "서울",
    "경기",
    "부산",
    "경주",
  ]);

  // * 스크롤 핸들링
  const handleScroll = () => {
    window.scrollTo({ left: 0, top: 0, behavior: "smooth" });
  };
  
  const onChange = (e) => {
    setInputText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setPlace(inputText);
    setInputText("");
  };

  useEffect(() => {
    let infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });
    const container = document.getElementById("myMap");
    const options = {
      center: new kakao.maps.LatLng(33.450701, 126.570667),
      level: 9,
    };
    const map = new kakao.maps.Map(container, options);

    const ps = new kakao.maps.services.Places();

    ps.keywordSearch(place, placesSearchCB);

    function placesSearchCB(data, status, pagination) {
      if (status === kakao.maps.services.Status.OK) {
        let bounds = new kakao.maps.LatLngBounds();

        for (let i = 0; i < data.length; i++) {
          displayMarker(data[i]);
          bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
        }

        map.setBounds(bounds);
      }
    }

    function displayMarker(place) {
      let marker = new kakao.maps.Marker({
        map: map,
        position: new kakao.maps.LatLng(place.y, place.x),
      });
      // 마커에 클릭이벤트를 등록
      kakao.maps.event.addListener(marker, "click", function () {
        // 마커를 클릭하면 장소명이 인포윈도우에 표출
        infowindow.setContent(
          '<div style="padding:5px;font-size:12px;">' +
            place.place_name +
            "</div>"
        );
        infowindow.open(map, marker);
      });
    }
  }, [place]);

  return (
    <>
      <Container>
        <Article>
          <SearchForm className="inputForm" onSubmit={handleSubmit}>
            <input
              placeholder="Search Place..."
              onChange={onChange}
              value={inputText}
            />
            <button type="submit">
              <FontAwesomeIcon icon={faArrowRightLong} className="icon" />
            </button>
          </SearchForm>
          <SearchList>
            <span>많이 검색한 지역</span>
            {searchList.map((search) => {
              return <li>{search}</li>;
            })}
          </SearchList>
          <Map id="myMap"></Map>
          <ScrollToTop onClick={handleScroll}>
            <FontAwesomeIcon icon={faChevronCircleUp} />
          </ScrollToTop>
        </Article>
      </Container>
    </>
  );
}
