// SPDX-License-Identifier: MIT

pragma solidity ^0.7.3;

import "../node_modules/@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Project is ERC20 {
    string public name;
    string public symbol;
    uint256 public decimals = 18;

    constructor(string memory name_, string memory symbol_) public {
        name = name_;
        symbol = symbol_;
    }

    function transferTask(address[] memory accounts, uint256[] memory amounts)
        public
        virtual
        returns (bool)
    {
        require(
            accounts.length == amounts.length,
            "Not equal length of arrays"
        );
        address owner = msg.sender;

        for (uint256 i = 0; i < accounts.length; i++) {
            _transfer(owner, accounts[i], amounts[i]);
        }

        return true;
    }
}
