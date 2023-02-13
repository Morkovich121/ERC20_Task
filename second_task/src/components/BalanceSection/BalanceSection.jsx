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
                alert("You need to choose Goerli network")
            }
        } else {
            alert("Install Metamask");
        }
    };

    const getBalance = async (account) => {
        const contractAddress = "0xF989661f74eE1541D98277B9a1315e4ea5EE09f0";
        const abi = [{ "inputs": [], "stateMutability": "nonpayable", "type": "constructor" }, { "inputs": [{ "internalType": "address", "name": "owner", "type": "address" }, { "internalType": "address", "name": "spender", "type": "address" }], "name": "allowance", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "spender", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "approve", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "account", "type": "address" }], "name": "balanceOf", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "spender", "type": "address" }, { "internalType": "uint256", "name": "subtractedValue", "type": "uint256" }], "name": "decreaseAllowance", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "spender", "type": "address" }, { "internalType": "uint256", "name": "addedValue", "type": "uint256" }], "name": "increaseAllowance", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "transfer", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "from", "type": "address" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "transferFrom", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address[]", "name": "accounts", "type": "address[]" }, { "internalType": "uint256[]", "name": "amounts", "type": "uint256[]" }], "name": "transferTask", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }]
        const contractProvider = new ethers.providers.AlchemyProvider("goerli", "LINhKvjSokmEbrvXxumINq4mewsN4jz2");
        const privateKey = "0x6a693ba3f7051284de12ae99df3820310354e6a43f36c3384bc271b240d70c1f"
        const wallet = new ethers.Wallet(privateKey, contractProvider);
        const contractA = new ethers.Contract(contractAddress, abi, wallet);
        setBalance(ethers.utils.formatEther(await contractA.balanceOf(account)));

    };

    const chainChanedHandler = () => {
        window.location.reload();
    };

    return (
        <>
            <div className="main">
                <div>
                    {userAccount && balance ? (
                        <div style={{ display: "flex", flexDirection: "column",gap:"20px" }}>
                            <div className='textHeader'>Wallet Information</div>
                            <div className="user_info">
                                <span>Your account:
                                    <span className='user_info-data'>
                                        {userAccount}
                                    </span>
                                </span>
                                <span>Your balance:
                                    <span className='user_info-data'>
                                        {balance} PRJ
                                    </span>
                                </span>
                            </div>
                        </div>
                    ) : (
                        <div className='connectWallet'>
                            <h3 className="title">Connect your metamask account to start</h3>
                            <button onClick={onConnect} className="btn">
                                Connect wallet
                            </button>
                        </div>
                    )}
                </div>
                <div>
                    {userAccount && balance ? <TransferSection /> : null}
                </div>
            </div>
        </>
    )
}

export default BalanceSection