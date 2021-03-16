import React from 'react';

export function Point({ gameTrigger, boardState, x, y }: any) {

	const isTarget = () => {
		if (x === boardState.targetPoint[0] && y === boardState.targetPoint[1]) {
			return 'target';
		} else {
			return '';
		}
	}

	const isSnake = () => {
		const [snakeBegin, ...restOfSnake] = boardState.snake;

		const isHead = x === snakeBegin[0] && y === snakeBegin[1];
		const isTail = restOfSnake.some((el: any) => {
			return x === el[0] && y === el[1];
		});

		if (isHead) {
			return 'snake head';
		} else if (isTail) {
			return 'snake tail';
		} else {
			return '';
		}
	}

	const className = `${isTarget()} ${isSnake()}`;

	const onPointClickHandler = (/* e: any */) => {
		return !isSnake() ? gameTrigger([x, y]) : null;
	};

	return <div className={`point ${className}`} onClick={onPointClickHandler}>{applyAxis(x, y)}</div>
}

function applyAxis(x: number, y: number) {
	let index: any = '';

	if (x === 0 && y === 0) {
		index = 0;
	} else if (x === 0 && y > 0) {
		index = 'y' + y;
	} else if (y === 0 && x > 0) {
		index = 'x' + x;
	}

	return index;
}
