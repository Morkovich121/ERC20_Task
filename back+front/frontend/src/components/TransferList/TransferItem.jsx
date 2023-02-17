import React from 'react'
import PropTypes from 'prop-types'

import './TransferList.css';

const TransferItem = props => {

    const element = props.item;

    return (
        <div className='transferItem'>
            <div style={{ width: "30%" }}>{element.sender}</div>
            <div style={{ width: "30%" }}>{element.recipient}</div>
            <div style={{ width: "8%" }}>{element.tokenAmount}</div>
            <div style={{ width: "32%" }}>{element.hash}</div>
        </div>
    )
}

export default TransferItem