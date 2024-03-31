/** @jsxImportSource @emotion/react */
import { useEffect, useState } from "react";
import { container } from "../../../components/CommonCss/Layout.js";
import UserDashboard from "../../../components/Dashboard/UserDashboard.js";
import { SearchProvider } from "../contexts/SearchContext.js";
import Filter from "./Filter/Filter.js";
import Header from "./Header/Header.js";
import Results from "./Results/Results.js";
import Sort from "./Sort/Sort.js";
import { useLocation } from "react-router-dom";

const Pokedex = () => {
  /***** Defintion ******/
  const location = useLocation();

  /***** JSX ******/
  return (
    <>
      <UserDashboard />
      <div css={container}>
        <SearchProvider>
          <Header/>
          <Filter passedTypeId={location.state}/>
          <Sort/>
          <Results passedTypeId={location.state}/>
        </SearchProvider>
      </div>
    </>
  );
};

export default Pokedex;