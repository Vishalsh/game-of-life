import React, {Component} from 'react';

import GridComponent from '../Grid/Grid';
import Grid from '../../models/Grid';

class GameOfLife extends Component {
    grid;

    constructor(props) {
        super(props);
        this.state = {
            grid: [],
            showGrid: false,
            rows: 0,
            columns: 0
        };
    }

    onChange = (event) => {
        const {target} = event;
        this.setState({
            [target.name]: parseInt(target.value)
        });
    };

    onSubmit = (e) => {
        const {rows, columns} = this.state;

        e.preventDefault();
        this.grid = new Grid(rows, columns);
        this.setState({
            grid: this.grid.getCells(),
            showGrid: true
        })
    };

    hideGrid = () => {
        this.setState({
            showGrid: false
        });
    };

    toggleCellState = (cell) => {
        this.grid.toggleCellState(cell);
        this.setState({
            grid: this.grid.getCells()
        })
    };

    startGameOfLife = () => {
        setInterval(() => {
            this.grid.calculateNextState();
            this.setState({
                grid: this.grid.getCells()
            })
        }, 500);
    };

    render() {
        const {showGrid, grid, rows, columns} = this.state;

        return (
            <div className="game-of-life">
                {
                    showGrid ?
                        <>
                            <GridComponent grid={Object.values(grid)}
                                           columns={columns}
                                           onClickCell={this.toggleCellState}/>
                            <button onClick={this.hideGrid}>close</button>
                            <button onClick={this.startGameOfLife}>Start</button>
                        </>
                        :
                        <form onSubmit={this.onSubmit}>
                            <input name="rows" value={rows} onChange={this.onChange}/>
                            <input name="columns" value={columns} onChange={this.onChange}/>
                            <button>Create Grid</button>
                        </form>
                }

            </div>
        )
    }
}

export default GameOfLife;
