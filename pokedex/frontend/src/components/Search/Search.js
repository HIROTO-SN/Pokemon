import React from "react";
import "./Search.css";
import AdvancedMenu from "./AdvancedMenu";

const Search = () => {
  return (
    <div className="search-box">
      <div className="search-box-title">
        <span className="search-title">Pokedex</span>
      </div>
			<div className="search-box-main">
				<div className="search-box-container">
					<span className="search-main-title">Name of Number</span>
						<div className="search-submit">
							<input className="search-main-input" type="text" />
							<input className="search-main-button" type="submit" id="search" />
						</div>
						<div className="search-exp">
							<span>
								Search for a Pokemon by name or using its <br/> National Pokedex number.
							</span>
						</div>
					<span className="search-main-comment">
						Use the Advanced Search to explore Pokemon by type,<br/>weakness, Ability, and more!
					</span>
				</div>
			</div>
			<div className="filter-toggle-wrapper"></div>
			<AdvancedMenu />
    </div>
  );
};
export default Search;
