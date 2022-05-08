import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
// import SearchPlace from "./SearchPlace";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightLong } from "@fortawesome/free-solid-svg-icons";
import { faChevronCircleUp } from "@fortawesome/free-solid-svg-icons";
import Loader from "../components/Loader";

const { kakao } = window;

const Container = styled.section`
  /* border: 1px solid red; */
  width: 100%;
  height: 90vh;
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  align-items: center;
  overflow: hidden;
  padding: 0 0 30px 0;
`;
const Article = styled.article`
  /* border: 1px solid blue; */
  width: 60%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  > section {
    /* border: 1px solid blue; */
    padding-bottom: 10px;
    width: 100%;
  }
  @media screen and (max-width: 1160px) {
    width: 80%;
  }

  @media screen and (max-width: 412px) {
    width: 80%;
  }
`;

const LoaderBox = styled.div`
  width: 100%;
  height: 100vh;
`;

// * 지도 컴포넌트
const Map = styled.div`
  /* border: 1px solid gainsboro; */
  border-radius: 5px;
  width: 100%;
  height: 70%;
`;

// * 검색 컴포넌트
const SearchForm = styled.form`
  width: 100%;
  box-sizing: border-box;
  display: flex;
  margin: 10px 0;
  input {
    /* border: 1px solid tomato; */
    border: 1px solid gainsboro;
    border-radius: 5px;
    color: #222;
    outline: none;
    padding: 10px;
    flex: 14;
    font-size: 20px;
    transition: 0.3px;
    &:focus {
      box-shadow: 5px 5px 10px gainsboro;
    }
    &::placeholder {
      padding: 10px;
      font-size: 16px;
    }
    @media screen and (max-width: 1160px) {
      font-size: 16px;
    }
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

// * 스크롤 컨트롤
const ScrollToTop = styled.button`
  font-size: 40px;
  color: #ffffff88;
  position: fixed;
  right: 30px;
  bottom: 30px;
  z-index: 1;
  cursor: pointer;
  transition: 0.3s;
  background: none;
  border: 20px;
  &:hover {
    color: #ff6347;
  }
