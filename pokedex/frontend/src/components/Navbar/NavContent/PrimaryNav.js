import { Link } from "react-router-dom";
import React, { useState } from "react";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { capitalizeFirstLetter } from "../../../features/Pokedex/utils/ConvToolUtils";

const PrimaryNav = () => {
  
  
  const iconPath = "./icons/";
  const iconList = [
    { name: "home", backgroundCSS: "#AAAAAA", link: "/us" },
    { name: "pokedex", backgroundCSS: "#FF0033", link: "/us/pokedex" },
    { name: "game", backgroundCSS: "#FF6666", link: "/us/pokemon-video-games" },
    { name: "trading", backgroundCSS: "#FFCC00", link: "/us/pokemon-tcg" },
    { name: "animation", backgroundCSS: "#00BB00", link: "/us/animation" },
    { name: "trophy", backgroundCSS: "#0099FF", link: "/us/play-pokemon" },
    { name: "news", backgroundCSS: "#0000FF", link: "/us/pokemon-news" },
  ];
  const [clickActive, setClickActive] = useState(false);
  const [clickedTag, setClickedTag] = useState([]);

  const extension = ".png";
  const imageBeforeTag = " span img:nth-of-type(1)"; //イメージ変更前DOM指定用
  const imageAfterTag = " span img:nth-of-type(2)"; //イメージ変更後DOM指定用
  
  const changeColor = (icon, action) =>{
    const el_title = document.querySelector("#title" + icon.name);
    const el_li = document.querySelector("#" + icon.name);
    const el_imageB = document.querySelector("#" + icon.name + imageBeforeTag);
    const el_imageA = document.querySelector("#" + icon.name + imageAfterTag);

    switch (action) {
      case 'add':
        el_title.style.color = "white";
        el_li.style.color = "white";
        el_li.style.background = icon.backgroundCSS;
        el_imageB.style.opacity = "0%";
        el_imageA.style.opacity = "100%";
        break;
      case 'remove':
        el_title.style.color = "#464646";
        el_li.style.color = "#464646";
        el_li.style.background = "#fff";
        el_imageB.style.opacity = "100%";
        el_imageA.style.opacity = "0%";
        break;
    }
  }
    
  const clickHandler = (icon) =>{
    clickActive && changeColor(clickedTag, 'remove');
    setClickedTag(icon);
    setClickActive(true);
  }
    
  const mouseEnterHandler = (icon) =>{
    changeColor(icon, 'add');
  }
    
  const mouseLeaveHandler = (icon) =>{
    clickedTag.name !== icon.name && changeColor(icon, 'remove');
  }

  return (
    <ul css={primaryNav}>
      {iconList.map((icon) => (
        <li
          id={icon.name}
          key={icon.name}
          className={icon.name}
          onMouseEnter={() => mouseEnterHandler(icon)}
          onMouseLeave={() => mouseLeaveHandler(icon)}
        >
          <Link to={icon.link} onClick={() => clickHandler(icon)}>
            <span className="icon">
              <img
                src={iconPath + icon.name + extension}
                height="30%"
                vspace="2px"
              />
              <img
                src={iconPath + icon.name + "-after" + extension}
                height="30px"
                vspace="2px"
              />
              <span id={"title" + icon.name} className="title">
                {capitalizeFirstLetter(icon.name)}
              </span>
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
};

const primaryNav = css`
  display: unset;
  overflow: visible;
  list-style: none;
  width: 100%;

  li {
    cursor: pointer;
    float: left;
    height: 87px;
    margin: 0;
    overflow: visible;
    position: relative;
    width: 14.28571%;
  }
  li a {
    text-decoration: none;
    float: left;
    height: 87px;
    width: 100%;
  }
  li:after {
    content: ' ';
    height: 6px;
    left: 0;
    position: absolute;
    bottom: -6px;
    width: 100%;
    z-index: 1;
  }
  li.home:after {
    background-color: #aaaaaa;
    border-radius: 0 0 0 8px;
  }
  li.pokedex:after {
    background-color: #ff0033;
  }
  li.game:after {
    background-color: #ff6666;
  }
  li.trading:after {
    background-color: #ffcc00;
  }
  li.animation:after {
    background-color: #00bb00;
  }
  li.trophy:after {
    background-color: #0099ff;
  }
  li.news:after {
    background-color: #0000ff;
    border-bottom-right-radius: 5px;
  }
  li.home:hover {

  }
  /* タイトル部共通 */
  span.title {
    position: absolute;
    top: 65%;
    left: 50%;
    transform: translate(-50%);
    font-size: 87.5%;
  }
  /* icon共通 */
  .icon img {
    cursor: pointer;
    position: absolute;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  .icon img:nth-of-type(2) {
    opacity: 0%;
  }
`;

export default PrimaryNav;
