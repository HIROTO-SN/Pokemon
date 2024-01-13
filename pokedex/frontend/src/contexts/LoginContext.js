import { createContext, useContext, useState } from "react";

/* アプリ全体 */
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
				{ children }
			</LoginActionContext.Provider>
		</LoginContext.Provider>
	)
};

export const useLoginInfo = () => useContext(LoginContext);
export const useLoginAction = () => useContext(LoginActionContext);

/* ログイン画面のみエラー管理 */
const LoginErrorContext = createContext();
const LoginErrorSetContext = createContext();

// Context定義
export const LoginErrorProvider = ({ children }) => {
	const [error, setError] = useState("");
	return (
		<LoginErrorContext.Provider value={error}>
			<LoginErrorSetContext.Provider value={setError}>
				{ children }
			</LoginErrorSetContext.Provider>
		</LoginErrorContext.Provider>
	)
};

export const useLoginError = () => useContext(LoginErrorContext);
export const useLoginErrorSet = () => useContext(LoginErrorSetContext);
