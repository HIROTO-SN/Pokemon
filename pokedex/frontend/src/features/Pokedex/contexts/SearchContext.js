import { createContext, useContext, useReducer, useState } from "react";
import { HEIGHT_LIST, NUMBER_RANGE, WEIGHT_LIST } from "../../../constants/ConstantsGeneral";

const SearchCondition = createContext();
const DispatchSearchCondition = createContext();
const PokemonData = createContext();
const SetPokemonData = createContext();
const Loader = createContext();
const SetLoader = createContext();

// 検索条件初期状態オブジェクト
const initSearchState = { 
	searchInput: "",
	types: [],
	weaks: [],
	numberRangeMin: NUMBER_RANGE.MIN,
	numberRangeMax: NUMBER_RANGE.MAX,
	height: [],
	heightPoint: 0,
	weight: [],
	weightPoint: 0,
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

	/**
   * @param {List} map_list - チェックされた高さ、または重さのリスト
   * @param {List} val_list - 比較対象配列（高さ、または重さのコンストリスト）
   * 選択された高さ、または重さを判定するための数値を計算
   */ 
	const calcPoint = (map_list, val_list) => {
		let cal = 0;
		map_list.forEach((e) => {
			if (e === val_list[0].name) {
				cal += 1;
			} else if (e === val_list[1].name) {
				cal += 2;
			} else if (e === val_list[2].name) {
				cal += 4;	
			} else {
				cal += 0;
			}
		});
		return cal;
	}

	/*1*/
  const [searchCondition, searchConditionDispatch] = useReducer((state, action) => {
		switch (action.type) {
			case "searchInput":
				return { ...state, searchInput: action.val};
			case "checkType":
				return { ...state, types: action.val};
			case "checkWeak":
				return { ...state, weaks: action.val};
			case "numberMinInput":
				return { ...state, numberRangeMin: action.val};
			case "numberMaxInput":
				return { ...state, numberRangeMax: action.val};
			case "checkHeight":
				return { ...state, height: action.val, heightPoint: calcPoint(action.val, HEIGHT_LIST)};
			case "checkWeight":
				return { ...state, weight: action.val, weightPoint: calcPoint(action.val, WEIGHT_LIST)};
			case "setPageNumber":
				return { ...state, pageNumber: action.val, initFlg: false };
		}
	}, initSearchState);

	/*2*/
	const [pokemonData, setPokemonData] = useState([]);
	
	/*3*/
	const [loader, setLoader] = useState(true);

	/***** Context ******/
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
