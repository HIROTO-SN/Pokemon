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
	lastPokeId: 20,
};

// Context定義
export const SearchProvider = ({ children }) => {
	
  const [searchResult, searchDispatch] = useReducer((prev, { type, val }) => {
		switch (type) {
			case "searchInput":
				return { ...prev, searchInput: val};
			case "nextPoke":
				return { ...prev, lastPokeId: (val + 1)};
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
