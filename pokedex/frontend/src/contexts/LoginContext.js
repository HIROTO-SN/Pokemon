import { createContext, useContext, useState } from "react";

const LoginContext = createContext();
const LoginActionContext = createContext();

// Login時のState初期値
const initLoginState = { 
	username: "",
	isLogin: false // ログイン認証有無
};

// Context定義
export const LoginProvider = ({ children }) => {

  const [loginState, setLoginState] = useState(initLoginState);
	return (
		<LoginContext.Provider value={loginState}>
			<LoginActionContext.Provider value={setLoginState} >
				{children}
			</LoginActionContext.Provider>
		</LoginContext.Provider>
	)
};

export const useLoginInfo = () => useContext(LoginContext);
export const useLoginAction = () => useContext(LoginActionContext);