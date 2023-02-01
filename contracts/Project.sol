// SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;

import "../node_modules/@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Project is ERC20 {
    constructor() ERC20("Project", "PRJ") {}

    function transferTask(address[] memory accounts, uint256[] memory amounts)
        public
        virtual
        returns (bool)
    {
        require(
            accounts.length == amounts.length,
            "Not equal length of arrays"
        );
        require(
            (accounts.length > 0 && amounts.length > 0),
            "Length of arrays must be more than 0"
        );
        address owner = msg.sender;

        for (uint256 i = 0; i < accounts.length; i++) {
            _transfer(owner, accounts[i], amounts[i]);
        }

        return true;
    }
}
