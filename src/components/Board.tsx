import React from 'react';
import './board.css';

export function Board({ children }) {
    console.log(children);

    return (
        <>
            <div className="wrapper">
                <div className="box">1</div>
                <div className="box">2</div>
                <div className="box">3</div>
                <div className="box">4</div>
                <div className="box">5</div>
                <div className="box">6</div>
                <div className="box">7</div>
                <div className="box">8</div>
                <div className="box">9</div>
                <div className="box">10</div>
                <div className="box">11</div>
                <div className="box">12</div>
            </div>
            { children }
        </>
    );
  }
