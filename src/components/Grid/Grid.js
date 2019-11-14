import React from 'react';
import Cell from '../Cell/Cell';

import './Grid.css';

const Grid = ({grid, onClickCell}) => {
    return (
        <div>
            {
                grid.map((row, rowIndex) => (
                    <div key={`row${rowIndex}`} className="grid-row">
                        {
                            row.map((cell) => {
                                const {row, column} = cell;
                                return <Cell key={`cell${row}${column}`} cell={cell} onClick={onClickCell}/>
                            })
                        }
                    </div>
                ))
            }
        </div>
    )
};

export default Grid;
