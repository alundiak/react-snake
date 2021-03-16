import React, { useReducer, PropsWithChildren } from 'react';
import { Point } from './Point';
import './board.css';

const FREQUENCY = 1000;

// Array for axis used in format [x y] of two positive numbers:
// y top-to-bottom and
// x left-to-right
const initialBoardState = {
    boardSize: [8, 8],
    targetPoint: [2, 3],
    snake: [[4, 5]],
    // snake: [[4, 5], [4, 6], [5, 6], [6, 6]],
    // snake: { // alternative
    //     head: [],
    //     tail: []
    // },
    started: false,
    // finished: false,
    // conflict: false, // target | itself | edge
};

// Approach using <div> and css-grid layout
export function Board({ children }: PropsWithChildren<any>) {
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
            dispatch({ type: 'INTERRUPT' });
        }

        snakeMove(boardState, newDirection, dispatch);
    };

    const boardCore = [];
    for (let x = 0; x < width; x++) {
        for (let y = 0; y < height; y++) {
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

        case 'SNAKE_MOVE':
            console.log('Snake is MOVING');

            // state.snake.unshift(action.newDirection);
            // state.snake.pop(); // add a keyframe animation for slow fade out of last point on tail

            // state.snake[0] = action.newPosition; // MUTABLE !!!!

            // TODO
            // const [snakeHead, ...snakeTail] = state.snake; // snakeTail can be undefined or many arrays [].length == 2
            // TODO

            const [, ...tail] = state.snake;

            return {
                ...state,
                snake: [action.newPosition, ...tail]
            }

        case 'CONFLICT_WITH_TARGET':
            console.log('Target point reached. Generating new one.');
            // when snake eats target [yT, xT], size should be increased - new sub-array will be pushed to boardState.snake

            // action.newPosition;

            return {
                ...state,
                // targetPoint: generateRandomPoint('target'), // BAD
                // snake: [generateRandomPoint('snakeHead')] // BAD
            }

        case 'CONFLICT_WITH_ITSELF':
            console.log('Don\'t eat yourself');

            return {
                ...state,
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
            console.log('INTERRUPT.');

            return {
                ...state,
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

    if (yDirection === snakeHeadY) {
        // it is LEFT or RIGHT move of snake head

        let interval1: any;

        if (xDirection < snakeHeadX) { // -- loop = LEFT MOVE

            let i = snakeHeadX - 1; // next left point

            const callback = () => {
                let newPosition = [i, yDirection];
                if (isWall(newPosition)) {
                    clearInterval(interval1);
                    // dispatch({
                    //     type: 'CONFLICT_WITH_EDGES',
                    //     newPosition: generateRandomPoint('target'),
                    //     newSnakeHead: generateRandomPoint('snakeHead')
                    // });
                    dispatch({ type: 'FINISH' });
                    dispatch({ type: 'REGENERATE_TARGET', newPosition: generateRandomPoint('target') });
                    dispatch({ type: 'REGENERATE_SNAKE', newPosition: generateRandomPoint('snakeHead') });
                    return;
                }
                dispatch({ type: 'SNAKE_MOVE', newPosition });
                --i; // maybe i--
            };

            interval1 = setInterval(callback, FREQUENCY);
        } else { // ++ loop = RIGHT MOVE

            if (interval1) {
                clearInterval(interval1);
            }

            // let interval2: any;
            let i = snakeHeadX + 1; // next right point

            const callback = () => {
                let newPosition = [i, yDirection];
                if (isWall(newPosition)) {
                    clearInterval(interval1);
                    dispatch({ type: 'FINISH' });
                    dispatch({ type: 'REGENERATE_TARGET', newPosition: generateRandomPoint('target') });
                    dispatch({ type: 'REGENERATE_SNAKE', newPosition: generateRandomPoint('snakeHead') });
                    return;
                }
                dispatch({ type: 'SNAKE_MOVE', newPosition });
                ++i; // maybe i++
            };

            interval1 = setInterval(callback, FREQUENCY);
        }
    } else {
        // use case when clicked point NOT on the same Y axis
    }

    if (xDirection === snakeHeadX) {
        // it is TOP or BOTTOM move
        if (yDirection < snakeHeadY) {
            // -- for loop = TOP MOVE
        } else {
            // ++ for loop = BOTTOM MOVE
        }
    } else {
        // use case when clicked point NOT on the same X axis
    }

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

