import React, {Fragment} from 'react';
import Cell from '../Cell/Cell';

import './Grid.css';

const Grid = ({grid, columns, onClickCell}) => {
    return (
        <div>
            {
                grid.map(cell => {
                    const {row, column} = cell;
                    return (
                        <Fragment key={`cell${row}${column}`}>
                            <Cell cell={cell}
                                  onClick={onClickCell}/>
                            {
                                (column === columns - 1) && <br/>
                            }
                        </Fragment>
                    )
                })
            }
        </div>
    )
};

export default Grid;
