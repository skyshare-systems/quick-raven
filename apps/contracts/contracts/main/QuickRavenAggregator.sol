// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;


import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "./interface/Uniswap.sol";

contract QuickRavenAggregator {
    address public WETH;

    function swap(
        address _dexRouter,
        address _tokenIn,
        address _tokenOut,
        uint256 _amountIn,
        uint256 _amountOutMin,
        address _to
    ) external {
        IERC20(_tokenIn).transferFrom(msg.sender, address(this), _amountIn);
        IERC20(_tokenIn).approve(_dexRouter, _amountIn);

        address[] memory path = new address[](3);
        path[0] = _tokenIn;
        path[1] = WETH;
        path[2] = _tokenOut;

        IUniswapV2Router(_dexRouter).swapExactTokensForTokens(
            _amountIn, 
            _amountOutMin, 
            path, 
            _to, 
            block.timestamp
        );
    }
}