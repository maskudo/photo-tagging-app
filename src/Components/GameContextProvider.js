import { createContext, useState } from "react";

export const GameContext = createContext();

export const GameContextProvider = ({children}) => {
    const [isOver, setIsOver] = useState(false)
    const [isStart, setIsStart] = useState(false)
    return (
        <GameContext.Provider value={{isOver,setIsOver, isStart, setIsStart}}>
            {children}
        </GameContext.Provider>
    )

}