/** @jsxImportSource @emotion/react */
import { container } from "../../../components/CommonCss/Layout.js";
import UserDashboard from "../../../components/Dashboard/UserDashboard.js";
import { SearchProvider } from "../contexts/SearchContext.js";
import PokeSearchHook from "../utils/PokeSearchHook.js";
import Filter from "./Filter/Filter.js";
import Header from "./Header/Header.js";
import Results from "./Results/Results.js";
import Sort from "./Sort/Sort.js";

const Pokedex = () => {
  
  const scrollOnTop = () => {
    window.scroll({ top: 0, behavior: "instant" });
  };

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
          <PokeSearchHook/>
        </SearchProvider>
      </div>
    </>
  );
};

export default Pokedex;