import backgroundImg from "../Assets/Img/background.jpg"

function GameScreen() {
    return (
        <>
            <img className="game-img" src={backgroundImg} alt="game-img" />
        </>
    );
}

export default GameScreen;