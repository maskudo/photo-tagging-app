import Header from './Components/Header';
import GameScreen from './Components/GameScreen';
import { GameContextProvider } from './Components/GameContextProvider';

function App() {
  return (
    <div className="App">
      <GameContextProvider>
        <Header/>
        <GameScreen/>
      </GameContextProvider>
    </div>
  );
}

export default App;
