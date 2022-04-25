import { useContext } from "react";
import Timer from "./Timer";
import styled from "styled-components";
import { GameContext } from "./GameContextProvider";

const Head = styled.div`
    display:flex;
    justify-content: space-between;
    align-items: center;
    background: rgba(0,0,0,0.9);
    color: white;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 10;
`
const SpriteContainer = styled.div `
    display:flex;
    justify-content: center;
    width: 33%;
`
const TimerContainer = styled.div`
    width:33%;
    text-align:center;
    font-size: 2rem;
`
const NavLinkContainer = styled.div`
    width:33%;
    text-align: center;
`
const Img = styled.img `
    width: 10%;
`
const NavLink = styled.a `
    font-size: 2rem;
    text-decoration: none;
    :visited{
        color:white;
    }
    :hover{
        color:white;
    }
    :active{
        color:white;
    }

`
function Header() {
    const {characterSprites} = useContext(GameContext)
    return (
        <Head className="header">
            <NavLinkContainer><NavLink href="/">Home</NavLink></NavLinkContainer>
            <TimerContainer><Timer/></TimerContainer>
            <SpriteContainer>
                {characterSprites && characterSprites.map((character) => {
                    return (
                            <Img src={character.sprite} alt={character.name} title={character.name}/>
                    )
                })}
            </SpriteContainer>
        </Head>
    );
}

export default Header;