import { createContext, useContext, useState } from "react";

/* アカウント作成ページ全体 */
const CurrentPageContext = createContext();
const CurrentPageDefineContext = createContext();

// Login時のState初期値
const initPageState = { 
	name: "Verify Age",
	pageNo: 1 // 現在のアカウント作成画面でのページ位置
};

// Context定義
export const CurrentPageProvider = ({ children }) => {

  const [currentPage, setCurrentPage] = useState(initPageState);
	return (
		<CurrentPageContext.Provider value={currentPage}>
			<CurrentPageDefineContext.Provider value={setCurrentPage} >
				{ children }
			</CurrentPageDefineContext.Provider>
		</CurrentPageContext.Provider>
	)
};

export const useCurrentPage = () => useContext(CurrentPageContext);
export const useCurrentPageDefine = () => useContext(CurrentPageDefineContext);