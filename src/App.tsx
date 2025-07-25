import { SnakeGame } from "./components/SnakeGame";
import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="header">
        <h2>Snake</h2>
      </header>
      <main>
        <SnakeGame />
      </main>
    </div>
  );
}

export default App;
