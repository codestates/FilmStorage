import React, { useEffect, useState } from "react";
// import SearchPlace from "./SearchPlace";
import styled from "styled-components";
const { kakao } = window;

const Form = styled.form` 
border: 1px solid tomato; width: 100% height: 200px; 
`;

const Container = styled.section`
  /* border: 1px solid red; */
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
`;
const Article = styled.article`
  /* border: 1px solid blue; */
  width: 1000px;
  padding: 50px;
`;

// * 검색 컴포넌트
const Search = styled.div`
  border: 1px solid green;
  padding: 10px 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

// * 지도 컴포넌트
const Map = styled.div`
  border: 1px solid green;
  width: 1000px;
  height: 500px;
`;

// const Demo = styled.div`
// background-color: tomato;
//   width: 800px;
//   height: 200px;
// `

export default function MapContainer() {
  const [inputText, setInputText] = useState("");
  const [place, setPlace] = useState("");

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

  //   return (
  //     <>
  //       <Container>
  //         <div>
  //           <SearchPlace />
  //         </div>
  //         <div
  //           id="myMap"
  //           style={{
  //             width: "890px",
  //             height: "200px",
  //           }}
  //         ></div>
  //       </Container>
  //     </>
  //   );
  // };

  return (
    <>
      <Container>
        <Article>
          <Search>
            <Form className="inputForm" onSubmit={handleSubmit}>
              <input
                placeholder="Search Place..."
                onChange={onChange}
                value={inputText}
              />
              <button type="submit">검색</button>
            </Form>
          </Search>
          <Map id="myMap"></Map>
        </Article>
      </Container>
    </>
  );
}
