import React, { useState } from 'react';
import Game from './components/Game';

function App() {
  const [gameCounter, setGameCounter] = useState(0);
  const resetHandler = () => {
    setGameCounter(gameCounter + 1);
  }
  return (
    <React.Fragment>
      <Game key={gameCounter} reset={resetHandler}/>
    </React.Fragment>
  );
}

export default App;
