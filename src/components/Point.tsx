import React from 'react';

export function Point({ gameTrigger, boardState, y, x }: any) {

	const isTarget = () => {
		if (y === boardState.targetPoint[0] && x === boardState.targetPoint[1]) {
			return 'target';
		} else {
			return '';
		}
	}

	const isSnake = () => {
		const [snakeBegin, ...restOfSnake] = boardState.snake;

		const isHead = y === snakeBegin[0] && x === snakeBegin[1];
		const isTail = restOfSnake.some((el: any) => {
			return y === el[0] && x === el[1];
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
		return !isSnake() ? gameTrigger([y, x]) : null;
	};

	return <div className={`point ${className}`} onClick={onPointClickHandler}>{applyAxis(y, x)}</div>
}

function applyAxis(y: number, x: number) {
	let index: any = 0;
	if (y === 0) {
		index = 'x' + x;
	} else {
		if (x === 0) {
			index = 'y' + y;
		} else {
			index = '';
		}
	}
	return index;
}
