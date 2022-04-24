import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

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
    const [leaderboard, setLeaderboard] = useState("")
    useEffect(() => {
        const getLbd = async () => {
            const data = await getLeaderboard()
            setLeaderboard(data)
        } 
        getLbd()
    }, [])
    return (
        <>
            <h1>leaderboard lol</h1>
            {leaderboard && 
                <table>
                    <thead>
                        <tr>
                            <th>Rank</th>
                            <th>Player</th>
                            <th>Time</th>
                        </tr>
                    </thead>
                    <tbody>
                        {leaderboard.slice(0,10).map((player, index) => {
                            return (
                                <tr>
                                    <td>{index + 1}</td>
                                    <td>{player.name}</td>
                                    <td>{('0'+(player.time-(player.time%60))/60).slice(-2)} : {('0' + (player.time%60)).slice(-2)}</td>
                                </tr>
                            )
                        })} 
                    </tbody>
                   
                </table>}
        </>
    );
}

export default Leaderboard;