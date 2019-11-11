import React from 'react';

import './Cell.css';

const Cell = ({alive}) => {
    return (
        <div className={`cell ${alive ? 'alive' : 'dead'}`}/>
    )
};

export default Cell;
