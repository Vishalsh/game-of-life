import React, {Component} from 'react';

import GridComponent from '../Grid/Grid';
import Grid from '../../models/Grid';

class GameOfLife extends Component {
    grid;

    constructor(props) {
        super(props);
        this.state = {
            grid: [],
            showGrid: false
        };
    }

    onSubmit = (e) => {
        e.preventDefault();
        this.grid = new Grid(parseInt(this.rows.value), parseInt(this.columns.value));
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
        const {showGrid, grid} = this.state;

        return (
            <div className="game-of-life">
                {
                    showGrid ?
                        <div className="grid-container">
                            <GridComponent grid={grid} onClickCell={this.toggleCellState}/>
                            <button onClick={this.hideGrid}>close</button>
                            <button onClick={this.startGameOfLife}>Start</button>
                        </div>
                        :
                        <form onSubmit={this.onSubmit}>
                            <input ref={(input) => {
                                this.rows = input
                            }}/>
                            <input ref={(input) => {
                                this.columns = input
                            }}/>
                            <button>Create Grid</button>
                        </form>
                }

            </div>
        )
    }
}

export default GameOfLife;
