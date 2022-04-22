import { useState, useContext, useEffect } from "react";
import { GameContext } from "./GameContextProvider";

function Timer() {
    const [seconds, setSeconds] = useState(0)
    const {isOver} = useContext(GameContext) 
    useEffect(() => {
        let timer
        if(!isOver){
            timer = setInterval(() => {
                setSeconds(seconds+1)
            }, 1000);
            
        }
        return () => clearInterval(timer)
    },)
    return (
        <span>{seconds}</span>
    );
}

export default Timer;