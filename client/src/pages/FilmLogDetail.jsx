import React from "react";
import styled from "styled-components";

const Section = styled.div`
   width:700px;
   height:100vh;
   border: 1px solid black;
   text-align:center;
`


function FilmLogDetail() {
  return (
    <>
    <div className="filmlog-second">
      <Section>
        <nav>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </nav>
      </Section>
    </div>  
    </>
  );
}

export default FilmLogDetail;
