import React, { useRef } from 'react'
import { ethers } from 'ethers'

import './TransferSection.css'

const TransferSection = () => {

    const contractAddress = "0xF989661f74eE1541D98277B9a1315e4ea5EE09f0";
    const contractABI = [{ "inputs": [], "stateMutability": "nonpayable", "type": "constructor" }, { "inputs": [{ "internalType": "address", "name": "owner", "type": "address" }, { "internalType": "address", "name": "spender", "type": "address" }], "name": "allowance", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "spender", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "approve", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "account", "type": "address" }], "name": "balanceOf", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "spender", "type": "address" }, { "internalType": "uint256", "name": "subtractedValue", "type": "uint256" }], "name": "decreaseAllowance", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "spender", "type": "address" }, { "internalType": "uint256", "name": "addedValue", "type": "uint256" }], "name": "increaseAllowance", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "transfer", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "from", "type": "address" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "transferFrom", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address[]", "name": "accounts", "type": "address[]" }, { "internalType": "uint256[]", "name": "amounts", "type": "uint256[]" }], "name": "transferTask", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }]
    const provider = new ethers.getDefaultProvider("https://eth-goerli.g.alchemy.com/v2/LINhKvjSokmEbrvXxumINq4mewsN4jz2");
    const privateKey = "0x6a693ba3f7051284de12ae99df3820310354e6a43f36c3384bc271b240d70c1f"
    const wallet = new ethers.Wallet(privateKey, provider);
    const contract = new ethers.Contract(contractAddress, contractABI, wallet);

    const coins = useRef();
    const address = useRef();

    const onTransferHandler = (walletAddress, coinsAmount) => {
        const addressArray = walletAddress.split('\n');
        const coinsAmountArray = coinsAmount.split('\n');
        if (addressArray.length !== coinsAmountArray.length) {
            alert("Укажите одинаковое количество кошельков и сумм перевода")
        }
        else if (addressArray.length === 0) {
            alert("Поля не могут быть пустыми");
        }
        else {
            let isAddressValid = true;
            let isCoinsAmountValid = true;
            for (let i = 0; i < addressArray.length; i++) {
                if (!(addressArray[i].startsWith('0x')) || addressArray[i].length !== 42) {
                    isAddressValid = false;
                    break;
                }
                if (isNaN(parseFloat(coinsAmountArray[i]))) {
                    isCoinsAmountValid = false;
                    break;
                }
            }
            if (!isAddressValid || !isCoinsAmountValid) {
                alert("Адрес кошелька или сумма перевода не корректны");
                return;
            }
            //contract.transfer(walletAddress, coinsAmount)
            alert("Перевод успешен")
        }


    }

    return (
        <div className='w50'>
            <div className="transferSection">
                <h2>Перевод денег</h2>
                <div className="form">
                    <div className="inputSection">
                        <label htmlFor='walletAddress' className='label'>Укажите номера кошельков(с новой строки): </label>
                        <textarea id="walletAddress" className='input' ref={address} ></textarea>
                    </div>
                    <div className="inputSection">
                        <label htmlFor='coinsAmount' className='label'>Укажите суммы переводов(с новой строки): </label>
                        <textarea id="coinsAmount" type="text" className='input' ref={coins}></textarea>
                    </div>
                    <button className='btn' onClick={() => { onTransferHandler(address.current.value, coins.current.value) }}>Перевести деньги</button>
                </div>
            </div>
        </div>
    )
}

export default TransferSection