import React from "react";
import "./Search.css";

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
			<div className="pokemon-filter-toggle">
				<input id="chkFilter" type="checkbox" class="toggle-button"/>
				<label class="filter-label" for="chkFilter">Show Advanced Search</label>
				<div class="toggle-content">
					<p>【不思議の国のアリスの内容が表示します。】<br/>
					アリスは川辺でおねえさんのよこにすわって、なんにもすることがないのでとても退屈（たいくつ）しはじめていました。一、二回はおねえさんの読んでいる本をのぞいてみたけれど、そこには絵も会話もないのです。「絵や会話のない本なんて、なんの役にもたたないじゃないの」とアリスは思いました。</p>
			</div>
			</div>
    </div>
  );
};
export default Search;
