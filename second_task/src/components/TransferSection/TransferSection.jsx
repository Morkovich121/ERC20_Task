import React, { useRef } from 'react'
import { ethers, utils } from 'ethers'

import { useEffect } from 'react'

import './TransferSection.css'

const TransferSection = () => {


    const contractAddress = "0xF989661f74eE1541D98277B9a1315e4ea5EE09f0";
    const contractABI = [{ "inputs": [], "stateMutability": "nonpayable", "type": "constructor" }, { "inputs": [{ "internalType": "address", "name": "owner", "type": "address" }, { "internalType": "address", "name": "spender", "type": "address" }], "name": "allowance", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "spender", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "approve", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "account", "type": "address" }], "name": "balanceOf", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "spender", "type": "address" }, { "internalType": "uint256", "name": "subtractedValue", "type": "uint256" }], "name": "decreaseAllowance", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "spender", "type": "address" }, { "internalType": "uint256", "name": "addedValue", "type": "uint256" }], "name": "increaseAllowance", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "transfer", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "from", "type": "address" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "transferFrom", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address[]", "name": "accounts", "type": "address[]" }, { "internalType": "uint256[]", "name": "amounts", "type": "uint256[]" }], "name": "transferTask", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }]
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, contractABI, signer);
    const coins = useRef();
    const address = useRef();

    const onTransferHandler = (walletAddress, coinsAmount) => {
        const addressArray = walletAddress.split('\n');
        const coinsAmountArray = coinsAmount.split('\n');
        if (addressArray.length !== coinsAmountArray.length) {
            alert("Set the equal number of wallets and transfer amounts")
        }
        else if (addressArray.length === 0) {
            alert("Input can't be empty");
        }
        else {
            let isAddressValid = true;
            let isCoinsAmountValid = true;
            for (let i = 0; i < addressArray.length; i++) {
                if (!(addressArray[i].startsWith('0x')) || addressArray[i].length !== 42 || !(/^[a-zA-Z0-9]+$/.test(addressArray[i]))) {
                    isAddressValid = false;
                    break;
                }
                if (isNaN(parseInt(coinsAmountArray[i])) || parseInt(coinsAmountArray[i]) <= 0) {
                    isCoinsAmountValid = false;
                    break;
                }
            }
            if (!isAddressValid || !isCoinsAmountValid) {
                alert("Wallet address of transfer amount is not correct");
                return;
            }
            if (contract)
                contract.transferTask(addressArray, coinsAmountArray);
        }


    }

    return (
        <div className="transferSection">
            <h2>Money transfer</h2>
            <div className="form">
                <div className="inputSection">
                    <label htmlFor='walletAddress' className='label'>Set wallet numbers(each from new string): </label>
                    <textarea id="walletAddress" className='input' ref={address} ></textarea>
                </div>
                <div className="inputSection">
                    <label htmlFor='coinsAmount' className='label'>Set transfer amounts(each from new string): </label>
                    <textarea id="coinsAmount" type="text" className='input' ref={coins}></textarea>
                </div>
                <button className='btn' onClick={() => { onTransferHandler(address.current.value, coins.current.value) }}>Send money</button>
            </div>
        </div>
    )
}

export default TransferSection