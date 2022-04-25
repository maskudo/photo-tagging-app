import styled from "styled-components";

const MenuContainer = styled.div`
    display:flex;
    flex-direction:column;
    justify-content: space-between;
    overflow:hidden;
    background: rgba(0, 0, 0, 0.6);
    position: absolute;
    border: solid black 1px;
    border-radius: 15%;
    color:white;
    left: ${props => `${props.left}px`};
    top: ${props => `${props.top}px`};
    z-index: 5;
`
const Button = styled.div`
    min-height: 2rem;
    min-width: 5rem;
    padding: 5%;
    text-align: center;
    :hover{
        background: rgba(0, 0, 0, 0.8)
    }
`

function Dropdown(props) {
    const {left, top, characters, buttonOnClick} = props
    return (
        <MenuContainer left={left} top={top} >
            {characters.map((character) => {
                return (
                    <>
                        <Button onClick={buttonOnClick}>{character}</Button>
                    </>
                )
            })}
        </MenuContainer>
    );
}

export default Dropdown;