import { useState, useRef } from "react";
import { db } from "../firebase";
import { collection, getDocs, addDoc } from "firebase/firestore";
import styled from "styled-components";

const PopupForm = styled.div`
    display: flex;
    flex-direction: column;
    position: fixed;
    top: 20%;
    left: 20%;
    z-index:5;
`
function Form() {
    const [name, setName] = useState("")
    const OnSubmit = (e) => {
        e.preventDefault()
        console.log(name)
        const colRef = collection(db, "leaderboard")
        addDoc(colRef, {
            name: name,
            time: 1200
        }).then(() => {
            //hide form
            console.log("donelol")
        })

    }
    return (
        <PopupForm>
            <form>
                <input type="text" onChange={(e) => setName(e.target.value)} id="name" placeholder="Enter your name" required minLength={3}/>
                <button type="submit" onClick={OnSubmit}>Submit</button>
            </form>
        </PopupForm>
    );
}

export default Form;