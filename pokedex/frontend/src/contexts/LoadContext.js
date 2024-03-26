import { createContext, useContext, useState } from "react";

/*
 * Context1 - LoadContext
 * 各ページでのロード完了有無を管理
 */
const LoadContext = createContext();
const SetLoadContext = createContext();

export const LoadContextProvider = ({ children }) => {
  const [loadFlg, setLoadFlg] = useState(false);
  return (
    <LoadContext.Provider value={loadFlg}>
      <SetLoadContext.Provider value={setLoadFlg}>
        { children }
      </SetLoadContext.Provider>
    </LoadContext.Provider>
  );
};

export const useLoadFlg = () => useContext(LoadContext);
export const useSetLoadFlg = () => useContext(SetLoadContext);
