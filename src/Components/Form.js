import { useState } from "react";
import { db } from "../firebase";
import { collection, getDocs, addDoc } from "firebase/firestore";
import styled from "styled-components";
import Leaderboard from "./Leaderboard"

const PopupForm = styled.form`
    display: ${props => `${props.display}`};
    flex-direction: column;
    position: fixed;
    top: 20%;
    left: 20%;
    z-index:5;
`
function Form(props) {
    const [name, setName] = useState("")
    const [submitted, setSubmitted] = useState(false)
    const OnSubmit = (e) => {
        e.preventDefault()
        console.log(name)
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
                <input type="text" onChange={(e) => setName(e.target.value)} id="name" placeholder="Enter your name" required minLength={3}/>
                <button type="submit" onClick={OnSubmit}>Submit</button>
            </PopupForm>
            {submitted && <Leaderboard/>}
        </>
    );
}

export default Form;