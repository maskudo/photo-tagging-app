import { useState } from "react";
// import backgroundImg from "../Assets/Img/background.jpg"
import Dropdown from "./Dropdown";
import styled from "styled-components";
const backgroundImg = "https://firebasestorage.googleapis.com/v0/b/photo-tagging-game-29e4c.appspot.com/o/ps4%2Fbackground.jpg?alt=media&token=2d0e4950-c574-4054-8185-de85a0f8a4e6"


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
            x:61,
            y:56, 
            sprite: "https://firebasestorage.googleapis.com/v0/b/photo-tagging-game-29e4c.appspot.com/o/ps4%2Fkratos.png?alt=media&token=35ae6f10-fd01-4dc6-b0a2-f54bd6bfaa80"
        }, 
        'Sekiro': {
            x:67,
            y:47,
            sprite: "https://firebasestorage.googleapis.com/v0/b/photo-tagging-game-29e4c.appspot.com/o/ps4%2Fsekiro.png?alt=media&token=2b9f3be4-29e2-43b1-a3b4-c322fa0281e0"
        },
        'John Bloodborne': {
            x:73,
            y:53,
            sprite: "https://firebasestorage.googleapis.com/v0/b/photo-tagging-game-29e4c.appspot.com/o/ps4%2Fbloodborne.png?alt=media&token=3773b02e-9224-4af9-add6-9c03e6b0a134"
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
            x:Math.round(x_coord*100/imgCoord.width),
            y:Math.round(y_coord*100/imgCoord.height)
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
        if (Math.abs(characterLocations[character].x - clickedCoord.x) < 5){
            if (Math.abs(characterLocations[character].y - clickedCoord.y) < 5){
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