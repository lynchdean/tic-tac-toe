import React, {useState} from "react";
import Board from "./Board"
import GameInfo from "./GameInfo"
import "../index.css"

function Move(props) {
    return (
        <li key={props.move}>
            <button
                style={props.stepNumber === props.move ? {fontWeight: 'bold'} : {fontWeight: 'normal'}}
                onClick={props.onClick}>
                {props.desc}
            </button>
        </li>
    )
}


function Game() {
    const [history, setHistory] = useState([{
        squares: Array(9).fill(null),
        moves: Array(9).fill(null),
    }]);
    const [stepNumber, setStepNumber] = useState(0);
    const [xIsNext, setXIsNext] = useState(true);
    const [movesAscending, setMovesAscending] = useState(true);

    const handleClick = (i) => {
        const newHistory = history.slice(0, stepNumber + 1);
        const current = newHistory[newHistory.length - 1];
        const squares = current.squares.slice();
        const moves = current.moves.slice();

        if (calculateWinner(squares).winner || squares[i]) {
            return;
        }
        squares[i] = xIsNext ? 'X' : 'O';
        moves[newHistory.length - 1] = i

        setHistory(newHistory.concat([{
            squares: squares,
            moves: moves,
        }]))
        setStepNumber(newHistory.length)
        setXIsNext(!xIsNext)
    }

    const handleToggle = () => {
        setMovesAscending(!movesAscending)
    }

    const jumpTo = (step) => {
        setStepNumber(step)
        setXIsNext((step % 2) === 0)
    }

    const calculateWinner = (squares) => {
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];
        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                return {
                    winner: squares[a],
                    line: lines[i],
                };
            }
        }
        return {
            winner: null,
            line: null,
        };
    }

    const current = history[stepNumber];
    const result = calculateWinner(current.squares);
    const winner = result.winner;
    const draw = history.length === 10;

    const moves = history.map((step, move) => {
        const lastSq = step.moves[move - 1]
        const row = Math.floor(lastSq / 3) + 1
        const col = (lastSq % 3) + 1
        const desc = move ?
            `Go to move #${move} (${row}, ${col})` :
            `Go to game start`;

        return (
            <Move key={move}
                  stepNumber={stepNumber}
                  onClick={() => jumpTo(move)}
                  desc={desc}
            />
        );
    });

    if (!movesAscending) moves.reverse();

    let status;
    if (winner) {
        status = 'Winner: ' + winner;
    } else if (draw) {
        status = 'Draw';
    } else {
        status = 'Next player: ' + (xIsNext ? 'X' : 'O');
    }

    return (
        <div className="game">
            <div className="game-board">
                <Board
                    squares={current.squares}
                    onClick={(i) => handleClick(i)}
                    line={result.line}
                    draw={draw}
                />
            </div>
            <div className="game-info">
                <GameInfo
                    status={status}
                    onClick={() => handleToggle()}
                    movesAscending={movesAscending}
                    moves={moves}
                />
            </div>
        </div>
    );
}

export default Game;
