import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props) {
    let className = 'square'
    if (props.line) {
        className += ' square-winner'
    }
    return (
        <button className={className} onClick={props.onClick}>
            {props.value}
        </button>
    );
}

class Board extends React.Component {
    renderSquare(i) {
        return (
            <Square key={"Square" + i}
                    value={this.props.squares[i]}
                    onClick={() => this.props.onClick(i)}
                    line={this.props.line && this.props.line.includes(i)}
            />
        );
    }

    renderRow(row) {
        const squares = [];
        const firstIndex = row * 3;
        for (let i = 0; i < 3; i++) {
            squares.push(this.renderSquare(firstIndex + i));
        }
        return (
            <div key={"Row " + row}
                 className="board-row">{squares}
            </div>
        );
    }

    render() {
        const rows = [];
        for (let i = 0; i < 3; i++) {
            rows.push(this.renderRow(i));
        }
        return <div>{rows}</div>;
    }
}

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            history: [{
                squares: Array(9).fill(null),
                moves: Array(9).fill(null),
            }],
            stepNumber: 0,
            xIsNext: true,
            movesAscending: true,
        };
    }

    handleClick(i) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        const moves = current.moves.slice();
        if (calculateWinner(squares).winner || squares[i]) {
            return;
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        moves[history.length - 1] = i
        this.setState({
            history: history.concat([{
                squares: squares,
                moves: moves,
            }]),
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext,
        });
    }

    jumpTo(step) {
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) === 0,
        });
    }

    handleToggle() {
        this.setState({
            movesAscending: !this.state.movesAscending
        });
    }

    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const result = calculateWinner(current.squares);
        const winner = result.winner;
        const draw = history.length === 10;
        const movesAscending = this.state.movesAscending;

        const moves = history.map((step, move) => {
            const lastSq = step.moves[move - 1]
            const row = Math.floor(lastSq / 3) + 1
            const col = (lastSq % 3) + 1
            const desc = move ?
                `Go to move #${move} (${row}, ${col})` :
                `Go to game start`;
            return (
                <li key={move}>
                    <button
                        style={this.state.stepNumber === move ? {fontWeight: 'bold'} : {fontWeight: 'normal'}}
                        onClick={() => this.jumpTo(move)}>{desc}
                    </button>
                </li>
            );
        });

        if (!movesAscending) moves.reverse();

        let status;
        if (winner) {
            status = 'Winner: ' + winner;
        } else if (draw) {
            status = 'Draw';
        } else {
            status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
        }

        return (
            <div className="game">
                <div className="game-board">
                    <Board
                        squares={current.squares}
                        onClick={(i) => this.handleClick(i)}
                        line={result.line}
                    />
                </div>
                <div className="game-info">
                    <div>
                        {status}
                        &nbsp;
                        <button onClick={() => this.handleToggle()}>
                            Sort: {movesAscending ? 'Descending' : 'Ascending'}
                        </button>
                    </div>
                    <ol>{moves}</ol>
                </div>
            </div>
        );
    }
}

function calculateWinner(squares) {
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

// ========================================

ReactDOM.render(
    <Game/>,
    document.getElementById('root')
);

