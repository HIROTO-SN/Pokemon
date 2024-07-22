/** @jsxImportSource @emotion/react */
import { useLocation } from "react-router-dom";
import { container } from "../../../components/CommonCss/Layout.js";
import UserDashboard from "../../../components/Dashboard/UserDashboard.js";
import { SearchProvider } from "../contexts/SearchContext.js";
import Filter from "./Filter/Filter.js";
import Header from "./Header/Header.js";
import Results from "./Results/Results.js";
import Sort from "./Sort/Sort.js";

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
          <Filter passedState={location.state}/>
          <Sort/>
          <Results passedState={location.state}/>
        </SearchProvider>
      </div>
    </>
  );
};

export default Pokedex;