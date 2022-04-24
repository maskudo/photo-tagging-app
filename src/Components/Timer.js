import { useState, useContext, useEffect } from "react";
import { GameContext } from "./GameContextProvider";
import Form from "./Form";

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
        <>
            <span>{('0'+(seconds-(seconds%60))/60).slice(-2)} : {('0' + (seconds%60)).slice(-2)}</span>
            {isOver && <Form time={seconds}/>}
        </>
    );
}

export default Timer;