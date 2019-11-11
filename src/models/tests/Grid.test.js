import Grid from '../Grid';

import {gridState} from '../../components/GameOfLife/GameOfLife'
import Cell from "../Cell";

describe('Grid', () => {
    it('should create list of cells', () => {
        const grid = new Grid(gridState);

        expect(grid.getCells()).toEqual([
            [new Cell(0, 0, false), new Cell(0, 1, false), new Cell(0, 2, false), new Cell(0, 3, false), new Cell(0, 4, false)],
            [new Cell(1, 0, false), new Cell(1, 1, false), new Cell(1, 2, true), new Cell(1, 3, false), new Cell(1, 4, false)],
            [new Cell(2, 0, false), new Cell(2, 1, false), new Cell(2, 2, true), new Cell(2, 3, false), new Cell(2, 4, false)],
            [new Cell(3, 0, false), new Cell(3, 1, false), new Cell(3, 2, true), new Cell(3, 3, false), new Cell(3, 4, false)],
            [new Cell(4, 0, false), new Cell(4, 1, false), new Cell(4, 2, false), new Cell(4, 3, false), new Cell(4, 4, false)],
        ]);
    });

    it('should get list of neighbours for a cell', () => {
        const grid = new Grid(gridState);

        let neighbours = grid.getNeighboursFor(new Cell(0, 0, false));

        // corners
        expect(neighbours).toEqual([
            new Cell(0, 1, false),
            new Cell(1, 0, false),
            new Cell(1, 1, false)
        ]);

        neighbours = grid.getNeighboursFor(new Cell(0, 4, false));

        expect(neighbours).toEqual([
            new Cell(0, 3, false),
            new Cell(1, 3, false),
            new Cell(1, 4, false)
        ]);

        neighbours = grid.getNeighboursFor(new Cell(4, 0, false));

        expect(neighbours).toEqual([
            new Cell(3, 0, false),
            new Cell(3, 1, false),
            new Cell(4, 1, false)
        ]);

        neighbours = grid.getNeighboursFor(new Cell(4, 4, false));

        expect(neighbours).toEqual([
            new Cell(3, 3, false),
            new Cell(3, 4, false),
            new Cell(4, 3, false)
        ]);

        // arms

        neighbours = grid.getNeighboursFor(new Cell(0, 2, false));

        expect(neighbours).toEqual([
            new Cell(0, 1, false),
            new Cell(0, 3, false),
            new Cell(1, 1, false),
            new Cell(1, 2, true),
            new Cell(1, 3, false)
        ]);

        neighbours = grid.getNeighboursFor(new Cell(2, 0, false));

        expect(neighbours).toEqual([
            new Cell(1, 0, false),
            new Cell(1, 1, false),
            new Cell(2, 1, false),
            new Cell(3, 0, false),
            new Cell(3, 1, false)
        ]);

        neighbours = grid.getNeighboursFor(new Cell(4, 2, false));

        expect(neighbours).toEqual([
            new Cell(3, 1, false),
            new Cell(3, 2, true),
            new Cell(3, 3, false),
            new Cell(4, 1, false),
            new Cell(4, 3, false)
        ]);

        neighbours = grid.getNeighboursFor(new Cell(2, 4, false));

        expect(neighbours).toEqual([
            new Cell(1, 3, false),
            new Cell(1, 4, false),
            new Cell(2, 3, false),
            new Cell(3, 3, false),
            new Cell(3, 4, false)
        ]);

        // middle
        neighbours = grid.getNeighboursFor(new Cell(2, 2, true));

        expect(neighbours).toEqual([
            new Cell(1, 1, false),
            new Cell(1, 2, true),
            new Cell(1, 3, false),
            new Cell(2, 1, false),
            new Cell(2, 3, false),
            new Cell(3, 1, false),
            new Cell(3, 2, true),
            new Cell(3, 3, false),
        ]);

        neighbours = grid.getNeighboursFor(new Cell(2, 1, true));

        expect(neighbours).toEqual([
            new Cell(1, 0, false),
            new Cell(1, 1, false),
            new Cell(1, 2, true),
            new Cell(2, 0, false),
            new Cell(2, 2, true),
            new Cell(3, 0, false),
            new Cell(3, 1, false),
            new Cell(3, 2, true),
        ]);
    });

    it('should calculate the next state of the grid', () => {
        const grid = new Grid(gridState);

        grid.calculateNextState();

        expect(grid.getCells()).toEqual([
            [new Cell(0, 0, false), new Cell(0, 1, false), new Cell(0, 2, false), new Cell(0, 3, false), new Cell(0, 4, false)],
            [new Cell(1, 0, false), new Cell(1, 1, false), new Cell(1, 2, false), new Cell(1, 3, false), new Cell(1, 4, false)],
            [new Cell(2, 0, false), new Cell(2, 1, true), new Cell(2, 2, true), new Cell(2, 3, true), new Cell(2, 4, false)],
            [new Cell(3, 0, false), new Cell(3, 1, false), new Cell(3, 2, false), new Cell(3, 3, false), new Cell(3, 4, false)],
            [new Cell(4, 0, false), new Cell(4, 1, false), new Cell(4, 2, false), new Cell(4, 3, false), new Cell(4, 4, false)],
        ])
    });
});
