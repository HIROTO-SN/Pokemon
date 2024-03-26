/** @jsxImportSource @emotion/react */
import { container } from "../../../components/CommonCss/Layout.js";
import UserDashboard from "../../../components/Dashboard/UserDashboard.js";
import { SearchProvider } from "../contexts/SearchContext.js";
import Filter from "./Filter/Filter.js";
import Header from "./Header/Header.js";
import Results from "./Results/Results.js";
import Sort from "./Sort/Sort.js";

const Pokedex = () => {
  
  /***** JSX ******/
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