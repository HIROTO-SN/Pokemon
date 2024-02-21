import { createContext, useContext, useReducer } from "react";

/*
* Context1 - SearchContext
* 検索条件管理Context
*/ 
const SearchCondition = createContext();
const DispatchSearchCondition = createContext();

// 検索条件初期状態オブジェクト
const initSearchState = { 
	searchInput: "",
	// password: "",
	numberRangeMin: 1,
	numberRangeMax: 1025,
	sortBy: 'asc',
	lastPokeId: 0,
};

// Context定義
export const SearchProvider = ({ children }) => {
	
  const [searchResult, searchDispatch] = useReducer((state, action) => {
		switch (action.type) {
			case "searchInput":
				return { ...state, searchInput: action.val};
			case "nextPoke":
				return { ...state, lastPokeId: action.val};
		}
	}, initSearchState);

	return (
		<SearchCondition.Provider value={searchResult}>
			<DispatchSearchCondition.Provider value={searchDispatch} >
				{ children }
			</DispatchSearchCondition.Provider>
		</SearchCondition.Provider>
	)
};

export const useSearchCondition = () => useContext(SearchCondition);
export const useDispatchSearch = () =>  useContext(DispatchSearchCondition);
