import { useState, useContext, useEffect } from "react";
import Dropdown from "./Dropdown";
import styled from "styled-components";
import { GameContext } from "./GameContextProvider";
import { db } from "./../firebase";
import { collection,getDocs } from "firebase/firestore";



const GameScreenDiv = styled.div`
    position:relative;
    width:100%;
`
const Image = styled.img`
    position:absolute;
    width: 100%;
    z-index: 1;
`
const getGameAssets = async () => {
    const colRef = collection(db, 'PS4');
    let assets = []
    const querySnapshot = await getDocs(colRef);
    querySnapshot.docs.forEach((doc) => {
        assets.push(doc.data())
    })
    return assets
}


function GameScreen() {
    const {setIsOver, setIsStart} = useContext(GameContext)
    const [assets, setAssets] = useState("")
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
        assets.characters.forEach((char) => {
            if (char.name === character){
                if (Math.abs(char.x - clickedCoord.x) < 5){
                    if (Math.abs(char.y - clickedCoord.y) < 5){
                        if(characters.length === 1){
                            setIsOver(true)
                        }
                        setCharacters(characters.filter((characterName) => {
                            return !(characterName === char.name)
                        }))
                    }
                }
            }
        })
    }

    const dDownOnClick = (e) => {
        checkCoordinates(e.target.textContent)
        setActive(false)
    }
    useEffect(() => {
        const getAssets = async () => {
            const asset = await getGameAssets()
            setAssets(asset[0])
        }
        getAssets()
    }, [])
    useEffect(() => {
        const characterList = []
        if (assets){
            assets.characters.forEach((char) => {
                characterList.push(char.name)
            })
        }
        setCharacters(characterList)
    }, [assets])

    return (
        <GameScreenDiv>
            {assets && <Image onClick={imgOnClick} onLoad={() => {setIsStart(true)}} src={assets.background} id="bg-image" alt="game-img"/>}
            {active && <Dropdown buttonOnClick={dDownOnClick} left={dropDownCoord.left} top={dropDownCoord.top} characters={characters}/>}
        </GameScreenDiv>
    );
}

export default GameScreen;