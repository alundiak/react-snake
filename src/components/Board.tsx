import React, { useState, useReducer, PropsWithChildren } from 'react';
import { Point } from './Point';
import './board.css';

const initialBoardState = {
    boardSize: [8, 8],
    targetPoint: [2, 3], // x y
    snake: [[4, 5], [4, 6], [5, 6], [6, 6]], // when snake size increased, new sub-array will be injected/pushed OR removed/extracted when needed.
    started: false,
    finished: false,
    conflict: false,
    overflow: false
};

const boardReducer = (state: any, action: any) => {
    switch (action.type) {
        case 'GAME_START':
            // TODO
            break;

        case 'GAME_FINISH':
            // TODO
            break;

        case 'CONFLICT_WITH_POINT':
            // TODO
            break;

        case 'CONFLICT_WITH_ITSELF':
            // TODO
            break;

        case 'CONFLICT_WITH_EDGES':
            // TODO
            break;

        default:
            return state;
    }
}

// Approach using <div> and css-grid layout
export function Board({ children }: PropsWithChildren<any>) {
    const [boardState, dispatch] = useReducer(
        boardReducer,
        initialBoardState
    );

    const width = boardState.boardSize[0];
    const height = boardState.boardSize[1];
    const matrix = Array(width).fill(null).map(el => Array(height).fill(0));
    console.log(matrix);

    const isTarget = (i: number, j: number) => {
        if (i === boardState.targetPoint[0] && j === boardState.targetPoint[1]) {
            return 'target';
        } else {
            return '';
        }
    }

    const isSnake = (i: number, j: number) => {
        const [snakeBegin, ...restOfSnake] = boardState.snake;

        const hasBegin = i === snakeBegin[0] && j === snakeBegin[1];
        const hasTail = restOfSnake.some((el: any) => {
            return i === el[0] && j === el[1];
        });

        if (hasBegin || hasTail) {
            return 'snake';
        } else {
            return '';
        }
    }

    const boardCore = [];

    for (let i = 0; i < width; i++) {
        for (let j = 0; j < height; j++) {
            const className = `${isTarget(i, j)} ${isSnake(i, j)}`;
            boardCore.push(<Point className={className} key={`cell-x[${j}]-y[${i}]`}>{applyAxis(i, j)}</Point>);
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

function applyAxis(i: number, j: number) {
    let index: any = 0;
    if (i === 0) {
        index = j;
    } else {
        if (j === 0) {
            index = i;
        } else {
            index = '';
        }
    }
    return index;
}
