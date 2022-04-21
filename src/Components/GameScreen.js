import backgroundImg from "../Assets/Img/background.jpg"

function GameScreen() {
    const imgOnClick = (e) => {
        const imgObj = document.getElementById("game-screen")
        const startCoord = imgObj.getBoundingClientRect()
        const x_coord = Math.round(e.pageX - startCoord.x)
        const y_coord =  Math.round(e.pageY - startCoord.y)
        console.log(x_coord,y_coord)
    } 
    return (
        <div id='game-screen'>
            <img onClick={imgOnClick} className="game-img" id="game-img" src={backgroundImg} alt="game-img" />
        </div>
    );
}

export default GameScreen;