import { useReducer, PropsWithChildren } from 'react';
import { Point } from './Point';
import './board.css';

const FREQUENCY = 1000;

// Array for axis used in format [x y] of two positive numbers:
// y top-to-bottom and
// x left-to-right
const initialBoardState = {
    boardSize: [8, 8],
    targetPoint: [2, 5],
    snake: [[4, 5]],
    // snake: [[4, 5], [4, 6], [5, 6], [6, 6]],
    // snake: { // alternative
    //     head: [],
    //     tail: []
    // },
    started: false,
    interrupt: false,
    conflict: false, // target | 'itself' | 'edge' aka 'wall'
};

let movingInterval: any;

// Approach using <div> and css-grid layout
export function Board({ children }: PropsWithChildren<any>) {
    // console.log('Board re-render');

    const [boardState, dispatch] = useReducer(
        boardReducer,
        initialBoardState
    );

    const width = boardState.boardSize[0];
    const height = boardState.boardSize[1];
    // const matrix = Array(width).fill(null).map(el => Array(height).fill(0));
    // console.log(matrix);

    // This must be created on demand, after click for every cell once. NOT MORE
    const gameTrigger = (newDirection: number[/* x y */]) => {
        if (!boardState.started) {
            dispatch({ type: 'START' });
        } else {
            clearInterval(movingInterval);
            dispatch({ type: 'INTERRUPT' });
        }

        snakeMove(boardState, newDirection, dispatch);
    };

    const boardCore = [];
    for (let x = 0; x < width; x++) {
        for (let y = 0; y < height; y++) {
            // console.log('loop re-invoke');
            // TODO improve performance
            // Every cell on the board changed, every snake moved, this loop will be re-invoked.
            boardCore.push(<Point gameTrigger={gameTrigger} boardState={boardState} x={x} y={y} key={`cell-x[${x}]-y[${y}]`} />);
        }
    }

    return (
        <>
            <div className="wrapper">
                {boardCore}
            </div>
            {children}
        </>
    );
}

function boardReducer(state: any, action: any) {
    // console.log('boardReducer'); // TODO
    // Due to using <React.StrictMode> useReducer() -> reducer() function is double-invoking !!!
    // https://reactjs.org/docs/strict-mode.html#detecting-unexpected-side-effects
    // console.log() inside of switch case is once, but random array is regenerated twice
    // SOLUTION: move ANY logic BEFORE dispatch() and pass any new changed data via dispatch() func.
    // https://github.com/facebook/react/issues/16295
    // https://stackoverflow.com/questions/54892403/usereducer-action-dispatched-twice

    switch (action.type) {
        case 'START':
            console.log('Game STARTED');
            return {
                ...state,
                started: true // and start while(1) loop OR setInterval()
            }

        case 'FINISH':
            console.log('Game Over!');

            return {
                ...state,
                started: false, // and stop while(1) loop OR setInterval()
                // targetPoint: generateRandomPoint('target'), // BAD
                // snake: [generateRandomPoint('snakeHead')] // BAD
            }

        case 'SNAKE_MOVE': {
            console.log('Snake is MOVING');

            const [previousHead, ...tail] = state.snake;
            if (tail.length > 0) {
                tail.pop(); // remove last element
                tail.unshift(previousHead); // add previous head as first
            }

            return {
                ...state,
                snake: [action.newPosition, ...tail],
                interrupt: false
            }
        }

        case 'GROW_SNAKE': {
            console.log('Snake is GROWING');

            // state.snake.unshift(action.newDirection);
            // state.snake.pop(); // add a keyframe animation for slow fade out of last point on tail

            // state.snake[0] = action.newPosition; // MUTABLE !!!!

            // TODO
            // const [snakeHead, ...snakeTail] = state.snake; // snakeTail can be undefined or many arrays [].length == 2
            // TODO

            const [head, ...tail] = state.snake;
            tail.unshift(action.newPosition);

            return {
                ...state,
                snake: [head, ...tail],
                interrupt: false
            }
        }

        case 'CONFLICT_WITH_TARGET': // MAYBE remove
            console.log('Target point reached. Generating new one.');
            // when snake eats target [xT, yT], size should be increased - new sub-array will be pushed to boardState.snake

            return {
                ...state,
                // targetPoint: generateRandomPoint('target'), // BAD
                // snake: [generateRandomPoint('snakeHead')] // BAD
            }

        case 'CONFLICT_WITH_ITSELF':
            console.log('Don\'t eat yourself');

            return {
                ...state,
                conflict: 'itself',
                // targetPoint: generateRandomPoint('target'), // BAD
                // snake: [generateRandomPoint('snakeHead')] // BAD
            }

        case 'CONFLICT_WITH_EDGES':
            console.log('Bang...');

            return {
                ...state,
                started: false,
                targetPoint: action.newPosition, // SHOULD BE OK
                snake: [action.newSnakeHead] // SHOULD BE OK
            }

        case 'REGENERATE_TARGET':
            console.log('Target point regeneration.');

            return {
                ...state,
                targetPoint: action.newPosition, // IS OK
            }

        case 'REGENERATE_SNAKE':
            console.log('Snake head point regeneration.');

            return {
                ...state,
                snake: [action.newPosition], // IS OK. Will cause disappearing snake's tail, and head will be new point.
            }
        case 'INTERRUPT':
            console.log('INTERRUPT');

            return {
                ...state,
                interrupt: true
            }

        default:
            return state;
    }
}

