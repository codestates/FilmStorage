import { memo } from "react";
// import ReactLoading from "react-loading";
import styled from "styled-components";

const LoaderWrap = styled.div`
  width: 100%;
  height: 80%;
  display: flex;
  justify-content: center;
  text-align: center;
  align-items: center;
`;

// Here we create a component that will rotate everything we pass in over two seconds
const Rotate = styled.div`
  position: relative;
  color: lightgray;
  font-size: 2em;
  letter-spacing: 5px;
  /* border-bottom: 16px solid lightgray; */
  line-height: 1.4;
  font-family: serif;
  font-family: 'Pacifico', cursive;

  &:before {
    content: attr(data-text);
    color: tomato;
    overflow: hidden;
    position: absolute;
    top: 0;
    left: 0;
    height: 3em;
    width: 100%;
    /* border-bottom: 16px solid tomato; */
    animation: colorChange 1s linear infinite;
    overflow: hidden;
  }

  @keyframes colorChange {
    0% {
      width: 0;
    }
    100% {
      width: 100%;
    }
  }
`;

const Loader = () => {
  return (
    <LoaderWrap>
      {/* <ReactLoading type="spin" color="tomato" /> */}
      <Rotate data-text="FilmStorage...">
        FilmStorage...
      </Rotate>
    </LoaderWrap>
  );
};

export default memo(Loader);
