/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import Header from "./Header/Header.js";
import Filter from "./Filter/Filter.js";
import Sort from "./Sort/Sort.js";
import Results from "./Results/Results.js";
import UserDashboard from "../../../components/Dashboard/UserDashboard.js";
import { container } from "../../../components/CommonCss/Layout.js";

const Pokedex = () => {
  
  const scrollOnTop = () => {
    window.scroll({ top: 0, behavior: "instant" });
  };
  return (
    <>
      <UserDashboard />
      <div css={container}>
        <Header/>
        <Filter/>
        <Sort/>
        <Results/>
      </div>
    </>
  );
};

export default Pokedex;