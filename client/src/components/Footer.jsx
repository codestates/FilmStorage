import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

export default function Footer() {
  return (
    <>
      <FooterBox>
        <LogoImg src="https://user-images.githubusercontent.com/87605663/159712199-3a26669f-3e8e-49b3-8291-d537581f987d.png" />
        <Team>
          <TeamWooga>Team Wooga</TeamWooga>
          <Member>
            <Name>Kim Hyeon-Gyu</Name>
            <Position>Back-end</Position>
            <a
              target="_blank"
              rel="noreferrer"
              className="github"
              href="https://github.com/ssankq"
            >
              <FontAwesomeIcon icon={faGithub} className="icon" />
            </a>
          </Member>
          <Member>
            <Name>Seo Wei-Koo</Name>
            <Position>Front-end</Position>
            <a
              target="_blank"
              rel="noreferrer"
              className="github"
              href="https://github.com/sud665"
            >
              <FontAwesomeIcon icon={faGithub} className="icon" />
            </a>
          </Member>
          <Member>
            <Name>Jeong Da-In</Name>
            <Position>Front-end</Position>
            <a
              target="_blank"
              rel="noreferrer"
              className="github"
              href="https://github.com/jeongdxxn"
            >
              <FontAwesomeIcon icon={faGithub} className="icon" />
            </a>
          </Member>
          <Member>
            <Name>Lee Hyeon-Geol</Name>
            <Position>Back-end</Position>
            <a
              target="_blank"
              rel="noreferrer"
              className="github"
              href="https://github.com/LeeHyeongeol"
            >
              <FontAwesomeIcon icon={faGithub} className="icon" />
            </a>
          </Member>
        </Team>
      </FooterBox>
    </>
  );
}

const FooterBox = styled.footer`
  display: flex;
  width: 100%;
  height: 300px;
  justify-content: space-around;
  align-items: center;
  background: DimGray;
  @media screen and (max-width: 768px) {
    height: 260px;
  }
  @media screen and (max-width: 412px) {
    height: 270px;
    flex-direction: column;
    justify-content: flex-start;
    padding-top: 20px;
    position: sticky;
  }
`;

const LogoImg = styled.img`
  width: 8%;
  filter: contrast(0.5);
  @media screen and (max-width: 412px) {
    width: 10%;
`;
const Team = styled.ul`
  display: flex;
  flex-direction: column;
  @media screen and (max-width: 412px) {
    width: 90%;
  }
`;
const TeamWooga = styled.h3`
  text-align: right;
  padding-bottom: 10px;
  color: DarkGray;
  border-bottom: 1px solid DarkGray;
  @media screen and (max-width: 412px) {
    padding-bottom: 0px;
    margin-top: 10px;
    font-size: 14px;
  }
`;
const Member = styled.li`
  font-weight: 500;
  color: #444;
  list-style: none;
  display: flex;
  align-items: center;
  cursor: pointer;
  &:hover {
    color: DarkGray;
  }
  @media screen and (max-width: 412px) {
    font-size: 12.5px;
    line-height: 1.8em;
  }
  > a.github {
    @media screen and (max-width: 412px) {
      font-size: 23px;
    }
  }
`;
const Name = styled.span`
  display: inline-block;
  width: 150px;
  padding: 5px 0;
  @media screen and (max-width: 412px) {
    margin-left: 1em;
  }
`;
const Position = styled.span`
  display: inline-block;
  width: 60px;
  padding: 1px 5px;
  margin: 0 10px;
  border-radius: 5px;
  font-size: 12px;
  background: Gray;
  @media screen and (max-width: 412px) {
    width: 70px;
    margin-left: 5em;
  }
`;
