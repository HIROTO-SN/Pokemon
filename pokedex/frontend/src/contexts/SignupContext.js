import { createContext, useContext, useState } from "react";

/*
* Context1 - Paging
* アカウント作成(Signup)ページのページング管理
*/ 
// const CurrentPageContext = createContext();
// const DefineCurrentPageContext = createContext();

// // ページング初期値
// const initPageState = { 
// 	name: "Verify Age",
// 	pageNo: 1 // 現在のアカウント作成画面でのページ位置
// };

// // Context定義
// export const CurrentPageProvider = ({ children }) => {

//   const [currentPage, setCurrentPage] = useState(initPageState);
// 	return (
// 		<CurrentPageContext.Provider value={currentPage}>
// 			<DefineCurrentPageContext.Provider value={setCurrentPage} >
// 				{ children }
// 			</DefineCurrentPageContext.Provider>
// 		</CurrentPageContext.Provider>
// 	)
// };

// export const useCurrentPage = () => useContext(CurrentPageContext);
// export const useCurrentPageDefiner = () => useContext(DefineCurrentPageContext);


/*
* Context1 - AccountInfo
* アカウント作成(Signup)ページの登録情報管理
*/ 
const InputAccountInfoContext = createContext();
const SetInputAccountInfoContext = createContext();

// アカウント情報初期値
const initAccountInfoState = { 
	username: "",
	password: "",
	email: "",
	country: { name: "United States", code: "US"},
	birthday: "",
	newsInfoReceiveFlg: false,
	updateCenterReceiveFlg: false,
	displayPokeClubProfile: true,
};

// Context定義
export const InputAccountInfoProvider = ({ children }) => {
	
  const [inputAccountInfo, setAccountInfo] = useState(initAccountInfoState);
	return (
		<InputAccountInfoContext.Provider value={inputAccountInfo}>
			<SetInputAccountInfoContext.Provider value={setAccountInfo} >
				{ children }
			</SetInputAccountInfoContext.Provider>
		</InputAccountInfoContext.Provider>
	)
};

export const useInputAccountInfo = () => useContext(InputAccountInfoContext);
export const useSetInputAccountInfo = () =>  useContext(SetInputAccountInfoContext);