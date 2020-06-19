import React from "react";
import "../index.css"

function Square(props) {
    let className = 'square'
    if (props.line) {
        className += ' square-winner'
    } else if (props.draw) {
        className += ' square-draw'
    }
    return (
        <button className={className} onClick={props.onClick}>
            {props.value}
        </button>
    );
}

export default Square;
