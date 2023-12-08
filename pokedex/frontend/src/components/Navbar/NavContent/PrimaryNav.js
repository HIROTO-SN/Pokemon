import { Link } from "react-router-dom";
import React from "react";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import styled from "@emotion/styled";

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
  const extension = ".png";
  const imageBeforeTag = " span img:nth-child(1)"; //イメージ変更前DOM指定用
  const imageAfterTag = " span img:nth-child(2)"; //イメージ変更後DOM指定用
  
  const changeColor = (icon, action) =>{
    const el_title = document.querySelector("#title" + icon.name);
    const el_li = document.querySelector("#" + icon.name);
    const el_imageB = document.querySelector("#" + icon.name + imageBeforeTag);
    const el_imageA = document.querySelector("#" + icon.name + imageAfterTag);

    if (action === ('enter' || 'click')) {
        el_title.style.color = "white";
        el_li.style.color = "white";
        el_li.style.background = icon.backgroundCSS;
        el_imageB.style.opacity = "0%";
        el_imageA.style.opacity = "100%";
    } else {
      el_title.style.color = "#464646";
      el_li.style.color = "#464646";
      el_li.style.background = "#fff";
      el_imageB.style.opacity = "100%";
      el_imageA.style.opacity = "0%";
    }
  }

  return (
    <ul css={primaryNav}>
      {iconList.map((icon) => (
        <li
          id={icon.name}
          key={icon.name}
          className={icon.name}
          onMouseEnter={() => changeColor(icon, 'enter')}
          onMouseLeave={() => changeColor(icon, 'leave')}
        >
          <Link to={icon.link} onClick={() => changeColor(icon, 'click')}>
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
                {icon.name.charAt(0).toUpperCase() + icon.name.slice(1)}
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
  li.home {
    border-bottom: 5px solid #aaaaaa;
    border-bottom-left-radius: 5px;
  }
  li.pokedex {
    border-bottom: 5px solid #ff0033;
  }
  li.game {
    border-bottom: 5px solid #ff6666;
  }
  li.trading {
    border-bottom: 5px solid #ffcc00;
  }
  li.animation {
    border-bottom: 5px solid #00bb00;
  }
  li.trophy {
    border-bottom: 5px solid #0099ff;
  }
  li.news {
    border-bottom: 5px solid #0000ff;
    border-bottom-right-radius: 5px;
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
  .icon img:nth-child(2) {
    opacity: 0%;
  }
`;

const navBox = css``;

export default PrimaryNav;
