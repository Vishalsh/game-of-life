import Cell from "./Cell";

class Grid {
    constructor(gridState) {
        this.cells = this.initializeCells(gridState)
    }

    initializeCells(gridState) {
        return gridState.reduce((rowMap, row, rowIndex) => ({
            ...rowMap,
            ...row.reduce((cellMap, cell, columnIndex) => ({
                ...cellMap,
                [`${rowIndex}${columnIndex}`]: new Cell(rowIndex, columnIndex, cell === 1)
            }), {})
        }), {});
    }

    getCells() {
        return Object.values(this.cells).reduce((cellArray, cell) => {
            const {row, column} = cell;
            cellArray[row][column] = cell;
            return cellArray;
        }, [[], [], [], [], []]);
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
}

export default Grid;
