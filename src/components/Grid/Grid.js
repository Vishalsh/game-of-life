import React from 'react';
import Cell from '../Cell/Cell';

import './Grid.css';

const Grid = ({grid}) => {
    return (
        <div>
            {
                grid.map((row, rowIndex) => (
                    <div key={`row${rowIndex}`} className="grid-row">
                        {
                            row.map((cell) => {
                                const {row, column, alive} = cell;
                                return <Cell key={`cell${row}${column}`} alive={alive}/>
                            })
                        }
                    </div>
                ))
            }
        </div>
    )
};

export default Grid;