/**
 * top: x = const, y--
 * bottom: x = const, y++
 * left: x--, y = const
 * right: x++, y = const
 *
 * @param boardState
 * @param newDirection
 * @param dispatch
 */
function snakeMove(boardState: any, newDirection: any, dispatch: any) {
    const snakeHead = boardState.snake[0];
    const [snakeHeadX, snakeHeadY] = snakeHead;
    const [xDirection, yDirection] = newDirection;

    // it is LEFT or RIGHT move of snake head
    if (yDirection === snakeHeadY) {

        if (xDirection < snakeHeadX) { // -- loop = LEFT MOVE
            let i = snakeHeadX - 1; // next left point
            const callback = () => {
                reDispatchMove(dispatch, boardState, [i, yDirection]);
                --i; // maybe i--
            };
            movingInterval = setInterval(callback, FREQUENCY);
        } else { // ++ loop = RIGHT MOVE

            if (movingInterval) {
                clearInterval(movingInterval);
            }

            let i = snakeHeadX + 1; // next right point
            const callback = () => {
                reDispatchMove(dispatch, boardState, [i, yDirection]);
                ++i; // maybe i++
            };
            movingInterval = setInterval(callback, FREQUENCY);
        }
    } else {
        // use case when clicked point NOT on the same Y axis
    }

    // it is TOP or BOTTOM move
    if (xDirection === snakeHeadX) {
        if (yDirection < snakeHeadY) { // -- for loop = TOP MOVE

            let i = snakeHeadY - 1; // next top point
            const callback = () => {
                reDispatchMove(dispatch, boardState, [xDirection, i]);
                --i;
            };
            movingInterval = setInterval(callback, FREQUENCY);

        } else { // ++ for loop = BOTTOM MOVE

            if (movingInterval) {
                clearInterval(movingInterval);
            }

            let i = snakeHeadY + 1; // next bottom point
            const callback = () => {
                reDispatchMove(dispatch, boardState, [xDirection, i]);
                ++i;
            };
            movingInterval = setInterval(callback, FREQUENCY);

        }
    } else {
        // use case when clicked point NOT on the same X axis
    }
}

function reDispatchMove(dispatch: any, boardState: any, newPosition: number[]) {
    if (isWall(newPosition)) {
        regeneratePoints(dispatch);
        // return; // maybe ???
    }

    dispatch({ type: 'SNAKE_MOVE', newPosition });

    if (isTargetEaten(boardState, newPosition)) {
        dispatch({ type: 'GROW_SNAKE', newPosition });
        dispatch({ type: 'REGENERATE_TARGET', newPosition: generateRandomPoint('target') });
    }

    const [, ...tail] = boardState.snake;
    if (tail.length > 0) {
        if (isItselfEaten(tail, newPosition)) {
            dispatch({ type: 'CONFLICT_WITH_ITSELF' });
            regeneratePoints(dispatch);
        }
    }
}

function regeneratePoints(dispatch: any) {
    clearInterval(movingInterval);
    dispatch({ type: 'FINISH' });
    setTimeout(() => {
        dispatch({ type: 'REGENERATE_TARGET', newPosition: generateRandomPoint('target') });
        dispatch({ type: 'REGENERATE_SNAKE', newPosition: generateRandomPoint('snakeHead') });
    }, 3000);
}

function generateRandomPoint(type: string) {
    const newX = Math.floor(Math.random() * initialBoardState.boardSize[0]);
    const newY = Math.floor(Math.random() * initialBoardState.boardSize[1]);

    // Extend logic to avoid:
    // same point as target, which was before
    // same point of snake head or tail
    // etc.
    console.log(type + ' new random point', [newX, newY]);

    return [newX, newY];
}

function isWall(point: number[]) {
    const [x, y] = point;

    if (x < 0) {
        return true; // left edge, x has been decreasing towards 0
    }
    if (x > initialBoardState.boardSize[0] - 1) {
        return true; // right edge, x has been increasing from positive number towards board width edge
    }
    if (y < 0) {
        return true; // top edge, y has been decreasing towards 0
    }
    if (y > initialBoardState.boardSize[1] - 1) {
        return true; // right edge, x has been increasing from positive number towards board height edge
    }

    return false;
}

const isTargetEaten = (boardState: any, newPosition: number[]) => {
    return newPosition[0] === boardState.targetPoint[0] && newPosition[1] === boardState.targetPoint[1];
}

const isItselfEaten = (tail: any, newPosition: number[]) => tail.some((el: number[]) => {
    return el[0] === newPosition[0] && el[1] === newPosition[1];
});

