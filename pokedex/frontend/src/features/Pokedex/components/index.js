/** @jsxImportSource @emotion/react */
import Header from "./Header/Header.js";
import Filter from "./Filter/Filter.js";
import Sort from "./Sort/Sort.js";
import Results from "./Results/Results.js";
import UserDashboard from "../../../components/Dashboard/UserDashboard.js";
import { container } from "../../../components/CommonCss/Layout.js";
import { SearchProvider } from "../contexts/SearchContext.js";
import { useEffect } from "react";
import { setPokemonSession } from "../../../components/api/PokemoApi.js";

const Pokedex = () => {
  
  const scrollOnTop = () => {
    window.scroll({ top: 0, behavior: "instant" });
  };

  /***** JS ******/
  useEffect(() => {
    setPokemonSession();
  },[])

  /***** HTML ******/
  return (
    <>
      <UserDashboard />
      <div css={container}>
        <SearchProvider>
          <Header/>
          <Filter/>
          <Sort/>
          <Results/>
        </SearchProvider>
      </div>
    </>
  );
};

export default Pokedex;