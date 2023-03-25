import React from 'react';
import { SnakeGame } from './components/SnakeGame';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="">Snake</header>
      <main>
        <SnakeGame />
      </main>
    </div>
  );
}

export default App;
