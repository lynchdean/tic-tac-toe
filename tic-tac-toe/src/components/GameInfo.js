import React from "react";

function GameInfo(props) {
    return (
        <div>
            {props.status}
            &nbsp;
            <button onClick={props.onClick}>
                Sort: {props.movesAscending ? 'Descending' : 'Ascending'}
            </button>
            <ol>{props.moves}</ol>
        </div>
    );
}

export default GameInfo;
