import React from 'react';

import './Cell.css';

const Cell = ({cell, onClick}) => {
    return (
        <div className={`cell ${cell.alive ? 'alive' : 'dead'}`} onClick={() => onClick(cell)}/>
    )
};

export default Cell;
