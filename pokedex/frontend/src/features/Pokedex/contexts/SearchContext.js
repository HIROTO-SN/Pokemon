import { createContext, useContext, useReducer } from "react";

/*
* Context - SearchContext
* 検索条件管理Context
*/ 
const SearchCondition = createContext();
const DispatchSearchCondition = createContext();

// 検索条件初期状態オブジェクト
const initAccountInfoState = { 
	searchInput: "",
	// password: "",
};

// Context定義
export const SearchProvider = ({ children }) => {
	
  const [searchResult, searchDispatch] = useReducer((prev, { type, val }) => {
		switch (type) {
			case "searchInput":
				return { ...prev, searchInput: val};
		}
	}, initAccountInfoState);

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