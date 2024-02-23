import { createContext, useContext, useReducer, useState } from "react";

const SearchCondition = createContext();
const DispatchSearchCondition = createContext();
const PokemonData = createContext();
const SetPokemonData = createContext();
const Loader = createContext();
const SetLoader = createContext();

// 検索条件初期状態オブジェクト
const initSearchState = { 
	searchInput: "",
	// password: "",
	numberRangeMin: 1,
	numberRangeMax: 1025,
	sortBy: 'asc',
	pageNumber: 0,
	initFlg: true,
};

/*
* SearchContext
* 1. 検索条件管理
* 2. Pokemonデータ管理
* 3. Loader管理
*/ 
export const SearchProvider = ({ children }) => {
	/*1*/
  const [searchCondition, searchConditionDispatch] = useReducer((state, action) => {
		switch (action.type) {
			case "searchInput":
				return { ...state, searchInput: action.val};
			case "setPageNumber":
				return { ...state, pageNumber: action.val, initFlg: false };
		}
	}, initSearchState);

	/*2*/
	const [pokemonData, setPokemonData] = useState([]);
	
	/*3*/
	const [loader, setLoader] = useState(true);

	return (
		<SearchCondition.Provider value={searchCondition}>
			<DispatchSearchCondition.Provider value={searchConditionDispatch} >
				<PokemonData.Provider value={pokemonData}>
					<SetPokemonData.Provider value={setPokemonData}>
						<Loader.Provider value={loader}>
							<SetLoader.Provider value={setLoader}>
								{ children }
							</SetLoader.Provider>
						</Loader.Provider>
					</SetPokemonData.Provider>
				</PokemonData.Provider>
			</DispatchSearchCondition.Provider>
		</SearchCondition.Provider>
	)
};

export const useSearchCondition = () => useContext(SearchCondition);
export const useSearchDispatch = () =>  useContext(DispatchSearchCondition);
export const usePokemonData = () => useContext(PokemonData);
export const useSetPokemonData = () =>  useContext(SetPokemonData);
export const useLoader = () => useContext(Loader);
export const useSetLoader = () =>  useContext(SetLoader);
