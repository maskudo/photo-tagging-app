import styled from "styled-components";

const Title = styled.div`
        display:flex;
        flex-direction:column;
        position: absolute;
        color:white;
        left: ${props => `${props.left}px`};
        top: ${props => `${props.top}px`};
        z-index: 5;
    `

function Dropdown(props) {
    const {left, top, characters, buttonOnClick} = props
    console.log("clicked",left,top)

    return (
        <Title left={left} top={top} >
            {characters.map((character) => {
                return (
                    <>
                        <button onClick={buttonOnClick}>{character}</button>
                    </>
                )
            })}
        </Title>
    );
}

export default Dropdown;