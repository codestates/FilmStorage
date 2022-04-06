import React, { useEffect } from "react";
import styled from "styled-components";
const { kakao } = window;

export default function FilmLogLocation({ place, setClickLocation }) {
  // 클릭된 장소 장소 상태 관리

  useEffect(() => {
    let infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });
    const container = document.getElementById("myMap");
    const options = {
      center: new kakao.maps.LatLng(33.450701, 126.570667),
      level: 8,
    };
    let map = new kakao.maps.Map(container, options);

    if (navigator.geolocation) {
      // GeoLocation을 이용해서 접속 위치를 얻어옵니다
      navigator.geolocation.getCurrentPosition(function (position) {
        //스코프 내부는 const
        const lat = position.coords.latitude; // 위도
        const lon = position.coords.longitude; // 경도

        // 마커가 표시될 위치를 geolocation으로 얻어온 좌표로 생성합니다
        const locPosition = {
          center: new kakao.maps.LatLng(lat, lon),
          level: 8,
        };

        // 마커와 인포윈도우를 표시합니다
        map = new kakao.maps.Map(container, locPosition);

        displayMarker(locPosition);

        // console.log("navigator.geolocation", position);
      });
    }
    //지도에 현재위치 표시하기

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
        console.log(place);
        const choice = {
          Location: place.place_name,
          Lat: place.y,
          Log: place.x,
        };

        console.log(choice);

        setClickLocation(choice);
      });
    }
  }, [place]);

  return (
    <>
      <Container>
        <Map id="myMap"></Map>
      </Container>
    </>
  );
}

const Container = styled.section`
  /* border: 1px solid red; */
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /* position: relative; */
`;

// * 지도 컴포넌트
const Map = styled.div`
  border: 1px solid #black;
  width: 100%;
  height: 100%;
`;
