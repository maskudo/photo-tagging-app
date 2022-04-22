import { createContext, useState } from "react";

export const GameContext = createContext();

export const GameContextProvider = ({children}) => {
    const [isOver, setIsOver] = useState(false)
    return (
        <GameContext.Provider value={{isOver,setIsOver}}>
            {children}
        </GameContext.Provider>
    )

}