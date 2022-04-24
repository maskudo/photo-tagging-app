import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import db from "./../firebase"

const getLeaderboard = async () => {
    const colRef = collection(db, 'leaderboard');
    let data = []
    const querySnapshot = await getDocs(colRef);
    querySnapshot.docs.forEach((doc) => {
        data.push({...doc.data(), id:doc.id})
    })
    data.sort((a,b) => {return (a.time-b.time)})
    return data
  }

function Leaderboard() {
    return (
        <>
            <h1>leaderboard lol</h1>
        </>
    );
}

export default Leaderboard;