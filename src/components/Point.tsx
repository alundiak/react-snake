import React from 'react';

export function Point({ x1, y1, blink, children }: any) {
  return <div className={`point ${blink ? 'blink' : ''}`}>{children}</div>
}