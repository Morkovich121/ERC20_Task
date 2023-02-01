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
}
