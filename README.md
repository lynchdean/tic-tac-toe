# tic-tac-toe
Expanding upon the React tic-tac-toe tutorial 


##Improvements:
- [x] Display the location for each move in the format (col, row) in the move history list
- [x] Bold the currently selected item in the move list
- [x] Rewrite Board to use two loops to make the squares instead of hardcoding them
- [ ] Add a toggle button that lets you sort the moves in either ascending or descending order
- [ ] When someone wins, highlight the three squares that caused the win
- [ ] When no one wins, display a message about the result being a draw
- [ ] *Riain's Task:* Convert to functional components

***
##Display the location for each move in the format (col, row) in the move history list:
First I needed to get the index of the square for each move so that I could work out 
their column and row. When trying to figure out this one I ended up with two choices. 
- I could compare the *squares* array from the current move with the previous move when I'm generating the buttons to 
jump between previous moves 
- I could make a new array inside the *history* map that recorded each of the indexes of the moves

Ultimately I decided to use the second method. I did this because the first option would require a compare operation (*O(n)*),
for each move button, every time the board is re-rendered. 

**New moves array inside the Game constructor:**

    history: [{
        squares: Array(9).fill(null),
        moves: Array(9).fill(null),
    }],

**Changes inside the Game render method to calculate the col and row values:**
    
    const lastSq = step.moves[move - 1]
    const row = Math.floor(lastSq / 3) + 1
    const col = (lastSq % 3) + 1
    const desc = move ?
        `Go to move #${move} (${row}, ${col})` :
        `Go to game start`;

***
##Bold the currently selected item in the move list
This was simple enough tom implement, I just added an if/else clause that checked which move matches the current move 
in the game state.  

        <button
            style={this.state.stepNumber === move ? { fontWeight: 'bold' } : { fontWeight: 'normal' }}
            onClick={() => this.jumpTo(move)}>{desc}
        </button>

***
##Rewrite Board to use two loops to make the squares instead of hardcoding them
This was another relatively simple task to implement once I understood how JSX works a little more. I removed the 
hardcoded board, and replaced it with the two new loops, one to loop through the rows, and one to loop through the 
squares in each row. I also extracted the part of the code responsible for making each of the individual rows into its 
own method.
  
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

I also had to add a key property inside the Square tag in the renderSquare method. In React each child in an array or iterator 
should have a unique key property assigned to it. This helps React to identify which items have been modified, and 
otherwise would throw a warning.

    key={"Square " + i} 
    
 
