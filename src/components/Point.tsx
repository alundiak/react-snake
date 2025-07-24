import { useContext } from "react";
import ThemeContext from "./ThemeContext";
import "./point.css";

export function Point({ className = "", gameTrigger, boardState, x, y }: any) {
  const theme = useContext(ThemeContext);

  const isTarget = () => {
    if (x === boardState.targetPoint[0] && y === boardState.targetPoint[1]) {
      return "target";
    } else {
      return "";
    }
  };

  const isSnake = () => {
    const [snakeBegin, ...restOfSnake] = boardState.snake;

    const isHead = x === snakeBegin[0] && y === snakeBegin[1];
    const isTail = restOfSnake.some((el: any) => {
      return x === el[0] && y === el[1];
    });

    if (isHead) {
      return "snake head";
    } else if (isTail) {
      return "snake tail";
    } else {
      return "";
    }
  };

  let composedClassName = `${isTarget()} ${isSnake()} ${className}`;

  if (theme) {
    composedClassName += theme;
  }
  // console.log(composedClassName);

  const onPointClickHandler = (/* e: any */) => {
    return !isSnake() ? gameTrigger([x, y]) : null;
  };

  return (
    <div className={`point ${composedClassName}`} onClick={onPointClickHandler}>
      {applyAxis(x, y)}
    </div>
  );
}

function applyAxis(x: number, y: number) {
  let index: any = "";

  if (x === 0 && y === 0) {
    index = 0;
  } else if (x === 0 && y > 0) {
    index = "y" + y;
  } else if (y === 0 && x > 0) {
    index = "x" + x;
  }

  return index;
}
