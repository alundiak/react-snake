import React from 'react';

export function Point({ x1, y1, blink }) {
  return <div className={`point ${blink ? 'blink' : ''}`} >point</div>;
}