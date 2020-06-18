# tic-tac-toe
Expanding improving upon the React tic-tac-toe tutorial 

## Improvements:
- [x] Display the location for each move in the format (col, row) in the move history list
- [x] Bold the currently selected item in the move list
- [x] Rewrite Board to use two loops to make the squares instead of hardcoding them
- [x] Add a toggle button that lets you sort the moves in either ascending or descending order
- [ ] When someone wins, highlight the three squares that caused the win
- [ ] When no one wins, display a message about the result being a draw
- [ ] *Riain's Task:* Convert to functional components
- [ ] *Riain's Task:* Convert to TypeScript
- [ ] *Personal Task:* Make it look better

***
## Display the location for each move in the format (col, row) in the move history list:
First I needed to get the index of the square for each move so that I could work out 
their column and row. When trying to figure out this one I ended up with two choices. 
- I could compare the *squares* array from the current move with the previous move when I'm generating the buttons to 
jump between previous moves 
- I could make a new array inside the *history* map that recorded each of the indexes of the moves

Ultimately I decided to use the second method. I did this because the first option would require a compare operation (*O(n)*),
for each move button, every time the board is re-rendered. 

**New moves array inside the Game constructor:**
```javascript
history: [{
    squares: Array(9).fill(null),
    moves: Array(9).fill(null),
}],
```
**Changes inside the Game render method to calculate the col and row values:**
```javascript
const lastSq = step.moves[move - 1]
const row = Math.floor(lastSq / 3) + 1
const col = (lastSq % 3) + 1
const desc = move ?
    `Go to move #${move} (${row}, ${col})` :
    `Go to game start`;
```  
***
## Bold the currently selected item in the move list
This was simple enough tom implement, I just added an if/else clause that checked which move matches the current move 
in the game state.  
```javascript
<button
    style={this.state.stepNumber === move ? { fontWeight: 'bold' } : { fontWeight: 'normal' }}
    onClick={() => this.jumpTo(move)}>{desc}
</button>
```
***
##  Rewrite Board to use two loops to make the squares instead of hardcoding them
This was another relatively simple task to implement once I understood how JSX works a little more. I removed the 
hardcoded board, and replaced it with the two new loops, one to loop through the rows, and one to loop through the 
squares in each row. I also extracted the part of the code responsible for making each of the individual rows into its 
own method.
```javascript
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
```
I also had to add a key property inside the Square tag in the renderSquare method. In React each child in an array or iterator 
should have a unique key property assigned to it. This helps React to identify which items have been modified, and 
without it would throw a warning.
```javascript
key={"Square " + i}
```
## Add a toggle button that lets you sort the moves in either ascending or descending order
First I added a boolean variable *movesAscending* to the games state to keep track of the current order of the moves
```javascript
class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // ...
            movesAscending: true,
        };
    }
    // ...
}
```
Next I added a button inside the JSX expression returned inside the render method of the Game class
```javascript
<button onClick={() => this.handleToggle()}>
    Sort: {movesAscending ? 'Descending' : 'Ascending'}
</button>
```
This calls a new method, *handleToggle*, which flips the value of *movesAscending* once the button has been 
clicked.
```javascript
handleToggle() {
    this.setState({
        movesAscending: !this.state.movesAscending
    });
}
```
Finally, I added the below line to reverse the list if *movesAscending* is currently false 
```javascript
render() {
    // ...
    const moves = history.map((step, move) => {
        // ...
    });

    if (!movesAscending) moves.reverse();

    // ...
}
```
## When someone wins, highlight the three squares that caused the win
TODO
## When no one wins, display a message about the result being a draw
TODO



