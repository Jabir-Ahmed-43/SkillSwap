import { createContext, useContext } from "react";

const AppContext = createContext();

const AppProvider = ({ children }) => {
  return <AppContext.Provider>{children}</AppContext.Provider>;
};

const useApp = () => {
  return useContext(AppContext);
};
export { AppProvider, useApp };
