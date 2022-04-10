import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

const FooterBox = styled.footer`
  display: flex;
  width: 100%;
  height: 300px;
  justify-content: space-around;
  align-items: center;
  background: DimGray;
`;

const LogoImg = styled.img`
  width: 8%;
  filter: contrast(0.5);
`;
const Team = styled.ul`
  display: flex;
  flex-direction: column;
`;
const TeamWooga = styled.h3`
  text-align: right;
  padding-bottom: 10px;
  color: DarkGray;
  border-bottom: 1px solid DarkGray;
`;
const Member = styled.li`
  font-weight: 500;
  color: #444;
  list-style: none;
  cursor: pointer;
  &:hover {
    color: DarkGray;
  }
`;
const Name = styled.span`
  display: inline-block;
  width: 150px;
  padding: 5px 0;
`;
const Position = styled.span`
  display: inline-block;
  width: 60px;
  padding: 1px 5px;
  margin: 0 10px;
  border-radius: 5px;
  font-size: 12px;
  background: Gray;
`;

function Footer() {
  return (
    <>
      <FooterBox>
        <LogoImg src="https://user-images.githubusercontent.com/87605663/159712199-3a26669f-3e8e-49b3-8291-d537581f987d.png" />
        <Team>
          <TeamWooga>Team Wooga</TeamWooga>
          <Member>
            <Name>Kim Hyeon-Gyu</Name>
            <Position>Back-end</Position>
            <a href="https://github.com/ssankq" target={"_blank"}>
              <FontAwesomeIcon icon={faGithub} className="icon" />
            </a>
          </Member>
          <Member>
            <Name>Seo Wei-Koo</Name>
            <Position>Front-end</Position>
            <a href="https://github.com/sud665" target={"_blank"}>
              <FontAwesomeIcon icon={faGithub} className="icon" />
            </a>
          </Member>
          <Member>
            <Name>Jeong Da-In</Name>
            <Position>Front-end</Position>
            <a href="https://github.com/jeongdxxn" target={"_blank"}>
              <FontAwesomeIcon icon={faGithub} className="icon" />
            </a>
          </Member>
          <Member>
            <Name>Lee Hyeon-Geol</Name>
            <Position>Back-end</Position>
            <a href="https://github.com/ssankq" target={"_blank"}>
              <FontAwesomeIcon icon={faGithub} className="icon" />
            </a>
          </Member>
        </Team>
      </FooterBox>
    </>
  );
}

export default Footer;
