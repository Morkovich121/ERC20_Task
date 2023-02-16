import React, { useRef, useState } from 'react'
import { useEffect } from 'react';

import TransferItem from './TransferItem';

import transfersApi from '../../api/transfersApi';

import './TransferList.css';

const TransferList = () => {

    const [data, setData] = useState([]);

    const query = useRef();

    const header = {
        sender: "Sender",
        recipient: "Recipient",
        tokenAmount: "Token Amount",
        hash: "Hash",
    }

    const href = window.location.href;

    useEffect(() => {
        const getList = async () => {
            let response = null;
            response = href.split('/').length === 5 ? await transfersApi.getByAddress(href.split('/')[4]) : await transfersApi.getAllTransfers();
            setData(response);
        }
        getList();
    }, [href])

    const onSearchHandler = () => {
        if ((query.current.value.startsWith('0x')) && query.current.value.length === 42 && (/^[a-zA-Z0-9]+$/.test(query.current.value))) {
            window.location.replace('http://localhost:3000/transfers/' + query.current.value);
        }
    }

    return (
        <>
            <div className="transferContainer">
                <h2 className='textHeader' style={{display:"flex",gap:"10px"}}>
                    <span>Transfers list</span>
                    {
                        href.split('/').length === 5 ?
                            <span> by {href.split('/')[4]}</span> :
                            null
                    }
                </h2>
                <div className='searchSection'>
                    <input type="text" ref={query} className='searchInput' placeholder='Search by account address...'></input>
                    <button className='btn' onClick={onSearchHandler}>Search</button>
                </div>
                <div className='table'>
                    <TransferItem item={header} key={51221} />
                    {data ? data.map((elem) => (
                        <TransferItem item={elem} key={elem.id} />
                    )) : null}
                </div>
            </div>
        </>
    )
}

export default TransferList