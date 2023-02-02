// SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Project is ERC20 {
    constructor() ERC20("Project", "PRJ") {
        _mint(_msgSender(), 1000);
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
        require(
            (accounts.length > 0),
            "Length of arrays must be more than 0"
        );

        for (uint256 i = 0; i < accounts.length; i++) {
            _transfer(_msgSender(), accounts[i], amounts[i]);
        }

        return true;
    }
}
