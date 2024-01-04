import { useState } from 'react';
import { Board } from './Board';
import ThemeContext from './ThemeContext';
import './snake-game.css';

// OR Math.random(10, 0);
export function SnakeGame() {
  // dynamics, re-renders, etc
  const [theme, setTheme] = useState('light');

  const className = theme || '';

  return (
    <div className={className}>
      <ThemeContext.Provider value={theme}>
        <Board>
        </Board>
        <label>
          <input
            type="checkbox"
            checked={theme === 'dark'}
            onChange={(e) => {
              setTheme(e.target.checked ? 'dark' : 'light')
            }}
          />
          Use {theme === 'dark' ? 'light' : 'dark'} mode
        </label>
      </ThemeContext.Provider>
    </div>
  );
}
