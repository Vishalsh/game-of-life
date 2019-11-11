import React, {Component} from 'react';

import GridComponent from '../Grid/Grid';
import Grid from '../../models/Grid';

export const gridState = [
    [0, 0, 0, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 0, 0, 0]
];

class GameOfLife extends Component {
    grid = new Grid(gridState);

    constructor(props) {
        super(props);
        this.state = {
            grid: this.grid.getCells()
        };
    }

    componentDidMount() {
        setInterval(() => {
            this.grid.calculateNextState();
            this.setState({
                grid: this.grid.getCells()
            })
        }, 500);
    }

    render() {
        return (
            <div className="game-of-life">
                <GridComponent grid={this.state.grid}/>
            </div>
        )
    }
}

export default GameOfLife;