`;

export default function FilmSpotPage() {
  // const [inputText, setInputText] = useState("");
  const [place, setPlace] = useState("");
  // const [mapInfo, setMapInfo] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  //필름로그 고유 아이디 저장
  // const [mapId, setMapId] = useState();

  const history = useHistory();
  // * 스크롤 핸들링
  const handleScroll = () => {
    window.scrollTo({ left: 0, top: 0, behavior: "smooth" });
  };

  const onChange = (e) => {
    e.preventDefault();
    setPlace(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setPlace("");
  };

  const handleLoading = () => {
    let secondTimer = setTimeout(() => setIsLoading(true), 1200);
    return () => {
      clearTimeout(secondTimer);
    };
  };

  const handleFilmLogDetailPage = (id) => {
    history.push(`/filmlogdetail/${id}`);
  };

  let mapInfo;

  const getInfo = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/filmlogs/register/maps`, {
        headers: {
          Accept: "application/json",
        },
      })
      .then((res) => {
        mapInfo = res.data.data;
        realMap();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  // * 지도 생성 * //
  const realMap = () => {
    const container = document.getElementById("myMap");
    const options = {
      center: new kakao.maps.LatLng(33.450701, 126.570667), // 처음 렌더링 되는 좌표
      level: 13, // 지도 확대 레벨 설정
    };

    const map = new kakao.maps.Map(container, options);

    //받아온 위도,경도로 지도 위에 렌더링
    const positions = [];

    for (let i = 0; i < mapInfo.length; i++) {
      positions.push({
        content: `<div class="map-marker">${mapInfo[i].location}</div>`,
        latlng: new kakao.maps.LatLng(
          Number(mapInfo[i].lat),
          Number(mapInfo[i].log)
        ),
        id: mapInfo[i].id,
      });
    }

    const imageSrc =
      "https://user-images.githubusercontent.com/87605663/162559702-9d461eeb-c70c-47b4-84ab-22e30f17fab8.png";

    for (let i = 0; i < positions.length; i++) {
      // 마커를 생성합니다
      const imageSize = new kakao.maps.Size(35, 35);
      const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);
      const marker = new kakao.maps.Marker({
        map: map, // 마커를 표시할 지도
        position: positions[i].latlng, // 마커의 위치
        image: markerImage,
      });

      // 마커에 표시할 인포윈도우를 생성합니다
      const infowindow = new kakao.maps.InfoWindow({
        content: positions[i].content, // 인포윈도우에 표시할 내용
      });

      // 마커에 이벤트를 등록하는 함수 만들고 즉시 호출하여 클로저를 만듭니다
      // 클로저를 만들어 주지 않으면 마지막 마커에만 이벤트가 등록됩니다
      (function (marker, infowindow) {
        // 마커에 mouseover 이벤트를 등록하고 마우스 오버 시 인포윈도우를 표시합니다
        kakao.maps.event.addListener(marker, "mouseover", function () {
          infowindow.open(map, marker);
        });
        //마우스 오버 후 클릭시 axios 요청
        kakao.maps.event.addListener(marker, "click", function () {
          handleFilmLogDetailPage(positions[i].id);
        });

        // 마커에 mouseout 이벤트를 등록하고 마우스 아웃 시 인포윈도우를 닫습니다
        kakao.maps.event.addListener(marker, "mouseout", function () {
          infowindow.close();
        });
      })(marker, infowindow);
    }

    // * 지도에 현재위치 표시하기 * //
    if (navigator.geolocation) {
      // GeoLocation을 이용해서 접속 위치를 얻어옵니다
      navigator.geolocation.getCurrentPosition(function (position) {
        //스코프 내부는 const
        const lat = position.coords.latitude; // 위도
        const lon = position.coords.longitude; // 경도
        const locPosition = new kakao.maps.LatLng(lat, lon); // 마커가 표시될 위치를 geolocation으로 얻어온 좌표로 생성합니다
        displayMarker(locPosition);
      });
    } else {
      // HTML5의 GeoLocation을 사용할 수 없을때 마커 표시 위치와 인포윈도우 내용을 설정합니다

      const locPosition = new kakao.maps.LatLng(33.450701, 126.570667);

      displayMarker(locPosition);
    }

    //장소 검색 객체 생성 후 키워드로 장소검색(keywordSearch)
    const ps = new kakao.maps.services.Places();

    ps.keywordSearch(place, placesSearchCB);
    //input으로 입력한 키워드로 검색완료 시 실행되는 콜백함수

    function placesSearchCB(data, status, pagination) {
      if (status === kakao.maps.services.Status.OK) {
        let bounds = new kakao.maps.LatLngBounds();
        //검색결과가 있으면 마커표시
        for (let i = 0; i < 5; i++) {
          // displayMarker(data[i]);
          bounds.extend(new kakao.maps.LatLng(data[0].y, data[0].x));
        }
        map.setMinLevel(5);
        //최초 지도를 그릴 때 지정했던 위도, 경도에서 검색 결과의 위도, 경도로 변경
        map.setBounds(bounds);
      }
    }
    function displayMarker(locPosition) {
      // 지도 중심좌표를 접속위치로 변경합니다
      map.setCenter(locPosition);
    }
  };

  useEffect(() => {
    getInfo();
    handleLoading();
  }, []);

  return (
    <>
      <Container>
        {isLoading ? (
          <>
            <Article>
              <section>
                <SearchForm className="inputForm" onSubmit={handleSubmit}>
                  <input
                    className="inpput"
                    placeholder="장소를 검색해보세요"
                    onChange={(e) => onChange(e)}
                    value={place}
                  />
                  <button type="submit" onClick={() => getInfo()}>
                    <FontAwesomeIcon icon={faArrowRightLong} className="icon" />
                  </button>
                </SearchForm>
              </section>
              <Map id="myMap"></Map>
              <ScrollToTop type="button" onClick={handleScroll}>
                <FontAwesomeIcon icon={faChevronCircleUp} />
              </ScrollToTop>
            </Article>
          </>
        ) : (
          <LoaderBox>
            <Loader />
          </LoaderBox>
        )}
      </Container>
    </>
  );
}
