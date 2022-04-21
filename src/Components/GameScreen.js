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
    const [clickedCoord, setClickedCoord] = useState({
        x:-1,
        y:-1
    })
    const [active, setActive] = useState(false)
    const [characters, setCharacters] = useState(['John Bloodborne', 'Sekiro', 'Kratos'])
    const characterLocations = {
        'Kratos': {
            x:930,
            y:1820 
        }, 
        'Sekiro': {
            x:1020,
            y:1540
        },
        'John Bloodborne': {
            x:1110,
            y:1730
        }
    }
    
    const imgOnClick = (e) => {
        e.preventDefault()
        const headerObj = document.querySelector(".header")
        const imgObj = document.querySelector("#bg-image")
        const startCoord = headerObj.getBoundingClientRect()
        const imgCoord = imgObj.getBoundingClientRect()

        let x_coord = Math.round(e.pageX - startCoord.x)
        let y_coord =  Math.round(e.pageY - startCoord.height)
        setClickedCoord({
            x:x_coord,
            y:y_coord
        })

        if (startCoord.width - x_coord < 100){
            x_coord -= 150
        }
        if (imgCoord.height - y_coord < 100){
            y_coord -= 100
        }

        setDropDownCoord({
            left:x_coord,
            top:y_coord
        })
        setActive(true);
    } 
    const checkCoordinates = (character) => {
        if (Math.abs(characterLocations[character].x - clickedCoord.x) < 75){
            if (Math.abs(characterLocations[character].y - clickedCoord.y) < 75){
                setCharacters(characters.filter((char) => {
                    return !(character===char)
                }))
            }
        }
    }

    const dDownOnClick = (e) => {
        checkCoordinates(e.target.textContent)
        setActive(false)
    }
    return (
        <GameScreenDiv>
            <Image onClick={imgOnClick} src={backgroundImg} id="bg-image" alt="game-img"/>
            {active && <Dropdown buttonOnClick={dDownOnClick} left={dropDownCoord.left} top={dropDownCoord.top} characters={characters}/>}
        </GameScreenDiv>
    );
}

export default GameScreen;