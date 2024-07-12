import { Link, useLocation } from "react-router-dom";
import React, { useEffect, useState } from "react";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { capitalizeFirstLetter } from "../../../features/Pokedex/utils/ConvToolUtils";

const PrimaryNav = () => {
  /***** Definition ******/
  const c = useCssPrimaryNav();
  const iconPath = "../icons/";
  const iconList = [
    { name: "home", backgroundColor: "#AAAAAA", link: "/home" },
    { name: "pokedex", backgroundColor: "#FF0033", link: "/pokedex" },
    { name: "game", backgroundColor: "#FF6666", link: "/game" },
    { name: "trading", backgroundColor: "#FFCC00", link: "/trading" },
    { name: "animation", backgroundColor: "#00BB00", link: "/animation" },
    { name: "trophy", backgroundColor: "#0099FF", link: "/trophy" },
    { name: "news", backgroundColor: "#0000FF", link: "/news" },
  ];
  const [iconActive, setIconActive] = useState("");
  const [clickActive, setClickActive] = useState(false);
  const [clickedTag, setClickedTag] = useState([]);

  const extension = ".png";
  const imageBeforeTag = " span img:nth-of-type(1)"; //イメージ変更前DOM指定用
  const imageAfterTag = " span img:nth-of-type(2)"; //イメージ変更後DOM指定用

  const location = useLocation();
  const [isReloaded, setIsReloaded] = useState(false);

  /***** JS ******/
  // /**
  //  * 初期表示時処理
  //  */
  // useEffect(() => {
  //   // ページがロードされた場合
  //   const wasReloaded = sessionStorage.getItem("wasReloaded") === "true";
  //   if (wasReloaded) {
  //     setIsReloaded(true);
  //     // セッションをクリア
  //     sessionStorage.removeItem("wasReloaded");
  //     const pathSegments = location.pathname.split("/");
  //     const pageName =
  //       pathSegments[pathSegments.length - 1] ||
  //       pathSegments[pathSegments.length - 2];
  //     changeColor(
  //       iconList.find((icon) => icon.name === pageName),
  //       "add"
  //     );
  //   }

  //   const handleBeforeUnload = () => {
  //     sessionStorage.setItem("wasReloaded", "true");
  //   };

  //   // インベントリスナーを追加
  //   window.addEventListener("beforeunload", handleBeforeUnload);

  //   // インベントリスナーを削除
  //   return () => {
  //     window.addEventListener("beforeunload", handleBeforeUnload);
  //   };
  // }, []);

  const changeColor = (icon, action) => {
    //   const el_title = document.querySelector("#title" + icon.name);
    //   const el_li = document.querySelector("#" + icon.name);
    //   const el_imageB = document.querySelector("#" + icon.name + imageBeforeTag);
    //   const el_imageA = document.querySelector("#" + icon.name + imageAfterTag);
    //   switch (action) {
    //     case "add":
    //       el_title.style.color = "white";
    //       el_li.style.color = "white";
    //       el_li.style.background = icon.backgroundColor;
    //       el_imageB.style.opacity = "0%";
    //       el_imageA.style.opacity = "100%";
    //       break;
    //     case "remove":
    //       el_title.style.color = "#464646";
    //       el_li.style.color = "#464646";
    //       el_li.style.background = "#fff";
    //       el_imageB.style.opacity = "100%";
    //       el_imageA.style.opacity = "0%";
    //       break;
    //     default:
    //       break;
    //   }
  };

  const clickHandler = (name) => {
    setClickActive(name);
  };

  /**
   * 各アイコンにマウスオーバーした際のイベント処理
   * @param {String} name アイコン名
   */
  const mouseEnterHandler = (name) => {
    setIconActive(name);
  };

  /**
   * 各アイコンからマウスリーブした際のイベント処理
   */
  const mouseLeaveHandler = () => {
    setIconActive("");
  };

  /***** JSX ******/
  return (
    <ul css={c.primaryNav}>
      {iconList.map((icon) => (
        <li
          id={icon.name}
          key={icon.name}
          css={c.iconListCss(icon, icon.name === clickActive)}
          onMouseEnter={() => mouseEnterHandler(icon.name)}
          onMouseLeave={() => mouseLeaveHandler()}
        >
          <Link to={icon.link} onClick={() => clickHandler(icon.name)}>
            <span className="icon" css={c.imgCss(icon.name === iconActive, icon.name === clickActive)}>
              <img
                src={iconPath + icon.name + extension}
                height="30%"
                vspace="2px"
                alt="bar-icon"
                className={icon.name}
              />
              <img
                src={iconPath + icon.name + "-after" + extension}
                height="30px"
                vspace="2px"
                alt="bar-icon-after"
                className={icon.name}
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

/**
 * CSS定義
 */
const useCssPrimaryNav = () => {
  // navbarのCSS
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
      float: left;
      height: 87px;
      width: 100%;
    }
    li:after {
      content: " ";
      height: 6px;
      left: 0;
      position: absolute;
      bottom: -6px;
      width: 100%;
      z-index: 1;
    }
  `;

  /**
   * 各iconのCSSを定義
   * @param {Object} icon - icon情報オブジェクト
   * @param {Boolean} isClicked - iconクリック状態
   */
  const iconListCss = (icon, isClicked) => css`
    background-color: ${isClicked && icon.backgroundColor};
    :after {
      background-color: ${icon.backgroundColor};
      border-radius: ${icon.name === "home" ? "0 0 0 8px" : "initial"};
      border-bottom-right-radius: ${icon.name === "news" ? "5px" : "initial"};
    }
    :hover {
      background-color: ${icon.backgroundColor};
      span.title {
        color: white;
      }
    }
    /* タイトル部共通 */
    span.title {
      position: absolute;
      top: 65%;
      left: 50%;
      transform: translate(-50%);
      font-size: 87.5%;
      color: ${isClicked ? "white" : "#464646"};
    }
  `;

  /**
   * iconイメージのCSSを定義
   * @param {Boolean} isActive - iconがマウスに被っているかどうか
   * @param {Boolean} isClicked - iconクリック状態
   */
  const imgCss = (isActive, isClicked) => css`
    img {
      cursor: pointer;
      position: absolute;
      top: 40%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
    img:nth-of-type(1) {
      opacity: ${isActive || isClicked ? 0 : 1};
    }
    img:nth-of-type(2) {
      opacity: ${isActive || isClicked ? 1 : 0};
    }
  `;

  return {
    primaryNav,
    iconListCss,
    imgCss,
  };
};

export default PrimaryNav;
