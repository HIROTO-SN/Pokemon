/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import Header from "./Header/Header.js";
import Filter from "./Filter/Filter.js";
import Sort from "./Sort/Sort.js";
import Results from "./Results/Results.js";
import UserDashboard from "../../../components/Dashboard/UserDashboard.js";

const Pokedex = () => {
  
  const scrollOnTop = () => {
    window.scroll({ top: 0, behavior: "instant" });
  };
  return (
    <div css={container}>
      <Header/>
      <Filter/>
      <Sort/>
      <Results/>
    </div>
  );
};

const container = css`
  box-sizing: border-box;
  background: #fff url("/background/container_bg.png");
  clear: both;
  display: block;
  margin: 0 auto;
  max-width: 1280px;
  overflow: hidden;
  position: relative;
`;

export default Pokedex;