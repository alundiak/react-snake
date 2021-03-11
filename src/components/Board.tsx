import React, { useState, useReducer, PropsWithChildren } from 'react';
import { Point } from './Point';
import './board.css';

const initialBoardState = {
    boardSize: [8, 8],
    targetPoint: [2, 3], // x y
    snake: [[4, 5]], // when snake size increased, new sub-array will be injected/pushed OR removed/extracted when needed.
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

    const boardCore = [];
    for (let i = 0; i < width; i++) {
        for (let j = 0; j < height; j++) {
            boardCore.push(<Point className={''} key={`cell-x[${i}]-y[${j}]`}>{i}{j}</Point>);
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
