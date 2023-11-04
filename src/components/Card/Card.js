import React from "react";
import "./Card.css";

const Card = ({ no, pokemon }) => {
  return (
    <div className="card" key={no}>
      <div className="img">
        <img src={pokemon.sprites.front_default} />
      </div>
      <h3 className="cardName">{pokemon.name}</h3>
      <div className="cardTypes">
        <div>タイプ</div>
        {pokemon.types.map((_type) => {
          return (
            <div>
              <span className="typeName">{_type.type.name}</span>
            </div>
          );
        })}
      </div>
			<div className="cardInfo">
				<div className="cardData">
					<p className="title">重さ：{pokemon.weight}</p>
				</div>
				<div className="cardData">
					<p className="title">高さ{pokemon.height}</p>
				</div>
				<div className="cardData">
					<p className="title">アビリティ：{pokemon.abilities[0].ability.name}</p>
				</div>
			</div>
    </div>
  );
};

export default Card;
