// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts-upgradeable/token/ERC20/ERC20Upgradeable.sol";

contract Token is ERC20Upgradeable {
    function initialize(string memory _name, string memory _ticker) external initializer {
        __ERC20_init(_name, _ticker);
    }

    function mint(address _account, uint256 _amount) external {
        _mint(_account, _amount);
    }

    receive() external payable {
        _mint(msg.sender, msg.value);
    }
}