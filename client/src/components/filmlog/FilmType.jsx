import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Select from "react-select";

const options = [
  { value: "코닥", label: "Kodak" },
  { value: "후지", label: "Fuji" },
  { value: "아그파", label: "Agfa" },
  { value: "로모그래피", label: "Lomography" },
  { value: "일포드", label: "Ilford" },
  { value: "롤라이", label: "Rollei" },
  { value: "기타", label: "Etc" },
];

const kodak = [
  { value: "골드 200", label: "골드 200" },
  { value: "컬러플러스 200", label: "컬러플러스 200" },
  { value: "울트라맥스 400", label: "울트라맥스 400" },
  { value: "프로이미지 100", label: "프로이미지 100" },
  { value: "엑타 100", label: "엑타 100" },
  { value: "포트라 160", label: "포트라 160" },
  { value: "포트라 400", label: "포트라 400" },
  { value: "티맥스 100", label: "티맥스 100" },
  { value: "티맥스 400", label: "티맥스 400" },
];

const fuji = [
  { value: "후지 C200", label: "후지 C200" },
  { value: "후지 SUPERIA 400", label: "후지 SUPERIA 400" },
  { value: "후지 PRO 400H", label: "후지 PRO 400H" },
];

const agfa = [
  { value: "APX 100", label: "APX 100" },
  { value: "APX 400", label: "APX 400" },
];

const lomography = [
  { value: "Earl Grey B&W 100", label: "Earl Grey B&W 100" },
  { value: "Lady Grey B&W 400", label: "Lady Grey B&W 400" },
  { value: "메트로폴리스", label: "메트로폴리스" },
  { value: "컬러네거티브 ISO 400", label: "컬러네거티브 ISO 400" },
  { value: "컬러네거티브 ISO 800", label: "컬러네거티브 ISO 800" },
];

const ilford = [
  { value: "켄트미어 100", label: "켄트미어 100" },
  { value: "켄트미어 400", label: "켄트미어 400" },
  { value: "XP2 400", label: "XP2 400" },
  { value: "델타 100 프로페셔널", label: "델타 100 프로페셔널" },
  { value: "델타 400 프로페셔널", label: "델타 400 프로페셔널" },
];

const rollei = [
  { value: "슈퍼팬 200", label: "슈퍼팬 200" },
  { value: "RPX 25", label: "RPX 25" },
  { value: "RPX 100", label: "RPX 100" },
  { value: "RPX 400", label: "RPX 400" },
];

const etc = [{ value: "chocolate", label: "기타" }];

export default function FilmType({
  photoInfo,
  setPhotoInfo,
  filmLogItemLists,
  myLogItemLists,
  setMyLogFilter,
  setFilmLogFilter,
}) {
  const handleType = (e) => {
    if (photoInfo) {
      setPhotoInfo({ ...photoInfo, filmtype: e.label });
    } else if (myLogItemLists) {
      setMyLogFilter(e.label);
    } else if (filmLogItemLists) {
      setFilmLogFilter(e.label);
    }
  };
  const [selectedOption, setSelectedOption] = useState("");

  const [selectedOption2, setSelectedOption2] = useState("");

  useEffect(() => {
    if (selectedOption) {
      if (selectedOption.value === "코닥") {
        setSelectedOption2(kodak);
      } else if (selectedOption.value === "후지") {
        setSelectedOption2(fuji);
      } else if (selectedOption.value === "아그파") {
        setSelectedOption2(agfa);
      } else if (selectedOption.value === "로모그래피") {
        setSelectedOption2(lomography);
      } else if (selectedOption.value === "일포드") {
        setSelectedOption2(ilford);
      } else if (selectedOption.value === "롤라이") {
        setSelectedOption2(rollei);
      } else {
        setSelectedOption2(etc);
      }
    }
    return () => {
      console.log("셀렉트 값이 설정 안됨");
    };
  }, [selectedOption]);

  return (
    <>
      <Selectlist>
        <Widthbox>
          <Select
            defaultValue={selectedOption}
            onChange={setSelectedOption}
            options={options}
            placeholder="제조사"
          />
        </Widthbox>
        <Widthbox2>
          <Select
            defaultValue={selectedOption2}
            options={selectedOption2}
            onChange={handleType}
            placeholder="모델명"
          />
        </Widthbox2>
      </Selectlist>
    </>
  );
}

const Selectlist = styled.div`
  /* border: 1px solid red; */
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
  width: 30vw;
  @media screen and (max-width: 1024px) {
    width: 350px;
  }
  @media screen and (max-width: 412px) {
    width: 150px;
    flex-direction: column;
    padding: 0;
  }
`;

const Widthbox = styled.div`
  /* border: 1px solid red; */
  flex: 1;
  width: 150px;
  margin-right: 10px;
  @media screen and (max-width: 412px) {
    width: 150px;
    font-size: 14px;
    height: 14px;
    padding: 10px 0;
  }
`;

const Widthbox2 = styled.div`
  /* width: 300px; */
  flex: 2;
  /* border: 1px solid red; */
  @media screen and (max-width: 412px) {
    width: 150px;
    font-size: 14px;
    height: 14px;
    padding: 10px 0;
  }
`;
