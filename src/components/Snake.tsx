// import React from 'react';

// 3 conflicts
// 1) with wall
// 2) with itself
// 3) with target point

// 3rd conflict must call size increase (+ point)

export function Snake({ x1, y1, x2, y2, snakeSize }: any) {
  // size from 1, ++ , max(condition of exit)
  console.log(x1 + x2, y1 + y2, snakeSize);

  return (
    <div>snake</div>
  );
}
