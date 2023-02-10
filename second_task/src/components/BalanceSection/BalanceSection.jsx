import React, { useState } from 'react'
import { ethers } from "ethers";

import './BalanceSection.css'
import TransferSection from '../TransferSection/TransferSection';

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
                window.ethereum.on("accountsChanged", onConnect);
                window.ethereum.on("chainChanged", chainChanedHandler);
            }
            else {
                alert("Необходимо выбрать сеть Goerli")
            }
        } else {
            alert("Установите Метамаск");
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
            <div className="w50">
                {userAccount && balance ? (
                    <div className="user_info">
                        <span>Ваш аккаунт:
                            <span className='user_info-data'>
                                {userAccount}
                            </span>
                        </span>
                        <span>Ваш баланс:
                            <span className='user_info-data'>
                                {balance}
                            </span>
                        </span>
                    </div>
                ) : (
                    <div className='connectWallet'>
                        <h3 className="title">Подключите свой кошелек к приложению</h3>
                        <button onClick={onConnect} className="btn">
                            Подключить кошелек
                        </button>
                    </div>
                )}
            </div>
            <div className='w50'>
                {userAccount ? <TransferSection /> : <h3>Для совершения переводов подключите аккаунт метамаск</h3>}
            </div>
        </>
    )
}

export default BalanceSection