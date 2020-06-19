import React from "react";
import Square from "./Square"
import "../index.css"

function Board(props) {
    const renderSquare = (i) => {
        return (
            <Square key={"Square" + i}
                    value={props.squares[i]}
                    onClick={() => props.onClick(i)}
                    line={props.line && props.line.includes(i)}
                    draw={props.draw && !! props.line}
            />
        );
    }

    const renderRow = (row) => {
        const squares = [];
        const firstIndex = row * 3;
        for (let i = 0; i < 3; i++) {
            squares.push(renderSquare(firstIndex + i));
        }
        return (
            <div key={"Row " + row}
                 className="board-row">{squares}
            </div>
        );
    }

    const rows = [];
    for (let i = 0; i < 3; i++) {
        rows.push(renderRow(i));
    }
    return <div>{rows}</div>;
}

export default Board;
