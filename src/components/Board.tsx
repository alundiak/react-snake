import React, { useState, useReducer, PropsWithChildren } from 'react';
import { Point } from './Point';
import './board.css';

// Array for axis used in format [y x] of two positive numbers:
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
    finished: false,
    conflict: false, // target | itself | edge
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

    const gameTrigger = (newDirection: number[/* y x */]) => {
        console.log('gameTrigger');

        if (!boardState.started) {
            dispatch({
                type: 'START'
            });
        }

        // This must be created on demand, after click for every cell once. NOT MORE
        const dispatchMove = (newPoint: number[]) =>
            dispatch({
                type: 'SNAKE_MOVE',
                newPosition: newPoint
            });

        snakeMove(boardState, newDirection, dispatchMove);
    };

    const boardCore = [];
    for (let y = 0; y < width; y++) {
        for (let x = 0; x < height; x++) {
            boardCore.push(<Point gameTrigger={gameTrigger} boardState={boardState} y={y} x={x} key={`cell-x[${x}]-y[${y}]`} />);
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
    switch (action.type) {
        case 'START':
            console.log('Game STARTED');
            return {
                ...state,
                started: true // and start while(1) loop OR setInterval()
            }

        case 'FINISH':
            console.log('Game FINISHED');
            return {
                ...state,
                started: false // and stop while(1) loop OR setInterval()
            }

        case 'SNAKE_MOVE':
            console.log('Snake is MOVING');
            // Expected:
            //  top: x = const, y--
            //  bottom: x = const, y++
            //  left: x--, y = const
            //  right: x++, y = const

            // state.snake.unshift(action.newDirection);
            // state.snake.pop(); // add a keyframe animation for slow fade out of last point on tail

            state.snake[0] = action.newPosition;

            // TODO
            // const [snakeHead, ...snakeTail] = state.snake; // snakeTail can be undefined or many arrays [].length == 2
            // TODO

            return {
                ...state,
            }

        case 'CONFLICT_WITH_TARGET':
            // TODO
            // when snake eats target [yT, xT], size should be increased - new sub-array will be pushed to boardState.snake
            break;

        case 'CONFLICT_WITH_ITSELF':
            // TODO
            break;

        case 'CONFLICT_WITH_EDGES':
            // TODO
            // [0 > x > width] or
            // [0 > y > height]
            break;

        default:
            return state;
    }
}

function snakeMove(boardState: any, newDirection: any, dispatchMove: any) {
    const snakeHead = boardState.snake[0];
    console.log(snakeHead, newDirection);

    const [yDirection, xDirection] = newDirection;

    if (yDirection === snakeHead[0]) {
        // it is LEFT or RIGHT move of snake head
        if (xDirection < snakeHead[1]) {
            let interval1: any;
            // -- for loop = LEFT MOVE
            for (let i = snakeHead[1] - 1/* next point */; i >= 0; i--) {
                console.log(i);
                const callback = () => {
                    console.log('callback');

                    dispatchMove([yDirection, i]);
                };
                setTimeout(callback, 3000);
                // if i < 0 => -1 and less => dispatch(CONFLICT_EDGE)
            }
            // clearInterval(interval1);
        } else {
            // ++ for loop = RIGHT MOVE
            // for (let i = snakeHead[1]; i <= boardState.boardSize[1] - 1; i--) {

            // }
        }
    } else {
        // use case when clicked point NOT on the same Y axis
    }

    if (xDirection === snakeHead[1]) {
        // it is TOP or BOTTOM move
        if (yDirection < snakeHead[0]) {
            // -- for loop = TOP MOVE
        } else {
            // ++ for loop = BOTTOM MOVE
        }
    } else {
        // use case when clicked point NOT on the same X axis
    }

}