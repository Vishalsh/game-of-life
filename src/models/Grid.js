import Cell from "./Cell";

class Grid {
    constructor(rows, columns) {
        this.cells = this.createCells(rows, columns);
    }

    createCells = (rows, columns) => {
        const cells = {};
        for (let row = 0; row < rows; row++) {
            for (let column = 0; column < columns; column++) {
                cells[`r${row}c${column}`] = new Cell(row, column, false);
            }
        }
        return cells;
    };

    getCells() {
        return this.cells;
    }

    getNeighboursFor(cell) {
        const {row, column} = cell;
        return [
            this.cells[`r${row - 1}c${column - 1}`],
            this.cells[`r${row - 1}c${column}`],
            this.cells[`r${row - 1}c${column + 1}`],
            this.cells[`r${row}c${column - 1}`],
            this.cells[`r${row}c${column + 1}`],
            this.cells[`r${row + 1}c${column - 1}`],
            this.cells[`r${row + 1}c${column}`],
            this.cells[`r${row + 1}c${column + 1}`]
        ].filter(cell => cell);
    }

    getNextStateFor(cell, neighbours) {
        const noOfAliveNeighbours = neighbours.filter(cell => cell.alive).length;

        if (noOfAliveNeighbours < 2) {
            return false;
        }

        if (noOfAliveNeighbours > 3) {
            return false;
        }

        if (noOfAliveNeighbours === 3) {
            return true;
        }

        return cell.alive;
    }

    calculateNextState() {
        this.cells = Object.keys(this.cells).reduce((newCells, cell) => {
            const neighbours = this.getNeighboursFor(this.cells[cell]);

            return {
                ...newCells,
                [cell]: {
                    ...this.cells[cell],
                    alive: this.getNextStateFor(this.cells[cell], neighbours)
                }
            }
        }, {})
    }

    toggleCellState = ({row, column}) => {
        this.cells[`r${row}c${column}`].alive = !this.cells[`r${row}c${column}`].alive;
    };
}

export default Grid;
