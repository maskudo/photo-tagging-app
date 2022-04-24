import { useContext } from "react";
import Timer from "./Timer";
import styled from "styled-components";
import { GameContext } from "./GameContextProvider";

const Head = styled.div`
    display:flex;
    justify-content: space-between;
    background: rgb(24, 26, 27);
    color: white;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 10;
`
const SpriteContainer = styled.div `
    
`
const Img = styled.img `
    display:inline;
    width:5%;
    height: auto;
    margin: 5%;
`
function Header() {
    const {characterSprites} = useContext(GameContext)
    return (
        <Head className="header">
            <Timer/>
            {/* <SpriteContainer>
                {characterSprites && characterSprites.map((character) => {
                    return (
                        <Img src={character.sprite} alt={character.name}/>
                    )
                })}
            </SpriteContainer> */}
        </Head>
    );
}

export default Header;