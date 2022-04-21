import styled from "styled-components";

const Title = styled.h1`
        position: absolute;
        color:white;
        left: ${props => `${props.left}px`};
        top: ${props => `${props.top}px`};
        z-index: 5;
    `

function Dropdown(props) {
    const {left, top} = props
    console.log(left,top)
    return (
        <Title left={left} top={top} >Hello</Title>
    );
}

export default Dropdown;