import React, { useState } from 'react'
import { ethers } from "ethers";

import './BalanceSection.css'

const BalanceSection = () => {

    const [userAccount, setUserAccount] = useState("");
    const [balance, setBalance] = useState(0);

    const onConnect = async () => {
        if (window.ethereum) {
            let currentChain = "";
            currentChain = await window.ethereum.request({ method: "eth_chainId" })
            if (currentChain === '0x5') {
                window.ethereum
                    .request({ method: "eth_requestAccounts" })
                    .then((account) => {
                        setUserAccount(account[0]);
                        getBalance(account[0]);
                    });
                window.ethereum.on("accountChanged", onConnect);
                window.ethereum.on("chainChanged", chainChanedHandler);
            }
            else {
                alert("Необходимо выбрать сеть Goerli")
            }
        } else {
            alert("Установите метамаск");
        }
    };

    const getBalance = (account) => {
        window.ethereum
            .request({
                method: "eth_getBalance",
                params: [account, "latest"],
            })
            .then((balance) => {
                setBalance(ethers.formatEther(balance));
            });
    };

    const chainChanedHandler = () => {
        window.location.reload();
    };

    return (
        <>
            {userAccount && balance ? (
                <div className="user_info">
                    <span>Your account: {userAccount}</span>
                    <span>Your balance: {balance}</span>
                </div>
            ) : (
                <>
                    <h2 className="title">Подключите свой кошелек к приложению</h2>
                    <button onClick={onConnect} className="btn">
                        Подключить кошелек
                    </button>
                </>
            )}
        </>
    )
}

export default BalanceSection