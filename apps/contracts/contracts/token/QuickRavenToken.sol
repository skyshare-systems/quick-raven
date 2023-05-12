// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts-upgradeable/token/ERC20/ERC20Upgradeable.sol";

contract QuickRavenToken is ERC20Upgradeable {
    function initialize() external initializer {
        __ERC20_init("QuickRavenToken", "QRT");
    }

    function mint(address _account, uint256 _amount) external {
        _mint(_account, _amount);
    }
}