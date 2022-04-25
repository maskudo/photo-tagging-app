import { useState } from "react";
import { db } from "../firebase";
import { collection, getDocs, addDoc } from "firebase/firestore";
import styled from "styled-components";
import Leaderboard from "./Leaderboard"

const PopupForm = styled.form`
    display: ${props => `${props.display}`};
    text-align: start;
    flex-direction: column;
    justify-content: space-between;
    position: fixed;
    border: solid black 1px;
    background: rgba(0,0,0,0.5);
    padding: 2%;
    top: 30%;
    left: 40%;
    z-index:5;
    color: #e8e6e3;
`
const Input = styled.input`
    width: 100%;
    padding: 15px;
    margin: 5px 0 22px 0;
    border: none;
    background: rgb(32, 35, 36);
    color:#e8e6e3;
    font-size: 1.5rem;

    :focus{
        background: rgb(25,30,30);
        outline:none;
    }
`
const Button = styled.button`
    font-size: 1.5rem;
    background-color: #5b0ca5;
    color: white;
    padding: 16px 20px;
    border: none;
    cursor: pointer;
    width: 100%;
    margin-bottom:10px;
    opacity: 0.8;
`
function Form(props) {
    const [name, setName] = useState("")
    const [submitted, setSubmitted] = useState(false)
    const [disabled, setDisabled] = useState(false)
    const OnSubmit = (e) => {
        e.preventDefault()
        setDisabled(true)
        const colRef = collection(db, "leaderboard")
        addDoc(colRef, {
            name: name,
            time: props.time
        }).then(() => {
            setSubmitted(true)
        })

    }
    return (
        <>
            <PopupForm display={submitted?"none":"flex"}>
                <label htmlFor="name">Submit score</label>
                <Input type="text" onChange={(e) => setName(e.target.value)} id="name" placeholder="Enter Name" required minLength={3}/>
                <Button type="submit" disabled={disabled} onClick={OnSubmit}>Submit</Button>
            </PopupForm>
            {submitted && <Leaderboard currentPlayer = {{
                name: name,
                time: props.time
            }}
            />}
        </>
    );
}

export default Form;