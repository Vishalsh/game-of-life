import Cell from "./Cell";

class Grid {
    constructor(rows, columns) {
        this.rows = rows;
        this.columns = columns;
        this.cells = this.createCells(rows, columns);
    }

    createCells = (rows, columns) => {
        const cells = {};
        for (let row = 0; row < rows; row++) {
            for (let column = 0; column < columns; column++) {
                cells[`${row}${column}`] = new Cell(row, column, false);
            }
        }
        return cells;
    };

    getCells() {
        return Object.values(this.cells).reduce((cellArray, cell) => {
            const {row, column} = cell;
            cellArray[row][column] = cell;
            return cellArray;
        }, [...Array(this.rows).keys()].map(item => []));
    }

    getNeighboursFor(cell) {
        const {row, column} = cell;
        return [
            this.cells[`${row - 1}${column - 1}`],
            this.cells[`${row - 1}${column}`],
            this.cells[`${row - 1}${column + 1}`],
            this.cells[`${row}${column - 1}`],
            this.cells[`${row}${column + 1}`],
            this.cells[`${row + 1}${column - 1}`],
            this.cells[`${row + 1}${column}`],
            this.cells[`${row + 1}${column + 1}`]
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
        this.cells[`${row}${column}`].alive = !this.cells[`${row}${column}`].alive;
    };
}

export default Grid;
