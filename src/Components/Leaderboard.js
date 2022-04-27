import { useState, useEffect } from "react";
import { collection, getDocs, query, limit, orderBy } from "firebase/firestore";
import { db } from "../firebase";
import styled from "styled-components";

const Lboard = styled.div`
    border: solid black 1px;
    position: fixed;
    top: 10%;
    left: 35%;
    width: 30%;
    z-index: 20;
`

const Table = styled.table `
    font-size: 1.4rem;
    width:100%;
    text-align: left;
    border-collapse: collapse;
    background: rgba(0,0,0,0.7);

`
const Thead = styled.thead `
    background: rgba(0,0,0,0.6);
`
const Tfoot = styled.tfoot `
    border: solid #5b0ca5 2px;
    background: rgba(0,0,0,0.68);
`
const Th = styled.th `
    padding: 2%;
`
const Td = styled.td `
    padding: 2%;
`

const getLeaderboard = async () => {
    const colRef = collection(db, 'leaderboard');
    const q = query(colRef, orderBy("time", "asc"), orderBy("name", "asc"), limit(10))
    let data = []
    const querySnapshot = await getDocs(q);
    querySnapshot.docs.forEach((doc) => {
        data.push({...doc.data(), id:doc.id})
    })
    return data
  }

function Leaderboard(props) {
    const [leaderboard, setLeaderboard] = useState("")
    const [currentPlayer, setCurPlayer] = useState(props.currentPlayer)
    useEffect(() => {
        const getLbd = async () => {
            const data = await getLeaderboard()
            let curPlayerIndex = data.findIndex((element) => {
                if (element.time === currentPlayer.time){
                    if (element.name === currentPlayer.name){
                        return true
                    }
                }
                return false
            })
            
            setLeaderboard(data)
            setCurPlayer({...currentPlayer, index:curPlayerIndex})
        } 
        getLbd()
    }, [])
    return (
        <Lboard>
            
            {leaderboard && 
                <Table>
                    <Thead>
                        <tr>
                            <Th>Rank</Th>
                            <Th>Player</Th>
                            <Th>Time</Th>
                        </tr>
                    </Thead>
                    <tbody>
                        {leaderboard.slice(0,10).map((player, index) => {
                            return (
                                <tr>
                                    <Td>{index + 1}.</Td>
                                    <Td>{player.name}</Td>
                                    <Td>{('0'+(player.time-(player.time%60))/60).slice(-2)} : {('0' + (player.time%60)).slice(-2)}</Td>
                                </tr>
                            )
                        })} 
                    </tbody>
                    <Tfoot>
                        <tr>
                            <Td>{currentPlayer.index===-1 ? "-" : (currentPlayer.index + 1 + ".") }</Td>
                            <Td>{currentPlayer.name}</Td>
                            <Td>{('0'+(currentPlayer.time-(currentPlayer.time%60))/60).slice(-2)} : {('0' + (currentPlayer.time%60)).slice(-2)}</Td>
                        </tr>
                    </Tfoot>
                   
                </Table>}
        </Lboard>
    );
}

export default Leaderboard;