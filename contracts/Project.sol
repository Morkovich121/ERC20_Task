// SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;

import "../node_modules/@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Project is ERC20 {
    address public owner = _msgSender();
    bool public isSuccessful = false;

    constructor() ERC20("Project", "PRJ") {
        _mint(owner, 1000);
    }

    function isLastOperationSuccessful() public view returns (bool) {
        return isSuccessful;
    }

    function transferTask(address[] memory accounts, uint256[] memory amounts)
        public
        virtual
        returns (bool)
    {
        isSuccessful = false;
        require(
            accounts.length == amounts.length,
            "Not equal length of arrays"
        );
        require(
            (accounts.length > 0 && amounts.length > 0),
            "Length of arrays must be more than 0"
        );

        for (uint256 i = 0; i < accounts.length; i++) {
            require(
                balanceOf(owner) > amounts[i],
                "Balance of owner is less than amount"
            );
            _transfer(owner, accounts[i], amounts[i]);
        }
        isSuccessful = true;
        return true;
    }
}
