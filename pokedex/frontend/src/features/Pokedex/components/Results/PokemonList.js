
const PokemonList = ({ pokemon }) => {
	return (
		<li>
			<a>
				<img src={pokemon.sprites.front_default}/>
			</a>
			<div>
				<p>
					<span></span>
				</p>
				<h5></h5>
				<div>
					<span></span>
				</div>
				<div>
					<span></span>
				</div>
			</div>
		</li>
	)
}

export default PokemonList