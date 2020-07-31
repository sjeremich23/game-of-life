import React, { useState, useCallback, useRef } from "react";
import "./Grid.css";
import produce from "immer";
import Buttons from "../buttons/Buttons";
import { gridContainer } from "../../theme/theme";
import { operations } from "../grid/operations/operations";

// Initialize Grid
const rows = 25;
const cols = 25;
const InitializeGrid = () => {
    const arr = [];
    // create number of rows equal to our const rows variable
    for (let i = 0; i < rows; i++) {
        // push a copy of Array equal to const cols variable, set values to all 0
        arr.push(Array.from(Array(cols), () => 0));
    }
    return arr;
};

function Grid({ setGeneration }) {
    const [play, setPlay] = useState(false);
    const [grid, setGrid] = useState(() => {
        return InitializeGrid();
    });

    const playRef = useRef(play);
    playRef.current = play;

    // Use Callback function so this doesnt change and not be rerendered
    const start = useCallback(() => {
        // If not playing stop
        if (!playRef.current) {
            return;
        }

        setGrid(currentGrid => {
            // Produce is going to generate a new grid and update setGrid
            return produce(currentGrid, gridCopy => {
                for (let i = 0; i < rows; i++) {
                    for (let j = 0; j < cols; j++) {
                        let neighbors = 0;
                        operations.forEach(([x, y]) => {
                            const newRowI = i + x;
                            const newColI = j + y;

                            // Check to not go out of bounds
                            if (
                                newRowI >= 0 &&
                                newRowI < rows &&
                                newColI >= 0 &&
                                newColI < cols
                            ) {
                                // If live cell add 1 to neighbors
                                neighbors += currentGrid[newRowI][newColI];
                            }
                        });

                        // Once we check how many neighbors we determine if cell
                        // becomes dead or alive
                        if (neighbors < 2 || neighbors > 3) {
                            gridCopy[i][j] = 0;
                            // If the cell is dead and has exactly 3 neighbors, then it comes to life
                        } else if (currentGrid[i][j] === 0 && neighbors === 3) {
                            gridCopy[i][j] = 1;
                        }
                    }
                }
            });
        });

        setGeneration(prev => {
            const next = prev + 1;
            return next;
        });

        setTimeout(start, 100);
    }, [setGeneration]);

    return (
        <div>
            <div style={gridContainer}>
                {grid.map((rows, i) =>
                    rows.map((none, j) => (
                        <div
                            className="cell"
                            key={`${i}-${j}`}
                            onClick={() => {
                                // produce makes a mutable change and creates a new grid
                                const newGrid = produce(grid, gridCopy => {
                                    // each cell toggle - If cell is dead make it alive otheriwse make it alive
                                    gridCopy[i][j] = grid[i][j] ? 0 : 1;
                                });
                                setGrid(newGrid);
                            }}
                            style={{
                                backgroundColor: grid[i][j]
                                    ? "black"
                                    : undefined
                            }}
                        />
                    ))
                )}
            </div>
            <Buttons
                setPlay={setPlay}
                play={play}
                playRef={playRef}
                start={start}
                setGrid={setGrid}
                InitializeGrid={InitializeGrid}
                rows={rows}
                cols={cols}
                setGeneration={setGeneration}
            />
        </div>
    );
}

export default Grid;