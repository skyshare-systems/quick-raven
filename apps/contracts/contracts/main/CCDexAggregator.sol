// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "./interface/Uniswap.sol";
import "@routerprotocol/evm-gateway-contracts/contracts/IGateway.sol";

/// @title CCDexAggregator
/// @author Skyshare Labs
/// @notice A cross-chain ERC-20 smart contract to used to swap tokens
/// on different chains using interoperable messagine.
contract CCDexAggregator is OwnableUpgradeable {
    // swap parameters struct where we specify which tokens should be swapped
    // on the other
    struct SwapParams {
        address dexRouter;
        address tokenIn;
        address tokenOut;
        uint256 amountIn;
        uint256 amountOutMin;
        address to;
    }
    // address of the Gateway contract
    address public gatewayContractAddress;

    // chain type + chain id => address of our contract in bytes
    mapping(string => string) public contractList;

    function initialize() external initializer {
        __Ownable_init();
        __Context_init();
    }

    /// @notice function used when swapping tokens to DEXs
    /// @param _dexRouter the address of the DEX router
    /// @param _tokenIn address of token to be swapped
    /// @param _tokenOut address of token to be received
    /// @param _amountIn amount of tokens to swap
    /// @param _amountOutMin minimum amount of tokens to receive
    function swapToQr(
        address _dexRouter,
        address _tokenIn,
        address _tokenOut,
        uint256 _amountIn,
        uint256 _amountOutMin
    ) external {
        IERC20(_tokenIn).transferFrom(msg.sender, address(this), _amountIn);
        IERC20(_tokenIn).approve(_dexRouter, _amountIn);

        address[] memory path = new address[](2);
        path[0] = _tokenIn;
        path[1] = _tokenOut;

        IUniswapV2Router(_dexRouter).swapExactTokensForTokens(
            _amountIn,
            _amountOutMin,
            path,
            address(this),
            block.timestamp
        );
    }

    /// @notice function used when swapping tokens to users
    /// @param _dexRouter the address of the DEX router
    /// @param _tokenIn address of token to be swapped
    /// @param _tokenOut address of token to be received
    /// @param _amountIn amount of tokens to swap
    /// @param _amountOutMin minimum amount of tokens to receive
    function swapToUser(
        address _dexRouter,
        address _tokenIn,
        address _tokenOut,
        uint256 _amountIn,
        uint256 _amountOutMin,
        address _to
    ) public {
        IERC20(_tokenIn).transferFrom(msg.sender, address(this), _amountIn);
        IERC20(_tokenIn).approve(_dexRouter, _amountIn);

        address[] memory path = new address[](2);
        path[0] = _tokenIn;
        path[1] = _tokenOut;

        IUniswapV2Router(_dexRouter).swapExactTokensForTokens(
            _amountIn,
            _amountOutMin,
            path,
            _to,
            block.timestamp
        );
    }

    /// @notice function used to send cross chain messages
    /// @param _destChainId the chain id of the destination chain
    /// @param _swapParams swap parameters struct
    /// @param requestMetadata abi-encoded metadata according to source and destination chains
    function iSend(
        string memory _destChainId,
        SwapParams memory _swapParams,
        bytes memory requestMetadata
    ) public payable {
        require(
            keccak256(bytes(contractList[_destChainId])) != keccak256(""),
            "contract not found"
        );

        bytes memory packet = abi.encode(_swapParams);
        bytes memory requestPacket = abi.encode(
            contractList[_destChainId],
            packet
        );

        IGateway gatewayContract = IGateway(gatewayContractAddress);
        gatewayContract.iSend{value: msg.value}(
            1,
            0,
            string(""),
            _destChainId,
            requestMetadata,
            requestPacket
        );
    }

    /// @notice function used to receive cross chain messages
    /// @param requestSender address of the contract on source chain that initiated the request.
    /// @param packet the payload sent by the source chain contract when the request was created.
    /// @param srcChainId chain ID of the source chain in string.
    function iReceive(
        string calldata requestSender,
        bytes calldata packet,
        string calldata srcChainId
    ) external returns (bytes memory) {
        require(msg.sender == address(gatewayContractAddress), "only gateway");
        require(
            keccak256(bytes(contractList[srcChainId])) ==
                keccak256(bytes(requestSender))
        );

        // decoding our payload
        SwapParams memory swapParams = abi.decode(packet, (SwapParams));

        swapToUser(
            swapParams.dexRouter,
            swapParams.tokenIn,
            swapParams.tokenOut,
            swapParams.amountIn,
            swapParams.amountOutMin,
            swapParams.to
        );

        return "";
    }

    /// @notice function used to withdraw stuck native token
    function withdrawEther() external onlyOwner {
        payable(msg.sender).transfer(address(this).balance);
    }

    /// @notice function used to withdraw stuck ERC20 tokens
    function withdrawToken(address _token) external onlyOwner {
        IERC20 token = IERC20(_token);

        token.transfer(msg.sender, token.balanceOf(address(this)));
    }
}
