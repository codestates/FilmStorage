import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Select from "react-select";
// import filmData from "../dummydata/filmtypedummydata";

const options = [
  { value: "코닥", label: "kodak" },
  { value: "후지", label: "fuji" },
  { value: "아그파", label: "agfa" },
  { value: "로모그래피", label: "lomography" },
  { value: "일포드", label: "ilford" },
  { value: "롤라이", label: "rollei" },
  { value: "기타", label: "etc" },
];

const kodak = [
  { value: "골드 200", label: "골드 200" },
  { value: "컬러플러스 200", label: "컬러플러스 200" },
  { value: "울트라맥스 400", label: "울트라맥스 400" },
  { value: "프로이미지 100", label: "프로이미지 100" },
  { value: "엑타 100", label: "엑타 100" },
  { value: "vanilla", label: "포트라 160" },
  { value: "vanilla", label: "포트라 400" },
  { value: "vanilla", label: "티맥스 100" },
  { value: "vanilla", label: "티맥스 400" },
];

const fuji = [
  { value: "chocolate", label: "후지 C200" },
  { value: "strawberry", label: "후지 SUPERIA 400" },
  { value: "vanilla", label: "후지 PRO 400H" },
];

const agfa = [
  { value: "chocolate", label: "APX 100" },
  { value: "strawberry", label: "APX 400" },
];

const lomography = [
  { value: "chocolate", label: "Earl Grey B&W 100" },
  { value: "strawberry", label: "Lady Grey B&W 400" },
  { value: "vanilla", label: "메트로폴리스" },
  { value: "strawberry", label: "컬러네거티브 ISO 400" },
  { value: "vanilla", label: "컬러네거티브 ISO 800" },
];

const ilford = [
  { value: "chocolate", label: "켄트미어 100" },
  { value: "strawberry", label: "켄트미어 400" },
  { value: "vanilla", label: "XP2 400" },
  { value: "strawberry", label: "델타 100 프로페셔널" },
  { value: "vanilla", label: "델타 400 프로페셔널" },
];

const rollei = [
  { value: "chocolate", label: "슈퍼팬 200" },
  { value: "strawberry", label: "RPX 25" },
  { value: "vanilla", label: "RPX 100" },
  { value: "strawberry", label: "RPX 400" },
  { value: "vanilla", label: "RPX 400" },
];

const etc = [{ value: "chocolate", label: "기타" }];

export default function FilmType({ photoInfo, setPhotoInfo }) {
  const handleType = (e) => {
    setPhotoInfo({ ...photoInfo, type: e.target.value });
  };
  const [selectedOption, setSelectedOption] = useState(null);

  const [selectedOption2, setSelectedOption2] = useState(null);

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
          />
        </Widthbox>
        <Widthbox2>
          <Marginbox>
            <Select defaultValue={selectedOption2} options={selectedOption2} />
          </Marginbox>
        </Widthbox2>
      </Selectlist>
    </>
  );
}

const Selectlist = styled.div`
  display: flex;
  width: 500px;
`;

const Marginbox = styled.div`
  margin-left: 20px;
`;

const Widthbox = styled.div`
  width: 150px;
`;

const Widthbox2 = styled.div`
  width: 250px;
`;
