import { createContext, useContext, useState } from "react";

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
	confirmPassword: "",
	email: "",
	confirmEmail: "",
	country: { name: "United States", code: "US"},
	birthday: "",
	screenName: "",
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