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

function Leaderboard(props) {
    const [leaderboard, setLeaderboard] = useState("")
    const [currentPlayer, setCurPlayer] = useState(props.currentPlayer)
    useEffect(() => {
        const getLbd = async () => {
            const data = await getLeaderboard()
            const curPlayerIndex = data.findIndex((element) => {
                if (element.time === currentPlayer.time){
                    if (element.name === currentPlayer.name){
                        return true
                    }
                }
                return false
            })
            setCurPlayer({...currentPlayer, index:curPlayerIndex})
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
                    <tfoot>
                        <tr>
                            <td>{currentPlayer.index + 1}</td>
                            <td>{currentPlayer.name}</td>
                            <td>{('0'+(currentPlayer.time-(currentPlayer.time%60))/60).slice(-2)} : {('0' + (currentPlayer.time%60)).slice(-2)}</td>
                        </tr>
                    </tfoot>
                   
                </table>}
        </>
    );
}

export default Leaderboard;