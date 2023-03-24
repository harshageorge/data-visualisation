import { createContext, useState } from "react";

export const AppContext = createContext(null);
export const AppContextProvider = (props) => {
  const [loggedIn, setloggedIn] = useState(false);
  const [getSelectedListId, setgetSelectedListId] = useState([]);
  const [historicalData, sethistoricalData] = useState([]);
  const [chartData, setchartData] = useState([]);


  const contextValue = {
    loggedIn,
    setloggedIn,
    getSelectedListId,
    setgetSelectedListId,
    historicalData,
    sethistoricalData,
    chartData, 
    setchartData,
  };

  return (
    <AppContext.Provider value={contextValue}>
      {props.children}
    </AppContext.Provider>
  );
};
