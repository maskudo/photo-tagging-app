import { useState } from "react";
import backgroundImg from "../Assets/Img/background.jpg"
import Dropdown from "./Dropdown"
import styled from "styled-components";

const GameScreenDiv = styled.div`
    position:relative;
    width:100%;
`
const Image = styled.img`
    position:absolute;
    width: 100%;
    z-index: 1;
`

function GameScreen() {
    const [dropDownCoord, setDropDownCoord] = useState({
        left:-1,
        top:-1
    }); 
    const [active, setActive] = useState(false)
    
    const imgOnClick = (e) => {
        e.preventDefault()
        const headerObj = document.querySelector(".header")
        const imgObj = document.querySelector("#bg-image")
        const startCoord = headerObj.getBoundingClientRect()
        const imgCoord = imgObj.getBoundingClientRect()

        let x_coord = Math.round(e.pageX - startCoord.x)
        let y_coord =  Math.round(e.pageY - startCoord.height)

        if (startCoord.width - x_coord < 100){
            x_coord -= 100
        }
        if (imgCoord.height - y_coord < 100){
            y_coord -= 100
        }

        setDropDownCoord({
            left:x_coord,
            top:y_coord
        })
        setActive(!active);
    } 
    return (
        <GameScreenDiv>
            <Image onClick={imgOnClick} src={backgroundImg} id="bg-image" alt="game-img"/>
            {active && <Dropdown left={dropDownCoord.left} top={dropDownCoord.top}/>}
        </GameScreenDiv>
    );
}

export default GameScreen;